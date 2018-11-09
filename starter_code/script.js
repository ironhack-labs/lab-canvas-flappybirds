// canvas
var canvas = document.getElementById("canvas")
var ctx  = canvas.getContext('2d')

//variables
var interval
var frames = 0
var images = {
  bg:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
  flappy:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
  logo:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/logo.png?raw=true",
  obstacle_bottom:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
  obstacle_top:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"
}
var pipes = []
var seconds = 3
var audio = {
  start:"http://66.90.93.122/ost/mario-kart-64/qrpjpnaq/01%20Mario%20Kart%2064%20Theme.mp3",
  play: "http://66.90.93.122/ost/mario-kart-64/qljrieoz/13%20Rainbow%20Road.mp3",
  gameOver: "http://66.90.93.122/ost/super-mario-kart-gamerip/khkvobtw/Game%20Over.mp3"
}

//classes
function Board(){
  this.x = 0
  this.y = 0
  this.width = canvas.width
  this.height = canvas.height
  this.image = new Image()
  this.image.src = images.bg
  this.image.onload = ()=>this.draw()

  this.draw = function(){
    this.x--
    if(this.x < -this.width) this.x = 0
    ctx.drawImage(this.image, this.x, this.y,this.width,this.height)
    ctx.drawImage(this.image, this.x+this.width, this.y,this.width,this.height)
  }
  this.drawScore = function(){
    ctx.font = "bold 24px Avenir"
    ctx.fillText("Score: " + Math.floor(frames/60),50,50)
  }
}

function Flappy(){
  Board.call(this)
  this.x = 100
  this.y = 200
  this.width = 40
  this.height = 30
  this.image.src = images.flappy
  // this.image.onload = ()=>this.draw()

  this.draw = function(){
    this.boundaries()
    ctx.drawImage(this.image, this.x, this.y,this.width,this.height)
  }
  this.boundaries = function(){
    if(this.y+this.height > canvas.height-10){
      this.y = canvas.height - this.height
    } 
    if(this.y < 10){
      this.y = 10
    } 
    else this.y+=2.01
  }
  this.isTouching = function(item){
    return (this.x < item.x + item.width) &&
      (this.x + this.width > item.x) &&
      (this.y < item.y + item.height) &&
      (this.y + this.height > item.y);
  }
}

// function Pipe(height,position){
// BlisS
function Pipe(height,y,position){
  this.x = canvas.width + 60
  this.y = y || 0 //position === "top" ? 0 : canvas.height - height
  this.width = 60
  this.height = height
  this.image = new Image()
  this.image.src = position === "top" ? images.obstacle_top : images.obstacle_bottom
  this.draw = function(){
    this.x-=2
    ctx.drawImage(this.image, this.x, this.y,this.width,this.height)
  }
}

//instances
var bg = new Board()
var flappy = new Flappy()
var pipe = new Pipe()
var bgSound

//main functions
function start(){
  pipes = []
  frames = 0
  seconds = 3
  flappy = new Flappy()
  bgSound = new Audio()
  bgSound.src = audio.start
  bgSound.play()
  if(!interval) interval = setInterval(update,1000/60)
}
function update(){
  frames++

  if(Math.floor(frames/60) > seconds && seconds > 0) {
    bgSound.pause()
    bgSound = new Audio()
    bgSound.src = audio.play
    bgSound.play()
    seconds = 0
  }
  ctx.clearRect(0,0,canvas.width,canvas.height)

  bg.draw()
  flappy.draw()
  drawPipes()
  bg.drawScore()
  checkFlappyCollition()
}
function gameOver(){
  clearInterval(interval)
  bgSound.pause()
  interval = null
  ctx.fillStyle = "red"
  ctx.font = "bold 80px Arial"
  ctx.fillText("GAME OVER",50,200)
  ctx.fillStyle = "black"
  ctx.font = "bold 40px Arial"
  ctx.fillText("Score: " + Math.floor(frames/60),200,300)
  ctx.fillText("Press 'enter' to restart",50,350)
  bgSound = new Audio()
  bgSound.src = audio.gameOver
  bgSound.play()
}

//aux functions
function drawCover(){
  var img = new Image()
  img.src = images.logo
  img.onload = function(){
    ctx.drawImage(img,50,100,300,100)
    ctx.font = "bold 24px Avenir"
    ctx.fillText("Press 'enter' to start",50,300)
  }
}

function generatePipes(){
  // //1. Necesitamos una altura
  // if(frames%100 === 0){
  //   var height = Math.floor(Math.random()*150)
  //   if(height % Math.floor(Math.random()*3) === 0){
  //     var position = "top"
  //   }
  //   pipes.push(new Pipe(height,position))
  // }

  //BlisS
  //1. Necesitamos una altura
  if(frames%150 === 0){
    var height = Math.floor(Math.random()*200 + 50)
    pipes.push(new Pipe(height,0,"top"))
    var h = canvas.height - height-100
    var y = canvas.height - h
    pipes.push(new Pipe(h,y))
  }
}

function drawPipes(){
  generatePipes()
  pipes.forEach(function(pipe){
    pipe.draw()
  })
}

function checkFlappyCollition(){
  for(var pipe of pipes){
    if(flappy.isTouching(pipe)){
      gameOver()
    }
  }
}


//listeners
addEventListener('keyup',function(e){
  switch(e.keyCode){
    case 13:
      return start()
    default:
      return
  }
})

//listeners
addEventListener('keydown',function(e){
  switch(e.keyCode){
    case 32:
      flappy.y -= 40
      return
    default:
      return
  }
})

drawCover()