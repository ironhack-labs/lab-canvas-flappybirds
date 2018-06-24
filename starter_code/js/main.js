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

    //this.framesCounter++;
//
    //if (this.framesCounter > 1000) {
    //  this.framesCounter = 0;
    //}

    this.drawAll();
    this.moveAll();
  
  }.bind(this), 1000 / this.fps);
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  //this.obstacles = [];
  //this.framesCounter = 0;
  //this.score = 0;
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.drawAll = function() {
  this.background.draw();
  this.player.draw();
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
//
//  this.obstacles.forEach(function(obstacle) { obstacle.move(); });
};




