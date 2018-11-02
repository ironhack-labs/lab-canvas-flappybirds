function Faby(ctx) {
  this.ctx = ctx;
  this.x = 30;
  this.y = 250;
  this.width = 50;
  this.height = 30;
  this.speedX = 1;
  this.speedY = 1;
  this.gravity = 1;
  this.img = new Image();
  this.img.src = "./images/flappy.png";
  this.fps = 60;
}

Faby.prototype.draw = function() {
  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Faby.prototype.move = function() {
  this.y += this.gravity;
};

Faby.prototype.update = function() {
  this.move();
  this.draw();
};
