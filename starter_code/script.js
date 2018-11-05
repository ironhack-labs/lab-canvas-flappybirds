

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function Canvas(id){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
}

  function Background(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.vx = 0;
    this.x = 0;
    this.y = 0;
    this.dx = 3;

    this.img = new Image();
    this.img.src = "../starter_code/images/bg.png"
  }

  Background.prototype.draw = function() {
   
      this.ctx.drawImage(this.img, this.x, this.y, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.img, this.x + this.canvas.width, this.y, this.canvas.width, this.canvas.height);

    }

Background.prototype.move = function(){
  this.x -= this.dx;

  if (this.x < -this.canvas.width) this.x = 0; 

}

function Player(canvas){
  
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.x = 50;
  this.y = 200;
  this.width; 
  this.height;

  this.vx = 3;
  this.vy = 3;

  this.img = new Image();
  this.img.src="../starter_code/images/flappy.png";

  this.setListeners();

}

var SPACE = 32;
  
Player.prototype.draw = function(){

  this.ctx.drawImage(this.img, this.x, this.y, 60, 80)

}

Player.prototype.setListeners = function() {
  // var gravity = 0.4;
  document.onkeydown = function(event) {
    if (event.keyCode === SPACE) {
      this.y -= 5;
      this.vy -= 10;
    } 
  }.bind(this);
};

Player.prototype.move=function(){
 
  if(this.y <= 0){
    this.y = 10;
  } if (this.y >= 500 ){
    this.y = 490;
  }
  }

// Player.prototype.move = function() {
 
//   var gravity = 0.4;

//   if (this.y = this.y0) {
//     this.vy = 1;
//     this.y = this.y0;
//   } else {
    // this.vy += gravity;
    // this.y += this.vy;
//   }

  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var background = new Background(canvas);
  var player = new Player(canvas);
  





  function startGame() {
    console.log(player.draw);
     
    setInterval(function(){

      background.draw();
      player.draw();
      background.move();
      player.move();

    } , 1000/60)
    
    
  }

  
};
