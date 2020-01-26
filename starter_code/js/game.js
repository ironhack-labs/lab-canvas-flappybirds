const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  playerKeys: {
    TOP_KEYS: 38,
    SPACE: 32
  },
  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth * 0.98;
    this.height = window.innerHeight * 0.98;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.start();
  },
  start() {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;
      this.clear();
      this.drawAll();
      this.moveBird();
      this.clearObstacles();
      this.generateObstacles();

      // this.obstacles()
    }, 1000 / this.fps);
  },
  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Player(this.ctx, this.width, this.height);
    this.obstacles = [];
  },
  clear(){
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  drawAll() {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach(obs => obs.draw());
  },
  moveBird() {
    this.player.move();
  },
  clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => obs.posY >= 0);
  },
  generateObstacles() {
    if (this.framesCounter % 200 == 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.height, this.gameWidth));
      console.log(this.obstacles);
    }
  }


  //Obstacles constructor(ctx, width, height, gameWidth) {
};
