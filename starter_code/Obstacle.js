function Obstacle(game) {
  this.game = game;

  this.w = 50;
  this.h = Math.floor(this.w * 4.5 * Math.random()) + 1.5 * this.w;

  this.dx = 2;

  this.x = 900;
  this.y = this.game.canvas.height - this.h;

  this.dist = 100;


  this.yTop = 0
  this.hTop = this.game.canvas.height - this.h - this.dist;

  this.topObst = new Image();
  this.topObst.src = "images/obstacle_top.png";

  this.bottomObst = new Image();
  this.bottomObst.src = "images/obstacle_bottom.png";
}

Obstacle.prototype.draw = function () {
  this.game.ctx.fillStyle = "black";
  // this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
  this.game.ctx.drawImage(this.bottomObst, this.x, this.y, this.w, this.h);
  // debugger
  // this.game.ctx.fillRect(this.x, 0 ,this.w, this.game.canvas.height-this.h-this.dist);
  this.game.ctx.drawImage(this.topObst, this.x, this.yTop, this.w, this.game.canvas.height - this.h - this.dist);
};

Obstacle.prototype.move = function () {
  this.x -= this.dx;
};