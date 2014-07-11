var Util = (function(){
	
	function arrayBufferToString(arrayBuffer, start, length){
		start = start || 0;
		length = length || arrayBuffer.byteLength;
		var dataView = new DataView(arrayBuffer, start, length);
		var newString = ""
		for(var i = 0; i < dataView.byteLength; i++){
			newString += String.fromCharCode(dataView.getUint8(start + i));
		}
		return newString;
	}
	
	function stringToArrayBuffer(string){
		var arrayBuffer = new ArrayBuffer(string.length);
		var uInt8Array = new Uint8Array(arrayBuffer);
		
		for (var i = 0; i < string.length; i++) {
			uInt8Array[i] = string.charCodeAt(i);
		}
		
		return arrayBuffer;
	}
	
	return {
		stringToArrayBuffer : stringToArrayBuffer,
		arrayBufferToString : arrayBufferToString
	};

})();