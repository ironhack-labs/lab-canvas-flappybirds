const startButton = document.getElementById("start-button")
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let interval
const pipes = []

//Clases
class Board{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true'
  }
  draw(){
    //Board with infinite loop
    this.x--
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
  }
}

class Flappybird{
  constructor(x,y){
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true'
  }
  draw(){
    this.y++
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly(){
    this.y -= 20
  }
  crashing(pipe) {
    return (
      this.x < pipe.x + pipe.width &&
      this.x + this.width > pipe.x &&
      this.y < pipe.y + pipe.height &&
      this.y + this.height > pipe.y
    )
  }
}

class Pipe{
  constructor(y, width, height, type){
    this.x = canvas.width
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.imgTop = new Image()
    this.imgTop.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'
    this.imgBot = new Image()
    this.imgBot.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true'
  }
  draw() {
    this.x--
    if (this.type) { //para saber si va arriba o abajo
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
    }
  }
}

//Create instance
const board = new Board()
const flappy = new Flappybird(20,100)

//Helper functions
//Create pipes
function createPipes(){
  const min = 100
  const max = 150
  const altura = 100
  if (frames % 200 === 0) {
    const randomHeight = Math.floor(Math.random() * (max - min) + min)
    pipes.push(new Pipe(0, 50, randomHeight, true)) //Img top
    pipes.push(new Pipe(randomHeight + altura, 50, canvas.height - randomHeight, false)) //Img bottom
  }
}
//Dibujar pipes
function drawPipes(){
  pipes.forEach(pipe => {
    pipe.draw()
  });
}
//Terminar el juego
function gameOver() {
  ctx.font = '50px Impact'
  ctx.fillStyle='#c32323'
  ctx.fillText('Game Over', canvas.width / 2 - 110, 200)
  clearInterval(interval)
}
//Revisar si choca con pipes o borde inferior
function checkCollition() {
  if (flappy.y > canvas.height - flappy.height) return gameOver()
  pipes.forEach(pipe => {
    if (flappy.crashing(pipe)) return gameOver()
  })
}
//Update Canvas
function updateCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames +=1 //Aumenta los frames, cada 200 frames sale un pipe
  board.draw()
  flappy.draw()
  createPipes()
  drawPipes()
  checkCollition()
}
//Iniciar Juego
function startGame() {
  interval = setInterval(updateCanvas, 1000/60)
}

//Inicia juego
startGame()

//Cuando presionen una tecla
document.onkeydown = e => {
  switch (e.keyCode) {
    case 32:
      flappy.fly()
      break
    default:
      break
  }
}
