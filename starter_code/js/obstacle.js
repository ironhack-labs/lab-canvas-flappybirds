function Obstacle(game, x, y, img, width, height) {
  this.game = game;

  this.img = new Image();
  this.img.src = img;

  this.minH = 10;
  this.maxH = 600;

  this.minGap = 100;
  this.maxGap = 300;
  this.gap = Math.floor(Math.random() * (this.maxGap - this.minGap + 1) + this.minGap);
  
  //this.w = 70;
  this.h = Math.floor(Math.random() * (this.maxH - this.minH + 6) + this.minH);

  this.dx = 5;

  this.x = 1000;
  this.y = Math.floor(Math.random() * (this.maxH - this.minH + 1) + this.minH);
}

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y);
};



Obstacle.prototype.move = function() {
  this.x -= this.dx;
};