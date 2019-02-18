var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  keys: {

    SPACE: 32
  },
  init: function (id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.start()

  },

  start: function () {
    this.reset();
    this.interval = setInterval(function () {
      this.clear();
      this.framesCounter++;
      if (this.framesCounter > 1000)
        this.framesCounter = 0;
      if (this.framesCounter % 50 === 0) {

      }
      this.moveAll()
      this.drawAll()
    }.bind(this), 1000 / this.fps)
  },


  reset: function () {
    this.background = new Background(this)
    this.player = new Player(this)
    this.framesCounter = 0
    this.obstacles = []

  },


  clearObstacles: function () {
    this.obstacles = this.obstacles.filter(function (obstacle) {
      return obstacle.x >= 0;
    });
  },
  generateObstacle: function () {
    this.obstacles.push(new Obstacle(this));

  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },

  drawAll: function () {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach(function (obstacle) {
      obstacle.draw();
    });

  },
  moveAll: function () {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(function (obstacle) {
      obstacle.move();
    });

  },

}
