const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

//variables auxiliares

let interval
const pipes = []
let frames = 0
let score = 0

const images = {
  flappyBackground: './images/bg.png',
  flappyLogo: './images/logo.png',
  flappyBottomPipe: './images/obstacle_bottom.png',
  flappyTopPipe: './images/obstacle_top.png',
  flappy: './images/flappy.png',
}

//clases
class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.flappyBackground
    this.img.onload = () => {
      this.draw()
      startScreen()
    }
  }
  draw() {
    this.x--
    if (this.x < -this.width) this.x = 0
    context.drawImage(this.img, this.x, this.y, this.width, this.height)
    context.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
  }
}

class Flappy {
  constructor() {
    this.x = 200
    this.y = 200
    this.width = 50
    this.height = 50
    this.flappy = new Image()
    this.flappy.src = images.flappy
  }

  draw() {
    this.y += 2
    //background.draw()
    context.drawImage(this.flappy, this.x, this.y, this.width, this.height)
  }

  fly() {
    this.y -= 35
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
    this.x = canvas.width
    this.y = y
    this.topPipe = new Image()
    this.topPipe.src = images.flappyTopPipe
    this.bottomPipe = new Image()
    this.bottomPipe.src = images.flappyBottomPipe
    this.direction = direction
  }
  draw() {
    this.x--
    if (this.direction === 'top')
      context.drawImage(this.topPipe, this.x, this.y, this.width, this.height)
    else if (this.direction === 'bot')
      context.drawImage(this.bottomPipe, this.x, this.y, this.width, this.height)
  }
}

//instancias
const background = new Background()
const flappy = new Flappy()

//funciones principales
function update() {
  frames++
  context.clearRect(0, 0, canvas.width, canvas.height)
  //startScreen()
  //pressStartOrder()
  background.draw()
  flappy.draw()
  generatePipes()
  drawPipes()
  collisions()
  drawScore()
}

function startGame() {
  if (interval) return
  interval = setInterval(update, 1000 / 60)
}

//funciones auxiliares
function startScreen() {
  const startLogo = new Image()
  startLogo.src = images.flappyLogo
  startLogo.onload = () => {
    context.drawImage(startLogo, 90, 100, 300, 100)
    pressStartOrder()
  }
  // context.drawImage(startLogo, 90, 100, 300, 100)
  // context.fillStyle = 'white'
  // context.font = '25px Tahoma'
  // context.fillText('Press Enter to Start', 130, 300)
}

function pressStartOrder() {
  context.fillStyle = 'white'
  context.font = '25px Tahoma'
  context.fillText('Press Enter to Start', 130, 300)
}

function generatePipes() {
  const bottomHeight = Math.floor(Math.random() * (300 - 150) + 150)
  const space = Math.floor(Math.random() * (140 - 120) + 120)
  const topHeight = canvas.height - bottomHeight - space
  console.log(bottomHeight)
  if (frames % 200 === 0) {
    pipes.push(new Pipe(bottomHeight, canvas.height - bottomHeight, 'bot'))
    pipes.push(new Pipe(topHeight, 0, 'top'))
  }
}

function drawPipes() {
  console.log(pipes)
  pipes.forEach((pipe) => pipe.draw())
}

function collisions() {
  pipes.forEach((pipe) => {
    if (flappy.isTouching(pipe) || flappy.y + flappy.height >= canvas.height)
      return clearInterval(interval)
  })
}

function drawScore() {
  if (frames % 100 === 0) {
    score++
  }
  context.fillStyle = 'white'
  context.fillText(`Score: ${score}`, 30, 30)
}

//listeners
document.addEventListener('keydown', (e) => {
  keycode = e.keyCode

  console.log(keycode)
  switch (keycode) {
    case 13:
      return startGame()
    case 32:
      return flappy.fly()
  }
})
