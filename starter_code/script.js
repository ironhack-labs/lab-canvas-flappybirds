var game;
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    document.getElementById("inicio").style.display = "none";
    game = new Game();
    document.getElementById("game-board").style.display = "block";
    game.start();
    window.addEventListener("keyup" ,spaceFunction);
  }

  
  
  
  document.getElementById("reload").onclick = function() {
    game = new Game();
    window.addEventListener("keyup" ,spaceFunction);
    document.getElementById("score").style.display = "none";
    game.start();
  };

  document.getElementById("exit").onclick = function() {
    document.getElementById("score").style.display = "none";
    document.getElementById("game-board").style.display = "none";
    //game=""
    document.getElementById("inicio").style.display = "block";
  };
};
var SPACE = 32;
function spaceFunction(event) {
  if (event.keyCode == SPACE) {
    game.player.y -= 5;
    game.player.vY -= 0.8;
  }
}