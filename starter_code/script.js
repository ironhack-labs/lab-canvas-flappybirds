window.onload = function() {
  var game = new Game();
  document.getElementById("start-button").onclick = function(){
    game.start();
  }
};
