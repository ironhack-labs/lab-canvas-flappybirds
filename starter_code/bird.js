class Bird {
  constructor(game) {
    this.game = game;
    this.width = 30;
    this.height = 30;
    this.color = 'red';
    this.x = 50;
    this.y = 110;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity;
    this.gravitySpeed;
  }

  update() {
    const ctx = this.game.ctx;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  move(event) {
    switch (event.keyCode) {
      case 38: // up arrow
        this.speedY -= 1;
        break;
      case 40: // down arrow
        this.speedY += 1;
        break;
      case 37: // left arrow
        this.speedX -= 1;
        break;
      case 39: // right arrow
        this.speedX += 1;
        break;
    }
  }
  stopMoving() {
    this.speedX = 0;
    this.speedY = 0;
  }
}
