function Faby() {
  this.image = new Image();
  this.image.src = "./images/flappy.png";

  this.width = ctx.canvas.width / 3;
  this.height = ctx.canvas.height / 2;
  this.speedX = 1;
  this.speedY = 1;
  this.gravity;
  this.gravitySpeed;
}

Faby.prototype.update = function() {
  let pos = this.newPos();
  ctx.drawImage(this.image, pos.x, pos.y, 30, 30);

  //   console.log("flappy");
};

Faby.prototype.newPos = function() {
  this.width = this.width * this.speedX;
  this.height = this.height * this.speedY;
  return { x: this.width, y: this.height };
};

Faby.prototype.hop = function() {
  console.log("hop");
  this.speedY = 0.9;
};
