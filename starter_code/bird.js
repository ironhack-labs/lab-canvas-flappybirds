var UP_KEY = 38;
var gravity = 0.05;

function Bird(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext('2d');
  this.img = new Image();
  this.img.src = 'images/flappy.png';
  this.img.isReady = false;
  this.img.scale = 0.3;
  this.img.onload = (function() {
    this.img.isReady = true;
  }).bind(this);
  this.x = 200;
  this.y = 300;
  this.yspeed = 1;
  this.yconstant = 2;
  document.onkeydown = this.onKeyDown.bind(this);
}

Bird.prototype.birdPosition = function() {
  return flappyPosition = [this.x, this.y, 50, 40]
};

Bird.prototype.draw = function() {
  this.ctx.drawImage(this.img, this.x, this.y, 50, 40);
};

Bird.prototype.update = function() {
  this.draw();
  this.yspeed += gravity;
  this.y += this.yspeed;
};

Bird.prototype.onKeyDown = function(event) {
  if (event.keyCode == UP_KEY) {
    this.moveToUp();
  }
};

Bird.prototype.moveToUp = function() {
  this.y -= 50;
  this.yspeed = 1
};

Bird.prototype.flappyFalls = function() {
  this.draw();
  this.yspeed += gravity;
};
