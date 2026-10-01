#!/usr/bin/env ruby

require "json"
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

def read_owner_credentials(path)
  abort "Owner credentials are missing. Configure #{path} before starting this server." unless File.file?(path)

  permissions = File.stat(path).mode & 0o777
  abort "Owner credentials must be readable only by their owner (chmod 600 #{path})." unless (permissions & 0o077).zero?

  credentials = JSON.parse(File.read(path))
  username = credentials["username"]
  password = credentials["password"]
  unless username.is_a?(String) && !username.empty? && password.is_a?(String) && password.length >= 20
    abort "Owner credentials must contain a username and a password at least 20 characters long."
  end

  [username, password]
rescue JSON::ParserError => error
  abort "Owner credential file is not valid JSON: #{error.message}"
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
  "/script.js" => "script.js"
}.freeze
owner_files = {
  "/owner.html" => "owner.html",
  "/owner.css" => "owner.css",
  "/owner.js" => "owner.js"
}.freeze

server = WEBrick::HTTPServer.new(
  BindAddress: HOST,
  Port: PORT,
  AccessLog: [],
  Logger: WEBrick::Log.new($stderr, WEBrick::Log::WARN),
  DoNotReverseLookup: true
)

server.mount_proc("/") do |request, response|
  if request.request_method != "GET" && request.request_method != "HEAD"
    response["Allow"] = "GET, HEAD"
    response.status = 405
    response.body = "Method not allowed"
    next
  end

  file = owner_files[request.path]
  if file
    begin
      authenticator.authenticate(request, response)
    rescue WEBrick::HTTPStatus::Unauthorized
      response.status = 401
      response.body = "Authentication required"
      next
    end
  else
    file = public_files[request.path]
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
