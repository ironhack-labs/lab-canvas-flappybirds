window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var canvas = document.getElementById("game-canvas");
    var game = new Game(canvas);
    window.requestAnimationFrame(game.startGame.bind(game));
  };
};
