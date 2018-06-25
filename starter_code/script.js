window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    var game = new Game("canvas");
    game.start();
  }

  function Game(canvadId) {
    this.canvas = document.getElementById(canvadId);
    this.ctx = this.canvas.getContext("2d");
    this.reset();
  }

  Game.prototype.start = function() {
    this.interval = setInterval(function() {
      this.clear();

      this.framesCounter++;
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      } else if (this.framesCounter % 50 == 0) {
        this.generateObstacles();
      }

      this.draw();
      this.moveAll();
    }.bind(this), 1000 / 20);
  };

  Game.prototype.reset = function() {
    this.framesCounter=0;
    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacles = [];
    console.log(this);
  };

  Game.prototype.generateObstacles = function() {
    console.log(this.obstacles);
    this.obstacles.push(new Obstacle(this));
  };

  Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  Game.prototype.draw = function() {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  };

  Game.prototype.moveAll = function() {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(function(obstacle) { obstacle.move(); });
  };
};
