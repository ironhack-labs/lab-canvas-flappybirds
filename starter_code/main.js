//constantes
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var frames = 0;
var score = 0;
var interval;
var images = {
  flappy:'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true',
  pipeTop: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true',
  pipeBottom: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true',
  bg: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true'
}

var pipes = [];

//classes
class Board{
  constructor(){
    this.x=0;
    this.y=0;
    this.width=canvas.width;
    this.height=canvas.height;
    this.image = new Image();
    this.image.src =images.bg;
    this.image.onload = function(){
      this.draw();
    }.bind(this);
  }
  draw(){
    this.x--;
    if(this.x === -this.width)this.x = 0;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    ctx.drawImage(this.image,this.x+this.width,this.y,this.width,this.height); //segunda imagen
  }
  gameOver(){
    ctx.fillStyle = 'white';
    ctx.font = "80px Avenir";
    ctx.fillText("Game Over", 200, 250);
  }
  score(){
    ctx.fillStyle = "white";
    ctx.font = "40px Avenir";
    ctx.fillText("Score: " + score, 20, 50)
  }
}

class Faby{
  constructor(){
    this.x = 100;
    this.y = 100;
    this.width = 32;
    this.height = 24;
    this.image = new Image();
    this.image.src = images.flappy;
    this.image.onload = function(){
        this.draw();
    }.bind(this)
    this.gravity = 1.5;

  }

rise(){
    this.y-=30;
  }

isTouching(item){
    return  (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
  }


draw(){
    this.y+=this.gravity;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
  }

}

class Pipe{
  constructor(position, y, height){
      this.x = canvas.width;
      this.y = y;
      this.width = 60;
      this.height = height;
      this.image = new Image();
      this.image.src = position === 'top' ? images.pipeTop : images.pipeBottom;
      this.image.onload = function(){
          this.draw();
      }.bind(this)
  }
  draw(){
      this.x-=2;
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
  }
}

//instances
var board = new Board();
var faby = new Faby();

//main function

function update (){
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height);
  board.draw();
  faby.draw();
  generatePipes();
  drawPipes();
  checkDeath();
  scoreUpdate();
  board.score();
}

function start(){
  interval = setInterval(update,1000/60);
}

//aux function
function generatePipes(){
  if(!(frames%100===0) ) return;
  var height = Math.floor((Math.random() * canvas.height * .6 ) + 30 );
  var pipe1 = new Pipe('top', 0, height);
  var pipe2 = new Pipe(null, pipe1.height + 80, canvas.height - pipe1.y - 80)
  pipes.push(pipe1);
  pipes.push(pipe2);
}

function drawPipes(){
  pipes.forEach(function(pipe){
      pipe.draw();
      if(faby.isTouching(pipe)){
          death();
      }
  });  
}

function checkDeath(){
  if (faby.y <=0 || faby.y >= canvas.height-faby.height) {
    death();
  }
}

function scoreUpdate(){
  if (frames%100 === 0) score++;
}

function death(){
  board.gameOver();
  clearInterval(interval);
  interval = undefined;
}

function restart(){
  if(interval) return;
  pipes = [];
  frames = 0;
  faby.x = 100;
  faby.y = 100;
  score = 0;
  start();
}


//listeners
addEventListener('keydown', function(e){
  if(e.keyCode === 66 || e.keyCode === 32 || e.keyCode === 38){
      faby.rise();
  }else if(e.keyCode === 27){
      restart();
  }
})



start();