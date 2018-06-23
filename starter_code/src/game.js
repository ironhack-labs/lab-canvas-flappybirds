function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.increment = 6;

  this.setUp();
}

Game.prototype.setUp = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.obstacles = [];
  this.nextTime = 0;
  this.gameOver = false;
}

Game.prototype.update = function(time) {
  this.clear();

  this.move();
  this.draw();
  this.removeObstacles();

  if (this.nextTime === 0 && time !== -1) {
    this.nextTime = time + 2;
  }

  if (this.nextTime === time) {
    this.generateObstacle('top', this.obstacles.length);
    this.generateObstacle('bottom', this.obstacles.length);

    this.nextTime += this.increment;
  }

  if (this.checkCrashes()) {
    this.finishGame();
    this.gameOver = true;
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
  this.obstacles.forEach(function(obstacle, index) {
    if (obstacle.x + obstacle.width < 0) {
      this.obstacles.splice(index, 1);
    }
  }.bind(this));
}

Game.prototype.checkCrashes = function() {
  var p = this.player;
  return this.obstacles.some(function(o) {
    return ((p.x >= o.x && p.x <= o.x + o.width) 
      || (p.x + p.width >= o.x && p.x + p.width <= o.x + o.width))
      && ((p.y >= o.y && p.y <= o.y + o.height)
      || (p.y + p.height >= o.y && p.y + p.height <= o.y + o.height));
  }.bind(this));
}

Game.prototype.finishGame = function() {
  this.ctx.save();

  this.ctx.font = 'bold 48px Arial';
  this.ctx.textBaseline = 'middle';
  this.ctx.textAlign = 'center';
  
  this.ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);

  this.ctx.restore();
}