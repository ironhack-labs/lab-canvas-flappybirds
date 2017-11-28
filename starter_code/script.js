window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var myGame = new Game("canvas");
    debugger;
    setInterval(function() {
      myGame.draw();
    }, 10);
  }
};
