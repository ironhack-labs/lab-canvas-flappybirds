const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const images = {
  bgimg: './images/bg.png',
  bird: './images/flappy.png',
  logo: './images/logo.png',
  pipeBot: './images/obstacle_bottom.png',
  pipeTop: './images/obstacle_top.png',
}

let interval
let pipes = []
let frames = 0
let score = 0

class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.bgimg
    this.img.onload = () => {
      this.drawImg()
    }
  }

  drawImg() {
    this.x--
    if (this.x < -this.width) this.x = 0
    context.drawImage(this.img, this.x, this.y, this.width, this.height)
    context.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
  }
}

class Flappy {
  constructor() {
    this.x = 100
    this.y = 250
    this.width = 55
    this.height = 55
    this.img = new Image()
    this.img.src = images.bird
  }

  drawBird() {
    this.y += 2
    context.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  fly() {
    this.y -= 40
  }

  contact(pipe) {
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
    this.imgT = new Image()
    this.imgT.src = images.pipeTop
    this.imgB = new Image()
    this.imgB.src = images.pipeBot
    this.direction = direction
  }

  drawP() {
    this.x--
    if (this.direction === 'bot') {
      context.drawImage(this.imgB, this.x, this.y, this.width, this.height)
    } else if (this.direction === 'top') {
      context.drawImage(this.imgT, this.x, this.y, this.width, this.height)
    }
  }
}

const background = new Background()
const bird = new Flappy()

function update() {
  frames++
  context.clearRect(0, 0, canvas.width, canvas.height)
  background.drawImg()
  bird.drawBird()
  generatePipes()
  drawPipe()
  crash()
  drawScore()
}

function generatePipes() {
  const random = Math.floor(Math.random() * (300 - 100) + 100)
  const space = Math.floor(Math.random() * (150 - 120) + 120)
  const random2 = canvas.height - random - space
  if (frames % 250 === 0) {
    pipes.push(new Pipe(random, canvas.height - random, 'bot'))
    pipes.push(new Pipe(random2, 0, 'top'))
  }
}

function drawPipe() {
  pipes.forEach((pipe) => pipe.drawP())
}

function crash() {
  pipes.forEach((pipe) => {
    if (bird.contact(pipe) || bird.y + bird.height >= canvas.height) return gameOver()
  })
}

function gameOver() {
  clearInterval(interval)
}

function drawScore() {
  pipes.forEach((pipe, index) => {
    if (pipe.x + pipe.width <= 0) {
      score++
      pipes.shift()
    }
  })
  context.fillText(score, 400, 100)
  context.font = '30px serif'
}

window.onload = function () {
  document.getElementById('start-button').onclick = function () {
    startGame()
  }

  function startGame() {
    if (interval) return
    interval = setInterval(update, 1000 / 60)
  }
}

document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      return bird.fly()
  }
})
