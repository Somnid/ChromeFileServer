var serverView;

document.addEventListener("DOMContentLoaded", function(){
  Util.wait(3000).then(function(){
  	serverView = ServerView.create();
  });
}, true);