chrome.app.runtime.onLaunched.addListener(function() {
	var ip;
	var port;
	chromep.storage.local(["ip", "port"]).then(function(items){
	  ip = items.ip;
	  port = items.port;
	  
	  var win = chrome.app.window.create('html/main.html', {
		  width: 400,
		  height: 400
	  });
	  
	  var chromeCom = ChromeCom.create("server-channel");
	  chromeCom.register("server", HttpServer.create({
	    onStart : chromeCom.request.bind(chromeCom, "server-view.onStart"),
	    onKill : chromeCom.request.bind(chromeCom, "server-view.onKill"),
	    onRequest : chromeCom.request.bind(chromeCom, "server-view.onRequest"),
	    onError : chromeCom.request.bind(chromeCom, "server-view.error"),
	    autoStart : ip && port;
	  }));
	});
});