var SPACEBAR = 32;
var gravity = 0.3;

function Bird(canvasId, sprite) {
  // debugger
  this.canvas = canvasId;
  this.ctx = this.canvas.getContext('2d');
  this.sprite = new Image();
  this.sprite.src = sprite;
  this.sprite.isReady = false;
  this.sprite.scale = 0.1;
  this.sprite.onload = (function() {
    this.sprite.isReady = true;
    this.width = this.sprite.width * this.sprite.scale;
    this.height = this.sprite.height * this.sprite.scale;
  }).bind(this);

  this.x = 50;
  this.y = 250;
  // this.speed = 5;
  this.vx = 1;
  this.vy = 2;
  this.radius = 25;

  document.onkeydown = this.onKeyDown.bind(this);
}

Bird.prototype.isReady = function() {
  return this.sprite.isReady;
};

Bird.prototype.onKeyDown = function() {
  if (event.keyCode == SPACEBAR) {
    this.push();
  }
};

Bird.prototype.push = function() {
  this.vy -= 15;
};

Bird.prototype.updateBird = function() {
  this.draw();
  // update speed!
  //this.x += this.vx;
  // Apply gravity
  this.vy += gravity;
  this.y += this.vy;
  if ((this.y + this.radius) > this.canvas.height){ // || (this.y - this.radius) < 0) {
       this.vy *= -1;
  }
  if ((this.x + this.radius) > this.canvas.width || (this.x - this.radius) < 0) {
    this.vx *= -1;
  }
};

Bird.prototype.draw = function() {
  if (this.isReady()) {
    this.ctx.drawImage(
      this.sprite,
      0,
      0,
      this.sprite.width,
      this.sprite.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
};
