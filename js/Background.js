class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.width = 900;
    this.height = 504;
    this.velocity = 0.5;
    this.image = new Image();
    this.image.src = "images/bg.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }

  draw() {
    this.isLoaded &&
      this.ctx.drawImage(this.image, this.x, -50, this.width, this.height);
    this.ctx.drawImage(
      this.image,
      this.x + this.width,
      -50,
      this.width,
      this.height
    );
  }

  move() {
    this.x -= this.velocity;
    if (this.x + this.width <= 0) {
      this.x = 0;
    }
  }
}
