const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  obstacles: [],
  framesCounter: 0,
  score: undefined,
  keys: {
    SPACE: 32
  },

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    this.start();
  },

  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      this.drawAll();
      this.moveAll();
    }, 1000 / this.fps);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.character = new Character(this.ctx, 100, 100, 0)
    this.obstacles = [];
  },
  drawAll() {
    this.background.draw();
    this.character.draw();
  },
  moveAll() {
      this.character.move();
  }
};
