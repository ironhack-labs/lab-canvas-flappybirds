const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let interval;
let counter =0;
let frames = 0;
const obstacles = []


const images = {
  background: './images/bg.png',
  flappy: './images/flappy.png',
  obstacleBottom: './images/obstacle_bottom.png',
  obstacleTop: './images/obstacle_top.png'
};


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    //startGame();
  };
}

class Board {
  constructor() {
    this.x = 0,
    this.y = 0,
    this.width = canvas.width,
    this.height = canvas.height, 
    this.img = new Image(),
    this.img.src = images.background
  }

  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height );
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height )
    this.x -=2
    if(this.x < -canvas.width){
      this.x = 0
    }
  }
}

class Bird {
  constructor(){
    this.speedX = 50,
    this.speedY= 0,
    this.width= 40,
    this.height = 40,
    this.birdImg = new Image(),
    this.birdImg.src = images.flappy
  }

  draw(){
    ctx.drawImage(this.birdImg, this.speedX,this.speedY, this.width, this.height)
    this.speedY +=2
    
  }

  gravity(){
    this.speedY -=25
  }

  pipeTouch(pipe){
    return( this.speedX < pipe.x + pipe.width && this.speedX + this.width > pipe.x 
      && this.speedY < pipe.y + pipe.height && this.speedY + this.height > pipe.y)
  }
}

class Pipes {
  constructor(y,height,imgType){
    this.x = canvas.width,
    this.y = y,
    this.width = canvas.width / 5,
    this.height = height,
    this.pipeBot = new Image(),
    this.pipeTop = new Image(),
    this.pipeBot.src = images.obstacleBottom,
    this.pipeTop.src = images.obstacleTop,
    this.imgType = imgType
  }

  draw(){
    this.x -= 1
    if(this.imgType){
      ctx.drawImage(this.pipeTop, this.x, this.y, this.width, this.height)
      
    }else {
      ctx.drawImage(this.pipeBot, this.x, this.y, this.width, this.height)
    }
  }
}


const startBoard = new Board();
const bird = new Bird();

function startGame() {
  startBoard.draw()
  bird.draw()
}

function update() {
  frames += 1
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  startBoard.draw()
  bird.draw()
  //bird.gravity()
  generatePipes()
  drawPipes()
  checkCrashes()
  score()
  }


function generatePipes(){
  if(frames % 300 === 0){
   const min = 100
   const max = 250
   const spaceBetween = 100
   const randomHeight = Math.floor(Math.random() * (max - min)) + min
   obstacles.push(new Pipes(0,randomHeight,true))
   obstacles.push(new Pipes(randomHeight + spaceBetween, canvas.height - randomHeight, false))
  }
//console.log(obstacles)
}

function drawPipes(){
  obstacles.forEach( pipe => pipe.draw())
}

function checkCrashes(){
  if(bird.speedY >= canvas.height - bird.height ) return gameOver()
  obstacles.forEach((pipe,i) => {
    if(pipe.x + pipe.width <= 0){
      points()
      obstacles.splice(i, 1)
    }
    bird.pipeTouch(pipe) ? gameOver() : null
  })
}

function points (){
  return counter += 0.5
}

function gameOver(){
  clearInterval(interval)
}

function start(){
  interval = setInterval(update, 1000 / 60);
  
}

function score(){
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(counter, 100, 50);
}

start()

document.addEventListener('keydown', ({keyCode}) => {

if(keyCode == 32) {
  bird.gravity();
  
}
})



