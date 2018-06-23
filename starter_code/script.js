var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//test
//ctx.fillRect(0,0,50,50);

//constantes
var frame = 0;
var interval;
images = {
  flappy: "./images/flappy.png",
  bg: "./images/bg.png",
  pipeBottom: "./images/obstacle_bottom.png",
  pipeTop: "./images/obstacle_top.png"
}
var pipes = []; 

//class

class Background {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = images.bg;
    this.image.onload = function(){
      this.draw()
    }.bind(this)
  }

  gameOver(){
    ctx.font = "80px Serif";
    ctx.fillText("Game Over", 20,100);
    ctx.font = "20px Serif";
    ctx.fillStyle = 'black';
    ctx.fillText("Press 'Esc' to reset", 20,150);
  }

  draw(){
    this.x--;
    if(this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + canvas.width, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.font = '20px Serif';
    ctx.fillText(Math.floor(frame / 60), this.width -100, 50 )
  }
}

class Flappy {
  constructor(){
    this.x = 80;
    this.y = 100;
    this.width = 50;
    this.height = 50;
    this.gravity = 2.9;
    this.image = new Image ();
    this.image.src = images.flappy;
    this.image.onload = function(){
      this.draw();
    }.bind(this)
  }
  isTouching(item){
    return  (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
  }

  draw(){
    this.y += this.gravity;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Pipe {
  constructor(position,height=50, y=0){
    this.x = canvas.width;
    this.y = y;
    this.width = 100;
    this.height = height;
    this.image = new Image();
    this.image.src = position === "top" ? images.pipeTop : images.pipeBottom;
    this.image.onload = function(){
      this.draw();
    }.bind(this)
  }

  draw(){
    this.x-=5;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

//instances
var background = new Background();
var flappy = new Flappy();

//main Functions
function update(){
  frame++;
  ctx.clearRect(0,0,canvas.width, canvas.height);
  background.draw();
  flappy.draw();
  genratePipe();
  drawPipe();
}

function start(){
  interval = setInterval(update, 1000/60);
}
//aux Functions
function genratePipe(){
  if(frame%100 === 0){
    var height = Math.floor(Math.random() * (canvas.height * .6) + 120);
    var pipeTop = new Pipe("top",height,0);
    var pipeBottom = new Pipe("bottom", (canvas.height-height)-120, canvas.height-((canvas.height-height)-120));
    pipes.push(pipeTop);
    pipes.push(pipeBottom);
  }
}

function drawPipe(){
  pipes.forEach(function(i){
    i.draw();
    if(flappy.isTouching(i)){
      gameOver();
    }
  })
}

function gameOver(){
  clearInterval(interval);
    interval = undefined;
    background.gameOver();
}
function restart(){
    pipes = [];
    frames = 0;
    flappy.x = 100;
    flappy.y = 100;
    start();
}


//listeners
document.getElementById("start-button")
    .addEventListener("click",start);

addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 32:
      flappy.y-=50;
      break;
    case 27:
    restart();
    break;
  }
})