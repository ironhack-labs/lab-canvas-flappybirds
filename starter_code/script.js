const $canvas = document.querySelector('canvas')
const ctx = $canvas.getContext('2d')
const offset = 5
let obs = []
let $startButton
let bg
let flappy
let pipe
let intervalId
let score = 0
let frames = 0


class Flappy {
  constructor(){
    this.x = 100
    this.y = 100
    this.width = 50
    this.height = 50
    this.jump = 60
    this.img = new Image()
    this.img.src = "./images/flappy.png"
    this.img.onload = () => this.draw()
  }

  draw() {
    if( this.y +this.height >= $canvas.height) GameOver()
    this.y += offset

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  moveUp() { this.y -= (this.y <=0 ) ? 0 : this.jump }

  isTouching(pipe) {
    return (
      (this.x > pipe.x -pipe.width &&
      this.y < pipe.y - (flappy.jump + 80) &&
      this.x < pipe.x + pipe.width) ||
      (
        this.x > pipe.x -pipe.width &&
        this.y > pipe.y - this.height &&
        this.x < pipe.x + pipe.width &&
        this.y > pipe.y - this.height
      )
    
    )
  }
}



class Board {
  constructor(){
    this.x = 0
    this.img = new Image()
    this.img.src = "./images/bg.png"
    this.img.onload = () => this.draw()
  }

  draw() {
    if(this.x <= -$canvas.width) this.x = 0
    this.x -= offset

    ctx.drawImage(this.img, this.x,0, $canvas.width, $canvas.height)
    ctx.drawImage(this.img, this.x + $canvas.width,0, $canvas.width, $canvas.height)
  }
}



class Obstacle {
  constructor(safezone){
    this.x = $canvas.width
    this.y = safezone + flappy.jump + 80
    this.width = 50
    this.height = safezone

    this.img = new Image()
    this.img2 = new Image()
    this.img.src = "./images/obstacle_top.png"
    this.img2.src = "./images/obstacle_bottom.png"
    this.img.onload = () => this.draw()
  }

  draw() {
    this.x -= offset

    ctx.drawImage(this.img, this.x, 0, this.width, this.height)
    ctx.drawImage(this.img2, this.x , this.y, this.width,  $canvas.height -this.y)
  }

  isOut(){ return ( this.x < 0 - this.width) }
}


function drawScore(){
  ctx.fillStyle = "white"
  ctx.font = "36px Arial"
  ctx.fillText("Score: " + score, $canvas.width/2-100, 80)
}

function checkCollition(){
  obs.forEach( pipe =>  (flappy.isTouching(pipe)) ? GameOver() : null )
}

function GameOver(){
  clearInterval(intervalId)
  ctx.fillStyle = "black"
  ctx.fillRect(($canvas.width /2) -255,100,510,260)
  ctx.clearRect(($canvas.width /2) -250,105,500,250)

  ctx.font = "45px Arial"
  ctx.fillStyle = "red"
  ctx.fillText("GAME  OVER", ($canvas.width /2) -120, 170)

  ctx.font = "24px Arial"
  ctx.fillStyle = "black"
  ctx.fillText("YOUR SCORE IS: "+score, ($canvas.width /2) -100, 250)
  ctx.fillText("PRESS R TO RESTART", ($canvas.width /2) -120, 320)
}

function drawPipes(){
  obs.forEach( (pipe, i) => {
    ( pipe.isOut() ) ? removePipe(i) : null
    pipe.draw()
  })
}

function removePipe(i){
  score++
  obs.splice(i,1)
}

function update(){
  const safezone = Math.floor(Math.random() * ($canvas.height - 200)) +10
  frames++
  if( frames % 90 === 0) obs.push(new Obstacle(safezone) )

  ctx.clearRect(0,0,$canvas.width, $canvas.height)
  bg.draw()
  flappy.draw()
  drawPipes()
  checkCollition()
  drawScore()
}

function restartGame(){
  obs = []
  frames = 0
  score = 0
  flappy.y = 50
  startGame()
}

function startGame() {
  intervalId = setInterval(update, 1000/60)
}

window.onload = function() {
  bg = new Board()
  flappy = new Flappy()
  $startButton = document.querySelector('#start-button')

  $startButton.onclick = function() {
    $startButton.blur()
    startGame();
  };
};


window.onkeydown = function({keyCode}){
  switch(keyCode){
    case 32: return flappy.moveUp()
    case 82: return restartGame()
  }
}