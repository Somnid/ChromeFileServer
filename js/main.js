document.addEventListener("DOMContentLoaded", function(){
	var startButton = document.getElementById("btn-start");
	var killButton = document.getElementById("btn-kill");
	var locationButton = document.getElementById("btn-location");
	var server;
	var fsRoot;

	startButton.addEventListener("click", function(){
	  if(!fsRoot){
	    console.log("setup location first");
	    return;
	  }
		startButton.disabled = true;
		killButton.disabled = false;
		server = HttpServer.create({
			port : 9009,
			ip : "127.0.0.1",
			onRequest : function(request){
				console.log("reading info", { request : request });

				return new Promise(function(resolve, reject){
				  fsRoot.getFile(request.uri, { create : false }, function(file){
				    console.log(file);
				    resolve(file);
				  },function(error){
				    reject(error);
				  });
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

	locationButton.addEventListener("click", function(){
		FileSystem.getUserFolder().then(function(entry){
		  fsRoot = entry;
		});
	}, true);

	FileSystem.getUserFolder().then(function(entry){
		fsRoot = entry;
	});
}, true);