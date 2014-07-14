var FileHelper = (function(){
  function isDirectory(path){
    return path.indexOf(".") == -1
  }
  function removePreceedingSlash(path){
    return path[0] == "/" ?  path.substr(1) : path;
  }
  return {
    isDirectory : isDirectory,
    removePreceedingSlash : removePreceedingSlash
  };
})();