function Obstacle(game) {
  this.game = game;

  this.obstacles = []

  this.img = new Image();
  this.img.src = './images/obstacle_top.png';


  this.w = 178;
  this.h = Math.floor(Math.random()*400) - 100;
  this.dx = 3;

  this.x = this.game.canvas.width;
  this.y = 0;

  this.img2 = new Image();
  this.img2.src = './images/obstacle_bottom.png';


  this.w2 = 178;
  this.h2 = 700;
  this.dx2 = 3;

  this.x2 = this.game.canvas.width;
  this.y2 = Math.floor(Math.random()*600) + 200;

}
Obstacle.prototype.draw = function() {

this.game.ctx.drawImage(
this.img,
this.x,
this.y,
this.w,
this.h,
);

this.game.ctx.drawImage(
this.img2,
this.x2,
this.y2,
this.w2,
this.h2,
);

}

Obstacle.prototype.move = function() {
this.x -= this.dx;
this.x2 -= this.dx2;
};