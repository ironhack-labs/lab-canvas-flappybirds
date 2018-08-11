function Obstacle(width, height, x, y, isBottom) {
  Component.call(this, width, height);
  this.isBottom = isBottom;

  this.image = new Image();
  if (this.isBottom) this.image.src = "./images/obstacle_bottom.png";
  else this.image.src = "./images/obstacle_top.png";

  this.x = x;
  this.y = y;
}
Obstacle.prototype = Object.create(Component.prototype);

Obstacle.prototype.update = function() {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};
