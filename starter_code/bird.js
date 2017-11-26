var UP_KEY = 38;
var gravity = 0.005;

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
  this.x = 225;
  this.y = 300;
  this.yspeed = 4;
  this.yconstant = 3;
  document.onkeydown = this.onKeyDown.bind(this);
}

Bird.prototype.draw = function() {
  this.ctx.drawImage(this.img, this.x - 25, this.y, 50, 40);
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
  this.y -= 80;
  this.yspeed = 1
};
