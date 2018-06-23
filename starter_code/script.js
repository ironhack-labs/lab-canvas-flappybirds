var game;
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    document.getElementById("inicio").style.display = "none";
    game = new Game();
    document.getElementById("game-board").style.display = "block";
    game.start();
  }

  window.onkeyup = function(event) {
    if (event.keyCode == SPACE) {
      game.player.y -= 5;
      game.player.vY -= 0.8;
    }
  }.bind(this);
  var SPACE = 32;
  document.getElementById("reload").onclick = function() {
    game = new Game();
    document.getElementById("score").style.display = "none";
    game.start();
  };

  document.getElementById("exit").onclick = function() {
    document.getElementById("score").style.display = "none";
    document.getElementById("game-board").style.display = "none";
    document.getElementById("inicio").style.display = "block";
  };
};
