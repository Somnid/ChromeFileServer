var FileServer = (function(){
  function create(options){
    var fileServer = {};
    bind(fileServer);
    fileServer.setup(options);
    return fileServer;
  }
  function bind(fileServer){
    fileServer.setup = setup.bind(fileServer);
    fileServer.onRequest = onRequest.bind(fileServer);
    fileServer.setFileSystemRoot = setFileSystemRoot.bind(fileServer);
  }
  function onRequest(){

  }
  function setup(options){
    FileSystem.getUserFolder(true)
      .then(setFileSystemRoot)
      .then(createChannels);

  }
  function createChannels(options){
    this.serverChannel = ChromeCom.create("server-channel");
    this.serverViewChannel = ChromeCom.create("server-view-channel");
    this.router = Router.create({
		  fsRoot : this.fsRoot
		});
    this.serverChannel.register("server", HttpServer.create({
	    onStart : this.serverViewChannel.request.bind(this.serverViewChannel, "server-view.onStart"),
	    onKill : this.serverViewChannel.request.bind(this.serverViewChannel, "server-view.onKill"),
	    onRequest : this.onRequest,
	    onError : this.serverViewChannel.request.bind(this.serverViewChannel, "server-view.error"),
	    autoStart : !!options.ip && !!options.port,
	    port : options.port,
	    ip : options.ip
	  }));
  }
  function setFileSystemRoot(entry){
    this.fsRoot = entry;
  }
  return {
    create : create
  };
})();