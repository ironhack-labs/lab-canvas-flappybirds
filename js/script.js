// Window = {...methods, properties}
window.onload = function() {
  const bg = new Background(canvas.width , canvas.height )

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    // Ejecutar update game
    
    updateGame()
  }

  function updateGame(){
    // .clearRect (x,y,width, height)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    bg.update()
    requestAnimationFrame(updateGame)
    
  }
};


