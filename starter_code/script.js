window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    FlappyBirdApp.init('game-board')
  }

};