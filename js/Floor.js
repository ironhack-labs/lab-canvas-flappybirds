class Floor {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.width = 466;
    this.height = 79;
    this.velocity = -2;
    this.image = new Image();
    this.image.src = "images/floor.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }

  draw() {
    this.isLoaded &&
      this.ctx.drawImage(
        this.image,
        this.x,
        this.ctx.canvas.height - this.height,
        this.width,
        this.height
      );

    this.ctx.drawImage(
      this.image,
      this.x + this.width,
      this.ctx.canvas.height - this.height,
      this.width,
      this.height
    );
  }

  move() {
    this.x += this.velocity;
    if (this.x + this.width <= 0) {
      this.x = 0;
    }
  }
}
