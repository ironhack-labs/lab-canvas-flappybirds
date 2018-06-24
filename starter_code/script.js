window.onload = function() {
  background.draw();
  flappy.draw();
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
    flappy.move();
    obstacles.draw();
    obstacles.move();
    obstacles2.draw();
    obstacles2.move();
    
    score.draw();
    
    if(crash.gameover() === false){
      requestAnimationFrame(updateCanvas);
    }

  }

  function startGame() {
    document.getElementById("start-button").disabled = true; // startGame buttom, if not dissabled, makes the game goes faster and faster!
    updateCanvas();
  }

};
