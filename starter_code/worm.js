function Worm(canvas, width, height, y) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.obstacleTopImg = new Image();
  this.obstacleTopImg.src = 'images/obstacle_top.png';
  this.obstacleTopImg.isReady = false;
  this.obstacleTopImg.onload = (function() {
    this.obstacleTopImg.isReady = true;
  }).bind(this);

  this.obstacleBottomImg = new Image();
  this.obstacleBottomImg.src = 'images/obstacle_bottom.png';
  this.obstacleBottomImg.isReady = false;
  this.obstacleBottomImg.onload = (function() {
    this.obstacleBottomImg.isReady = true;
  }).bind(this);

  this.x = 520;
  this.y = y;
  this.width = width;
  this.height = height;
}

Worm.prototype.obsPositionTop = function() {
return obstacleTopPosition = [this.x - 50,this.y, (4 * 13.8), (4 * 79.3)]
}

Worm.prototype.obsPositionBottom = function() {
return obstacleBottomPosition = [this.x - 50,this.y + 450, (4 * 13.8), (4 * 79.3)]
}

Worm.prototype.draw = function() {
  this.ctx.save();
  this.ctx.drawImage(this.obstacleTopImg, this.x - 50, this.y, (4 * 13.8), (4 * 79.3))
  this.ctx.drawImage(this.obstacleBottomImg, this.x - 50, this.y + 450, (4 * 13.8), (4 * 79.3))
  this.x -= 10;
  this.ctx.restore();
}

Worm.prototype.update = function() {
  this.draw();
}
