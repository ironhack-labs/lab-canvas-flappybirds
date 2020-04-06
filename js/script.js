const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
//Imágenes
const images = {
  board: './images/bg.png',
  flappy: './images/flappy.png',
  logo: './images/logo.png',
  pipeBot: './images/obstacle_bottom.png',
  pipeTop: './images/obstacle_top.png',
}

//Variables globales
const pipes = []
let interval // Para definir la velocidad del board
let frames = 0
let score = 0

//Clases
class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.board
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x-- //Moverse a la izquierda

    if (this.x < -this.width) this.x = 0 //if que compara las medidas negativas
    context.drawImage(this.img, this.x, this.y, this.width, this.height) // Las posiciones originales de la imagen
    context.drawImage(this.img, this.x + this.width, this.y, this.width, this.height) // La siguiente imagen
  }
}

class Flappy {
  constructor() {
    this.x = 330
    this.y = 220
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = images.flappy
  }
  draw() {
    this.y += 1
    context.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  jump() {
    //falta gravedad
    this.y -= 40
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
  constructor(height, y, type) {
    this.width = 70
    this.height = height
    this.x = canvas.width + this.width
    this.y = y // Corroborar
    this.imgTop = new Image()
    this.imgTop.src = images.pipeTop
    this.imgBot = new Image()
    this.imgBot.src = images.pipeBot
    this.type = type
  }
  draw() {
    this.x--
    if (this.type === 'top') {
      context.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    } else if (this.type === 'bot') {
      context.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
    }
  }
}

// Objetos a instanciar
const background = new Board()
const flappyBird = new Flappy()

// funciones principales

function update() {
  frames++
  context.clearRect(0, 0, canvas.width, canvas.height)
  background.draw()
  flappyBird.draw()
  pipesGenerator()
  drawPipes()
  collide()
  drawScore()
}

function startGame() {
  //falta algo para que no vaya tan rapido al presionar start
  if (interval) return
  interval = setInterval(update, 1000 / 60)
}

function gameOver() {
  context.font = '30px Arial'
  context.fillText = ('Game Over', canvas.width / 2, canvas.height / 2)
  clearInterval(interval)
}
// funciones auxiliares
function pipesGenerator() {
  const randomizer = Math.floor(Math.random() * (300 - 100) + 100)
  const randomizer2 = Math.floor(Math.random() * (150 - 120) + 120)
  const total = canvas.height - randomizer - randomizer2
  if (frames % 250 === 0) {
    pipes.push(new Pipe(randomizer, canvas.height - randomizer, 'bot'))
    pipes.push(new Pipe(total, 0, 'top'))
  }
}

function drawPipes() {
  pipes.forEach((pipe) => pipe.draw())
}

function collide() {
  pipes.forEach((pipe) => {
    if (flappyBird.isTouching(pipe) || flappyBird.y + flappyBird.height >= canvas.height)
      return gameOver()
  })
}

function drawScore() {
  if (frames % 100 === 0) {
    score++
  }
  context.fillStyle = 'Peru'
  context.font = '50px Courier'
  context.fillText(score, canvas.width / 2, canvas.height / 2 - 200)
}

window.onload = function () {
  document.getElementById('start-button').onclick = function () {
    startGame()
  }
}

document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 32:
      flappyBird.jump()
  }
})
