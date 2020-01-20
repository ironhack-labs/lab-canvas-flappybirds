const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let interval // intervalo de repeticion del update
let frames = 0 // cantidad de fraes que han pasado
const obstacules = []
let score = 0
let trueScore = 0

const images = {
  bg: './images/bg.png',
  flappy: './images/flappy.png',
  logo: './images/logo.png',
  obstacle_bot: './images/obstacle_bottom.png',
  obstacle_top: './images/obstacle_top.png',
  game_over: './images/gameover.png'
}

class Board {
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.bg
    this.img.onload = () => {
      this.draw()
    } // a la espera de carga de la imagen
  }
  draw(){
    this.x--
    if(this.x < -canvas.width) this.x = 0
    ctx.drawImage( // primera pintada en el CANVAS
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
    ctx.drawImage(// segunda pintada en el CANVAS
      this.img,
      this.x + canvas.width, // se pinta al final de la primera imagen que se imprimio
      this.y,
      this.width,
      this.height
    ) 
  }
}

class Flappy {
  constructor(){
    this.x = 50
    this.y = 50
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = images.flappy
  }
  draw() {
    this.y += 2 // Gravedad - que vaya cayendo
    ctx.drawImage(
      this.img, 
      this.x, 
      this.y, 
      this.width, 
      this.height
      )
  }
  fly() {
    this.y -= 30
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

class Pipe {
  constructor(y, height, obsType){
    this.x = canvas.width
    this.y = y
    this.height = height
    this.width = canvas.width / 8
    this.imgBot = new Image()
    this.imgTop = new Image()
    this.imgBot.src = './images/obstacle_bottom.png'
    this.imgTop.src = './images/obstacle_top.png'
    this.obsType = obsType
  }
  draw() {
    this.x-- // recorrido hacia la derecha en cada pintada
    if(this.imgType) {
      ctx.drawImage(
        this.imgBot,
        this.x,
        this.y,
        this.width,
        this.height
      )
    } else {
      ctx.drawImage(
        this.imgTop,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
  }
}

function generatePipes() { // Generata los obstaclo aleatorios
  if(frames % 300 === 0) {// cada cuanto tiempo van a sair los obstaculos
    const min = 100
    const max = 300
    const ventana = 140
    const rdmHeight = Math.floor(Math.random() * (max - min)) + min
    obstacules.push(new Pipe(0, rdmHeight, false)) // Crea un nuevo obstaculo superior en el array
    obstacules.push(// Crea un nuevo obstaculo inferior en el array
      new Pipe(rdmHeight + ventana, canvas.height - rdmHeight, true)
    )
  }
}

function drawPipe(){ // dibuja los obstaculos aleatorios dentro del canvas
  obstacules.forEach(pipe => pipe.draw())
}

function checkCollitions() {
  if (flappy.y >= canvas.height - flappy.height) return gameOver()
  obstacules.forEach((pipe, i) => {
    if (pipe.x + pipe.width <= 0) {
      score++
      obstacules.splice(i, 1)
    }
    flappy.isTouching(pipe) ? gameOver() : null
  })
}

function gameOver() {
  clearInterval(interval)
}

function scoreDraw(){
  ctx.font = "80px Verdana";
  ctx.fillStyle = 'white';
  trueScore = score/2
  ctx.fillText(trueScore, 230, 90);
}

function resetGame() {
  console.log('resetLlamdo')
  if(interval) return
  interval = setInterval( // se declara los frames a los que va estar refrescando la imagen
    update, 
    1000 /60
  ) 
}

 
const background = new Board()
const flappy = new Flappy()

function startGame() {
  if(interval) return
  interval = setInterval( // se declara los frames a los que va estar refrescando la imagen
    update, 
    1000 /60
    ) 
    document.onkeydown = e => { 
      switch(e.keyCode) {
        case 32:
          return flappy.fly() // cada que se presiona arriba en el teclado flappy vuela
        case 82:
         return location.reload()
      }
    }
}

function update(){ //aqui pasa toda la magia!!!!
  frames++
  ctx.clearRect(0 , 0 ,canvas.width, canvas.height)
  background.draw()
  scoreDraw()
  flappy.draw()
  generatePipes()
  drawPipe()
  checkCollitions()
  if(interval === 0){
    let img = new Image()
    img.src = './images/gameover.png'
    ctx.drawImage(img, 0, 0)
  }
}

document.getElementById("start-button").onclick = () => startGame()


