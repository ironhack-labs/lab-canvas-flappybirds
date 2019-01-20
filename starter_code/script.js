window.onload = function() {
  var game = new Game("#canvas");

  // // comentar esta linea
  // setInterval(function() {
  //   startGame();
  // }, 10);
  // termina comentar

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    game.drawBackground();
    game.player.setListeners();
  


  }
}