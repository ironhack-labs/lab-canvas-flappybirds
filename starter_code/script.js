const $canvas = document.querySelector('canvas')
const ctx = $canvas.getContext('2d')
const images = {
  bg: './images/bg.png',
  flappy: './images/flappy.png',
  obstacleTop: './images/obstacle_top.png',
  obstacleBott: './images/obstacle_bottom.png'
}
let interval
let frames = 0
let background
let flappy
const pipes = []

class Background {
  constructor() {
    this.width = $canvas.width
    this.height = $canvas.height
    this.x = 0
    this.y = 0
    this.image = new Image()
    this.image.src = images.bg
    this.image.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x-- 
    if (this.x < -this.width) this.x = 0
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
}

class Bird {
  constructor() {
    this.width = 50
    this.height = 35
    this.x = 425
    this.y = 100
    this.image = new Image()
    this.image.src = images.flappy
  }
  draw() {
    this.y += 2
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  fly() {
    this.y -= 30
  }
  touching(pipe) {
    return (
      this.x < pipe.x + pipe.width &&
      this.x + this.width > pipe.x &&
      this.y < pipe.y + pipe.height &&
      this.y + this.height > pipe.y
    )
  }
}

class Obstacle {
  constructor(y, heigth, type) {
    this.x = $canvas.width
    this.y = y
    this.width = $canvas.width / 10
    this.heigth = heigth
    this.image1 = new Image()
    this.image2 = new Image()
    this.image1.src = images.obstacleTop
    this.image2.src = images.obstacleBott
    this.type = type
  }
  draw() {
    this.x--
    this.type ? ctx.drawImage(this.image1, this.x, this.y, this.width, this.heigth)
              : ctx.drawImage(this.image2, this.x, this.y, this.width, this.heigth)
  }
}

function createPipes() {
  if (frames % 300 === 0) {
    const min = 50
    const max = 300
    const space = 100
    const randomHeigth = Math.round(Math.random() * max) + min
    pipes.push(new Obstacle(0, randomHeigth, true))
    pipes.push(new Obstacle(randomHeigth + space, $canvas.height - randomHeigth, false))
  }
}

function drawPipes() {
  pipes.forEach((pipe) => pipe.draw())
}

function checkCollision() {
  if (flappy.y >= $canvas.height - flappy.height) return gameOver()
  pipes.forEach((pipe, i) => {
    pipe.x + pipe.width <= 0 ? pipes.splice(i, 1) : null
    flappy.touching(pipe) ? gameOver() : null
  })
}

window.onload = function() {
  background = new Background()
  flappy = new Bird()
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").blur()
    startGame()
  }  
}

function startGame() {
  interval = setInterval(update, 1000/60)
}

function gameOver() {
  clearInterval(interval)
}

function update() {
  frames++
  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
  background.draw()
  flappy.draw()
  createPipes()
  drawPipes()
  checkCollision()
}

window.addEventListener('keydown', ({keyCode}) => {
  keyCode === 32 ? flappy.fly() : null
})