var canvas         = document.getElementById("canvas");
var ctx            = canvas.getContext("2d");
var board          = new Board();
var flappy         = new Flappy();
var frames         = 0;
var pipesbot       = [];
var pipestop       = [];
var interval;

function Board(){
  this.x              = 0;
  this.y              = 0;
  this.width          = canvas.width;
  this.height         = canvas.height;
  this.img            = new Image();
  this.img.src        = "images/bg.png";
  this.score          = 0;
  this.fly            = new Audio();
  this.fly.src        = "audios/jump.mp3";
  this.crash          = new Audio();
  this.crash.src      = "audios/gameover.mp3";
  this.back           = new Audio();
  this.back.src       = "audios/Naruto_Theme_Song_-_Bad_Flute_Cover_PV01JnAmO4w.mp3.crdownload";

  this.img.onload = function(){
    this.draw();
  }.bind(this);
  
  this.draw = function(){
    this.move();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
  };

  this.drawScore = function(){
    this.score = Math.floor(frames / 60)
    ctx.font = "50px sans";
    ctx.fillStyle = "white"
    ctx.fillText(this.score, this.width/2 - 20, this.y + 50);
  };

  this.move = function(){
    this.x --;
    if (this.x < -this.width) 
      this.x = 0;
  };
};

function Flappy(){
  this.x        = 150;
  this.y        = 230;
  this.width    = 40;
  this.height   = 35;
  this.img      = new Image();
  this.img.src  = "images/flappy.png";

  this.img.onload = function(){
    this.draw();
  }.bind(this);

  this.draw = function(){
    this.y += 1.5;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (this.y < 0 || this.y > canvas.height + 55) 
      gameOver();
  };

  this.move = function(){
    this.y -=30;
  };

  this.isTouching = function(pipe){
    return (this.x < pipe.x + pipe.width) && (this.x + this.width > pipe.x) && (this.y < pipe.y + pipe.height) && (this.y + this.height > pipe.y);
  };
};

function Pipes(y, h){
  this.x            = canvas.width - 50;
  this.y            = y;
  this.width        = 50;
  this.height       = h;
  this.imgtop       = new Image();
  this.imgbot       = new Image();
  this.imgtop.src   = "images/obstacle_top.png";
  this.imgbot.src   = "images/obstacle_bottom.png"

  this.drawTop = function(){
    this.x -=1;
    ctx.drawImage(this.imgtop, this.x, this.y, this.width, this.height);
  };

  this.drawBot = function(){
    this.x -=1;
    ctx.drawImage(this.imgbot, this.x, this.y, this.width, this.height);
  };
};

function generatePipes(){
  if(!(frames % 200 === 0)) return;
  var window        = 100;
  var rndHeight     = Math.floor(Math.random() * 200) + 50;
  var pipe          = new Pipes(0,rndHeight);
  var pipe1          = new Pipes(rndHeight + window, canvas.height - (rndHeight + window));
  pipesbot.push(pipe1);
  pipestop.push(pipe);
};

function drawPipes(){
  pipestop.forEach(function(pipe){
    pipe.drawTop();
  });
  pipesbot.forEach(function(pipe){
    pipe.drawBot();
  });
};

function gameOver(){
  stop();
  ctx.font = "200 px sans";
  ctx.fillText("Game Over", 250, 100);
}

function checkCollition(){
  pipesbot.forEach(function(pipe){
    if (flappy.isTouching(pipe)) 
    gameOver();    
  });
  pipestop.forEach(function(pipe){
    if (flappy.isTouching(pipe)) 
    gameOver();    
  });
}

function update(){
  generatePipes();
  frames ++;
  console.log(frames);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  flappy.draw();
  drawPipes();
  board.drawScore();
  checkCollition();
};

function start(){
  if (interval > 0) 
    return;
  interval = setInterval(function(){
    update();
  }, 1000/60);
  flappy.y = 230;
  pipesbot = [];
  pipestop = [];
  frames = 0;
  board.back.play();
};

function stop(){
  board.back.pause();
  board.crash.play();
  clearInterval(interval);
  interval = 0;
};

document.getElementById("start-button").addEventListener("click", start);

addEventListener("keydown", function(key){
  if (key.keyCode === 32){
    board.fly.play();
    flappy.move();
  };
});