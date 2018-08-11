class Bird {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.5;
    this.gravitySpeed = 0;

    this.img_bird = new Image();
    this.img_bird.src = './images/flappy.png'
  }
  newPos(ctx) {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed
  }
  create(ctx) {
    ctx.drawImage(this.img_bird, this.x, this.y, this.width, this.height)
  }
  moveUp() {
    this.y -= 50;
    this.gravitySpeed = 0;
  }

  left() { return this.x }
  right() { return (this.x + this.width )}
  top() { return this.y }
  bottom() { return (this.y + this.height )}
}