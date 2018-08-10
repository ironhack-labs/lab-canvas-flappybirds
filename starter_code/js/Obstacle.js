function Obstacle(width, height, x, y, bottom) {
  this.image = new Image();
  if (bottom) this.image.src = "./images/obstacle_bottom.png";
  else this.image.src = "./images/obstacle_top.png";

  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  //   ctx = myGameArea.context;
  //   ctx.fillStyle = color;
  //   ctx.fillRect(this.x, this.y, this.width, this.height);
}

Obstacle.prototype.update = function() {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};
