function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.nextTime = 2;
  this.increment = 6;

  this.setUp();
}

Game.prototype.setUp = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.obstacles = [];
}

Game.prototype.update = function(time) {
  this.clear();

  this.move();
  this.draw();
  this.removeObstacles();

  if (this.nextTime === time) {
    this.generateObstacle('top', this.obstacles.length);
    this.generateObstacle('bottom', this.obstacles.length);

    this.nextTime += this.increment;
  }
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.obstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
}

Game.prototype.move = function() {
  this.background.move();
  this.player.move();
  this.obstacles.forEach(function(obstacle) {
    obstacle.move();
  });
}

Game.prototype.generateObstacle = function(position, index) {
  this.obstacles.push(new Obstacle(this, position, index));
}

Game.prototype.removeObstacles = function() {
  var that = this;

  this.obstacles.forEach(function(obstacle, index) {
    if (obstacle.x + obstacle.width < 0) {
      that.obstacles.splice(index, 1);
    }
  });
}