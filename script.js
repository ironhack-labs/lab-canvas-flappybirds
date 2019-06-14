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
    generatePipes();
    drawPipes();
    score.draw();
    if (!bird.isInLimits() || checkCollition()) {
      gameOver();
    }  
  }

  function startGame() {
    if (interval) return;

    scenario = new Board();
    bird = new Bird();
    score = new Score();
    frames = 0;
    pipes = [];
    animateHelper = 0;

    interval = setInterval(update, 1000 / 60);
  }

  function gameOver() {
    clearInterval(interval);
    interval = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scenario.draw();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.font = "70px Arial";
    ctx.strokeText(`Game Over!!!`, 200, 100);
    ctx.strokeText(`Your final score is ${frames}`, 100, 170);
  }
};
