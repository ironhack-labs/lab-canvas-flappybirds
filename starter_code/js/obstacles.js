class Obstacle {
  constructor(ctx, winW, winH, url) {
    this.ctx = ctx;
    this.winW = winW;
    this.winH = winH;

    this.height = 150;
    this.width = 150;

    this.x = this.winW;
    this.y = undefined;

    this.velX = 6;

    this.img = new Image();
    this.img.src = url;
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x -= this.velX;
  }
}

class ObstacleTop extends Obstacle {
  constructor(ctx, winW, winH, url) {
    super(ctx, winW, winH, url);

    this.y = 0;
  }
}

class ObstacleBottom extends Obstacle {
  constructor(ctx, winW, winH, url) {
    super(ctx, winW, winH, url);

    this.y = this.winH - this.height;
  }
}
