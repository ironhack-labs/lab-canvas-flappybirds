const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

//
//
//
//
//Definir todas la variables a utilizar

const images = {
  background: './images/bg.png',
  flappy: './images/flappy.png',
  pipeTop: './images/obstacle_top.png',
  pipeBot: './images/obstacle_bottom.png',
}

let interval //esta variable nos ayudara a que nuestro juego no active todas las funciones al darle click
//si no solo una vez que lo empecemos.

const pipes = [] //aqui vamos a guardar nuestros pipes en un array

let frames = 0

let score = 0
//
//
//
//
//Definir las clases por imagen, sus propiedades y sus metodos

class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.background
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x--
    if (this.x < -this.width) this.x = 0
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
  }
}

class FlappyBird {
  constructor() {
    this.x = 225
    this.y = 275
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = images.flappy
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.y += 3 //esta altura es para que el flappy se vaya cayendo en automatico y la velocidad de caida
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  fly() {
    this.y -= 55
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

class Obstaculos {
  constructor(height, y, direction) {
    this.width = 80
    this.y = y
    this.height = height
    this.x = canvas.width + this.width
    this.imgTop = new Image()
    this.imgTop.src = images.pipeTop
    this.imgBot = new Image()
    this.imgBot.src = images.pipeBot
    this.direction = direction
  }
  draw() {
    this.x--
    if (this.direction === 'top') {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    } else if (this.direction === 'bot') {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
    }
  }
}

//
//
//
//
//crear las instancias (las extensiones de las clases)
const fondo = new Background()
const flappy = new FlappyBird()

//
//
//
//
//
//**funciones basicas
window.onload = function () {
  document.getElementById('start-button').onclick = function () {
    startGame()
    if (interval) return
    interval = setInterval(startGame, 1000 / 60) //con setInterval nos ayudara a poder manejar mas facilmente
    // la velocidad, al contrario de reqquestAnimationFrame()
  }
}

function startGame() {
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  fondo.draw()
  flappy.draw()
  generatePipes()
  drawPipes()
  checkCollision()
  drawScore()
}

function gameOver() {
  clearInterval(interval)
}

function generatePipes() {
  const random = Math.floor(Math.random() * (310 - 100) + 100)
  const ventanita = Math.floor(Math.random() * (150 - 120) + 120)
  const random2 = canvas.height - random - ventanita
  if (frames % 250 === 0) {
    pipes.push(new Pipe(random, canvas.height - random, 'bot'))
    pipes.push(new Pipe(random2, 0, 'top'))
  }
}

function drawPipes() {
  pipes.forEach((pipe) => pipe.draw())
}

function checkCollision() {
  pipes.forEach((pipe) => {
    if (flappy.isTouching(pipe) || flappy.y + flappy.height >= canvas.height) return gameOver()
  })
}

function drawScore() {
  if (frames % 100 === 0) {
    score++
  }
  ctx.fillText(score, 240, 100)
}

//listeners,   Son eventos que nos ayudaran a combinar los eventos de la interfaz con nuestro programa,
//por ejemplo el tecleo de las teclas o de un click
document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      return flappy.fly()
  }
})
