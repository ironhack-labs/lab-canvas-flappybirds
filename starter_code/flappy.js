function Flappy (game){
  this.game = game; 
  this.x = this.game.canvas.width * 0.08;
  this.y = this.game.canvas.height * 0.20;

  this.img = new Image ();
  this.img.src = "images/flappy.png";

  this.width = 65;
  this.height = 50;

  this.vy = 1;

  this.listeners ();
}

var SPACE = 32;

Flappy.prototype.listeners = function (){
  document.onkeydown = function (e){
    if (e.keyCode === SPACE){
    this.y -= 2;
    this.vy -=6;
    }
  } .bind(this);
} 

Flappy.prototype.draw = function (){
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Flappy.prototype.move = function (){
  var gravity = 0.2;

  this.vy += gravity;
  this.y += this.vy;
}

