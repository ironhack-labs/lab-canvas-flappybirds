

const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let newScore = 0
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
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true'
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
    ctx.drawImage(
      this.img,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height
    )
  }
}

class Flappyoso {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true'
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
    this.imgTop.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'
    this.imgBot = new Image()
    this.imgBot.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true'
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
const flappy = new Flappyoso(20, 10)

function drawScore() {

  if (frames % 200 === 0) {
    score += 1
  }

  if (score < 4) {
    newScore = 4
  }
  else {
    newScore = score
  }
  ctx.font = '20px Helvetica'
  let scoreText = 'SCORE: ' + (newScore - 4)
  ctx.fillText(scoreText, 15, 25)
}

function generatePipes() {
  const min = 20
  const max = 200
  const gap = 100
  if (frames % 200 === 0) {
    const randomHeight = Math.floor(Math.random() * (max - min))
    pipes.push(new Pipe(0, 66, randomHeight, true))
    pipes.push(
      new Pipe(
        randomHeight + gap, 66, canvas.height - randomHeight, false
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
  board.draw()
  //ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  board.draw()
  flappy.draw()
  generatePipes()
  drawPipes()
  checkCollision()
  drawScore()
}

function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  clearInterval(interval)
  frames = 0
  score = 0

  const pipes = []
  interval = setInterval(update, 1000 / 60)
}

function gameOver() {
  ctx.font = '120px Helvetica'
  ctx.fillText('GAME OVER', 30, 200)
  ctx.font = '30px Helvetica'
  ctx.fillText('RELOAD PAGE TO RESTART', 180, 280)
  clearInterval(interval)
}

function checkCollision() {
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
    case 83:
      start()
      break
    default:
      break
  }
}

window.onload = function () {
  ctx.font = '25px Helvetica'
  let scoreText = 'TO START PRESS S  -  TO PUSH THE BIRD PRESS SPACE'
  ctx.fillText(scoreText, 50, 50)
  // document.getElementById("start-button").onclick = function () {

  //   start()
  // }
}