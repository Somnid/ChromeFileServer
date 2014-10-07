var ServerView = (function(){
  function create(){
    var serverView = {};
    serverView.dom = {};
    bind(serverView);
    serverView.gatherSelectors();
    serverView.attachEvents();
    chromep.runtime.getBackgroundPage.then(function(backgroundPage){
      serverView.backgroundPage = backgroundPage;
      serverView.fileServer = backgroundPage.controller.fileServer;
    })
    return serverView;
  }
  function bind(serverView){
    serverView.gatherSelectors = gatherSelectors.bind(serverView);
    serverView.attachEvents = attachEvents.bind(serverView);
    serverView.onStartClick = onStartClick.bind(serverView);
    serverView.onLocationClick = onLocationClick.bind(serverView);
    serverView.onKillClick = onKillClick.bind(serverView);
    serverView.getUserFolder = getUserFolder.bind(serverView);
    serverView.onKill = onKill.bind(serverView);
    serverView.onServerError = onServerError.bind(serverView);
  }
  function gatherSelectors(){
    this.dom.startButton = document.getElementById("btn-start");
    this.dom.locationButton = document.getElementById("btn-location");
    this.dom.killButton = document.getElementById("btn-kill");
    this.dom.serverInfo = document.getElementById("server-info");
  }
  function attachEvents(){
    this.dom.startButton.addEventListener("click", this.onStartClick);
    this.dom.locationButton.addEventListener("click", this.onLocationClick);
    this.dom.killButton.addEventListener("click", this.onKillClick);
  }
  function onStartClick(){
    if(!this.fsRoot){
	    console.log("setup location first");
	    return;
	  }

		//this.dom.startButton.disabled = true;
		this.dom.killButton.disabled = false;

    if(this.fileServer.isRunning()){
      console.log("already running");
    }else{
  		this.fileServer.setup({
  		  port : this.port,
  		  ip : this.ip
  		});
    }

		this.dom.serverInfo.innerText = this.fileServer.options.ip + ":" + this.port;
		this.dom.serverInfo.href = "http://" + this.fileServer.options.ip + ":" + this.port;
  }
  function onKill(){
    this.dom.startButton.disabled = false;
		this.dom.killButton.disabled = true;
  }
  function onServerError(error){
    console.error(error);
  }
  function onLocationClick(){
    this.getUserFolder(true);
  }
  function onKillClick(){
    this.dom.startButton.disabled = true;
		this.dom.killButton.disabld = false;
		this.server.kill();
  }
  function getUserFolder(force){
    FileSystem.getUserFolder(force).then(function(entry){
		  this.fsRoot = entry;
		}.bind(this));
  }
  return {
    create : create
  };
})();