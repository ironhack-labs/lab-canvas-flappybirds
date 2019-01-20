window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    document.querySelector("#game-board").innerHTML = `<canvas id="myGame" width="700" height="500"></canvas>`
    App.init("myGame");
  }
  // startGame()
};
