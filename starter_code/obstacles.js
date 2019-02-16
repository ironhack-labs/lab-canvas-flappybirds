//constructor de obstáculos
function Obstacle(game) {
  this.game = game;

  this.img = new Image();
  this.img.src = 'images/obstacle.bottom.png';

  this.w = 15;
  this.h = this.w * 3;

  // this.dx = 10;

  this.x = this.game.canvas.width;
  this.y = this.game.player.y0 + this.game.player.h - this.h - 5;
}

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h)
    console.log(this.img)
};

// Obstacle.prototype.move = function() {
//   this.x -= this.dx;
// };