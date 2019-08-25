const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval
const pipes = []
let audio

class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = './images/townsville.png'
    this.img.onload = () => {
      this.draw()
    }
    // this.audio = new audio();
    // this.audio.scr = './ppg-music.wav';
    // this.audio.onload = () => {
    //   this.playAudio()
    // }
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
      this.height,
    )
  }
}

class Flappyoso {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 100
    this.height = 41
    this.img = new Image()
    this.img.src = './images/buttercup1.png'
    this.imgFail = new Image()
    this.imgFail.src = './images/buttercupf.png'
    this.img2 = new Image()
    this.img2.src = './images/buttercup2.png'
    this.img3 = new Image()
    this.img3.src = './images/buttercup3.png'
    this.img4 = new Image()
    this.img4.src = './images/buttercup4.png'
  }
  draw(flappyType, alive=true) {
    if(!alive ) {
      ctx.drawImage(this.imgFail,this.x,this.y,this.width,this.height)
      
    } else {
      if(flappyType === 'normal'){
        this.y ++
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
      } else if (flappyType === 'f1'){
        this.y ++
        ctx.drawImage(this.img2,this.x,this.y,this.width,this.height)
      } else if (flappyType === 'f2'){
        this.y ++
        ctx.drawImage(this.img3,this.x,this.y,this.width,this.height)
      } else if (flappyType === 'f3'){
        this.y ++
        ctx.drawImage(this.img4,this.x,this.y,this.width,this.height)
      } else if (flappyType === 'ff') {
        ctx.drawImage(this.imgFail,this.x,this.y,this.width,this.height)
      }
    }
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
    this.imgTop.src = './images/ppg-top.png'
    this.imgBot = new Image()
    this.imgBot.src = './images/ppg-bottom.png'
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
  ctx.font = '35px Sonsie One'
  ctx.fillStyle = '#111';
  ctx.fillText(`Score: ${score}`, 550, 30)
}


function generatePipes() {
  const min = 40
  const max = 100
  const ventanita = 140
  if (frames % 200 === 0) {
    const randomHeight = Math.floor(Math.random() * (max - min))
    pipes.push(new Pipe(0, 50, randomHeight, true))
    pipes.push(
      new Pipe(
        randomHeight + ventanita,
        50,
        canvas.height - randomHeight,
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
  if(score<=1){
    flappy.draw('normal')
  } else if(score>1 && score <=3) {
    flappy.draw('f1')
  } else if(score>3 && score <=4) {
    flappy.draw('f2')
  } else if(score>4 ) {
    flappy.draw('f3')
  }
  generatePipes()
  drawPipes()
  checkCollition()
  drawScore()
}

function start() {
  interval = setInterval(update, 1000 / 60)
}

function gameOver() {
  ctx.font = '50px Sonsie One'
  ctx.fillStyle = '#213867';
  ctx.fillText('Game Over', canvas.width / 2 - 140, 200)
  clearInterval(interval)
  flappy.draw(flappyType='ff', alive=false)
}

function checkCollition() {
  if (flappy.y > canvas.height - flappy.height) return gameOver()
  pipes.forEach(pipe => {
    if (flappy.isTouching(pipe)) return gameOver()
  })
}

start()

document.onkeydown = e => {
  switch (e.keyCode) {
    case 32:
      flappy.fly()
      break

    default:
      break
  }
}