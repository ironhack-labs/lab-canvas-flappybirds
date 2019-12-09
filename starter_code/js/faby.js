class Faby {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = 70;
    this.height = 70;
    this.posX = 300;
    this.posY = 400;
    this.posY0 = height;
    this.gravity = 0.3;
    this.vy = 1;
    this.key = {
      SPACE: 32
    };

    this.image = this.chargeImage();
    this.setListeners();
  }
  chargeImage() {
    let image = new Image();
    image.src = "./images/flappy.png";
    return image;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  move() {
    if (this.posY <= this.posY0) { // default behaviour: accelerated fall
      this.posY += this.vy;
      this.vy += this.gravity;
    } else { // if bottom reached, stops from falling
      this.vy = 1;
      this.posY = this.posY0;
    }
  }

  setListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === this.key.SPACE && this.posY <= this.posY0) {
        e.preventDefault(); // prevents page from scrolling
        this.posY -= this.vy;
        this.vy -= 10;
      }
    });
  }
}
