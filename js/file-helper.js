var FileHelper = (function(){
  function isDirectory(path){
    return path.indexOf(".") == -1
  }
  function removePreceedingSlash(path){
    return path[0] == "/" ?  path.substr(1) : path;
  }
  function removeQueryString(path){
    return path.split("?")[0];
  }
  function getExtension(path){
		var split = path.split(".");
		return split[split.length - 1];
	}
  return {
    isDirectory : isDirectory,
    removePreceedingSlash : removePreceedingSlash,
    removeQueryString : removeQueryString,
    getExtension : getExtension
  };
})();