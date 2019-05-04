const myGame = {
  version: "1.0",
  name: "Flappy Birds",
  description: "juego Flappy Birds",
  author: "Lucia",
  canvasDom: undefined,
  ctx: undefined,
  winW: undefined,
  winH: undefined,
  fps: 60,
  scoreBoard: undefined,
  Key: {
    TOP_KEY: 65
  },

  init: function(id) {
    this.canvasDom = document.getElementById(id);
    this.ctx = this.canvasDom.getContext("2d");
    this.winW = this.canvasDom.width;
    this.winH = this.canvasDom.height;
    this.startGame();
  },

  startGame: function() {
    this.fps = 60;
    this.clear();
    this.resetGame();

    this.interval = setInterval(() => {
      this.drawAll();
      this.moveAll();

      /*  this.generateObstacle();
      this.clearObstacles();
 */
      /*    this.framesCounter++;
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
      if (this.framesCounter % 50 === 0) {
        this.obstacle.generateObstacle();
      } */
    }, 1000 / this.fps);
  },
  clear: function() {
    clearInterval(this.interval);
  },

  resetGame: function() {
    this.background = new Background(this.ctx, this.winW, this.winH);
    this.playerBird = new Player(this.winW, this.winH, this.ctx, this.key);
    this.obstacles = [new Obstacle(this.winW, this.winH, this.ctx)];
    console.log(this.obstacles);
  },

  drawAll: function() {
    this.background.draw();
    this.playerBird.draw();
    //this.obstacles.draw();
  },

  moveAll: function() {
    this.background.move();
    this.playerBird.move();
  },

  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x >= 0;
    });
  },

  generateObstacle: function() {
    this.obstacles.push(new Obstacle(this.winW, this.winH, this.ctx));
  }
};
