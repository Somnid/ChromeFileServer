var HttpServer = (function(){

	function create(options){
		var server = {};
		server.port = options.port || 8181;
		server.ip = options.ip || "127.0.0.1";
		server.clientSockets = [];

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
		server.onAccept = onAccept.bind(server);
		server.onReceive = onReceive.bind(server);
		server.onReceiveError = onReceiveError.bind(server);
	}

	function setup(){
		var self = this;
		console.log("creating socket");
		chrome.sockets.tcpServer.create({}, function(createInfo){
			self.socketId = createInfo.socketId;
			console.log("socket created with id: " + createInfo.socketId);
			chrome.sockets.tcpServer.listen(createInfo.socketId, self.ip, self.port, function(result){
				if(result < 0){
				  console.log(chrome.runtime.lastError.message);
				}
				console.log("listening on: " + self.ip + ":" + self.port + ". Result code: " + result);
				chrome.sockets.tcpServer.onAccept.addListener(self.onAccept);
				chrome.sockets.tcp.onReceive.addListener(self.onReceive);
		    chrome.sockets.tcp.onReceiveError.addListener(self.onReceiveError);
				self.onopen(createInfo);
			});
		});
	}

	function onAccept(acceptInfo){
		console.log("accepted connection", acceptInfo);
		this.clientSockets.push(acceptInfo.clientSocketId);
		chrome.sockets.tcp.setPaused(acceptInfo.clientSocketId, false);
	}

	function onReceive(receiveInfo){
	  var self = this;
    console.log("received connection", receiveInfo);
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
		this.clientSockets.forEach(function(socketId){
		  chrome.sockets.tcp.disconnect(socketId);
		})
		this.onkill();
	}

	function getInfo(socketId){
	  return new Promise(function(resolve, reject){
	    chrome.sockets.tcpServer.getInfo(socketId, resolve);
	  });
	}

	function onReceiveError(info){
	  console.error(info);
	}

	return {
		create : create
	};

})();