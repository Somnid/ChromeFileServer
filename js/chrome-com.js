var ChromeCom = (function(){
  function create(options){
    var chromeCom = {};
    chromeCom.options = options;
    chromeCom.registry = {};
    bind(chromeCom);
    chromeCom.createChannel();
    chromeCom.attachEvents();
    return chromeCom;
  }
  function bind(chromeCom){
    chromeCom.register = register.bind(chromeCom);
    chromeCom.unregister = unregister.bind(chromeCom);
    chromeCom.emit = emit.bind(chromeCom);
    chromeCom.createChannel = createChannel.bind(chromeCom);
    chromeCom.attachEvents = attachEvents.bind(chromeCom);
    chromeCom.request = request.bind(chromeCom);
    chromeCom.requestBulk = requestBulk.bind(chromeCom);
  }
  function createChannel(){
    this.channel = chrome.runtime.connect({ name : this.options.channelName });
  }
  function attachEvents(){
    this.channel.onMessage.addListener(this.respond);
  }
  function register(name, obj){
    this.registery[name] = obj;
  }
  function unregister(name){
    delete registry[name];
  }
  function emit(request){
    this.channel.postMessage(request);
  }
  function respond(request){
    for(var key in request){
      var target = parseRequest(key);
      if(typeof(this.registry[target.name][target.method]) == "Function"){
        this.registry[target.name][target.method](request[key]);
      }
    }
  }
  function parseRequestKey(requestKey){
    var split = request.split(".");
    return {
      name : split[0],
      method : split[1]
    };
  }
  function requestBulk(request){
    this.channel.postMessage(request)
  }
  function request(route, payload){
    var message = {};
    message[route] = payload;
    this.channel.postMessage(message);
  }
  return {
    create : create
  };
})();