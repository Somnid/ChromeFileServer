var FileSystem = (function(){
  function getUserFolder(force){
    return new Promise(function(resolve, reject){
      chrome.storage.local.get("folderRef", function(results){
        if(results.folderRef && !force){
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
  function readFile(fileEntry){
    return new Promise(function(resolve, reject){
      fileEntry.file(function(file){
        var fileReader = new FileReader();
        fileReader.onload = function(e){
          resolve(e.target.result);
        };
        fileReader.onerror = function(e){
          reject(e);
        };
        fileReader.readAsArrayBuffer(file);
      });
    });
  }
  return {
    getUserFolder : getUserFolder,
    readFile : readFile
  };
})();