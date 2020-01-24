const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  obstacles: [],
  framesCounter: 0,
  score: undefined,
  keys: 32,

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    // this.allEventListeners();
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
      this.framesCounter++;
      if (this.framesCounter > 1000) this.framesCounter = 0;
      this.drawAll();
      this.moveAll();
      this.generateObstacles();
    }, 1000 / this.fps);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.character = new Character(this.ctx, 100, 100, 0, this.keys);
    this.obstacles = [];
  },
  drawAll() {
    this.background.draw();
    this.character.draw();
    this.obstacles.forEach(obs => obs.draw());
  },
  moveAll() {
    this.character.move();
    this.character.jump();
    this.obstacles.forEach(obs => obs.move());
  },

  generateObstacles() {
    if (this.framesCounter % 70 === 0) {
      this.obstacles.push(
        new Obstacles(this.ctx, this.canvas.width, this.canvas.height)
      );
      console.log(this.obstacles);
    }
  }
  //   console.log(this.obstacles)

  //   }
  //   allEventListeners() {
  //       this.character.setListeners();
  //   }
};
