const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let frames = 0;
let board;
let start = false;
let interval;
let score = 0;
const obstacles = [];

const images = {
  background: "./images/bg.png",
  character: "./images/flappy.png",
  obstacleBottom: "./images/obstacle_bottom.png",
  obstacleTop: "./images/obstacle_top.png"
};

const scoreTable = new Image();
scoreTable.src = images.scoreTable;
const ironhack = new Image();
ironhack.src = images.ironhack;

class Board {
  constructor() {
    (this.x = 0),
      (this.y = 0),
      (this.width = canvas.width),
      (this.height = canvas.height),
      (this.img = new Image());
    this.img.src = images.background;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height
    );
    //Se llama la funcion 2 veces para que cuando la imagen termine imprima otra y se obtenga el efecto carrusel
  }
}

class Flappy {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = images.character;
  }
  draw() {
    this.y += 3;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  fly() {
    this.y -= 25;
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
const flappy = new Flappy();

class Obstacle {
  constructor(y, width, height, imgType) {
    this.x = canvas.width;
    this.y = y;
    this.height = height;
    this.width = canvas.width / 5;
    this.img = new Image();
    this.img2 = new Image();
    this.img.src = images.obstacleBottom;
    this.img2.src = images.obstacleTop;
    this.imgType = imgType;
  }
  draw() {
    this.x--;
    if (this.imgType) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.img2, this.x, this.y, this.width, this.height);
    }
  }
}

function createObstacle() {
  if (frames % 300 === 0) {
    const min = 100;
    const max = 300;
    const randomObstaclesHeight =
      Math.floor(Math.random() * (max - min + 1)) + min;
    const randomWindow = Math.floor(Math.random() * (250 - 125)) + 125;
    const randomObstacleWidth = Math.floor(Math.random() * (110 - 50)) + 50;
    obstacles.push(
      new Obstacle(0, randomObstacleWidth, randomObstacleHeight, false)
    );
    obstacles.push(
      new Obstacle(
        randomObstacleHeight + randomWindow,
        randomObstacleWidth,
        canvas.height - randomObstaclesHeight,
        true
      )
    );
  }
}

function drawObstacle() {
  obstacles.forEach(obstacle => obstacle.draw());
}

function drawScore() {
  ctx.drawImage(scoreTable, 20, 18, 180, 60);
  ctx.font = "30px Arial";
  ctx.fillStyle = "#0a0a0a";
  ctx.textAlign = "center";
  if (frames % 300 === 0) {
    score += 5;
  }
  ctx.fillText(`${score}`, 110, 58);
}

function checkCollisions() {
  if (flappy.y >= canvas.height - flappy.height) return gameOver();
  obstacles.forEach((pipe, i) => {
    if (obstacle.x + obstacle.width <= 0) {
      obstacles.splice(i, 1);
    }
    flappy.isTouching(obstacle) ? gameOver() : null;
  });
}

function startGame() {
  document.querySelector(".logo").setAttribute("style", "width:10%");
  document.querySelector("#start-button").innerText = "Try Again";
  board = new Board();
  start = true;
  flappy.x = 350;
  flappy.y = 250;
  score = 0;
  frames = 0;
  interval = setInterval(update, 1000 / 60);
}

function gameOver() {
  crash.play();
  clearInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  obstacles.splice(0, obstacles.length);
  ctx.drawImage(scoreTable, 270, 50, 360, 404);
  ctx.font = "40px Arial";
  ctx.fillStyle = "#0a0a0a";
  ctx.textAlign = "center";
  ctx.fillText(`Your Final Score`, 450, 150);
  ctx.font = "62px Arial";
  ctx.fillText(`${score}`, 450, 250);
  ctx.drawImage(ironhack, 360, 245, 180, 180);
  start = false;
}

function update() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  flappy.draw();
  createObstacle();
  drawObstacle();
  drawScore();
  checkCollisions();
}

document.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      flappy.fly();
  }
});

document.getElementById("start-button").onclick = function() {
  if (!start) {
    startGame();
  }
};
