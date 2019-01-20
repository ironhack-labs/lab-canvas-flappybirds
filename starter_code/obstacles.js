function Obstacles(game) {
  this.game = game;
  this.speed = 2;
  this.w = 80;
  this.x = this.game.canvas.width * 0.8;
  this.y = (this.game.canvas.height * (Math.random() * (8 - 5) + 5)) / 10;
  this.spaceBetweenPipe = this.game.player.h * 4;
  this.imgBottom = new Image();
  this.imgBottom.src = "images/obstacle_bottom.png";
  this.imgTop = new Image();
  this.imgTop.src = "images/obstacle_top.png";
}

Obstacles.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.imgBottom,
    this.x,
    this.y,
    this.w,
    this.game.canvas.height - this.y
  );

  this.game.ctx.drawImage(
    this.imgTop,
    this.x,
    0,
    this.w,
    this.y - this.spaceBetweenPipe
  );
};

Obstacles.prototype.move = function() {
  this.x -= this.speed;
};
