document.addEventListener("DOMContentLoaded", function(){
	var startButton = document.getElementById("btn-start");
	var killButton = document.getElementById("btn-kill");
	var server;
	
	startButton.addEventListener("click", function(){
		startButton.disabled = true;
		killButton.disabled = false;
		server = HttpServer.create({
			port : 9009,
			ip : "127.0.0.1",
			onRequest : function(request){
				console.log("reading info", { request : request });
				
				//return new Promise(function(resolve, reject){
				//	resolve("Hello World!");
				//});
				return Ajax.promiseRequest({
					url : "file:///C:/Users/dkumagai1/Desktop/ext/ChromeServer/manifest.json"
				});
			},
			onKill : function(){
				startButton.disabled = false;
				killButton.disabled = true;
			}
		});
	}, true);
	
	killButton.addEventListener("click", function(){
		startButton.disabled = true;
		killButton.disabld = false;
		server.kill();
	}, true);
}, true);