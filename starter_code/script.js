window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var myCanvas = new Canvas("myCanvas");
    myCanvas.drawBackground();
  }

};
