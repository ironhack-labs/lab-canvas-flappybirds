window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    const newGame = new Game();
    newGame.init();
  }

};
