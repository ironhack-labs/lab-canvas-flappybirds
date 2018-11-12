// canvas
var canvas = document.getElementById("canvas")
var ctx  = canvas.getContext('2d')

//variables
var interval
var frames = 0
//var myMusic;
var soundDie = document.createElement('audio')
var soundStart = document.createElement('audio')
var soundContinue = document.createElement('audio')
soundContinue.src="http://66.90.93.122/ost/mario-bros/womtacyc/05%20mb%20stage%20theme%202.mp3"
soundDie.src="http://66.90.93.122/ost/mario-bros/leyqroln/09%20mb%20game%20over.mp3"
soundStart.src="http://66.90.93.122/ost/mario-kart-64/pgpwymbj/25%20Starting%20Race%203.mp3"
var images = {
 bg:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
 flappy:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
 logo:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/logo.png?raw=true",
 obstacle_bottom:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
 obstacle_top:"https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"
}
var pipes = []
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
   this.x-=2
   if(this.x < -this.width) this.x = 0
   ctx.drawImage(this.image, this.x, this.y,this.width,this.height)
   ctx.drawImage(this.image, this.x+this.width, this.y,this.width,this.height)

  }

 this.drawScore = function(){
   ctx.font = "bold 24 Avenir"
   ctx.fillText("score : "+Math.floor(frames/60),50,50)
 }
}

function Flappy(){// clase de flappy, instancia de flappy y ponerlo en update
      Board.call(this)
      this.x = 100 
      this.y = 200
      this.width = 50
      this.height = 50
      this.image.src = images.flappy
      this.draw = function(){
        this.boundaries()
        //if(this.y > canvas.height) this.y = canvas.height
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      }

      this.boundaries = function(){
        if(this.y+this.height > canvas.height-10){
          this.y = canvas.height-this.height
        }else if(this.y < 20) {
          this.y=20
        }
        else this.y*=1.01
      }

      this.isTouching = function(item){
          return (this.x < item.x + item.width) &&
          (this.x + this.width > item.x) &&
          (this.y < item.y + item.height) &&
          (this.y + this.height > item.y);
      }
}//flappy

function Pipe(height, position, altura){
  this.x = canvas.width + 100
  this.y = altura
  this.width = 60
  this.height = height
  this.image = new Image()
  this.image.src = position === "top" ? images.obstacle_top : images.obstacle_bottom
  this.draw = function(){
    this.x-=5
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


//instances
var bg = new Board()
var flappy = new Flappy()
var pipe = new Pipe()


//main functions

function start(){
  pipes = []
  frames = 0
  flappy = new Flappy()
  soundStart.play()

  if(!interval) interval = setInterval(update,1000/60)//para que no se acelere

}
function update(){
  frames++
  if(frames > 3){
    soundContinue.play()
  }

 ctx.clearRect(0,0,canvas.width,canvas.height)
 bg.draw()
 flappy.draw()
 pipe.draw()
 drawPipes()
 bg.drawScore()
 checkFlappyCollition()

}
function gameOver(){
clearInterval(interval)
interval = null
ctx.font = "bold 40px Arial"
ctx.fillText("Game Over",100,200)
ctx.fillText("Tu score: " + Math.floor(frames/60), 200, 300)
ctx.fillText("Reinicas? presiona Return",50,400)
}

//aux functions
function drawCover(){
 var img = new Image()
 img.src = images.logo
 img.onload = function(){
   ctx.drawImage(img,50,100,300,100)
   ctx.font = "bold 24px Avenir"
   //ctx.fillStyle = "white"
   ctx.fillText("Presiona la tecla 'Return' para comenzar", 50, 300)
 }
}

function generatePipes(){
      if(frames%100===0){
      //necesitamos una altura
      
      var height = Math.floor(Math.random()*1000)

      if(height > 500){
        var height = Math.floor(Math.random()*200)
        pipes.push(new Pipe(height, "bot", canvas.height - height))
      }else {
        var height = Math.floor(Math.random()*200)

      pipes.push(new Pipe(height, "top", 0))
    }
      }
}

function drawPipes(){
      
      generatePipes()
      pipes.forEach(function(pipe){
        pipe.draw()
      })
}

function checkFlappyCollition(){//flappy choca
  for(var pipe of pipes){
    if(flappy.isTouching(pipe)){
      soundContinue.pause()
      soundDie.play()
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


addEventListener('keydown',function(e){
  switch(e.keyCode){
    case 32:
        flappy.y -=40
      return
    default:
      return
  }
 })

drawCover()