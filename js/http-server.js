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
		chrome.sockets.tcpServer.create({}, function(createInfo){
			self.socketId = createInfo.socketId;
			console.log("socket created with id: " + createInfo.socketId);
			chrome.socket.tcpServer.listen(createInfo.socketId, self.ip, self.port, 50, function(result){
				console.log("listening on: " + self.ip + ":" + self.port + ". Result code: " + result);
				chrome.sockets.tcpServer.onAccept.addListener(self.onAccept);
				self.onopen(createInfo);
			});
		});
	}

	function onAccept(acceptInfo){
		var self = this;
		console.log("accepted connection", acceptInfo);
		chrome.sockets.tcp.onRecieve(acceptInfo.socketId, self.onReceive);
		chrome.sockets.tcp.setPaused(false);
	}
	
	function onReceive(receiveInfo){
	  var request = HttpParser.parseRequest(receiveInfo);
		self.onrequest(request).then(function(response){
			var responseBuffer = HttpParser.responseToBuffer(response);
			chrome.sockets.tcp.send(receiveInfo.socketId, responseBuffer, function(sendInfo){
				console.log("sent data", sendInfo);
			});
		}).catch(function(error){
		  self.onError(error);
			chrome.socket.destroy(acceptInfo.socketId);
		});
	}

	function kill(){
		console.log("destroying socket", this.socketId);
		chrome.sockets.tcpServer.onAccept.removeListener(this.onAccept);
		chrome.sockets.tcp.disconnect(this.socketId);
		this.onkill();
	}

	function status(callback){
		chrome.sockets.tcpServer.getInfo(this.socketId, callback);
	}

	return {
		create : create
	};

})();