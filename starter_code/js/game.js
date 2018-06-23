function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.framesCounter = 0;
  this.obstacles = [];
  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {
    this.clear();
    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }

    if (this.framesCounter % 50 === 0) this.generateObstacle();

    this.draw();
    this.moveAll();
    
    this.clearObstacles();
    if (this.isCollision()) this.gameOver();
    this.framesCounter++;
  }.bind(this), 1000 / this.fps);
};

Game.prototype.clear = function(){
  this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.gameOver = function() {
  this.stop();
  
  if(confirm("GAME OVER. Play again?")) {
    this.reset();
    this.start();
  }
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.flappy = new Flappy(this,20, this.canvas.height/2);
  this.obstacles = [];
  this.score = 0;
};

Game.prototype.isCollision = function() {
  return this.obstacles.some(function(obstacle) {
    return (
      ((this.flappy.x + 50) >= obstacle.x &&
       this.flappy.x < (obstacle.x + 400*obstacle.pipeRatio) &&
       this.flappy.y >= obstacle.heightTop &&
       this.flappy.y +50 <= obstacle.heightBottom)
    );
  }.bind(this));
};

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.x >= 0;
  });
};

Game.prototype.generateObstacle = function() {
  this.obstacles.push(new Obstacle(this));
};


Game.prototype.draw = function() {
  this.background.draw();
  this.flappy.draw();
  this.obstacles.forEach(function(obstacle) { console.log(obstacle); obstacle.draw(); });
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.flappy.move();
  this.obstacles.forEach(function(obstacle) { obstacle.move(); });
};