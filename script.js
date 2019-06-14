window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    canvas.focus();
    startGame();
  };

  function update() {
    frames++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scenario.draw();

    bird.draw();

    if (!bird.isInLimits() || checkCollition()) {
      gameOver();
    }

    generatePipes();
    drawPipes();
  }
  function startGame() {
    if (interval) return;
    
    scenario = new Board();
    bird = new Bird();
    frames = 0;
    pipes = [];
    animateHelper = 0;

    interval = setInterval(update, 1000 / 60);
  }

  function gameOver() {
    clearInterval(interval);
    interval = 0; 
  }
};
