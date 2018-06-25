function Background(game) {
  this.start = game;
  this.img = new Image();
  this.img.src = "images/bg.png";
  this.x = 0;
  this.y = 0;
  this.vX = 5;
}

Background.prototype.draw = function() {
  this.start.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.start.canvas.width,
    this.start.canvas.height
  );

  this.start.ctx.drawImage(
    this.img,
    this.x + this.start.canvas.width,
    this.y,
    this.start.canvas.width,
    this.start.canvas.height
  );
};

Background.prototype.move = function() {
  this.x -= this.vX;

  if (this.x < -this.start.canvas.width) {
    this.x = 0;
  }
};
