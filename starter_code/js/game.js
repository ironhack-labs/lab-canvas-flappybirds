class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.fps = 60;
    this.framesCounter = 0;
    this.player;
  }

  init() {
    this.reset();
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.player = new Faby(this.ctx);
    this.start();
  }

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
  }

  start() {
    this.interval = setInterval(() => {
      this.framesCounter++;

      this.clear();
      this.drawAll();
      this.moveAll();

      if (this.framesCounter > 1000) this.framesCounter = 0;
    }, 1000 / this.fps);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawAll() {
    this.background.draw();
    this.player.draw();
  }

  moveAll() {
    this.background.move();
  }
}
