const images = {
  bg: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true',
  flappy: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true',
  logo: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/logo.png?raw=true',
  bottomPipe:
    'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true',
  topPipe:
    'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'
}
// variables
// variables auxiliares
// clases
// instancias
// funciones auxiliares
// funciones main // update
// listeners

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
// Interval esta todo nuestro intervalo del juego, es para poderlo parar o seguir
let interval
// ES una variable auxiliar para tener nocion del tiempo o cuanto frames han pasado
let frames = 0
// Es un array donde vamos ir guardando los obstacles
// Buena practica, deberiamos de splicear el obstacle que ya no sirve
const obstacles = []

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
    // decrementamos x para que vaya haciendo el efecto de movimiento
    this.x--
    // preguntamos si la primer imagen ya esta fuera del canvas
    if (this.x < -canvas.width) this.x = 0
    // dibujamos la imagen normal
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    // dibujamos la otra imagen, despues de la primer imagen, para que ocupe el espacio en blanco, cuando la primer imagen esta fuera
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
  }
}

class Flappy {
  constructor() {
    this.x = 30
    this.y = 150
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = images.flappy
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.y++
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly() {
    this.y -= 20
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}

class Obstacle {
  constructor(y, height, type) {
    this.x = canvas.width + 50
    this.y = y
    this.height = height
    this.width = 50
    this.imgTop = new Image()
    this.imgTop.src = images.topPipe
    this.imgBot = new Image()
    this.imgBot.src = images.bottomPipe
    this.type = type
  }
  draw() {
    this.x--
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
    }
  }
}

const board = new Board()
const flappy = new Flappy()

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function update() {
  frames++
  clearCanvas()
  board.draw()
  flappy.draw()
  drawPipes()
  checkCollition()
}

function checkCollition() {
  obstacles.forEach(pipe => {
    if (flappy.isTouching(pipe)) {
      gameOver()
    }
    if (flappy.y <= 0 || flappy.y >= canvas.height - flappy.height) {
      gameOver()
    }
  })
}

function gameOver() {
  ctx.font = '30px Courier'
  ctx.fillText('Game over', canvas.width / 2, canvas.height / 2)

  clearInterval(interval)
}

function generatePipes() {
  // maximo de un pipe
  const max = canvas.height - 100
  // minimo de un pipe
  const min = 50
  // espacio calculado a traves de mucho research para saber donde si quepo, sin albur
  const ventanita = 100
  // expresion matematica, hecha por los dioses, e Isaac Newton, para calcular max o min
  const randomHeight = Math.floor(Math.random() * (max - min))
  if (frames % 300 === 0) {
    obstacles.push(new Obstacle(0, randomHeight, true))
    obstacles.push(new Obstacle(randomHeight + ventanita, canvas.height - randomHeight - ventanita, false))
  }
}

function drawPipes() {
  generatePipes()
  obstacles.forEach(pipe => pipe.draw())
}

function start() {
  // si ya se habia ejecutado el juego, no lo dejes entrar despues
  if (interval) return
  interval = setInterval(update, 1000 / 60)
}

function restart() {
  interval = false
  flappy.x = 30
  flappy.y = 70
  start()
}

document.onkeydown = e => {
  switch (e.keyCode) {
    case 32:
      flappy.fly()
      break

    case 13:
      start()
      break

    case 82:
      restart()
      break

    default:
      break
  }
}

window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    restart()
  }
}
