const $canvas = document.querySelector('canvas')
const ctx = $canvas.getContext('2d')
const obs = []
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

  }
}

class Board {
  constructor(){
    this.display = 5
    this.x = 0
    this.img = new Image()
    this.img.src = "./images/bg.png"
    this.img.onload = () => this.draw()
  }

  draw() {
    if(this.x <= -$canvas.width) this.x = 0
    this.x -= this.display
    ctx.drawImage(this.img, this.x,0, $canvas.width, $canvas.height)
    ctx.drawImage(this.img, this.x + $canvas.width,0, $canvas.width, $canvas.height)

  }

}

class Obstacle {
  constructor(y){
    this.x = $canvas.width
    this.y = y
    this.width = 50
    // this.height = height
    this.img = new Image()
    this.img2 = new Image()
    this.img.src = "./images/obstacle_top.png"
    this.img2.src = "./images/obstacle_bottom.png"
    this.img.onload = () => this.draw()
    // this.img2.onload = () => this.draw()
  }

  draw() {
    this.x -= bg.display
    ctx.drawImage(this.img, this.x, 0, this.width, this.y - flappy.jump -50)
    ctx.drawImage(this.img2, this.x , this.y + flappy.jump, this.width,  $canvas.height)
  }

  isOut(){
    return ( this.x < 0 - this.width)
  }
}

function checkCollition(){


}

function drawPipes(){
  obs.forEach( (pipe, i) => {
    if( pipe.isOut() ) delPipe(i)
    pipe.draw()
  } )
}

function delPipe(i){
  obs.splice(i,1)
}

function update(){
  console.log(obs.length)
  frames++
  if( frames % 90 === 0) obs.push(new Obstacle( Math.floor(Math.random() * ($canvas.height - 20)) +10))

  ctx.clearRect(0,0,$canvas.width, $canvas.height)
  bg.draw()
  flappy.draw()
  drawPipes()
}

window.onload = function() {
  bg = new Board()
  flappy = new Flappy()

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    setInterval(update, 1000/60)
  }

};


window.onkeydown = function({keyCode}){
  switch(keyCode){
    case 32: flappy.moveUp()
  }
}