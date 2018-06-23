function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.obstacles = [];
  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {
    this.clear();
    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }

    if (this.framesCounter % 50 === 0) {
      this.generateObstacle();
    }

    this.draw();
    this.moveAll();

  }.bind(this), 1000 / this.fps);
};

Game.prototype.clear = function(){
  this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

// Game.prototype.gameOver = function() {
//   this.stop();
  
//   if(confirm("GAME OVER. Play again?")) {
//     this.reset();
//     this.start();
//   }
// };

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.flappy = new Flappy(this,20, this.canvas.height/2);
  this.obstacles = [];
  this.score = 0;
};

// Game.prototype.isCollision = function() {
//   return this.obstacles.some(function(obstacle) {
//     return (
//       ((this.player.x + this.player.w) >= obstacle.x &&
//        this.player.x < (obstacle.x + obstacle.w) &&
//        this.player.y + (this.player.h - 20) >= obstacle.y)
//     );
//   }.bind(this));
// };

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
  this.obstacles.forEach(function(obstacle) { obstacle.draw(); });

  // this.ctx.font = "30px sans-serif";
  // this.ctx.fillStyle = "green";
  // this.ctx.fillText(Math.floor(this.score), 50, 50);
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.flappy.move();
  this.obstacles.forEach(function(obstacle) { obstacle.move(); });
};