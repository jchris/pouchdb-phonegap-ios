# PouchDB PhoneGap App Launcher

This is a getting started kit for PouchDB and iOS. The key element here is you can update the JavaScript code running on the device, without stopping and rebuilding the Xcode project. Just upload your code to the device and reload. This takes some of the tedium out of development.

Included:

* Double-click ready Xcode project loaded with PhoneGap and PouchDB
* Node.js script to push HTML5 app to sync server

You bring:

* A server that syncs with PouchDB. I used Couchbase Server with Basecouch but there are lots of alternatives.
* Your app code (HTML, CSS and JavaScript)

## Deploy Your App

* There is a shell of an app in the `myapp/myapp` directory, you can replace it with your code, just remember to keep the files `myapp/myapp/js.js` and `myapp/myapp/css.css` around.
* To add new dependencies or inspect the bootloader, check out `www/index.html`. If you edit this file you need to rebuild your Xcode.

To deploy your app, edit the file at `myapp/myapp.js` to point to your sync server, then push your app code by running `node myapp/push.js` -- this puts the app code on the sync server where it can be picked up by running versions of the app on launch.

## Launch Your App

If your Simulator or iDevice can reach your sync server address via the internet, you can launch the app via Xcode. Use the Safari Developer menu to bring up a web-inspector for your app. From there you can refresh the JavaScript runtime to pick up code changes.

Or if you are lazy, you can always just open `www/index.html` in your Safari or Chrome browser. `file://` URLs can sync with your sync server, so it should "just work."

The 3rd option for running your app, is to hit the sync server URL from your browser. This is handy for debugging from mobile device browsers. The URL should be something like: `http://localhost:5984/myapp-server/myapp`

As far as I can tell, PouchDB sync works in any of these contexts.

## Hot Code Loading

The code living in `myapp/myapp` can be hot loaded onto devices by running `node myapp/push.js` which sends it to the sync server. Then on the next refresh of the PouchDB `www/index.html` web runtime it will sync the new app code and run it.

This is really handy in a development context, especially for rapid prototyping.

## TODOs

This whole thing is really experimental and should perhaps be redone from scratch, but so far it works.

* Make the sample app less lame
* App runtime includes require.js style loader
* Better launch performance (idb ready event?)

