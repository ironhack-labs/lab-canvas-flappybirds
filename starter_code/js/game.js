function Game(flappy) {
  this.canvas = document.getElementById("flappy");
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.clear();

      this.framesCounter++;

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if ((this.framesCounter % 120) * Math.random() === 0) {
        this.generateObstacle();
      }

      this.score += 0.01;

      this.draw();
      this.moveAll();

      this.clearObstacles();

      if (this.isCollision()) {
        this.gameOver();
      }
    }.bind(this),
    1000 / this.fps
  );
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.gameOver = function() {
  this.stop();

  if (confirm("GAME OVER. Play again?")) {
    this.reset();
    this.start();
  }
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.obstacles = [];
  this.framesCounter = 0;
  this.score = 0;
};

Game.prototype.isCollision = function() {
  return this.obstacles.some(
    function(obstacle) {
      return (this.player.x >= obstacle.x && this.player.y >= obstacle.y2) ||  (this.player.x >= obstacle.x && this.player.y <= obstacle.h);
    }.bind(this)
  );
};

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.x >= 0;
  });
};

Game.prototype.generateObstacle = function() {
  this.obstacles.push(new Obstacle(this));
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.obstacles.forEach(function(obstacle) {
  obstacle.draw();
  });

  this.ctx.font = "75px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText(Math.floor(this.score), 75, 150);
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  this.obstacles.forEach(function(obstacle) {
  obstacle.move();
  });
};

