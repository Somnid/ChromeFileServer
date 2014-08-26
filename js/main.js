document.addEventListener("DOMContentLoaded", function(){
  var chromeCom = ChromeCom.create();
  chromeCom.register(ServerView.create());
}, true);