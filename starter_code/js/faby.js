class Faby {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 70;
    this.height = 70;
    this.posX = 200;
    this.posY = 400;
    this.posY0= 400;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 1;
    this.gravitySpeed = 0.3;
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

  update() {
    if(this.posY <= this.posY0) {
      this.posY += this.gravity;
      this.gravity += this.gravitySpeed;
    } /*else {
     this.gravity = 1;
      this.posY = this.posY0;
    }*/
  }

  setListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === this.key.SPACE) {
       //if (this.posY >= this.posY0) {
         this.gravity = 1;
          this.posY -= this.gravity;
          this.gravity -= 13;
          this.posY0= 1000;
        //}
      }
    });
  }
}
