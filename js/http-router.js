var Router = (function(){
  function create(options){
    var router = {};
    router.fsRoot = options.fsRoot;
    bind(router);
    return router;
  }
  function bind(router){
    router.route = route.bind(router);
  }
  function route(uri){
    return new Promise(function(resolve, reject){
      uri = FileHelper.removePreceedingSlash(uri);
      if(FileHelper.isDirectory(uri)){
        uri += "index.html";
      }
      this.fsRoot.getFile(uri, { create : false }, function(fileEntry){
				FileSystem.readFile(fileEntry).then(function(data){
				  resolve(HttpHelper.fileResponse(fileEntry, data));
				});
			},function(error){
				if(error.name == "NotFoundError"){
				  resolve(HttpHelper.notFoundResponse("Not Found :("));
				}
				reject(error);
			});
		}.bind(this));
  }
  return {
    create : create
  };
})();