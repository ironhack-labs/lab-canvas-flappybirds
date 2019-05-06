window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    document.getElementById("game-board").className = "display";
    Game.init("canvas");
  }
};
