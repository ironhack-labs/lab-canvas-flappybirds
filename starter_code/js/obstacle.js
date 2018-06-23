function Obstacle(game) {
  this.game = game;
  this.dx = 2;
  this.x = 700;
  this.y = 0;
  this.w = 75
  this.h = this.x
  this.gap = game.canvas.width * 0.08 * 2;   //Linkar el tamaño del gap al tamaño del player
  this.height = game.canvas.height;
  this.width = 10;
  this.imgTop = new Image();
  this.imgTop.src = "./img/obstacle_top.png";
  this.imgBottom = new Image();
  this.imgBottom.src = "./img/obstacle_bottom.png";
  this.holePosition = Math.floor(Math.random()*(200-0+1)+0);
  this.holeSize = 150;
}

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(this.imgTop, this.x, this.holePosition - this.height, 75, this.height);
  this.game.ctx.drawImage(this.imgBottom, this.x, (this.holePosition) + this.holeSize, 75, this.height);
};

Obstacle.prototype.move = function() {
  this.x -= this.dx;
};