var canvas = document.getElementsByTagName('canvas')[0]
var ctx = canvas.getContext('2d')

// variables globales
var pipes = [];
var interval;
var frame = 0;
var images = {
  bg:"https://raw.githubusercontent.com/ironhack-labs/lab-canvas-flappybirds/master/starter_code/images/bg.png",
  flappy:"https://raw.githubusercontent.com/ironhack-labs/lab-canvas-flappybirds/master/starter_code/images/flappy.png",
  pipe2: "https://raw.githubusercontent.com/ironhack-labs/lab-canvas-flappybirds/master/starter_code/images/obstacle_bottom.png",
  pipe1:"https://raw.githubusercontent.com/ironhack-labs/lab-canvas-flappybirds/master/starter_code/images/obstacle_top.png" 
}

// Clases

class Board{

  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.bg
    this.image.onload = ()=>{
      this.draw()
    }
    this.music  = new Audio()
    this.music.src = 'music.mp3'

  }

  draw(){
    this.x--
    // Animación de fondo
    if (this.x < -this.width) this.x = 0
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
  }

}// Fin  de la clase Board

// Clase Flappy

class Flappy{

  constructor(){
    this.x = 100
    this.y = 150
    this.width = 40
    this.height = 30
    this.image = new Image()
    this.image.src = images.flappy
    this.image.onload = ()=>{
      this.draw()
    }
    this.gravity = 3
    this.crash = new Audio()
    this.crash.src = "crash.mp3"
  }


  draw(){
    if(this.y < canvas.height - 40) this.y += this.gravity
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }

  crashWith(item){
    var crash = (this.x < item.x + item.width) && 
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
  if(crash) this.crash.play() 
          return crash

  }


} // Fin clase Flappy

// Clase Pipes-> Obstaculos

class Pipe{
  // si no llega pipe en el constructor se asigna pipe1 al parametro
  constructor(y, height, pipeName="pipe1"){
    this.x = canvas.width - 50
    this.y = y ? y : 0 // Operador ternario
    this.width = 50
    this.height = height || 100 // operador 'or'
    this.image = new Image()
    this.image.src = images[pipeName]
    this.image.onload = ()=>{
      this.draw()
    }
  }

  draw(){
    this.x -= 2
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

  }

}

// Instancias

var board = new Board()
var flappy = new Flappy()

// funciones principales

function update(){
  // Borramos el canvas -> funciona como borrador
  frame++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()
  flappy.draw()
  // pipe
  generatePipes()
  drawPipes()
  checkCollitions()
}

function start(){

  if (interval) return

  pipes = []
  frames = 0
  interval = setInterval(update, 1000/60)
}

function gameOver(){
  clearInterval(interval)
  ctx.font = "50px Helvetica"
  ctx.fillText("Game Over", 50, 250)
  ctx.font = "50px Helvetica"
  ctx.fillText("Press esc to restart", 50, 300)
  interval = null
  board.music.pause()
}

// funciones auxiliares

function generatePipes(){
  if (frame % 100 === 0) {
    // new Pipe(y, alto, nombre)
    // 1-. Generar el tubo de arriba
    var y = 0
    var alto = Math.floor(Math.random() * 400) + 20
    var topPipe = new Pipe(y,alto,"pipe1")
    // 2-. Estabalecer el espacio donde pasa Flappy
    var window = 100
    var alto2 = canvas.height - (window + alto)
    // 3-. Generar el tubo de abajo
    var bottomPipe = new Pipe(canvas.height - alto2, alto2, "pipe2")
    // 4-. Donde jodidos pongo los tubos
    pipes.push(topPipe)
    pipes.push(bottomPipe) 
  }
  

}

function drawPipes(){
  pipes.forEach((pipe)=>{
    pipe.draw()
  })
}

function checkCollitions(){

  pipes.forEach((pipe)=>{
    if (flappy.crashWith(pipe)) {
      gameOver()
    }
  })

}


// Observadores
addEventListener('keydown', (ev)=>{
  if (ev.keyCode === 32 && flappy.y > 50) {
    flappy.y -= 70
  }
  if (ev.keyCode === 27) {
    start()
  }

  if(ev.key = "Enter"){
    start()
    board.music.play()
  }


})
start()