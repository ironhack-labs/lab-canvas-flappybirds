const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames=0;
let board;
let start=false;
let interval
let score=0;
const obstacles = []

const images = {
  bg: './images/bg.png', flappy: './images/flappy.png',
  logo: './images/logo.png', obstacle_bot: './images/obstacle_bottom.png',
  obstacle_top: './images/obstacle_top.png', scoreTable: './images/scoreTable.png',
  ironhack: './images/ironhack.png'
}

const scoreTable=new Image()
scoreTable.src=images.scoreTable;
const ironhack=new Image()
ironhack.src=images.ironhack;

const crash=new Audio('./audio/crash.mp3')
const backAudio=new Audio('./audio/backAudio.mp3')
backAudio.loop=true;

class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.bg
    this.img.onload = () => {
    this.draw()
    }
  }
  draw() {
    this.x--
    if (this.x < -canvas.width) this.x = 0
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.img,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height
    )
  }
}

class Flappy {
  constructor() {
    this.x = 350
    this.y = 250
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = images.flappy
  }
  draw() {
    this.y += 3
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly() {
    this.y -= 60
  }
  isTouching(pipe) {
    return (
      this.x < pipe.x + pipe.width &&
      this.x + this.width > pipe.x &&
      this.y < pipe.y + pipe.height &&
      this.y + this.height > pipe.y
    )
  }
}
const flappy=new Flappy()

class Pipe {
  constructor(y, width,height, imgType) {
    this.x = canvas.width
    this.y = y
    this.height = height
    this.width = width
    this.img = new Image()
    this.img2 = new Image()
    this.img.src = images.obstacle_bot
    this.img2.src = images.obstacle_top
    this.imgType = imgType
  }
  draw() {
    this.x--
    if (this.imgType) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
    }
  }
}

function createObstacles(){
  if (frames % 300 === 0) {
    const min = 100
    const max = 300
  //  const window = 200
    const randomPipeHeight= Math.floor(Math.random() * (max - min + 1)) + min;
    const randomWindow = Math.floor(Math.random() * (250 - 125)) + 125;
    const randomPipeWidth=Math.floor(Math.random() * (110 - 50)) + 50;
    obstacles.push(new Pipe(0,randomPipeWidth, randomPipeHeight, false))//AQUI ME QUEDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    obstacles.push(
      new Pipe(randomPipeHeight + randomWindow,randomPipeWidth, canvas.height - randomPipeHeight, true)
    )
  }
}

document.getElementById("start-button").onclick = function() {
  if(!start){
  startGame();
  }
};

function drawPipe() {
  obstacles.forEach(pipe => pipe.draw())
}

 function drawScore(){
  ctx.drawImage(scoreTable,20,18,180,60)
  ctx.font="30px Arial";
  ctx.fillStyle = "#0a0a0a";
  ctx.textAlign = "center";
  if(frames%300===0){
    score+=5;
  }
  ctx.fillText(`${score}`, 110,58)
}

function checkCollisions() {
  if (flappy.y >= canvas.height - flappy.height) return gameOver()
  obstacles.forEach((pipe, i) => {
    if (pipe.x + pipe.width <= 0) {
      obstacles.splice(i, 1)
    }
    flappy.isTouching(pipe) ? gameOver() : null
  })
}

function startGame() {
  document.querySelector(".logo").setAttribute("style", "width:10%");
  document.querySelector("#start-button").innerText='Try Again'
  board= new Board()
  //valores iniciales
  start=true
  flappy.x=350
  flappy.y=250
  score=0;
  frames=0;
  interval = setInterval(update, 1000 / 60)
  backAudio.currentTime = 0;
  backAudio.play();
}

function gameOver(){
  crash.play();
  clearInterval(interval);
  backAudio.pause();
  //limpiamos pantalla
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  board.draw();
  //limpiamos obstaculos
  obstacles.splice(0, obstacles.length);   
  //mostramos puntacion final
  ctx.drawImage(scoreTable,270,50,360,404)
  ctx.font="42px Arial";
  ctx.fillStyle = "#0a0a0a";
  ctx.textAlign = "center";  
  ctx.fillText(`Your Final Score`, 450,150)
  ctx.font="62px Arial";
  ctx.fillText(`${score}`, 450,250)
  ctx.drawImage(ironhack,360,245,180,180)
  //habilitamos denuevo el boton de inicio
  start=false;
}

function update(){
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  board.draw();
  flappy.draw();
  createObstacles();
  drawPipe();
  drawScore();
  checkCollisions()
}

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      flappy.fly()
  }
})