//Configuración del canvas
var canvas = document.getElementsByTagName("canvas")[0]
var ctx = canvas.getContext("2d")

//Testeando  que el canvas funciona
//ctx.fillRect(0,0,canvas.width,canvas.height)

//Variables globales
var interval
var frames =0
var pipes = []
var images={
  bg: "https://github.com/FranciscoTorreblanca/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
  flappy: "https://github.com/FranciscoTorreblanca/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
  pipe1: "https://github.com/FranciscoTorreblanca/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=truehttps://github.com/FranciscoTorreblanca/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
  pipe2: "https://github.com/FranciscoTorreblanca/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"
}

//Clases
class Board{
  constructor(){
    this.x =0
    this.y =0
    this.width = canvas.width
    this.height = canvas.height
    this.image = document.createElement("img")
    this.image.src = images.bg
    this.image.onload = function(){
      this.draw()
    }.bind(this)
    this.music = new Audio()
    this.music.src = "music.mp3"
  }

  draw(){
    this.x-=0.5
    if(this.x<-canvas.width) this.x =0
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.image,this.x+canvas.width,this.y,this.width,this.width)
    ctx.font = "50px Avenir"
    ctx.fillStyle = "white"
    ctx.fillText(Math.floor(frames/60),100,100)
  }
} //Aqui termina la clase Board
class Flappy{
  constructor(){
    this.x =100
    this.y =150
    this.width = 40
    this.height = 30
    this.image = new Image()
    this.image.src = images.flappy
    this.image.onload = function(){
      this.draw()
    }.bind(this)
    this.gravity = 3
    this.crash = new Audio()
    this.crash.src = "crash.mp3"
  }

  draw(){
    if(this.y<canvas.height-40) this.y+=this.gravity
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }

  crashWith(item){
    var crash = (this.x < item.x + item.width) && //Detecta la colisión entre dos rectangulos (uno contiene al otro?)
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height)&&
            (this.y + this.height > item.y);
    if(crash) this.crash.play()
    return crash;
  }
} //Aqui termina la clase Flappy
class Pipe{
    constructor(y,height,pipeName){
      this.x =canvas.width
      this.y =y ? y : 0
      this.width = 50
      this.height = height || 100
      this.image = new Image()
      this.image.src = images[pipeName]
      this.image.onload = ()=>{
        this.draw()
      }
    }

    draw(){
        this.x-=2
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

//Intancias
var board = new Board()
var elFlappy = new Flappy()

//Funciones principales
function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height) //Borra lo anterior
  board.draw()
  elFlappy.draw()
  generatePipes()
  drawPipes()
  frames++
  checkCollisions()
}
function start(){
  if (interval) return
  pipes=[]
  frames=0
  interval = setInterval(update,1000/60)
}
function  gameOver(){
  clearInterval(interval)
  ctx.fillStyle ="white"
  ctx.font = "80px Avenir"
  ctx.fillText("Game Over",50,250)
  ctx.fillStyle = "yellow"
  ctx.fillText("Pres 'esc' to restart",50,300)
  interval=null
  board.music.pause()
}

//Funciones auxiliares
function generatePipes(){
  if(frames%200==0) {
  //generar el tubo de arriba
  var y = 0
  var alto = Math.floor(Math.random()*400) + 20
  var topPipe = new Pipe(y,alto,"pipe2")
  //establecer el espacio donde pasa flappy
  var window = 100
  var alto2= canvas.height-(window+alto) 
  //generar la tubo de abajo
  var bottomPipe = new Pipe(canvas.height-alto2,alto2,"pipe1")
  //poner los tubos
  pipes.push(topPipe)
  pipes.push(bottomPipe)
  }
}
function drawPipes(){
  pipes.forEach(function(pipe){
    pipe.draw()
  })
}
function checkCollisions(){
  pipes.forEach(function (pipe){
    if(elFlappy.crashWith(pipe)){
      gameOver()
    } 
  })
}

//Los observadores (listeners)

document.addEventListener("keydown",function(e){
  if(e.keyCode===32 && elFlappy.y>50) {elFlappy.y -=50}
  if(e.keyCode ===27 ) { start() }
  if(e.key = "Enter"){
    start()
    board.music.play()
}

})