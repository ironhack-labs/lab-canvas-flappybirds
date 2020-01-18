const $canvas = document.querySelector('canvas')
const ctx = $canvas.getContext('2d')
const obs = []
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
    this.y += 5
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  moveUp() {
    this.y -= this.jump
  }

  isTouching(pipe) {
    return (
      (this.x > pipe.x -pipe.width &&
      this.y < pipe.y - (flappy.jump + 80) &&
      this.x < pipe.x + pipe.width) ||
      (
        this.x > pipe.x -pipe.width &&
        this.y > pipe.y &&
        this.x < pipe.x + pipe.width &&
        this.y > pipe.y - this.height
      )
    
    )
  }
}

class Board {
  constructor(){
    this.offset = 5
    this.x = 0
    this.img = new Image()
    this.img.src = "./images/bg.png"
    this.img.onload = () => this.draw()
  }

  draw() {
    if(this.x <= -$canvas.width) this.x = 0
    this.x -= this.offset

    ctx.drawImage(this.img, this.x,0, $canvas.width, $canvas.height)
    ctx.drawImage(this.img, this.x + $canvas.width,0, $canvas.width, $canvas.height)

  }

}

class Obstacle {
  constructor(y){
    this.x = $canvas.width
    this.y = y + flappy.jump + 80
    this.width = 50
    this.height = y

    this.img = new Image()
    this.img2 = new Image()
    this.img.src = "./images/obstacle_top.png"
    this.img2.src = "./images/obstacle_bottom.png"
    this.img.onload = () => this.draw()
    // this.img2.onload = () => this.draw()
  }

  draw() {
    this.x -= bg.display
    ctx.drawImage(this.img, this.x, 0, this.width, this.height)
    ctx.drawImage(this.img2, this.x , this.y, this.width,  $canvas.height -this.y)
  }

  isOut(){
    return ( this.x < 0 - this.width)
  }
}


function drawScore(){
  ctx.fillStyle = "white"
  ctx.font = "36px Arial"
  ctx.fillText("Score: " + score, $canvas.width/2-100, 80)
}

function checkCollition(){
  obs.forEach( pipe =>{
    if(flappy.isTouching(pipe)){
      console.log(pipe, flappy)
      GameOver()
    }
  })

}

function GameOver(){
  clearInterval(intervalId)
  console.log("GameOver")
}

function drawPipes(){
  obs.forEach( (pipe, i) => {
    if( pipe.isOut() ) delPipe(i)
    pipe.draw()
  } )
}

function delPipe(i){
  score++
  console.log(score)
  obs.splice(i,1)
}

function update(){
  frames++
  if( frames % 90 === 0) obs.push(new Obstacle( Math.floor(Math.random() * ($canvas.height - 200)) +10))

  ctx.clearRect(0,0,$canvas.width, $canvas.height)
  bg.draw()
  flappy.draw()
  drawPipes()
  checkCollition()
  drawScore()
}

window.onload = function() {
  bg = new Board()
  flappy = new Flappy()
  $startButton = document.querySelector('#start-button')

  $startButton.onclick = function() {
    $startButton.blur()
    startGame();
  };

  function startGame() {
    intervalId = setInterval(update, 1000/60)
  }

};


window.onkeydown = function({keyCode}){
  switch(keyCode){
    case 32: flappy.moveUp()
  }
}