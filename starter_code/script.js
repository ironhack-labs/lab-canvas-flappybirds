var canvas = document.getElementById("game-board");
var ctx = canvas.getContext("2d");


var tablerito = new Tablero();
var flappyto = new Flappy();
var intervalo;
var frames = 0;
var pipes = [];





function Tablero() {
  this.x = 0;
  this.y = 0;
  this.width= canvas.width;
  this.height= canvas.height;
  this.img = new Image();
  this.img.src = "images/bg.png";
  this.score = 0;
  this.music = new Audio();
  this.music.src = "http://66.90.93.122/ost/dueling-ages-the-sonic-time-twisted-original-soundtrack/esjerwoc/30%20-%20Enter%20Galacnik.mp3";

  this.img.onload = function(){
    this.draw();
    }.bind(this);

  this.move = function(){
      this.x--;
      if (this.x < -canvas.width) this.x = 0;
    }


  this.draw = function(){
      this.move();
      ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
      ctx.drawImage(this.img,this.x + canvas.width ,this.y,this.width,this.height);
    }
  
  this.drawScore = function(){
    this.score = Math.floor( frames / 60 );
    ctx.font = "50px Avenir"
    ctx.fillStyle = "yellow"
    ctx.fillText(this.score,this.width / 2,this.y + 50);
  }

  

   

}

function Flappy(){
  this.x = 100;
  this.y = 180;
  this.width = 40;
  this.height = 35;
  this.img = new Image();
  this.img.src = "images/flappy.png";

  this.img.onload = function(){
    this.draw();
  }.bind(this);

  this.draw = function() {
    this.y += 1;
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);

    if(this.y < 0 || this.y > canvas.height - this.width) gameOver();
  }

  this.move = function(){
    this.y -= 20;
  }
  this.isTouching = function(pipe){
    return(this.x < pipe.x + pipe.width) && (this.x + this.width > pipe.x) && (this.y < pipe.y + pipe.height) && (this.y + this.height > pipe.y);
      }

}

function Pipes(y,height){
  this.x= canvas.width - 1;
  this.y = y;
  this.width= 60;
  this.height= height;
  this.img = new Image();
  this.img.src = "images/obstacle_top.png";

  this.img.onload = function(){
    this.draw();
  }.bind(this);

  this.move = function(){
    this.x --;
  }

  this.draw = function(){
    this.move();
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
   
  }
}

function Pipes2(y,height){
  this.x= canvas.width - 1;
  this.y = y;
  this.width= 60;
  this.height= height;
  this.img = new Image();
  this.img.src = "images/obstacle_bottom.png";

  this.img.onload = function(){
    this.draw();
  }.bind(this);

  this.move = function(){
    this.x --;
  }

  this.draw = function(){
    this.move();
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
   
  }
}


function generatePipes(){
  
  if(!(frames % 200 === 0))return;
  
  var randomHeight = Math.floor(Math.random() * 150 );
  var pipe1 = new Pipes(0,randomHeight + 30);
  var pipe2 = new Pipes2(randomHeight + 150, 400 )
  pipes.push(pipe1);
  pipes.push(pipe2);
}

function drawPipes(){
  pipes.forEach(function(pipe){
    pipe.draw();
  })
}






function start(){

  tablerito.music.play();

  if( intervalo > 0 ) return;

  intervalo = setInterval(function(){
    update();
  },1000 / 60 ); 

  flappyto.y = 180;
  pipes = [];
  tablerito.score = 0;
  frames = 0;
}

function update(){
  generatePipes();
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  tablerito.draw();
  drawPipes();
  flappyto.draw();
  tablerito.drawScore();
  checkCollition();
  

}

function stop(){
  clearInterval(intervalo);
  intervalo = 0;
  tablerito.music.pause();
  
  }

function gameOver(){

  stop();
  ctx.font = "60px Courier";
  ctx.fillStyle = "Black";
  ctx.fillText("Game Over", 210, 200 );
  ctx.font = "30px Courier";
  ctx.fillText("Press 'R' for start...loser!",130,240 );
}

function checkCollition(){
  pipes.forEach(function(pipe){
     if(flappyto.isTouching(pipe))gameOver();
  });
}




document.getElementById("start-button").addEventListener("click", start);



addEventListener("keydown",function(e){
  if(e.keyCode === 13){
    console.log("el enter si sirve");  
    start();
  }
  if(e.keyCode === 38){
    console.log("parriba sirve");
    flappyto.move();
  }
  if(e.keyCode === 80 ){
    stop();
  }
  if(e.keyCode === 82 ){
    start();
  }
})
