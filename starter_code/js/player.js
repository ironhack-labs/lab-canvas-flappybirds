class Player {
  constructor(x, y) {
    // this.game = game;
    this.ctx = myCanvas.getContext('2d'); //myCanvas is ID attribute of canvas
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.5;
    this.gravitySpeedX = 0.5;
    this.gravitySpeedY = 2;
    this.controller = {
      left: false,
      right: false,
      up: false,
    };
    this.birdImg = new Image();
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
        case 38:
          this.controller.up = keyState;
          break;
        case 32:
          this.controller.up = keyState;
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
        case 38:
          this.controller.up = keyState;
          break;
        case 32:
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

    if (this.x < -this.width) {
      this.x = myCanvas.width;
    } else if (this.x > myCanvas.width) {
      this.x = -this.width;
    }
    if (this.y > myCanvas.height - this.height) {
      this.y = myCanvas.height - this.height;
      this.vy = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    this.birdImg.src = './images/flappy.png';
    this.ctx.drawImage(this.birdImg, this.x, this.y, this.width, this.height);
  }
}
