class Player {
  constructor(x, y) {
    // this.game = game;
    this.ctx = myCanvas.getContext('2d'); //myCanvas is ID attribute of canvas
    this.x = x;
    this.y = y;
    this.width = this.height = 30;
    // this.height = 30;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.2;
    this.gravitySpeedX = 0.5;
    this.gravitySpeedY = 1.2;
    this.controller = {
      left: false,
      right: false,
      up: false,
    };
    this.birdImg = new Image();
    this.sound = new Audio();
    this.sound.src = './sounds/fly.mp3';
  }

  //collision
  crashCollision(obstacle) {
    //bird
    let leftSide = this.x;
    let rightSide = this.x + this.width;
    let top = this.y;
    let bottom = this.y + this.height;
    //bird width obstacle collision

    //1.right side collision
    let crossFront =
      rightSide >= obstacle.x &&
      leftSide < obstacle.x &&
      (bottom <= obstacle.yTop + obstacle.height || top >= obstacle.yBottom);
    //2.top collision
    let crossTop =
      top <= obstacle.yTop + obstacle.height &&
      bottom > obstacle.yTop + obstacle.height &&
      leftSide >= obstacle.x &&
      rightSide <= obstacle.x + obstacle.width;
    //3.bottom collision
    let crossBottom =
      bottom >= obstacle.yBottom &&
      top < obstacle.yBottom &&
      leftSide >= obstacle.x &&
      rightSide <= obstacle.x + obstacle.width;
    //4.left side collision
    let crossBack =
      rightSide > obstacle.x + obstacle.width &&
      leftSide <= obstacle.x + obstacle.width &&
      (bottom <= obstacle.yTop + obstacle.height || top >= obstacle.yBottom);
    if (crossFront) this.x = obstacle.x - this.width;
    if (crossBack) this.x = obstacle.x + obstacle.width;
    if (crossTop) this.y = obstacle.yTop + obstacle.height;
    if (crossBottom) this.y = obstacle.yBottom - this.height;
    // if (crossFront || crossTop || crossBottom || crossBack) return true;
    // else return false;
  }

  keyEvent() {
    document.addEventListener('keydown', event => {
      //   console.log(event.keyCode);

      let keyState = event.type === 'keydown' ? true : false;
      switch (event.keyCode) {
        case 37:
          this.controller.left = keyState;
          break;
        case 39:
          this.controller.right = keyState;
          break;
        case 32:
        case 38:
          this.controller.up = keyState;
          this.sound.play();
          break;
      }
    });
    document.addEventListener('keyup', event => {
      let keyState = event.type === 'keyup' ? false : true;
      switch (event.keyCode) {
        case 37:
          this.controller.left = keyState;
          break;
        case 39:
          this.controller.right = keyState;
          break;
        case 32:
        case 38:
          this.controller.up = keyState;
          break;
      }
    });
  }

  loop() {
    if (this.controller.up) {
      this.vy -= this.gravitySpeedY;
      // this.space = true;
    }
    if (this.controller.left) {
      this.vx -= this.gravitySpeedX;
    }
    if (this.controller.right) {
      this.vx += this.gravitySpeedX;
    }
    //on y
    this.vy += this.gravity;
    this.y += this.vy;
    //on x
    this.x += this.vx;
    //gradually kill the gravity
    this.vx *= 0.9;
    this.vy *= 0.9;

    //keep the bird within the canvas border
    if (this.x < -this.width) {
      this.x = myCanvas.width;
    } else if (this.x > myCanvas.width) {
      this.x = -this.width;
    }
    if (this.y > myCanvas.height - this.height - 70) {
      //70 is ground height
      this.y = myCanvas.height - this.height - 70;
      this.vy = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    this.birdImg.src = './images/flappy.png';
    this.ctx.drawImage(this.birdImg, this.x, this.y, this.width, this.height);
  }
}
