var BufferHelper = (function(){
  function concat(){
    var length = 0;
    Array.prototype.forEach.call(arguments, function(bufferPart){
      length += bufferPart.byteLength;
    });
    var buffer = new ArrayBuffer(length);
    var byteBuffer = new Uint8Array(buffer);
    var offset = 0;
      Array.prototype.forEach.call(arguments, function(bufferPart){
      byteBuffer.set(new Uint8Array(bufferPart), offset);
      offset += bufferPart.byteLength;
    });
    return buffer;
  }
  return {
    concat : concat
  };
})();