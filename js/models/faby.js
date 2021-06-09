class Faby {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;

    this.img = new Image();
    this.img.src = "./images/flappy.png";
    this.img.isReady = false;
    this.img.onload = () => {
      this.img.isReady = true;
      this.width = this.img.width * 0.15;
      this.height = this.img.height * 0.15;
    };

    this.isClicking = false;
  }

  isReady() {
    return this.img.isReady;
  }

  draw() {
    if (this.isReady()) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.isClicking) {
      this.vy = -8;
      this.isClicking = false;
    } else if (!this.isClicking) {
      this.vy += GRAVITY;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
  }

}
