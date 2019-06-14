function generatePipes() {
  if (!(frames % 300 === 0)) return;
  const space = 150;
  let randomHeight = Math.floor(Math.random() * 250) + 50;
  let pipeTop = new Pipe(0, randomHeight, true);
  let pipeBot = new Pipe(
    randomHeight + space,
    canvas.height - (randomHeight + space),
    false
  );
  pipes.push(pipeTop);
  pipes.push(pipeBot);
}

function drawPipes() {
  pipes.map(pipe => {
    pipe.draw();
  });
}

function checkCollitions() {
  if (flappy.y < 0 || flappy.y > canvas.height - flappy.height) {
    gameOver();
  }
  pipes.forEach(pipe => {
    if (flappy.isTouching(pipe)) gameOver();
  });
}

function gameOver() {
  clearInterval(interval);
  interval = 0;
}
