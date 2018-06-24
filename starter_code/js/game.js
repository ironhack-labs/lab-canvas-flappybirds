function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;

  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {
    this.clear();

    this.framesCounter++;

    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }

    if (this.framesCounter % 50 === 0) {
      this.generateObstacle();
    }
    
    this.draw();
    this.moveAll();

    this.clearObstacles();

    if (this.isCollision()) {
      this.gameOver();
    }
  }.bind(this), 1000 / this.fps);
};

Game.prototype.clear = function (){
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
  this.Background = new Background(this);
  this.player = new Player(this);
  this.obstacles = [];
  this.framesCounter = 0;
  this.score = 0;
};

Game.prototype.isCollision = function() {
  return this.obstacles.some(function(obstacle) {
    return (
      ((this.player.x + player.imgScale * 20) >= obstacle.x &&
       this.player.x < (obstacle.x + obstacle.ratio * 250) &&
       this.player.y <= obstacle.heightTop && 
       this.player.y + 40 >= obstacle.heightBottom)
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

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.Player.draw();
  this.Obstacles.forEach(function(obstacle) { 
    obstacle.draw(); 
  });
};

Game.prototype.moveAll = function() {
  this.Background.move();
  this.Player.move();

  this.obstacles.forEach(function(obstacle) { 
    obstacle.move(); 
  });
};