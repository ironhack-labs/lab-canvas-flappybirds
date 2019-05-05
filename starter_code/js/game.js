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
  framesCounter: 0,
  imgObstacleTop: "images/obstacle_top.png",
  imgObstacleBottom: "images/obstacle_bottom.png",

  init: function(id) {
    this.canvasDom = document.getElementById(id);
    this.ctx = this.canvasDom.getContext("2d");
    this.winW = this.canvasDom.width;
    this.winH = this.canvasDom.height;
    this.startGame();
  },

  startGame: function() {
    this.fps = 60;
    this.resetGame();

    this.interval = setInterval(() => {
      this.clear();
      this.drawAll();
      this.moveAll();
      this.clearObstacles();

      this.framesCounter++;
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
      if (this.framesCounter % 100 === 0) {
        this.generateObstacle();
      }
      // console.log(this.isCollission());
      if (this.isCollission()) this.gameOver();
    }, 1000 / this.fps);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.winW, this.winH);
  },

  resetGame: function() {
    this.background = new Background(this.ctx, this.winW, this.winH);
    this.playerBird = new Player(this.winW, this.winH, this.ctx, this.key);
    this.obstacles = [];
  },

  drawAll: function() {
    this.background.draw();
    this.playerBird.draw();

    this.obstacles.forEach(obstacle => obstacle.draw()); //es un array y hay que iterarla!!!!!
  },

  moveAll: function() {
    this.background.move();
    this.playerBird.move();
    this.obstacles.forEach(obstacle => obstacle.move());
  },

  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x + obstacle.width >= 0;
    });
  },

  generateObstacle: function() {
    this.obstacles.push(
      new ObstacleTop(this.ctx, this.winW, this.winH, this.imgObstacleTop)
    );
    this.obstacles.push(
      new ObstacleBottom(this.ctx, this.winW, this.winH, this.imgObstacleBottom)
    );

    // console.log(this.obstacles);
  },

  isCollission: function() {
    return this.obstacles.some(obstacle => {
      console.log(this.playerBird.x + this.playerBird.width, obstacle.x);
      return (
        this.playerBird.x + this.playerBird.width >= obstacle.x &&
        this.playerBird.x < obstacle.x + obstacle.width &&
        this.playerBird.y <= obstacle.y + obstacle.height &&
        this.playerBird.y + this.playerBird.height >= obstacle.y
      );
    });
  },

  gameOver: function() {
    this.stop();

    if (confirm("LOOSER!!")) {
      this.resetGame();
      this.startGame();
    }
  }
};
