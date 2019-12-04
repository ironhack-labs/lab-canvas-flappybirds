class Player {
  constructor(x, y) {
    // this.game = game;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.7;
    this.gravitySpeedX = 1;
    this.gravitySpeedY = 4;
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
      //   console.log('Output for: Player -> keyEvent -> keyState', keyState);
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
      }
    });
    document.addEventListener('keyup', event => {
      let keyState = event.type === 'keyup' ? false : true;
      //   console.log('Output for: Player -> keyEvent -> keyState', keyState);
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
      this.x = canvas.width;
    } else if (this.x > canvas.width) {
      this.x = -this.width;
    }
    this.birdImg.src = './images/flappy.png';
    this.ctx.drawImage(this.birdImg, this.x, this.y, this.width, this.height);
  }
}
