function Obstacle(width, height, x, y, imgSrc, ctx) {
  this.width = width;
  this.height = height;
  this.ctx = ctx;
  this.x = x;
  this.y = y;

  this.img = new Image();
  this.img.src = imgSrc;
  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

  this.drawObstacles = function() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height); //!!
  };
}
