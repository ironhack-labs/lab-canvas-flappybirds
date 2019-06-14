window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function update() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.draw();
    generatePipes();
    drawPipes();
    flappy.draw();
    checkCollitions();
  }
  function startGame() {
    if (interval) return;
    interval = setInterval(update, 1000 / 60);
  }
};
