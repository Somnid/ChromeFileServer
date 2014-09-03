var ServerView = (function(){
  function create(){
    var serverView = {};
    serverView.dom = {};
    serverView.chromeCom = ChromeCom.create("server-channel");
    bind(serverView);
    serverView.gatherSelectors();
    serverView.attachEvents();
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

		this.dom.startButton.disabled = true;
		this.dom.killButton.disabled = false;

		this.chromeCom("server.setup", {
		  port : this.port,
		  ip : this.ip
		});

		this.dom.serverInfo.innerText = this.ip + ":" + this.port;
		this.dom.serverInfo.href = "http://" + this.ip + ":" + this.port;
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