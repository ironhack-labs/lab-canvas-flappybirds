function Obstacle(game) {
  this.game = game;
  this.img = new Image();
  this.img.src = "./images/obstacle_botton.png";
  this.img = new Image();
  this.img.src = "./images/obstacle_top.png";


  this.x = this.game.canvas.width;
  this.y = this.game.player.y0 + this.game.player.h - this.h - 5;

  this.w = 15;
  this.h = this.w * 3;

  this.dx = 10;

  var obstacles = [];
}

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
};

Obstacle.prototype.move = function() {
  this.x -= this.dx;
};
