const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval
const pipes = []

class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = 'images/bg.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x--
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
  }
}

class Faby {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src = 'images/flappy.png'
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

class Pipe {
  constructor(y, width, height, type) {
    this.x = canvas.width
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.imgTop = new Image()
    this.imgTop.src = 'images/obstacle_top.png'
    this.imgBot = new Image()
    this.imgBot.src = 'images/obstacle_bottom.png'
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

const background = new Background()
const cosoVolador = new Faby(20, 10)

function drawScore() {
  if (frames % 200 === 0) {
    score += 1
  }
  ctx.font = '24px Courier'
  ctx.fillText(score, 730, 50)
}

function generatePipes() {
  const min = 20
  const max = 100
  const ventanita = 100
  if (frames % 200 === 0) {
    const randomHeight = Math.floor(Math.random() * (max + min))
    pipes.push(new Pipe(0, 70, randomHeight, true))
    pipes.push(new Pipe(randomHeight + ventanita, 70, canvas.height - randomHeight, false))
  }
}

function drawPipes() {
  pipes.forEach(pipe => {
    pipe.draw()
  })
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  background.draw()

  generatePipes()
  drawPipes()
  cosoVolador.draw()
  checkCollition()
  drawScore()
}

function start() {
  if (interval) return
  interval = setInterval(update, 1000 / 60)
}

function gameOver() {
  ctx.font = '50px Courier'
  ctx.fillText(`Game Over.`, canvas.width / 2 - 170, 200)
  clearInterval(interval)
  ctx.fillText(`Score: ${score} `, 270, 280)
}

function checkCollition() {
  if (cosoVolador.y > canvas.height - cosoVolador.height) return gameOver()
  pipes.forEach(pipe => {
    if (cosoVolador.isTouching(pipe)) return gameOver()
  })
}

document.onkeydown = e => {
  switch (e.keyCode) {
    case 32:
      cosoVolador.fly()
      break
    default:
      break
  }
}

document.getElementById('start-button').onclick = function() {
  if (start() === false) {
    return true
  }
}
