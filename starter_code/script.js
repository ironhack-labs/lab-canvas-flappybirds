var canvas = document.getElementById('gameBoard');
var ctx = canvas.getContext('2d');

//ctx.fillRect(0,0,canvas.width, canvas.height);
//CLASSES
function Board (){
  this.x = 0 ;
  this.y = 0;
  this.width = canvas.width;
  this.height  = canvas.height;
  this.img = new Image ();
  this.img.src = "images/bg.png";
  this.score = 0;

  this.img.onload = function(){
    this.draw();
  }.bind(this);
                       
  this.move = function(){
    this.x--;
    if (this.x< -canvas.width ) this.x = 0;
  }

  this.draw = function (){
    this.move();
    ctx.drawImage (this.img, this.x, this.y, this.width,this.height);
    ctx.drawImage (this.img, this.x + canvas.width ,this.y, this.width, this.height );
  }
  this.drawScore = function(){
    this.score = Math.floor (frames / 60);
    ctx.font = "50px Avenir";
    ctx.fillStyle = "orange";
    ctx.fillText(this.score, this.width / 2, this.y+50);
  };
}//end of Board

//Flappy
function Flappy(){
  this.x = 150;
  this.y = 150;
  this.width = 30;
  this.height = 30;
  this.img = new Image();
  this.img.src = "images/flappy.png"
 
  this.img.onload = function(){
    this.draw();
  }.bind(this);

  this.draw = function (){
    this.y += 1;
    ctx.drawImage (this.img, this.x, this.y, this.width, this.height);
    if (this.y < 0 || this.y > canvas.height - this.height) gameOver();
  }
  this.move = function (){
    this.y -= 50; 
  }
  this.isTouching = function (pipe){
        
    return (this.x < pipe.x + pipe.width)&&
           (this.x + this.width > pipe.x)&&
           (this.y < pipe.y + pipe.height)&&
           (this.y + this.height > pipe.y);
  };
}

//PIPES
function Pipe (y, height){
  this.x = canvas.width ;
  this.y = y;
  this.width = 50;
  this.height = height;
 
  this.draw = function (){
    this.x --;
    ctx.fillStyle = "black"
    ctx.fillRect (this.x, this.y, this.width, this.height);
  }
}






//DECLARACIONES
var board = new Board();
var flappy = new Flappy ();
var pipes = [];

var interval;
var frames = 0 ;

//AUX FUNCTIONS
function generatePipes (){
    if (!(frames%300=== 0)) return;
    var window  = 120;
    var randomHeight = Math.floor(Math.random() * 200)+ 50;
    var pipe = new Pipe(0, randomHeight);
    var pipe2 = new Pipe(randomHeight + window, canvas.height - (randomHeight + window));
    pipes.push(pipe);
    pipes.push (pipe2);
}

function drawPipes(){
 pipes.forEach (function(pipe){
   pipe.draw();
 });
}

//para detener el juego
function gameOver(){
  stop();
  ctx.font = "120px courirer"
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 8;
  ctx.strokeText("Game Over", 50, 200);
}

//VALIDATION FUNCTIONS , VA A VALIDAR QUE EL JUEGO ESTE TERMINADO, O QUE EL PERSONAJE GANA O PIERDE PUNTOS ETC 
function checkCollition (){
  pipes.forEach(function(pipe){
    if(flappy.isTouching(pipe)) gameOver();
  });
}



// MAIN FUNCTIONS
function update(){
  generatePipes();
  frames ++;
  console.log(frames);
 
  ctx.clearRect(0,0, canvas.width, canvas.height);
  board.draw();
  drawPipes();
  flappy.draw();
  board.drawScore();
 
  checkCollition();
}





function startGame (){
  if (interval > 0 ) return ;
  
  interval = setInterval (function (){
    update();
  }, 1000/60);
  flappy.y = 150;
  pipes = [];
  board.score = 0;
  frames = 0;
}

function stop (){
  clearInterval (interval);
  interval = 0;
}



//LISTENERS OR OBSERVERS 

  window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      startGame();
    };

addEventListener('keydown',function(e){
    if (e.keyCode === 32){
      flappy.move();
    } 
  })}
