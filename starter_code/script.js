// CANVAS
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
// ctx.fillRect(0,0,512,512)

// GLOBALS
let interval
let images = {
  flappy: './images/flappy.png',
  bg: './images/bg.png',
  topPipe : './images/obstacle_top.png',
  bottomPipe : './images/obstacle_bottom.png',
  coin: './images/coin.png',
  rip: './images/rip.png',
}
let sound = {
  play : './images/sound.ogg',
  gameOver: './images/gameover.ogg',
}
let frames = 0
let pipes = []
let gameOn = false
let coins = []
let coinScore = 0

// CLASSES
function Board(){
  this.x = 0
  this.y = 0
  this.width = canvas.width
  this.height =  canvas.width
  this.image = new Image()
  this.image.src = images.bg
  this.draw = function(){
    if (this.x < -canvas.width) this.x = 0
    this.x -= 2
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
  this.image.onload = this.draw.bind(this)
}

class Flappy {
  constructor()  {
    this.x = 70
    this.y = 50
    this.width =  50
    this.height = 40
    this.velY = 0
    this.image = new Image()
    this.image.onload = this.draw.bind(this)
    this.image.src = images.flappy
  }
  draw() {
    if(this.y < canvas.height - this.height) this.y +=1.5 // ground limit
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  checkIfTouch(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
}

class Pipe {
  constructor(height=100, y=0, isTop = true) {
    this.x = canvas.width - 60
    this.y = y
    this.width = 60
    this.height = height
    this.image = new Image()
    this.image.onload = this.draw.bind(this)
    this.image.src = isTop ? images.topPipe : images.bottomPipe
  }
  draw() {
    this.x--
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
class Coin {
  constructor(y=250) {
    this.x = canvas.width - 45
    this.y = y
    this.width = 30
    this.height = 30
    this.image = new Image()
    this.image.onload = this.draw.bind(this)
    this.image.src = images.coin
  }
  draw() {
    this.x--
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
// class Coin extends Pipe {
//   constructor(y){
//     this.y = y
//     this.width = 15
//     this.height = 15
//     this.image.src = images.coin
//   }
// }
let music = new Audio()
  music.src = sound.play
  music.loop = true
  music.currentTime = 0

  let gameOverSound = new Audio()
  gameOverSound.src = sound.gameOver
  gameOverSound.currentTime = 0

// INSTANCES
let board = new Board()
let flappy = new Flappy()

// MAIN FUNCTIONS
function start() {
  interval = setInterval(update, 1000/60)
  music.currentTime = 0
  music.play()
  gameOn = true
  pipes = []
  coins = []
  frames = 0
  coinScore = 0
 }

function update() {
frames++
board.draw()
generatePipes()
updatePipes()
updateCoins()
flappy.draw()
checkCollision()
checkCoin()
score()
console.log(coins)
}
function gameOver() {
  clearInterval(interval)
  gameOn = false
  music.pause()
  gameOverSound.play()
  let rip = new Image()
  rip.src = images.rip
  rip.onload = function draw() {ctx.drawImage(rip, 200, 80, 60, 60)}
  ctx.font = "40px Avenir"
  ctx.fillStyle = "red"
  ctx.fillText("GAME OVER", 120,200)
  ctx.font = "20px Avenir"
  ctx.fillStyle = "black"
  ctx.fillText("Your score: " + coinScore, 170,240)
  ctx.fillText("Space bar to start again", 140,280)
}

// AUX FUNCTIONS

function generatePipes() {
  let times = [200]
  let i = Math.floor(Math.random()* times.length)
  if(frames%times[i] ===0) {
  let height = Math.floor(Math.random() * canvas.height * 0.6) + 50
  let top = new Pipe(height)
  let y = height + 170
  let coinY = (height + 85)
  let height2 = canvas.height - y
  let bottom = new Pipe (height2, y, false)
  let coin = new Coin (coinY)
  pipes.push(top)
  pipes.push(bottom)
  coins.push(coin)
  }
}
function updatePipes() {
  pipes.forEach((pipe, index)=> {
      if(pipe.x <-80) pipes.splice(index, 1)
      pipe.draw()
    })
}
function updateCoins() {
  coins.forEach((coin, index)=> {
      if(coin.x <-20) coins.splice(index, 1)
      coin.draw()
    })
}
function checkCollision() {
  pipes.forEach(pipe => {
    if(flappy.checkIfTouch(pipe)) {
      gameOver()
    }
  })
}
function checkCoin() {
  coins.forEach((coin, index) => {
    if(flappy.checkIfTouch(coin)) {
      coinScore ++
      coins.splice(index, 1)
    }
  })
}

function score() {
  ctx.fillStyle="black"
  ctx.font = "12px Avenir"
  ctx.fillText("SCORE: " + coinScore, 440,10)
}

// LISTENERS
addEventListener('keydown', e=> {
  switch (e.keyCode){
    case 32:
    if(!gameOn) start()
    if(flappy.y > flappy.height) flappy.y -= 70
    break
    case 38:
    if(flappy.y > flappy.height) flappy.y -= 70
    break
  }
})
addEventListener('touchstart', e=> {
  if(!gameOn) start()
  if(flappy.y > flappy.height) flappy.y -= 70
})