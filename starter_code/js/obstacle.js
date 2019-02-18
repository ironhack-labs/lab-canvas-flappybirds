function Obstacle(game) {
  this.game = game
  this.imgTop = new Image()
  this.imgTop.src = "images/obstacle_bottom.png"
  this.imgBottom = new Image()
  this.imgBottom.src = "images/obstacle_bottom.png"

  this.x = this.game.canvas.width;
  this.y = this.game.canvas.height;

}

Obstacle.prototype.draw = function () {

  this.game.ctx.drawImageTop(this.imgTop, this.x, 0, this.w, this.h);
  this.game.ctx.drawImageBottom(this.imgBottom, 0, this.y, this.w, this.h);
};

Obstacle.prototype.move = function () {
  this.x -= this.dx;
}