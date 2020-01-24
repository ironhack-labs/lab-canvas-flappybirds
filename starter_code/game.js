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
      if (this.isCollisionsTop()) {
        this.gameOver();
      }
      if (this.isCollisionsBottom()) {
        this.gameOver();
      }
      if (this.framesCounter > 1790) this.framesCounter = 0;
      this.drawAll();
      this.moveAll();
      this.generateObstacles();
    }, 1000 / this.fps);
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.character = new Character(this.ctx, 80, 80, 0, this.keys);
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
    this.background.move();
  },

  generateObstacles() {
    if (this.framesCounter % 90 === 0) {
      this.obstacles.push(new Obstacles(this.ctx, this.canvas.width));
      //   console.log(this.obstacles);
    }
  },

  isCollisionsTop() {
    return this.obstacles.some(
      obs =>
        this.character._posX + this.character._width >= obs._posX &&
        this.character._posY + this.character._height >= obs._posY &&
        this.character._posX <= obs._posX + obs._width &&
        this.character._posY <= obs._posY + obs._height
    );
    console.log(this.character._posX);
  },

  isCollisionsBottom() {
    return this.obstacles.some(
      obs =>
        this.character._posX + this.character._width >= obs._posX &&
        this.character._posY + this.character._height >= obs._posYBot &&
        this.character._posX <= obs._posX + obs._width &&
        this.character._posY <= obs._posYBot + obs._height
    );
    console.log(this.character._posX);
  },

  gameOver() {
      clearInterval(this.interval)
  }
  //   console.log(this.obstacles)

  //   }
  //   allEventListeners() {
  //       this.character.setListeners();
  //   }
};
