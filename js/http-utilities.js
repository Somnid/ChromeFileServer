var HttpUtilities = (function(){

	function okResponse(body){
		var response = {};
		response.httpVersion = "HTTP/1.1";
		response.statusCode = 200;
		response.status = "OK";
		response.headers = {
			"Content-Type" : "text/html; charset=utf-8",
			"Content-Length" : body.length,
			"Date" : (new Date()).toString(), //"Thu, 06 Feb 2014 20:26:35 GMT"
			"Connection" : "keep-alive"
		};
		response.body = body;
	}

	return {
		okResponse : okResponse
	};

})();