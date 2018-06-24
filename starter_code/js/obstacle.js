function Obstacle(game) {
  this.game = game;

  this.img = new Image();
  this.img.src = "images/obstacle_bottom.png";

  this.minH = 20;
  this.maxH = this.game.canvas.height / 2.5;

  //this.w = 15;
  //this.h = this.w * 3;

  this.dx = 10;

  this.x = this.game.canvas.width;
  this.y = Math.floor(Math.random() * (this.maxH - this.minH + 1) + this.minH);
}

//var obsTop = new Obstacle (this.game, "images/obstacle_top.png");


Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y);
  //this.game.ctx.drawImage("images/obstacle_bottom.png", this.x, this.y);
};



Obstacle.prototype.move = function() {
  this.x -= this.dx;
};