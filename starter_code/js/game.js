var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  keys: {
    SPACE: 32
  },
  init: function(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext("2d")

    // ScoreBoard.init(this.ctx)

    this.start()
  },
  start: function() {
    this.fps = 60

    this.reset();

    this.interval = setInterval(() => {
      this.clear()

      this.framesCounter++;
      // controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0
      }

      // controlamos la velocidad de generación de obstáculos
      if (this.framesCounter % 150 === 0) {
        this.generateObstacle()
      }

      this.score += 0.01;

      this.moveAll()
      this.drawAll()

      //eliminamos obstáculos fuera del canvas
      this.clearObstacles()

      // if (this.isCollision()) {
      //   this.gameOver()
      // }
    }, 1000 / this.fps)
  },
  stop: function() {
    clearInterval(this.interval);
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  gameOver: function() {
    this.stop();

    if (confirm("GAME OVER. Play again?")) {
      this.reset();
      this.start();
    }
  },
  reset: function() {
    this.stop()
    this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
    this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys);
    // this.scoreBoard = ScoreBoard;
    this.framesCounter = 0;
    this.obstacles = [];
    // this.score = 0;
  },
  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x >= 0;
    });
  },
  //generamos nuevos obstáculos
  generateObstacle: function() {
    this.obstacles.push(
      new Obstacle(this.canvas.width, this.player.y0, this.player.h, this.ctx, "top")
    );
    this.obstacles.push(
      new Obstacle(this.canvas.width, this.player.y0, this.player.h, this.ctx, "bottom")
    );
  },
  drawAll: function() {
    this.background.draw();
    this.player.draw(this.framesCounter);
    this.obstacles.forEach(function(obstacle) {
       obstacle.draw();
    });
    // this.drawScore();
  },
  moveAll: function() {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(function(obstacle) {
       obstacle.move();
    });
  },


}