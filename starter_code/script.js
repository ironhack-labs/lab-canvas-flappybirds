
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
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
    startGame();
   
   
  };
}

class Board {
  constructor() {
    this.x = 0,
    this.y = 0,
    this.width = canvas.width,
    this.heigth = canvas.height, //this can generate a mistake
    this.img = new Image(),
    this.img.src = images.background
  }

  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth );
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.heigth )
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
    this.heigth = 40,
    this.birdImg = new Image(),
    this.birdImg.src = images.flappy
  }

  draw(){
    ctx.drawImage(this.birdImg, this.speedX,this.speedY, this.width, this.heigth)
    this.speedY +=2
    
  }

  gravity(){
    this.speedY -=20
  }

}

class Pipes {
  constructor(y,heigth,imgType){
    this.x = canvas.width,
    this.y = y,
    this.width = canvas.width / 5,
    this.heigth = heigth,
    this.pipeBot = new Image(),
    this.pipeTop = new Image(),
    this.pipeBot.src = images.obstacleBottom,
    this.pipeTop.src = images.obstacleTop,
    this.imgType = imgType
  }

  draw(){
    this.x -= 1
    if(this.imgType){
      ctx.drawImage(this.pipeTop, this.x, this.y, this.width, this.heigth)
      
    }else {
      ctx.drawImage(this.pipeBot, this.x, this.y, this.width, this.heigth)
    }
  }
}


const startBoard = new Board();
const bird = new Bird();

function startGame() {
  startBoard.draw()
  bird.draw()
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
console.log(obstacles)
}

function drawPipes(){
  obstacles.forEach( pipe => pipe.draw())
}


function update() {
frames += 1
//ctx.clearRect(0, 0, canvas.width, canvas.height)
startBoard.draw()
bird.draw()
//bird.gravity()
generatePipes()
drawPipes()


}

function start(){
  interval = setInterval(update, 1000 / 60);
}



document.addEventListener('keydown', ({keyCode}) => {

if(keyCode == 32) {
  bird.gravity();
  
}
})

start()

