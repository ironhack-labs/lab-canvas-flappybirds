const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let frames = 0;
let score = 0;
let interval;
const pipes = [];
let backChange = 1

class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.back = 1;

    this.dayBack = new Image();
    this.dayBack.src = './images/background-midday-1920x1080.png'

    this.midBack = new Image();
    this.midBack.src = './images/background-day-1920x1080jpg.jpg'

    this.nightBack = new Image();
    this.nightBack.src = './images/background-night-1920x1080jpg.jpg'
  }

  draw(changeBack) {
    this.x--;
    if (this.x < -canvas.width) {
      this.x = 0;
    }
    if (changeBack === 1) {
      ctx.drawImage(this.dayBack, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.dayBack, this.x + canvas.width, this.y, this.width, this.height);
    } else if (changeBack === 2) {
      ctx.drawImage(this.midBack, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.midBack, this.x + canvas.width, this.y, this.width, this.height);
    } else if (changeBack === 3) {
      ctx.drawImage(this.nightBack, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.nightBack, this.x + canvas.width, this.y, this.width, this.height);
    }
  }
}

class Flappyoso {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = "./images/poop_alive.png";
    this.imgCrashed = new Image();
    this.imgCrashed.src = "./images/poop_crashed.png";
  }
  draw(alive = true) {
    if (alive) {
      this.y++;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.imgCrashed, this.x, this.y, this.width, this.height);
    }
  }
  fly() {
    this.y -= 20;
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
}

class Pipe {
  constructor(y, width, height, type) {
    this.x = canvas.width;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.imgTop = new Image();
    this.imgTop.src =
      "./images/obstacle_top.png";
    this.imgBot = new Image();
    this.imgBot.src =
      "./images/obstacle_bottom.png";
  }
  draw() {
    this.x--;
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height);
    }
  }
}

function drawScore() {
  if (frames % 200 === 0) {
    score += 1;
  }
  ctx.font = "24px Arial";
  ctx.fillText(`SCORE: ${score}`, canvas.width - 130, 50);
}

function generatePipes() {
  const min = 20;
  const max = 100;
  const ventanita = 100;
  const randomY = Math.floor(Math.random() * (max - min)) + ventanita;
  if (frames % 200 === 0) {
    const randomHeight = Math.floor(Math.random() * (max - min));
    pipes.push(
      new Pipe(0, 50, randomHeight, true)
    );
    pipes.push(
      new Pipe(
        randomHeight + ventanita,
        50,
        canvas.height - randomHeight,
        false
      )
    );
  }
}

function drawPipes() {
  pipes.forEach(pipe => {
    pipe.draw();
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  if (frames % 1000 === 0) {
    backChange++
    if (backChange === 4) backChange = 1
  }
  board.draw(backChange);
  flappy.draw();
  generatePipes();
  drawPipes();
  checkCollition();
  drawScore();
}

function start() {
  interval = setInterval(update, 1000 / 60);
}

function gameOver() {
  clearInterval(interval);
  flappy.draw(false);
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  const gameOverImg = document.querySelector("#game-over");
  ctx.drawImage(gameOverImg, 250, 100, 300, 200)
}

function checkCollition() {
  if (flappy.y + flappy.height > canvas.height || flappy.y < 0) {
    return gameOver();
  }
  pipes.forEach(pipe => {
    if (flappy.isTouching(pipe)) return gameOver();
  });
}

document.onkeydown = e => {
  switch (e.keyCode) {
    case 13:
      if (interval) return
      start()
    case 32:
      flappy.fly();
      break;

    default:
      break;
  }
};

ctx.fillStyle = 'black'
ctx.font = '20px Arial'
ctx.fillText('Hit Enter to START', (canvas.width - 20) / 2, 300)
const imgFlappy = document.querySelector("#fb-logo");
ctx.drawImage(imgFlappy, 250, 100, 500, 150);
const board = new Board();
const flappy = new Flappyoso(20, 100);