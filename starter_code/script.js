const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
let obstacles = []
let interval;
let frames = 0;
let gameOverCount  = 0;

// Classes
class Board{
  constructor(){
    this.x=0;
    this.y=0;
    this.width  = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "./images/bg.png";
    this.img.onload = () => {
      this.draw();
    }
  }
  draw(){
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.img, this.x,this.y,this.width, this.height)
    ctx.drawImage(this.img, this.x + canvas.width,this.y, this.width, this.height)
  }
}

class Flappy{
  constructor() {
    this.x = 100;
    this.y = 150;
    this.width = 50;
    this.height= 30;
    this.img = new Image();
    this.img.src = "./images/flappy.png";
    this.img.onload = () => {
      this.draw();
    }
  }
  draw() {
    this.y++;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  flapp() {
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

// constructor
class Obstacle {
  constructor(y, height, type) {
    this.type = type;
    this.x = canvas.width + 50;
    this.y = y;
    this.width = 50;
    this.height = height;
    this.bottomPipe = new Image();
    this.bottomPipe.src = "./images/obstacle_bottom.png";
    this.topPipe = new Image();
    this.topPipe.src = "./images/obstacle_top.png"
  }
  draw(){
    this.x--;
    if (this.type) {
      ctx.drawImage(this.topPipe, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.bottomPipe, this.x, this.y, this.width, this.height);
    }
  }
}



// Variables
let flappy = new Flappy();
let board  = new Board(); 

// function handlers
function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generatePipes() {
  const max = canvas.height - 100;
  const min = 50;
  let window = 100;
  const randomHeight = Math.floor(Math.random() * (max - min));
  if (frames % 300 === 0) {
    obstacles.push(new Obstacle(0, randomHeight, true));
    obstacles.push(
      new Obstacle(randomHeight + window, canvas.height - randomHeight - window, false)
    );
  }
}

function drawPipes(){
  generatePipes()
  obstacles.forEach((pipe, i) => {
    // delete all the  pipes that are out of the screen
    if (pipe.x <= -pipe.width)  obstacles.splice(i, 1)
    pipe.draw()});
}


function checkCollition() {
  obstacles.forEach((pipe) => {
    if (flappy.isTouching(pipe)) {
      gameOver();
    }
    if (flappy.y >=canvas.height - flappy.height) {
      gameOver();
    }
  });
}

function gameOver() {
  ctx.font = '50px Courier';
  ctx.fillText('Game over', canvas.width / 2 - 150, canvas.height / 2);
  gameOverCount++;
  clearInterval(interval);
}

// Main functions
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    if (gameOverCount!==0 ) {
      obstacles = []
      frames = 0;
      gameOverCount = 0;
      interval = false;
      flappy.x = 30;
      flappy.y = 70;
      startGame();
    }
    else startGame();
  };
  
  function startGame() {
    if (interval) return;
    interval = setInterval(update, 1000 / 60);
  }

  function update(){
    frames++;
    clearCanvas();
    board.draw();
    flappy.draw();
    drawPipes();
    checkCollition();
  }
};


//listeners

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 32:
      flappy.flapp();
      break;
    // case 13:
    //   start();
    //   break;
    // case 82:
    //   restart();
    //   break;

    default:
      break;
  }
};