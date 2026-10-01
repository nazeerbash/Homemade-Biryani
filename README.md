# Homemade Biryani Website

This project contains the public Jagalur food-business website and an owner-only recipe dashboard.

## Run locally on macOS

Ruby is included with macOS. From Terminal, open this project folder and run:

```sh
cd /path/to/PythonCourse
```

If you have not set up the owner login on this computer, create private credentials:

```sh
ruby -rjson -rsecurerandom -rfileutils -e 'd = File.join(Dir.home, ".config", "jagalur"); FileUtils.mkdir_p(d, mode: 0700); File.chmod(0700, d); p = File.join(d, "owner_credentials.json"); abort "Credentials already exist at #{p}" if File.exist?(p); password = SecureRandom.hex(16); File.write(p, JSON.generate(username: "owner", password: password), mode: "w", perm: 0600); File.chmod(0600, p); puts "Username: owner\nPassword: #{password}\nSaved privately at: #{p}"'
```

Save the generated password somewhere private. It is shown only once. Do not put the credentials file in this project or share it.

Start the secured web server:

```sh
ruby owner_server.rb
```

Open `http://127.0.0.1:8000/` for the public website. Open `http://127.0.0.1:8000/owner.html` for the owner dashboard and enter the credentials when prompted. Stop the server with **Ctrl+C**.

To open the site on a phone, connect the phone and computer to the same trusted Wi-Fi network and use the computer's local IP address, for example `http://192.168.x.x:8000/`. The local server uses unencrypted HTTP: do not expose it to the public internet or set up port forwarding.

## Owner recipes and photos

Recipes, ingredient data, batch sizes, photos, and image crops are stored in the browser's local storage. They are not synchronized between devices. Use **Export backup** in the dashboard and import that JSON backup on another device. Browser data can be lost if site data is cleared, so keep backups.

## Project files

- `index.html`, `style.css`, `script.js` — public storefront.
- `owner.html`, `owner.css`, `owner.js` — recipe management dashboard.
- `owner_server.rb` — server that protects dashboard pages with owner authentication.
- `.vscode/tasks.json` — VS Code task for starting the secured server.
