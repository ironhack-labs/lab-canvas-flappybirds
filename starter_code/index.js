window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var game = new Game("container", 800, 400);
    game.startGame();
  };
};