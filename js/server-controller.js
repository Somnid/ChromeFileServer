var ServerController = (function(){
  function create(){
    var serverController = {};
    serverController.server = null;
    bind(serverController);
    return serverController;
  }
  function bind(serverController){
    serverController.attachEvents = attachEvents.bind(serverController);
    serverController.onStart = onStart.bind(serverController);
    sefverController.onStop = onStop.bind(serverController);
  }
  function attachEvents(){
    
  }
  function onStart(options){
    this.server = HttpServer.create(options);
  }
  function onStop(){
    this.server.kill();
  }
  return {
    create : create
  };
})();