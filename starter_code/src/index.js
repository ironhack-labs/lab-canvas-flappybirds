window.onload = function() {

  var started = false

  var gameBoard = document.getElementById("game-board")
  var newCanvas = document.createElement("canvas")
  newCanvas.setAttribute("id","flappy-canvas")
  gameBoard.appendChild(newCanvas)

  document.getElementById("start-button").onclick = function() {
    if (!started){
      startGame()
      started = true
    }
  };

  function startGame() {
    Game.init("flappy-canvas")
  }

};
