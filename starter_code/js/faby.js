class Faby {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 70;
    this.height = 70;
    this.posX = 300;
    this.posY = 400;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = false;
    this.gravitySpeed = 0.4;
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

  update(posY, gravity) {
    this.posY = posY;
    this.gravity = gravity;

    if (this.gravity) {
    } else {
    }
  }

  setListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === this.key.SPACE) {
      }
    });
  }
}
