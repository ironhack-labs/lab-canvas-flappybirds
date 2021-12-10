class ObstacleBottom {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 200;
    this.y = 300;
    this.width = 138 / 2;
    this.height = 793 / 2;
    this.velocity = -2;
    this.image = new Image();
    this.image.src = "images/obstacle_bottom.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }

  draw() {
    this.isLoaded &&
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  random() {
    return Math.floor(Math.random() * (50 - 1 + 1) + 1);
  }

  move() {
    this.x += this.velocity;
    if (this.x + this.width <= 0) {
      this.x = this.ctx.canvas.width;
      let random = this.random();
      this.y = 300;
      this.y = this.y - random;
      console.log(random);
    }
  }
}
