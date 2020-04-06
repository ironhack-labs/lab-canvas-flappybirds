const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// variables auxiliares
const images = {
  bg: './images/bg.png',
  flappy: './images/flappy.png',
  logo: './images/logo.png',
  pipeTop: './images/obstacle_top.png',
  pipeBot: './images/obstacle_bottom.png',
  gameOv: './images/gameover.jpg',
}

const pipes = []
let interval
let frames = 0
let score = 0

// clases
class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.bg
    this.img.onload = () => {
      this.draw()
      loadScreen()
    }
  }
  draw() {
    this.x--
    if (this.x < -this.width) this.x = 0
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
  }
}

class Flappy {
  constructor() {
    this.x = 200
    this.y = 300
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = images.flappy
  }
  draw() {
    this.y += 2
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
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
  constructor(height, y, direction) {
    this.width = 70
    this.height = height
    this.x = canvas.width + this.width
    this.y = y
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

class Over {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.Over
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x
    this.y
  }
}

// instancias
const bg = new Background()
const flappy = new Flappy()
const gaOver = new Over()

// funciones principales
function update() {
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bg.draw()
  flappy.draw()
  generatePipes()
  drawPipes()
  checkCollision()
  // drawScore()
  // gameOver()
}



// funciones auxiliares
function loadScreen() {
  const logo = new Image()
  logo.src = images.logo
  logo.onload = () => ctx.drawImage(logo, 100, 100, 300, 100)
}

function gameOver() {
 clearInterval(interval)
 return gaOver.draw()
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

// function drawScore() {
//   pipes.forEach((pipe) => {
//   if (flappy.x > generatePipes.x) {
//     score++
//   }
//   ctx.fillText(score, 240, 100)

// })

// listeners
document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      return flappy.fly()
  }
})

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    function startGame() {
      if (interval) return
      interval = setInterval(update, 1000 / 60)
    }
  }
}