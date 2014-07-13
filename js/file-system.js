var FileSystem = (function(){
  function getUserFolder(){
    return new Promise(function(resolve, reject){
      chrome.storage.local.get("folderRef", function(results){
        if(results.folderRef){
          retrieveFolder(results.folderRef).then(resolve);
        }else{
          askForFolder().then(resolve);
        }
      });
    });
  }
  function askForFolder(){
    return new Promise(function(resolve, reject){
      chrome.fileSystem.chooseEntry({ type : "openDirectory" }, function(entry, fileEntries){
        var entryId = chrome.fileSystem.retainEntry(entry);
        chrome.storage.local.set({ folderRef :  entryId });
        resolve(entry, entryId);
      });
    });
  }
  function retrieveFolder(id){
    return new Promise(function(resolve, reject){
      chrome.fileSystem.restoreEntry(id, function(entry){
        resolve(entry);
      });
    });
  }
  return {
    getUserFolder : getUserFolder
  };
})();