#!/usr/bin/env ruby

require "base64"
require "json"
require "openssl"
require "securerandom"
require "webrick"
require "webrick/httpauth"

ROOT = File.expand_path(__dir__)
CREDENTIALS_PATH = ENV.fetch(
  "OWNER_CREDENTIALS_FILE",
  File.join(Dir.home, ".config", "jagalur", "owner_credentials.json")
).freeze
PORT = Integer(ENV.fetch("PORT", "8000"))
HOST = ENV.fetch("HOST", "0.0.0.0")

def valid_owner_password?(password)
  return false unless password.is_a?(String)
  return false if password.empty? || password.length < 8

  password.match?(/[a-z]/) &&
    password.match?(/[A-Z]/) &&
    password.match?(/\d/) &&
    password.match?(/[^A-Za-z0-9]/)
end

def read_owner_credentials(path)
  abort "Owner credentials are missing. Configure #{path} before starting this server." unless File.file?(path)

  permissions = File.stat(path).mode & 0o777
  abort "Owner credentials must be readable only by their owner (chmod 600 #{path})." unless (permissions & 0o077).zero?

  credentials = JSON.parse(File.read(path))
  username = credentials["username"]
  password = credentials["password"]

  unless username.is_a?(String) && !username.strip.empty? && valid_owner_password?(password)
    abort "Owner credentials must contain a non-empty username and a password with at least 8 characters including uppercase, lowercase, a number, and a symbol."
  end

  [username.strip, password]
rescue JSON::ParserError => error
  abort "Owner credential file is not valid JSON: #{error.message}"
end

SESSION_SECRET = ENV.fetch("OWNER_SESSION_SECRET") do
  OpenSSL::Digest::SHA256.hexdigest(File.read(CREDENTIALS_PATH))
end

def secure_compare(left, right)
  return false if left.bytesize != right.bytesize

  digest = 0
  left.bytes.zip(right.bytes) { |a, b| digest |= a ^ b }
  digest.zero?
end

def build_owner_session(username)
  payload = { username: username, exp: Time.now.to_i + 12 * 60 * 60 }.to_json
  encoded = Base64.urlsafe_encode64(payload)
  signature = OpenSSL::HMAC.hexdigest("SHA256", SESSION_SECRET, encoded)
  "#{encoded}.#{signature}"
end

def valid_owner_session?(request)
  cookie = request.cookies.find { |c| c.name == "owner_session" }
  return false if cookie.nil?

  token = cookie.value.to_s
  encoded, signature = token.split(".", 2)
  return false if encoded.nil? || signature.nil?

  expected = OpenSSL::HMAC.hexdigest("SHA256", SESSION_SECRET, encoded)
  return false unless secure_compare(expected, signature)

  data = JSON.parse(Base64.urlsafe_decode64(encoded))
  data.is_a?(Hash) && data["username"].is_a?(String) && data["exp"].to_i > Time.now.to_i
rescue StandardError
  false
end

class OwnerUserDatabase
  def initialize(username, password)
    @username = username
    @password_hash = password.crypt("$6$#{SecureRandom.hex(8)}$")
    abort "This Ruby installation cannot create a secure password hash." if @password_hash == password
  end

  def get_passwd(_realm, username, _reload = false)
    username == @username ? @password_hash : nil
  end
end

if $PROGRAM_NAME == __FILE__
  username, password = read_owner_credentials(CREDENTIALS_PATH)
  authenticator = WEBrick::HTTPAuth::BasicAuth.new(
    Realm: "Owner dashboard",
    UserDB: OwnerUserDatabase.new(username, password),
    Logger: WEBrick::Log.new($stderr, WEBrick::Log::WARN)
  )

  public_files = {
    "/" => "index.html",
    "/index.html" => "index.html",
    "/style.css" => "style.css",
    "/script.js" => "script.js",
    "/owner-login.html" => "owner-login.html",
    "/owner.css" => "owner.css",
    "/owner.js" => "owner.js"
  }.freeze
  owner_files = {
    "/owner.html" => "owner.html"
  }.freeze

  server = WEBrick::HTTPServer.new(
    BindAddress: HOST,
    Port: PORT,
    AccessLog: [],
    Logger: WEBrick::Log.new($stderr, WEBrick::Log::WARN),
    DoNotReverseLookup: true
  )

  server.mount_proc("/") do |request, response|
    if request.path == "/login" && request.request_method == "POST"
      form = WEBrick::HTTPUtils.parse_query(request.body)
      supplied_username = form["username"].to_s.strip
      supplied_password = form["password"].to_s
      if supplied_username == username && supplied_password == password
        response.status = 303
        response["Location"] = "/owner.html"
        response["Set-Cookie"] = "owner_session=#{build_owner_session(username)}; Path=/; HttpOnly; SameSite=Lax"
        response.body = ""
        next
      end

      response.status = 401
      response["Content-Type"] = "text/html; charset=utf-8"
      response.body = <<~HTML
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>Owner login</title></head>
        <body style="font-family:system-ui;display:grid;place-items:center;height:100vh;margin:0;background:#f6f1e8;color:#542b13;">
          <div style="max-width:420px;padding:2rem;border-radius:16px;background:#fff;box-shadow:0 8px 26px rgba(0,0,0,0.08);text-align:center;">
            <h2>Access denied</h2>
            <p>Invalid owner username or password.</p>
            <p><a href="/owner-login.html" style="color:#7b3f1d;">Try again</a></p>
          </div>
        </body>
        </html>
      HTML
      next
    end

    if request.path == "/logout" && request.request_method == "POST"
      response.status = 303
      response["Location"] = "/owner-login.html"
      response["Set-Cookie"] = "owner_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax"
      response.body = ""
      next
    end

    if request.request_method != "GET" && request.request_method != "HEAD"
      response["Allow"] = "GET, HEAD, POST"
      response.status = 405
      response.body = "Method not allowed"
      next
    end

    file = owner_files[request.path]
    if file
      unless valid_owner_session?(request)
        response.status = 302
        response["Location"] = "/owner-login.html"
        response.body = ""
        next
      end
    else
      file = public_files[request.path]
    end

    if request.path == "/owner-login.html" && valid_owner_session?(request)
      response.status = 302
      response["Location"] = "/owner.html"
      response.body = ""
      next
    end

    unless file
      response.status = 404
      response.body = "Not found"
      next
    end

    response.status = 200
    response["Content-Type"] = WEBrick::HTTPUtils.mime_type(file, WEBrick::HTTPUtils::DefaultMimeTypes)
    response["X-Content-Type-Options"] = "nosniff"
    response["Cache-Control"] = file.start_with?("owner.") ? "no-store, private" : "no-cache"
    response.body = request.request_method == "HEAD" ? "" : File.binread(File.join(ROOT, file))
  end

  trap("INT") { server.shutdown }
  trap("TERM") { server.shutdown }

  warn "Serving public storefront and authenticated owner dashboard on #{HOST}:#{PORT}"
  server.start
end
