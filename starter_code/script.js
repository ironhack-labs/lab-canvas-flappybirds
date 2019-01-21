window.onload = function() {
  document.getElementById("start-button").onclick = function(e) {
       startGame();
  };

  var game = new Game();

  function startGame (){
    game.init();
  }
  startGame()
};


