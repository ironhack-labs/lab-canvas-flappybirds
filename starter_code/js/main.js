function Game(Canvas) {
  this.canvas = document.getElementById(Canvas);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;

  this.reset();
}

window.onload = function() {
  var game = new Game("canvas");
  document.getElementById("start-button").onclick = function() {
    game.startGame();
    document.getElementById("start-button").disabled = true;
  };
}

Game.prototype.startGame = function() {
  this.interval = setInterval(function() {
    this.clear();

    this.framesCounter++;

    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }
    
    if (this.framesCounter % 90 === 0) {
      this.generateObstacles();
    }

    // Si Flappy cae al vacío 
    if (this.player.y >= this.canvas.height) {
      this.gameOver();
    }

    this.drawAll();
    this.moveAll();
    //this.game.player.update();

    this.clearObstacles();
  
  }.bind(this), 1000 / this.fps);
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.gameOver = function() {
  this.stop();
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.obstacles = [];
  this.framesCounter = 0;
  //this.score = 0;
};

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.x >= 0;
  });
};

Game.prototype.generateObstacles = function() { 
  this.obstacles.push(new Obstacle(this));
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.drawAll = function() {
  this.background.draw();
  this.player.draw();
  this.obstacles.forEach(function(obstacle) { 
    obstacle.draw(); 
  });
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  this.obstacles.forEach(function(obstacle) { 
    obstacle.move(); 
  });
};




