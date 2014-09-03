chrome.app.runtime.onLaunched.addListener(function() {
	setTimeout(function(){
	chromep.storage.local.get(["ip", "port"]).then(function(items){
	  var ip = items.ip || "127.0.0.1";
	  var port = items.port || "1337";

	  var win = chrome.app.window.create('html/main.html', {
		  width: 400,
		  height: 400
	  });

    var fileServer = FileServer.create({
      ip : ip,
      port : port
    });
	});
	}, 3000);
});