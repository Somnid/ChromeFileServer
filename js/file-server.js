var FileServer = (function(){
  function create(options){
    var fileServer = {};
    bind(fileServer);
    fileServer.setup(options);
    return fileServer;
  }
  function bind(fileServer){
    fileServer.setup = setup.bind(fileServer);
    fileServer.start = start.bind(fileServer);
    fileServer.kill = kill.bind(fileServer);
    fileServer.onRequest = onRequest.bind(fileServer);
    fileServer.isRunning = isRunning.bind(fileServer);
    fileServer.setupRouter = setupRouter.bind(fileServer);
    fileServer.setFileSystemRoot = setFileSystemRoot.bind(fileServer);
  }
  function onRequest(request){
    console.log("File Server: processing request for: ", request.uri);
    if(!this.router){
      console.log("Router was not set yet (need to set filesystem root");
      return;
    }
    return this.router.route(request);
  }
  function setup(options){
    this.options = options;
    if(options.fsRoot){
      this.setFileSystemRoot(options.fsRoot);
    }
    this.httpServer = HttpServer.create({
      onStart : options.onStart,
      onKill : options.onKill,
      onRequest : this.onRequest,
      onError : options.onError,
      autoStart : !!options.ip && !!options.port && !!options.fsRoot,
      port : options.port,
      ip : options.ip
    });
  }
  function setupRouter(fsRoot){
    this.router = Router.create({
      fsRoot : fsRoot
    });
  }
  function setFileSystemRoot(entry){
    this.fsRoot = entry;
    this.setupRouter(entry);
  }
  function isRunning(){
    return this.httpServer.running;
  }
  function start(ip, port, fsRoot){
    this.setFileSystemRoot(fsRoot);
    this.httpServer.start({
      ip : ip,
      port : port
    });
  }
  function kill(){
    this.httpServer.kill();
  }
  return {
    create : create
  };
})();