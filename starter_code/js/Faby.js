function Faby() {
  this.imageF = new Image();
  this.imageF.src = "./images/flappy.png";

  this.width = ctx.canvas.width / 3;
  this.height = ctx.canvas.height / 2;
  this.speedX = 1;
  this.speedY = 0;
  this.gravity = 0.27;
  this.gravitySpeed = 1.1;
}

Faby.prototype.update = function() {
  let pos = this.newPos();
  ctx.drawImage(this.imageF, pos.x, pos.y, 30, 30);
};

Faby.prototype.newPos = function() {
  console.log(this.speedY);
  this.width = this.width * this.speedX;
  this.speedY -= this.gravity * this.gravitySpeed;
  if (this.speedY > 10) this.speedY = 10;
  if (this.speedY < -12) this.speedY = -12;

  this.height += this.speedY * -1;
  return { x: this.width, y: this.height };
};

Faby.prototype.hop = function() {
  console.log("hop");
  this.speedY += 10;
};
