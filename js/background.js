chrome.app.runtime.onLaunched.addListener(function() {
	var win = chrome.app.window.create('html/main.html', {
		width: 400,
		height: 400
	});
	var chromeCom = ChromeCom.create();
	chromeCom.register("server", HttpServer.create());
});