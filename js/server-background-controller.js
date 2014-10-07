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
	  chromep.storage.local.get(["ip", "port"]).then(function(items){
	    var ip = items.ip || "127.0.0.1";
	    var port = items.port || "1337";

      self.fileServer = FileServer.create({
        ip : ip,
        port : port
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