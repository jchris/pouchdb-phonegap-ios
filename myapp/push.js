var couchapp = require("couchapp"),
	path = require("path"),
	fs = require("fs"),
	watch = require("watch");


var serverPath = path.join(__dirname, '..','www'),
	appPath = path.join(__dirname, "myapp"),
	id = "myapp",
	serverUrl = "http://localhost:5984/myapp-server/myapp",
	appUrl = "http://localhost:5984/myapp/myapp";


function doPushApp() {
	var ddoc = couchapp.loadFiles(appPath);
	ddoc._id = id;

	couchapp.createApp(ddoc, appUrl, function(app) {
	    app.push(console.log)
	});
};


function doPushServer() {
	var serverDdoc = {};
	serverDdoc._id = id;

	couchapp.loadAttachments(serverDdoc, serverPath);

	couchapp.createApp(serverDdoc, serverUrl, function(app) {
	    app.push(console.log)
	});

};


watch.createMonitor(appPath, function (monitor) {
    monitor.on("created", doPushApp)
    monitor.on("changed", doPushApp)
    monitor.on("removed", doPushApp)
})


watch.createMonitor(serverPath, function (monitor) {
    monitor.on("created", doPushServer)
    monitor.on("changed", doPushServer)
    monitor.on("removed", doPushServer)
})

doPushServer();
doPushApp();
