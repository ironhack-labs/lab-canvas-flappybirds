const images =  {
  bg: 'images/bg.png',
  flappy: 'images/flappy.png',
  logo: 'images/logo.png',
  bottomPipe: 'images/obstacle_bottom.png',
  topPipe: 'images/obstacle_top.png'
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0;
let obstacles = [];
let scoreCount = 0;



window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    if (interval) return;
    interval =  setInterval(update, 100 / 60);
  }

};

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollition() {
  obstacles.forEach((pipe) => {
    if (player.isTouching(pipe)) {
      gameOver();
    }
    if (player.y >= canvas.height - player.height) {
      gameOver();
    }
  });
}

function gameOver() {
  ctx.font =  '30px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
  clearInterval(interval);
}

function generatePipes() {
  const max  = canvas.height - 100;
  const min = 50;
  const space = 100;
  const randomHeight = Math.floor(Math.random() * (max - min));
  if(frames % 300 === 0) {
    obstacles.push(new Obstacle(0, randomHeight, true));
    obstacles.push(new Obstacle(randomHeight + space, canvas.height - randomHeight - space, false));
  }
}

function drawPipes() {
  generatePipes();
  obstacles.forEach((pipe) => pipe.draw());
}

function score() {
  if(frames > 1100 ){
    if(frames % 300 === 0){
      scoreCount++;
    }
  }
  ctx.font =  '30px Arial';
  ctx.fillText(`Score: ${scoreCount}`, canvas.width / 2 - 80, canvas.height - 50);
}

function start() {
  // si ya se habia ejecutado el juego, no lo dejes entrar despues
  if (interval) return;
  interval = setInterval(update, 1000 / 60);
}

function restart() {
  interval = false;
  player.x = 30;
  player.y = 70;
  start();
}

function update() {
  frames++;
  clearCanvas();
  board.draw();
  player.draw();
  drawPipes();
  checkCollition();
  score();
}




