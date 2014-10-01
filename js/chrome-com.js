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
    chromeCom.respond = respond.bind(chromeCom);
    chromeCom.requestBulk = requestBulk.bind(chromeCom);
    chromeCom.onDisconnect = onDisconnect.bind(chromeCom);
  }
  function createChannel(){
    console.log("!!");
    this.channel = chrome.runtime.connect({ name : this.options.channelName });
    console.log("/!!");
  }
  function attachEvents(){
    this.channel.onMessage.addListener(this.respond);
    this.channel.onDisconnect.addListener(this.onDisconnect);
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
    console.log("!");
    this.channel.postMessage(request)
  }
  function request(route, payload){
    console.log("!");
    var message = {};
    message[route] = payload;
    this.channel.postMessage(message);
  }
  function onDisconnect(e){
    console.log("Socket was closed", e, chrome.runtime.lastError);
  }
  return {
    create : create
  };
})();