function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.reset();
}

Game.prototype.start = function(delta) {
    this.clear();
    
    this.framesCounter++;

    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }

    if (this.framesCounter % 60 === 0) {
      this.generateObstacle();
    }
    
    this.score += 0.01;
    
    this.draw();
    this.moveAll(delta);
    
    this.clearObstacles();
    
    if (this.isCollision()) {
      this.gameOver();
    }
    window.requestAnimationFrame(this.start.bind(this))
};



Game.prototype.gameOver = function() {
  if(confirm("GAME OVER. Your score is: " + Math.floor(this.score.toFixed(0))+ " points. Play again?")) {
    this.reset();
    (this.start.bind(this))
  } else {
    location.reload()
    window.scrollTo(0,-document.body.scrollHeight);
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
  return this.obstacles.some(function(obstacle) {
    return (
      ((this.player.x + this.player.w) >= obstacle.x &&
       this.player.x < (obstacle.x + obstacle.w) && ((this.player.y + this.player.h > obstacle.topPosition && this.player.y < obstacle.topPosition + obstacle.topHeight) || 
       (this.player.y + this.player.h > obstacle.bottomPosition && this.player.y < obstacle.bottomPosition + obstacle.bottomHeight)))
       
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
  this.player.draw();
  
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });

  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText(Math.floor(this.score), 50, 50);
};

Game.prototype.moveAll = function(delta) {
  this.background.move();
  this.player.move(delta);
  this.obstacles.forEach(function(obstacle) { obstacle.move(); });
};