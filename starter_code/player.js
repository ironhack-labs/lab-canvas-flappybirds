class Player {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.winW = width;
    this.winH = height;
    this.position = {
      x: 0,
      y: this.winH - this.avatar.height
    };
    this.avatar = new Image();
    this.avatar.src = 'images/flappy.png';
    this.avatar.width = 498 / 2; //original img width
    this.avatar.height = 351 / 2; //original img height

    this.initialPosY = this.vel = 10;
  }
  drawPlayer() {
    this.ctx.drawImage(this.avatar, this.position.x, this.position.y, this.avatar.width, this.avatar.height)
  }
}