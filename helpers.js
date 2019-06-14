function generatePipes() {
  if (!(frames % 300 === 0)) return;

  const ventanita = 150;
  let randomHeight = Math.floor(Math.random() * 250) + 50;

  let pipeTop = new Pipe(0, randomHeight, true);
  let pipeBottom = new Pipe(
    randomHeight + ventanita,
    canvas.height - randomHeight + ventanita
  );

  pipes.push(pipeTop, pipeBottom);
}

function drawPipes() {
  removePipes();

  pipes.forEach(pipe => pipe.draw());
}

function pipeIsOut(pipe) {
  return pipe.x + pipe.width < 0;
}

function removePipes() {
  for (let i = 0; i < pipes.length; i++) {
    if (pipeIsOut(pipes[i])) {
      pipes.splice(i, 1);
      i--;
    }
  }
}

function checkCollition() {
  let result = false;
  pipes.forEach(pipe => {
    if (bird.isTouching(pipe)) {
      result = true;
    }
  });

  return result;
}
