var Router = (function(){
  
  var defaults = {
    fsRoot : null //required
  };
  
  function create(options){
    var router = {};
    router.fsRoot = options.fsRoot;
    bind(router);
    return router;
  }
  function bind(router){
    router.route = route.bind(router);
    router.readFile = readFile.bind(router);
  }
  function route(request){
    return new Promise((resolve, reject) => {
      uri = request.uri;
      uri = FileHelper.removePreceedingSlash(uri);
      uri = FileHelper.removeQueryString(uri);
      if(FileHelper.isDirectory(uri)){
        uri += "index.html";
      }
     
      this.readFile(uri)
        .then(resolve)
				.catch(error => {
				  if(error.name == "NotFoundError"){
				    resolve(HttpHelper.notFoundResponse("Not Found :("));
				  }else{
				    reject(error);
				  }
				});
		});
  }
  function readFile(uri){
    return new Promise((resolve, reject) => {
      FileTools.readRelativeFile(this.fsRoot, uri)
        .then(file => {
				  resolve(HttpHelper.fileResponse(file.fileEntry, file.data));
				})
				.catch(error => {
				  reject(error);
				});
    });
  }
  return {
    create : create
  };
})();