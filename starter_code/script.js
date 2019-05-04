window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };
  document.getElementById("stop-button").onclick = function () {
    stopGame();
  };

  function startGame() {
    FlappyBirdApp.init('game-board')
  }

  function stopGame() {
    FlappyBirdApp.stop('game-board')
  }

};