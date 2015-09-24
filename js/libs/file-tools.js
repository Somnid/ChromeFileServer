var FileTools = (function(){
  
  function readRelativeFile(root, path){
    return new Promise(function(resolve, reject){
      root.getFile(uri, { create : false }, function(fileEntry){
        readFile(fileEntry)
          .then(resolve);
      },function(error){
				reject(error);
			});
    });
  }
  
  function readFile(fileEntry){
    return new Promise(function(resolve, reject){
      fileEntry.file(function(file){
        var fileReader = new FileReader();
        fileReader.onload = function(e){
          resolve({ data : e.target.result, fileEntry : file });
        };
        fileReader.onerror = function(e){
          reject(e);
        };
        fileReader.readAsArrayBuffer(file);
      });
    });
  }
  
  return {
    readRelativeFile : readRelativeFile,
    readFile : readFile
  };
  
})();