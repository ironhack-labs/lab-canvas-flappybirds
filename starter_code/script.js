window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
      interval = setInterval(update, 1000 / 60);   
  }
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let frames = 0;
let pipes = [];
let score = 0;


class Flappy {
  constructor() {
    this.width = 50
    this.height = 40
    this.y = 80
    this.x = 150
    this.img = new Image()
    this.img.src = "images/flappy.png"
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  } 
  fly(){
    if(this.y >= 0){
      this.y -= 40;
    } 
  }
  gravity(){
    if(this.y < canvas.height-50){
      this.y += 2;
    }
  }
  crash(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}

class Board{
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "images/bg.png";
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.x-=10;
    if (this.x < -canvas.width){
      this.x = 0;
    } else{
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
    }
  }
}

class Pipe {
  constructor(y, height, type) {
    this.x = canvas.width + 50;
    this.y = y;
    this.height = height;
    this.width = 50;
    this.pipeTop = new Image();
    this.pipeTop.src = 'images/obstacle_top.png';
    this.pipeBot = new Image();
    this.pipeBot.src = 'images/obstacle_bottom.png';
    this.type = type;
  }
  draw() {
    this.x-=5;
    if (this.type) {
      ctx.drawImage(this.pipeTop, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.pipeBot, this.x, this.y, this.width, this.height);
    }
  }
}

function generatePipes() {
  const max = canvas.height - 100;
  const min = 50;
  const gap = 100;
  const randomHeight = Math.floor(Math.random() * (max - min));
  if (frames % 50 === 0) {
    pipes.push(new Pipe(0, randomHeight, true));
    pipes.push(
      new Pipe(randomHeight + gap, canvas.height - randomHeight - gap, false)
    );
  }
}

function drawPipes() {
  generatePipes();
  pipes.forEach((pipe) => pipe.draw());
}

function checkColitions() {
  pipes.forEach((pipe) => {
    if (flappy.crash(pipe)) {
      clearInterval(interval)
      ctx.font = '30px Arial'
      ctx.fillStyle = 'red'
      ctx.fillText(' Game Over', 260 , 160)
      ctx.fillText(`Final score: ${score}`,260,190)
    }
  })
}

const board = new Board()
const flappy = new Flappy()
const pip = new Pipe()

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 38:
      flappy.fly()
      break;
  }
}

function pipeLeft(){
  pipes.forEach((pipe) => {
    if(pipe.x===0){
      score += 0.5
    }  
  }
  ); 
}

function Score(){
    ctx.font = '30px Arial'
    ctx.fillStyle = 'Black'
    ctx.fillText(`Score: ${score}`, 2, 25)
}


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  frames++;
  clearCanvas();
  board.draw();
  Score()
  flappy.draw();
  flappy.gravity();
  drawPipes()
  pipeLeft()
  checkColitions()
  
}
