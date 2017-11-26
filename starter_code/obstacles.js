function ObstacleTop(canvas, width, height, y) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.obstacleTopImg = new Image();
  this.obstacleTopImg.src = 'images/obstacle_top.png';
  this.obstacleTopImg.isReady = false;
  this.obstacleTopImg.onload = (function() {
    this.obstacleTopImg.isReady = true;
  }).bind(this);
  this.x = 20;
  this.y = y;
  this.width = width;
  this.height = height;
}

ObstacleTop.prototype.draw = function() {
  this.ctx.save();
  this.ctx.drawImage(this.obstacleTopImg, this.x, this.y, (4 * 13.8), (4 * 79.3))
  this.x += 2;
  this.ctx.restore();
}

ObstacleTop.prototype.update = function() {
  this.draw();
}
