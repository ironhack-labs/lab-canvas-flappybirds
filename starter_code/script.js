window.onload = function() {
  document.getElementById("start-button").onclick = function(e) {
    document.activeElement.blur(); //quita foco
    startGame();

  };

  var gameLogic = new GameLogic();

  
  function startGame() {
    gameLogic.init();
  }

};
