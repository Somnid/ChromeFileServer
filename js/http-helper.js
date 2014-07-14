var HttpHelper= (function(){

	function okResponse(body){
	  body = body || "";
		var response = {};
		response.httpVersion = "HTTP/1.1";
		response.statusCode = 200;
		response.status = "OK";
		response.headers = {
			"Content-Type" : "text/html; charset=utf-8",
			"Content-Length" : body.length,
			"Date" : (new Date()).toString() //"Thu, 06 Feb 2014 20:26:35 GMT"
		};
		response.body = body;
		return response;
	}

	function notFoundResponse(body){
	  body = body || "";
	  var response = {};
		response.httpVersion = "HTTP/1.1";
		response.statusCode = 404;
		response.status = "Not Found";
		response.headers = {
			"Content-Type" : "text/html; charset=utf-8",
			"Content-Length" : body.length,
			"Date" : (new Date()).toString() //"Thu, 06 Feb 2014 20:26:35 GMT"
		};
		response.body = body;
		return response;
	}

	function serverErrorResponse(body){
	  body = body || "";
	  var response = {};
		response.httpVersion = "HTTP/1.1";
		response.statusCode = 500;
		response.status = "Server Error";
		response.headers = {
			"Content-Type" : "text/html; charset=utf-8",
			"Content-Length" : body.length,
			"Date" : (new Date()).toString() //"Thu, 06 Feb 2014 20:26:35 GMT"
		};
		response.body = body;
		return response;
	}

	return {
		okResponse : okResponse,
		notFoundResponse : notFoundResponse,
		serverErrorResponse : serverErrorResponse
	};

})();