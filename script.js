window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function update() {
    frames++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scenario.draw();

    bird.draw();

    if (!bird.isInLimits() || checkCollition()) {
      // gameOver();
    }

    generatePipes();
    drawPipes();
  }

 

 
};

function startGame() {
  if (interval != 0) return;

  scenario = new Board();
  bird = new Bird();
  frames = 0;
  pipes = [];
  animateHelper = 0;

  interval = setInterval(update, 1000 / 60);
  canvas.addEventListener("keydown", keyDown);
}
function gameOver() {
  canvas.removeEventListener("keydown", keyDown);
  clearInterval(interval);
  interval = 0;
}