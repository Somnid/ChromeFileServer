var chromep = {}

chromep.runtime = (function(){

  function sendMessage(extensionId, message, options){
    return new Promise(function(resolve, reject){
      chrome.runtime.sendMessage(extensionId, message, options, function(response){
        resolve(response);
      });
    });
  }

  return {
    sendMessage : sendMessage
  };

})();

chromep.tabs = (function(){

  function executeScript(tabId, injectDetails){
    return new Promise(function(resolve, reject){
      chrome.tabs.executeScript(tabId, injectDetails, function(result){
        resolve(result);
      });
    });
  }

  function get(tabId){
    return new Promise(function(resolve, reject){
      chrome.tabs.get(tabId, function(tab){
        resolve(tab);
      })
    });
  }

  function getCurrent(){
    return new Promise(function(resolve, reject){
      chrome.tabs.getCurrent(function(tab){
        resolve(tab);
      })
    });
  }

  return {
    get : get,
    getCurrent : getCurrent,
    executeScript : executeScript
  }
})();

chromep.storage = (function(){

  var sync = (function(){
    
  })();
  
  var local = (function(){
    function get(keys){
      return new Promise(function(resolve, reject){
        chrome.storage.local.get(keys, function(items){
          resolve(items);
        });
      });
    }
    function set(keys){
      return new Promise(function(resolve, reject){
        chrome.storage.local.set(items, function(){
          resolve();
        });
      });
    }
    return {
      set : set,
      get : get
    };
  })();
  
  var managed = (function(){
    
  })();

  return {
    sync : sync,
    local : local,
    managed : managed
  };

})();