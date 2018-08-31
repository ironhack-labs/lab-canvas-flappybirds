//Canvas config
var canvas = document.getElementsByTagName("canvas")[0]
var ctx = canvas.getContext("2d");

// testing
//ctx.fillRect(0,0,50,50)

//Variable globales
var pipes = []
var interval;
var frames = 0;
var images = {
  bg : "./images/bg.png",
  flappy : "./images/flappy.png",
  pipe1 : "./images/obstacle_bottom.png",
  pipe2 : "./images/obstacle_top.png"
}
//clases

class Board{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.bg
    this.image.onload = () => {
      this.draw()
    }
    this.music = new Audio()
    this.music.src = "./sounds/IM A FLAPPY BIRD [ORIGINAL].mp3"
  }
    draw(){
      this.x --
      if(this.x < -canvas.width) this.x = 0
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
  
      ctx.fillText(Math.floor(frames /60),50,50)
      ctx.font="30px Avenir"
      ctx.fillStyle = "white"
    }
} // Class Board

class Flappy{
  constructor(){
    this.x = 100
    this.y = 150
    this.width = 40
    this.height = 30
    this.image = new Image()
    this.image.src = images.flappy
    this.image.onload = () => {
      this.draw()
    }  
    this.gravity = 3
  }
  draw(){
    if (this.y < canvas.height -40) this.y += this.gravity
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height) 
  } 

  crashWidth(item){
    var crash =  (this.x < item.x + item.width) &&
           (this.x + this.width > item.x) &&
           (this. y < item.y + item.height) &&
           (this.y + this.height > item.y);
    if(crash){
      item.crash.play()
    } 
    return crash
  }
} // class Flappy

class Pipe{
  constructor(y,height,pipeName="pipe2"){
    this.x = canvas.width - 50
    this.y = y ? y : 0
    this.width = 50
    this.height = height || 100
    this.image = new Image()
    this.image.src = images[pipeName]
    this.image.onload = () => {
      this.draw()
    }  
    this.crash = new Audio()
    this.crash.src = "sounds/Crash_Steel_Pipe.mp3"
  }
  draw(){
    this.x -=2.5
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

//Instancias
var board = new Board()
var flappy = new Flappy()
var pipe = new Pipe(100, 300, "pipe1")
//Funciones principales
function update(){
  frames ++;
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()
  flappy.draw()
  //pipes
  generatePipes()
  drawPipe()
  checkCollisions()
}

function start(){
  if(interval) return
  pipes = []
  frames = 0
  interval = setInterval(update, 1000/60)
}

function  gameOver(){
  clearInterval(interval)
  ctx.font = "80px Avenir"
  ctx.fillText("Game Over", 50, 250)
  ctx.font = "50px Avenir"
  ctx.fillStyle = "red"
  ctx.fillText("Press 'esc' to restart",50,300)
  interval = null
  board.music.pause()
}
//funciones auxiliares
function generatePipes(){
  if(frames % 100 === 0){
//new pipe (y,height,"pipe1")
  //1. Generar el tubo de arriba
  var y = 0;
  var height = Math.floor(Math.random() * 400 ) + 20
  var topPipe = new Pipe(y,height,"pipe2")
  //2. establecer el espacio donde pasa Flappy
  var window = 150
  var alto2 = canvas.height - (window +height)
  //3. generar el tubo abajo
  var bottomPipe = new Pipe(canvas.height -alto2, alto2, "pipe1")
  //4. donde pongo los tubos
  pipes.push(topPipe)
  pipes.push(bottomPipe)
  }
}

function drawPipe(){
  pipes.forEach(function(pipe){
    pipe.draw()
  })
}

function checkCollisions(){
  pipes.forEach(function(pipe){
    if (flappy.crashWidth(pipe)){
     gameOver()
    }
  })
}
//los observadores
addEventListener("keydown", function(e){
  if(e.keyCode === 32 && flappy.y >50){
    flappy.y -=70
  }
  if(e.keyCode === 27){
    start()
    board.music.play()
  }
  if(e.keyCode === 13){
    start()
    board.music.play()
  }
})
