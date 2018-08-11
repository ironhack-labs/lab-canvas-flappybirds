function Faby(width, height) {
  Component.call(this, width, height);

  this.image = new Image();
  this.image.src = "./images/flappy.png";

  this.x = ctx.canvas.width / 3;
  this.y = ctx.canvas.height / 2;

  this.speedX = 1;
  this.speedY = 0;
  this.gravity = 0.27;
  this.gravitySpeed = 1.1;
}
Faby.prototype = Object.create(Component.prototype);
Faby.prototype.update = function() {
  let pos = this.newPos();

  ctx.drawImage(this.image, pos.x, pos.y, this.width, this.height);
};

Faby.prototype.newPos = function() {
  this.x = this.x * this.speedX;
  this.speedY -= this.gravity * this.gravitySpeed;
  if (this.speedY > 10) this.speedY = 10;
  if (this.speedY < -12) this.speedY = -12;

  this.y += this.speedY * -1;
  return { x: this.x, y: this.y };
};

Faby.prototype.hop = function() {
  this.speedY += 10;
};

Faby.prototype.crashWith = function(obstacle) {
  //   console.log(obstacle);
  console.log("flappy top " + this.top());
  console.log("obstacle bottom? " + obstacle.isBottom + ". " + obstacle.top());
  return !(
    this.bottom() < obstacle.top() ||
    this.top() > obstacle.bottom() ||
    this.right() < obstacle.left() ||
    this.left() > obstacle.right()
  );
};
