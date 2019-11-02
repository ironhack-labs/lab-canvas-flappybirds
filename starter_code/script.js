const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let interval;
let frames = 0
let obstacles = []

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    if(interval) return
    interval = setInterval(update, 1000/60)
  }

};

class Board {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image()
    this.img.src = "./images/bg.png"
    this.img.onload = () => this.draw
  }
  draw() {
    this.x--
    if (this.x == -canvas.width) this.x = 0
    ctx.drawImage(this.img, this.x, 0, this.width, this.height);
    ctx.drawImage(this.img, this.x + canvas.width, 0, this.width, this.height);
  }
}

class Flappy {
  constructor(){
    this.x = 100;
    this.y = canvas.height / 2;
    this.width = 55;
    this.height = 35;
    this.img = new Image()
    this.img.src = "./images/flappy.png"
    this.img.onload = () => this.draw
    this.gravity = 1
  }
  draw() {
    if (frames % 4 === 0) {this.gravity += 0.1}
    this.y += 1 * this.gravity
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly (){
    this.y -= 40;
    if (this.gravity >= 1.6) {this.gravity -= 0.6}
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

class Obstacle {
  constructor(y, height, type){
    this.x = canvas.width + 50
    this.y = y
    this.height = height
    this.width = 50
    this.imgTop = new Image()
    this.imgTop.src = "./images/obstacle_top.png"
    this.imgBottom = new Image()
    this.imgBottom.src= "./images/obstacle_bottom.png"
    this.type = type
  }
  draw(){
    this.x --
    if(this.type){
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    }
    else {
      ctx.drawImage(this.imgBottom, this.x, this.y, this.width, this.height)
    }
  }
}

let board = new Board()
let flappy = new Flappy()

function clear(){
  ctx.clearRect(0,0, canvas.width, canvas.height)
}

function generateObstacles() {
  const max = canvas.height - 100;
  const min = 60;
  const ventanita = 110;
  const randomHeight = Math.floor(Math.random() * (max - min));
  if (frames % 300 === 0){
    obstacles.push(new Obstacle(0, randomHeight, true))
    obstacles.push(new Obstacle(randomHeight + ventanita, canvas.height - randomHeight - ventanita, false))
  }
}

function drawObstacles(){
  obstacles.forEach((pipe) => pipe.draw())
}

function gameOver(){
  ctx.font = '30px Courier';
  ctx.fillText('Game over', 320, canvas.height / 2);
}

function checkCollition() {
  obstacles.forEach((pipe) => {
    if (flappy.isTouching(pipe)) {
      clearInterval(interval)
      gameOver();
    }
  });
  if (flappy.y <= 10 || flappy.y >= canvas.height - flappy.height) {
    clearInterval(interval)
    gameOver();
  }
}


function update() {
  frames++
  clear()
  board.draw()
  flappy.draw()
  generateObstacles()
  drawObstacles()
  checkCollition()
}

document.onkeydown = (e) => {
  switch(e.keyCode){
    case 32:
      flappy.fly()
      break;
    default:
      break;
  }
} 