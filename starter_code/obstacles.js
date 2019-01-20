function Obstacles(game) {
  this.game = game;
  console.log("Soy un obstaculo");

  this.speed = 2;
  this.w = 60;
  this.x = this.game.canvas.width * 0.8;
  this.y = this.game.canvas.height * (Math.random() * (8 - 5) + 5) / 10;
  this.spaceBetweenPipe = this.game.player.h * 4;
}

Obstacles.prototype.draw = function() {
  this.game.ctx.fillStyle = "green";
  this.game.ctx.fillRect(
    this.x,
    this.y,
    this.w,
    this.game.canvas.height - this.y
  );

  this.game.ctx.fillRect(
    this.x,
    0,
    this.w,
    this.y - this.spaceBetweenPipe
  );
};

  Obstacles.prototype.move = function() {
    this.x -= this.speed;
  };
