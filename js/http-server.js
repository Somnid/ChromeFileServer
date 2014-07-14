var HttpServer = (function(){

	function create(options){
		var server = {};
		server.port = options.port || 8181;
		server.ip = options.ip || "127.0.0.1";

		server.onopen = options.onOpen || function(){};
		server.onrequest = options.onRequest || function(){};
		server.onkill = options.onKill || function(){};
		server.onError = options.onError || function(){};

		bind(server);

		server.setup();

		return server;
	}

	function bind(server){
	  server.setup = setup.bind(server);

		server.kill = kill.bind(server);
		server.status = status.bind(server);
		server.onAccept = onAccept.bind(server);
	}

	function setup(){
		var self = this;
		console.log("creating socket");
		chrome.socket.create("tcp", {}, function(createInfo){
			self.socketId = createInfo.socketId;
			console.log("socket created with id: " + createInfo.socketId);
			chrome.socket.listen(createInfo.socketId, self.ip, self.port, 50, function(result){
				console.log("listening on: " + self.ip + ":" + self.port + ". Result code: " + result);
				chrome.socket.accept(self.socketId, self.onAccept);
				self.onopen(createInfo);
			});
		});
	}

	function onAccept(acceptInfo){
		var self = this;
		console.log("accepted connection", acceptInfo);
		chrome.socket.read(acceptInfo.socketId, null, function(readInfo){
			var request = HttpParser.parseRequest(readInfo);
			self.onrequest(request).then(function(response){
				var responseBuffer = HttpParser.responseToBuffer(response);
				chrome.socket.write(acceptInfo.socketId, responseBuffer, function(writeInfo){
					console.log("wrote data", writeInfo);
					chrome.socket.destroy(acceptInfo.socketId);
					console.log("destroyed socket");
				});
			}).catch(function(error){
			  self.onError(error);
				chrome.socket.destroy(acceptInfo.socketId);
			});
		});
	}

	function kill(){
		console.log("destroying socket", this.socketId);
		chrome.socket.destroy(this.socketId);
		this.onkill();
	}

	function status(callback){
		chrome.socket.getInfo(this.socketId, callback);
	}

	return {
		create : create
	};

})();