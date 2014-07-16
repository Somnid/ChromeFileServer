var HttpParser = (function(){

	function parseRequest(readInfo){
		var requestObject;
		var requestText = Util.arrayBufferToString(readInfo.data);
		sectionSplit = requestText.split("\r\n\r\n");
		requestObject = parseHttpHeader(sectionSplit[0]);
		requestObject.body = sectionSplit[1];
		return requestObject;
	}
	function parseHttpHeader(headerText){
		var headerObject;
		var headers = {};
		var lineSplit = headerText.split("\r\n");
		headerObject = parseRequestLine(lineSplit[0]);
		for(var i = 1; i < lineSplit.length; i++){
			var headerSplit = lineSplit[i].split(":");
			headers[headerSplit[0].trim()] = headerSplit[1].trim();
		}
		headerObject.header = headers;
		return headerObject;
	}
	function parseRequestLine(requestLineText){
		var requestLineObject = {};
		var requestLineSplit = requestLineText.split(" ");
		requestLineObject.method = requestLineSplit[0];
		requestLineObject.uri = requestLineSplit[1];
		requestLineObject.httpVersion = requestLineSplit[2];
		return requestLineObject;
	}

	function responseToBuffer(response){
		var responseText = "";
		responseText += getResponseLine(response) + "\r\n";
		responseText += getResponseHeaders(response) + "\r\n\r\n";
		if(response.body && typeof(response.body) == "string"){
			responseText += response.body + "\r\n\r\n";
		}
		var responseBuffer = Util.stringToArrayBuffer(responseText);
		responseBuffer
		return responseBuffer;
	}
	function getResponseLine(response){
		var responseLineText = "";
		responseLineText += response.httpVersion + " ";
		responseLineText += response.statusCode + " ";
		responseLineText += response.status;
		return responseLineText;
	}
	function getResponseHeaders(response){
		responseHeaders = [];
		for(var key in response.headers){
			responseHeaders.push(key + ": " + response.headers[key]);
		}
		return responseHeaders.join("\n");
	}

	return {
		parseRequest : parseRequest,
		responseToBuffer : responseToBuffer
	};

})();