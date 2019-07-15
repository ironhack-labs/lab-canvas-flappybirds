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
  keys: {
    KEY_W: 87
  },
  obstaclesDown: [],

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
      this.createObstaclesDown();
      this.clearObstaclesDown();
    }, 1000 / this.fps);
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Player(
      this.ctx,
      this.canvas.width,
      this.canvas.height,
      this.keys
    );
    this.obstaclesDown = [];
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function() {
    this.background.draw();
    this.player.draw(this.framesCounter);
    this.obstaclesDown.forEach(obs => obs.draw());
  },

  moveAll: function() {
    this.background.move();
    this.player.move();
    this.obstaclesDown.forEach(obs => obs.draw());
  },

  createObstaclesDown: function() {
    if (this.framesCounter % 70 == 0) {
      console.log(this.obstaclesDown);
      this.obstaclesDown.push(
        new ObstaclesDown(
          this.ctx,
          this.canvas.width,
          this.player.posY0,
          this.player.height
        )
      );
    }
  },

  clearObstaclesDown: function() {
    this.obstaclesDown.forEach((obs, idx) => {
      if (obs.posX <= 0) {
        this.obstacles.splice(idx, 1);
      }
    });
  }
};
