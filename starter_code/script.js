var gameBoard = document.getElementById("game-board");
gameBoard.appendChild(document.createElement("canvas"));


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var game = new Game();
    game.start();
  };
};
