class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "images/bg.png";

    this.flag = false;

    this.img.onload = () => {
      this.draw();
    };
  }

  draw() {
    // if (frames % 3 === 0) {
    //   this.flag ? (this.y += 5) : (this.y -= 5);

    //   this.flag = !this.flag;
    // }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.img,
      this.width + this.x,
      this.y,
      this.width,
      this.height
    );
    this.x--;
    if (this.x < -this.width) {
      this.x = 0;
    }
  }
}

class Pipe {
  constructor(y, height, type) {
    this.x = canvas.width;
    this.y = y;
    this.width = 70;
    this.height = height;
    this.imgTop = new Image();
    this.imgTop.src = "images/obstacle_top.png";
    this.imgBottom = new Image();
    this.imgBottom.src = "images/obstacle_bottom.png";
    this.type = type;
  }

  draw() {
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.imgBottom, this.x, this.y, this.width, this.height);
    }

    this.x--;
  }
}

class Bird {
  constructor() {
    this.x = 100;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.flappyUp = new Image();
    this.flappyMid = new Image();
    this.flappyDown = new Image();
    this.flappyUp.src = "images/yellowbird-upflap.png";
    this.flappyMid.src = "images/yellowbird-midflap.png";
    this.img.src = "images/yellowbird-midflap.png";
    this.flappyDown.src = "images/yellowbird-downflap.png";
  }

  move() {
    if (this.y < canvas.height - this.height) {
      this.y += 3;
    }
  }

  jump() {
    this.y -= 15;
  }

  draw() {
    if (frames % 5 === 0) {
      this.img =
        animateHelper === 0
          ? this.flappyUp
          : animateHelper === 1
          ? this.flappyMid
          : animateHelper === 2
          ? this.flappyDown
          : this.flappyMid;

      if (animateHelper < 4) {
        animateHelper++;
      } else {
        animateHelper = 0;
      }
    }
    this.move();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  isTouching(pipe) {
    return (
      this.x < pipe.x + pipe.width &&
      this.x + this.width > pipe.x &&
      this.y < pipe.y + pipe.height &&
      this.y + this.height > pipe.y
    );
  }

  isInLimits() {
    return this.y > 0 && this.y + this.height < canvas.height;
  }
}
