window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    document.getElementById('start-button').onclick = null
  };

  function startGame() {
    var game = new Game("canvas");
    game.start()
  }
};
