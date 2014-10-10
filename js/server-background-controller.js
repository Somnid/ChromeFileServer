var ServerBackgroundController = (function(){
  function create(){
    var serverBackgroundController = {};
    bind(serverBackgroundController);
    serverBackgroundController.attachEvents();
    return serverBackgroundController;
  }
  function bind(serverBackgroundController){
    serverBackgroundController.attachEvents = attachEvents.bind(serverBackgroundController);
    serverBackgroundController.startServer = startServer.bind(serverBackgroundController);
  }
  function attachEvents(){
    chrome.app.runtime.onLaunched.addListener(this.startServer);
  }
  function startServer(){
    var self = this;
	  chromep.storage.local.get(["ip", "port", "fsRoot"]).then(function(items){
      self.fileServer = FileServer.create({
        ip : items.ip,
        port : items.port,
        fsRoot : items.fsRoot
      });
	  
      self.win = chromep.app.window.create('html/main.html', {
		    width: 400,
		    height: 400
	    });
	  }).catch(function(e){
	    console.log("Startup Error:", e);
	  });
  }
  return {
    create : create
  };
})();