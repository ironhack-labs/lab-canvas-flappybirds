
//variables

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let startedGameTime
let counter = 0
const obstaclesArr = [ ]
let gameScore = 0

const images = {
  flappy: "./images/flappy.png",
  map :  "./images/bg.png",
  topPipe : "./images/obstacle_top.png",
  bottompipe: "./images/obstacle_bottom.png"
}

//clases

class map {
  constructor(){
  this.map =  new Image()
  this.map.src = images.map
  this.xPosition = 0 
  this.yPosition = 0
  this .canvasWidith =  canvas.width
  this.canvasHeight = canvas.height
  this.map.onload =()=>{
    this.draw()
  }
}
  draw(){
    this.xPosition-= 3
    if (this.xPosition < - this.canvasWidith) this.xPosition = 0
    ctx.drawImage(this.map, this.xPosition, this.yPosition, this.canvasWidith, this.canvasHeight)
    ctx.drawImage(this.map, this.xPosition + this.canvasWidith, this.yPosition, this.canvasWidith, this.canvasHeight)
  }
}

class player{
  constructor() {
    this.player = new Image()
    this.player.src = images.flappy
    this.xPosition = 240
    this.yPosition = 320
    this.width = 70
    this.height = 60
    this.player.onload = ()=>{
      this.draw()
    }}
  draw(){
    ctx.drawImage(this.player,  this.xPosition, this.yPosition, this.width, this.height)
  }
  isTouching(pipe) {
    return (
      this.xPosition < pipe.x + pipe.width &&
      this.xPosition + this.width > pipe.x &&
      this.yPosition < pipe.y + pipe.height &&
      this.yPosition + this.height > pipe.y
    )
  }
}

  class Pipe {
    constructor(height, y, direction) {
      this.width = 70
      this.height = height
      this.x = canvas.width + this.width
      this.y = y
      this.imgTop = new Image()
      this.imgTop.src = images.topPipe
      this.imgBot = new Image()
      this.imgBot.src = images.bottompipe
      this.direction = direction
    }
    draw() {
      this.x-= 3
      if (this.direction === 'top') {
        ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
      } else if (this.direction === 'bot') {
        ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
      }
    }
  }

//instances 

const mapImage = new map()
const flappy = new player()

//main functions
function start() {
  if (startedGameTime) return 
startedGameTime = setInterval(fpsRefresh, 1000 / 60)
}

function fpsRefresh(){
       counter++
      ctx.clearRect(0,0, map.canvasWidith, map.canvasHeight)
      mapImage.draw()
      flappy.draw()
      flappy.yPosition+= 3
      drawObstacles()
      generateObstacles()
      bottomTouch()
      checkCollision()
      scoreAddPoint()
      console.log(gameScore)
}

function generateObstacles(){
  let randomNumber = Math.random() * (500 - 100) + 100
  let remainRandom = canvas.width - randomNumber - 40 * -1
  if (counter % 200 === 0) {
    obstaclesArr.push(new Pipe(randomNumber, canvas.height - randomNumber, 'bot'))
    obstaclesArr.push(new Pipe(remainRandom, 0, 'top'))
  }
  }


//auxiliar functions

function scoreAddPoint(){
  obstaclesArr.forEach((pipe) => {
    if (flappy.xPosition < (pipe.x)) return 
    gameScore+= .01
  })
  }

function checkCollision() {
  obstaclesArr.forEach((pipe) => {
    if (flappy.isTouching(pipe)) return gameOver()
  })
}


function bottomTouch(){
  if (flappy.yPosition + flappy.height >= canvas.height){
    return gameOver()
  }
}

function gameOver(){
 clearInterval(startedGameTime)
 ctx.font = "40px Arial"
 ctx.fillText(` Your score is ${Math.floor(gameScore)} points.`, 100, 100)
}

 function flappyFly(){
   flappy.yPosition -= 60
 }

 function drawObstacles(){
  obstaclesArr.forEach((pipe) => pipe.draw())
 }


//event listeners

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

function startGame() {
start()
  }};

document.addEventListener('keydown', ({keyCode} ) => {
if(keyCode === 32){
  flappyFly()
}});

console.log( obstaclesArr)