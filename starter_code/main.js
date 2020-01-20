const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let interval
let frames = 0
let score = 0 
const obstacles = []

// space 32

const images = {
  backg: './images/bg.png',
  flappy: './images/flappy.png',
  logo: './images/logo.png',
  obstacle_bot: './images/obstacle_bottom.png',
  obstacle_top: './images/obstacle_top.png',
  gameO: "./images/game-over-games-screen-glitch-computer-video-vector-22579464.jpg"
}

class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.backg
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x --
    if (this.x < -canvas.width) this.x = 0
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

class Flappy {
  constructor() {
    this.x = 100 
    this.y = 50
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
    this.y -= 50
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
  constructor(y, height, imgType) {
    this.x = canvas.width
    this.y = y
    this.height = height
    this.width = canvas.width / 10
    this.img = new Image()
    this.img2 = new Image()
    this.img.src = images.obstacle_bot
    this.img2.src = images.obstacle_top
    this.imgType = imgType
  }
  draw() {
    this.x--
    if (this.imgType) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
    }
  }
}


const flappy = new Flappy()
const board = new Board()


function generatePipes() {
  if (frames % 200 === 0) {
    const min = 100
    const max = 300
    const ventanita = 200
    const randomHeight = Math.floor(Math.random() * (max - min)) + min
    obstacles.push(new Pipe(0, randomHeight, false))
    obstacles.push(
      new Pipe(randomHeight + ventanita, canvas.height - randomHeight, true)
    )
    console.log(obstacles)
  }
}

function drawPipe() {
  obstacles.forEach(pipe => pipe.draw())
}

function checkCollitions() {
  if (flappy.y >= canvas.height - flappy.height) return gameOver()
  obstacles.forEach((pipe, i) => {
    if (pipe.x + pipe.width <= 100  ) {
      obstacles.splice(i, 1) 
    }
    flappy.isTouching(pipe) ? gameOver() : null
  })
}

function drawScore(){
  ctx.font = "80px Arial"
    ctx.fillStyle = "white"
    ctx.fillText(`${score}`, canvas.width - 650, 150);
}

function keepScore(){
  if (frames% 250 === 0 && frames> 860){
    score += 5
  }
}

function gameOver() {
  const title = "Valio Cheto"
    const msj = `Your score is: ${score}`

    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText(title, (canvas.width / 2) - 170, 100)
    ctx.fillText(msj, (canvas.width / 2) - 230, 320)
    obstacles = [] 
  clearInterval(interval)
}

window.onload = function () {
  bg = new Board()
  flappy = new Flappy()
  $startButton = document.querySelector('#start-button')
};

function start() {
  if (interval) return
  interval = setInterval(update, 1000 / 60)
}

function restart() {
  flappy.x = 30
  flappy.y = 70
  start()
}

function update() {
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  board.draw()
  flappy.draw()
  generatePipes()
  drawPipe()
  checkCollitions()
  drawScore()
  keepScore()
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
  }	  }