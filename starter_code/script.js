window.onload = function() {
  var game = new Game("canvas-fb",900,500);
  game.draw();
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var game = new Game("canvas-fb",900,500);
    game.draw();

  }

};
