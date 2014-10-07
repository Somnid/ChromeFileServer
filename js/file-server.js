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
    fileServer.isRunning = isRunning.bind(fileServer);
    fileServer.setFileSystemRoot = setFileSystemRoot.bind(fileServer);
  }
  function onRequest(uri){
    console.log("File Server: processing request for: ", uri);
    this.router.route(uri)
  }
  function setup(options){
    this.options = options;
    this.router = Router.create({
      fsRoot : this.fsRoot
    });
    this.httpServer = HttpServer.create({
      onStart : options.onStart,
      onKill : options.onKill,
      onRequest : this.onRequest,
      onError : options.onError,
      autoStart : !!options.ip && !!options.port,
      port : options.port,
      ip : options.ip
    });
  }
  function setFileSystemRoot(entry){
    this.fsRoot = entry;
  }
  function isRunning(){
    return this.httpServer.running;
  }
  return {
    create : create
  };
})();