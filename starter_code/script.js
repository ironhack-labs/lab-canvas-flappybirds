window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function update() {
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    flappy.draw()
    generatePipes()
    drawPipes()
    checkCollitions()

  }

  function startGame() {
    ///if para que no aunmente velocida de juego con boton de inicio
    if (interval) return
    interval = setInterval(update, 1000 / 60)
  }

};