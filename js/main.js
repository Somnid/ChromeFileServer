document.addEventListener("DOMContentLoaded", function(){
  ServerView.create();
}, true);

function getStuff(url) {
    FileSystem.getUserFolder().then(function(entry) {
        entry.getFile(url, {create: false}, function(file) {
            console.log(file);
        }, function(error) {
            console.log(error);
        });
    })
}

function showStuff(url) {
    FileSystem.getUserFolder().then(function(entry) {
      reader = entry.createReader();
      reader.readEntries(function(results){
        console.log(results);
      });
    });
}