const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

class Board {
  constructor() {
    this.img = new Image();
    this.img.src = './images/bg.png';
    this.y = 0;
    this.x = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.speed = 1;
    this.interval = undefined;
    this.frames = 100;
    this.img.onload = () => {
      this.draw();
      this.loadScreen();
    };
  }
  clean() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw() {
    this.x--;
    if (this.x < -this.width) this.x = 0;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
  }
  loadScreen() {
    const logo = new Image();
    logo.src = './images/logo.png';
    ctx.drawImage(logo, 100, 60, 300, 100);
    ctx.font = '30px Samanata';
    ctx.fillText('Press start', 160, 200);
    ctx.font = '30px Samanata';
    ctx.fillText('And use x to jump!', 110, 230);
  }
  gameOver() {
    clearInterval(this.interval);
  }
  ruler() {
    canvas.addEventListener('mousedown', function (clientX) {
      let rect = canvas.getBoundingClientRect();
      let clickX = event.clientX - rect.left;
      let clickY = event.clientY - rect.top;
      console.log(`clicked on (${Math.floor(clickX)},${Math.floor(clickY)})`);
    });
  }
}

class Flappy {
  constructor() {
    this.x = 75;
    this.y = 150;
    this.img = new Image();
    this.img.src = './images/flappy.png';
    this.height = 35;
    this.width = 50;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.y + this.height >= canvas.height ? (this.y = canvas.height - this.height) : (this.y += 2);
  }
  fly() {
    this.y -= 30;
  }
  crash(obstacle) {
    if (
      obstacle.x < this.x + this.width &&
      obstacle.x + obstacle.width > this.x &&
      obstacle.lowerY < this.y + this.height &&
      obstacle.height + obstacle.lowerY > this.y
    )
      return true;
    else if (
      obstacle.x < this.x + this.width &&
      obstacle.x + obstacle.width > this.x &&
      obstacle.upperY < this.y + this.height &&
      obstacle.height + obstacle.upperY > this.y
    )
      return true;
  }
}

class Pipe {
  constructor() {
    this.width = 70;
    this.height = 500;
    this.upperimg = new Image();
    this.upperimg.src = './images/obstacle_top.png';
    this.lowerimg = new Image();
    this.lowerimg.src = './images/obstacle_bottom.png';
    this.score = 0;
    this.pipesOnScreen = [{}];
    this.x = canvas.width;
    this.lowerY = undefined;
    this.upperY = undefined;
  }

  draw() {
    this.x--;
    ctx.drawImage(this.lowerimg, this.x, this.lowerY, this.width, this.height);
    ctx.drawImage(this.upperimg, this.x, this.upperY, this.width, this.height);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  randomWindow() {
    let p1 = 0,
      p2 = 0;
    while (p2 < 10) {
      p1 = this.randomNumber(70, canvas.height - 10);
      p2 = this.randomNumber(0, p1 - 100);
    }
    this.lowerY = p1;
    this.upperY = p2 - this.height;
  }
}

// Instances
const board = new Board(canvas);
const flappy = new Flappy();

// Aux variables
let pipesOnScreen = [];
let frames = 0;
let points = 0;
board.ruler(canvas);

// Listeners
document.addEventListener('keydown', ({ keyCode }) => {
  if (keyCode === 88) flappy.fly();
});
window.onload = () => {
  document.getElementById('start-button').onclick = () => startGame();
};

// main functions
const startGame = () => {
  if (board.interval) {
    window.location.reload();
    return;
  }
  document.getElementById('start-button').innerText='restart';
  board.interval = setInterval(updategame, 1000 / 60);
};

const updategame = () => {
  frames++;
  board.clean();
  board.draw();
  flappy.draw();
  if (flappy.y + flappy.height >= canvas.height) board.gameOver();
  if (frames % 250 === 0) {
    const pipe = new Pipe();
    pipe.randomWindow();
    pipesOnScreen.push(pipe);
  }

  pipesOnScreen.forEach((pipe) => {
    if (pipe.x + pipe.width <= 0) {
      pipesOnScreen.shift();
      points++;
    }
    pipe.draw();
    if (flappy.crash(pipe)) board.gameOver();
  });

  ctx.font = '9px Samanata';
  ctx.fillText(`points: ${points}`, 20, 20);
};
