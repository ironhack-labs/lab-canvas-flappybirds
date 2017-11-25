window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var canvas = document.getElementById("game");
    canvas.width = 900;
    canvas.height = 504;
    var game = new Game(canvas);
    game.draw();
  }
};