function Player(game) {
  this.game = game;
  this.x = this.game.canvas.width*0.08;
  this.y0= this.game.canvas.height*0.8;
  this.y = this.y0;
  this.img = new Image();
  this.img.src = "images/flappy.png";
  this.w = 50;
  this.h=75;

  this.vy = 1;
  // faltaria añadir el setlistener para moverl el pajaro
  this.setListeners();
}


var TOP_KEY = 38;
var SPACE = 32;


Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
}

Player.prototype.setListeners = function () {
  document.onkeydown = function(event) {
    if (event.keyCode === SPACE && this.y == this.y0) {
      this.y -= 5;
      this.vy -= 10;
    }
  }.bind(this);
}

Player.prototype.move = function() {
  var gravity = 0.4;
  if (this.y >= this.y0) {
    this.vy = 1;
    this.y = this.y0;
  } else {
    this.vy += gravity;
    this.y += this.vy;
  }
}