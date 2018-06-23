window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d"); 

  function updateCanvas() {
    background.move();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    flappy.draw();
    requestAnimationFrame(updateCanvas);
  }

  function startGame() {
    updateCanvas();
  }

};
