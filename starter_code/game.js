const Game = {
  title: "flappy bird",
  author: "josue",
  license: null,
  version: "1.0",
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,

  init: function() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth * 0.98;
    this.height = window.innerHeight * 0.98;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.start();
  },

  start: function() {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;

      if (this.framesCounter > 1000) this.framesCounter = 0;
      if (this.framesCounter % 100 == 0) this.clear();
      this.drawAll();
      this.moveAll();
    }, 1000 / this.fps);
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height);
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function() {
    this.background.draw();
  },

  moveAll: function() {
    this.background.move();
  }
};
