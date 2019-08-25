
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const startButton = document.getElementById('start-button')
let frames = 0
let score = 0
let interval
const pipes = []

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  board.draw()
  birdPlayer.draw()
  generatePipes()
  drawPipes()
  isHitting()
  drawScore()
}

class Board {
constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image= new Image()
    this.image.src = './images/bg.png'
    this.image.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x-=1
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height
    )
    }
  }

class Birds {
constructor(x,y){
this.x = x
this.y = y
this.width = 30
this.height = 30
this.image=new Image()
this.image.src='./images/flappy.png'   

}

draw() {
    this.y++
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
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
    this.imageTop = new Image()
    this.imageTop.src ='./images/obstacle_top.png'
    this.imageBot = new Image()
    this.imageBot.src ='./images/obstacle_bottom.png'
  }
  draw() {
    this.x-=1
    if (this.type) {
      ctx.drawImage(this.imageTop, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.imageBot, this.x, this.y, this.width, this.height)
    }
  }
}

const board = new Board()
const birdPlayer = new Birds(20, 10)

function drawScore() {
  if (frames % 250 === 0) {
    score += 1
  }
  // ctx.fillStyle="#64C4E7"
  // ctx.fillRect(150,120,150,30)
  ctx.fillStyle="white"
  ctx.font = '24px Courier'
  ctx.fillText('the Score :' + score, 150, 150)
 
}

function generatePipes() {
  const min = 30
  const max = 100
  const gap = 70
  if (frames % 100 === 0) {
    const pipeHeight = Math.floor(Math.random() * (max - min))
    pipes.push(new Pipe(0, 30, pipeHeight, true))
    pipes.push(
      new Pipe(
        pipeHeight + gap,
        30,
        canvas.height - pipeHeight,
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



function start() {
  interval = setInterval(update, 900 / 60)
}


function finalScreen(){

ctx.fillStyle="#64C4E7"
ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.font='28px Lexend Deca'
ctx.fillStyle='white'
ctx.fillText(`GAME OVER !`,150,60)
ctx.fillText(`Click enter to start again`,100,90)
ctx.font='18px Lexend Deca'
clearInterval(interval)
}

function isHitting() {
  if (birdPlayer.y > canvas.height - birdPlayer.height) 
  return finalScreen()
  pipes.forEach(pipe => {
    if (birdPlayer.isTouching(pipe)) return finalScreen()
  })
}

startButton.onclick=start()

document.onkeydown = e => {
  switch (e.keyCode) {
   
    case 32:
      birdPlayer.fly()
      break
    case 13:
      location.reload()
      break

    default:
      break
  }
}

