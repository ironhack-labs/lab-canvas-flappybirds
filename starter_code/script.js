window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();

  };
  function update(){
    frames++//update tiene que aumentar los frames
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    flappy.draw()
    generatePipes()
    drawPipes()
    checkCollition()
  }
  function startGame() {
    if(interval) return
    interval = setInterval(update,1000/60)//funcion que le dice que tiene que estra refrescando nuestro juego 60 veces cada segundo o 1000 milisegundos
  }

};
