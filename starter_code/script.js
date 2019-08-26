const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval
const pipes = []

class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src =
      'https://d19oqafiwfkr0c.cloudfront.net/asset-image/8eea5d35-54fe18fb4a1ef.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x --
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.img,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height
    )
  }
}

class Flappyfish {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 35
    this.height = 35
    this.img = new Image()
    this.img.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true'
  }
  draw() {
    this.y += 1.5
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly() {
    this.y -= 35
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
    this.imgTop.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'
    this.imgBot = new Image()
    this.imgBot.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true'
  }
  draw() {
    this.x-=1.5
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
    }
  }
}

const board = new Board()
const flappy = new Flappyfish(15, 10)

function drawScore() {
  if (frames % 50 === 0) {
    score += 1
  }
  ctx.font = '24px Courier'
  ctx.fillText(score, canvas.width / 2, 50)
}

function generatePipes() {
  const min = 20
  const max = 100
  const ventanita = 135
  if (frames % 50 === 0) {
    const randomHeight = Math.floor(Math.random() * (max - min)+min+3)
    pipes.push(new Pipe(0, 50, randomHeight, true))
    pipes.push(
      new Pipe(
        randomHeight + ventanita,
        50,
        canvas.height - (randomHeight*2),
        false
      )
    )
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
  board.draw()
  flappy.draw()
  generatePipes()
  drawPipes()
  checkCollition()
  drawScore()
}

function start() {
  interval = setInterval(update, 1000 / 60)
}

function gameOver() {
  ctx.font = '40px Courier'
  ctx.fillText('Game Over(Press "B" to restart)', canvas.width / 2-350, 200)
  clearInterval(interval)
}

function checkCollition() {
  if (flappy.y > canvas.height - flappy.height) return gameOver()
  pipes.forEach(pipe => {
    if (flappy.isTouching(pipe)) return gameOver()
  })
}


document.onkeydown = e => {
  switch (e.keyCode) {
    case 32:
      flappy.fly()
      break
    case 66:
      location.reload()
      break
      case 13:
        start()
         break
    default:
      break
  }
}
