window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
};

function startGame() {
  let flappyImg = document.getElementById("flappyImg"),
    startButton = document.getElementById("start-button");

  flappyImg.style.display = "none";
  startButton.style.display = "none";
  inicio = setInterval(update, 1000 / 60);
}
var inicio;
const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  gravity = 2,
  obstacles = [];

let frames = 0,
  currentFrame = 0;

canvas.height = 500;
canvas.width = 900;

class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = canvas.width;
    this.h = canvas.height;

    this.img = new Image();
    this.img.src = "./images/bg.png";
    this.img.onload = this.draw();
  }
  draw() {
    ctx.drawImage(this.img, this.x--, this.y, this.w, this.h);
    if (this.x <= -900) {
      this.x = 0;
    }
    this.x--;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
  }
}

class Faby {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./images/flappy.png";
    this.img.onload = this.draw();
  }
  draw() {
    if (this.y < canvas.height - this.h) {
      this.y += gravity;
    }
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  move() {
    if (this.y >= 15) this.y -= 50;
  }
  crashWith(obstacle) {
    console.log(
      this.x < obstacle.x + obstacle.w &&
        this.x + this.w / 4 > obstacle.x + 10 &&
        this.y < obstacle.y + obstacle.h - 25 &&
        this.y + (this.h - 25) > obstacle.y
    );
    return (
      this.x < obstacle.x + obstacle.w &&
      this.x + this.w / 4 > obstacle.x + 10 &&
      this.y < obstacle.y + obstacle.h - 25 &&
      this.y + (this.h - 25) > obstacle.y
    );
  }
}

class Pipes {
  constructor(x, y, w, h, isTop) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = isTop
      ? "./images/obstacle_top.png"
      : "./images/obstacle_bottom.png";
    this.img.onload = this.draw();
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

var board = new Board();
var faby = new Faby(150, 100, 50, 50);

function updateObstacles() {
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].x += -1;
    obstacles[i].draw();
  }
  if (frames % 300 === 0) {
    var x = canvas.width;
    var minHeight = 100;
    var maxHeight = 180;
    var height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    obstacles.push(new Pipes(x, 0, 50, height, true));
    obstacles.push(new Pipes(x, canvas.height - height, 50, height, false));
  }
}

function checkCollition() {
  obstacles.forEach(e => {
    if(faby.crashWith(e)) {
      console.log("choque");
      gameOver();
    }
  })
}
function gameOver() {
  clearInterval(inicio);
  ctx.font = "60px Avenir";
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER", 270, 220);
  ctx.font = "40px Avenir";
  ctx.fillText("presiona 'espacio' para reinicar", 200, 260);
}

function update() {
  if (frames % 7 === 0) {
    currentFrame = ++currentFrame % 10;
  }
  frames++;
  board.draw();
  faby.draw();
  updateObstacles();
  checkCollition();
}

window.addEventListener("keydown", e => {
  if (e.keyCode === 32) faby.move();

 if (gameOver && e.keyCode === 32) location.reload();

});



update();
