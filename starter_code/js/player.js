function Player(game) {
  this.game = game;
 
  this.x = this.game.canvas.width * 0.08;
  this.y0 = this.game.canvas.height * 0.6;
  this.y = this.y0;

  this.img = new Image();
  this.img.src = './images/flappy.png';
  this.img.frames = 1;
  this.img.frameIndex = 0;

  this.w = 50;
  this.h = 50;

  this.vy = -1;
  this.a = 1.5;

  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    Math.floor(this.img.width / this.img.frames),
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );
};

Player.prototype.setListeners = function() {
  document.onkeypress = function(event) {
    if (event.keyCode === SPACE && this.y == this.y0) {
      this.y -= 3;
      this.vy -= 15;
    }
  }.bind(this);


  

};



Player.prototype.move = function() {
  var gravity = 0.4;

  if (this.y >= this.y0) {
    this.vy = 1;
    this.y = (this.y0);
  } else {
    this.vy += gravity;
    this.y += this.vy;
  }
 
};

var TOP_KEY = 38;
var SPACE = 32;

