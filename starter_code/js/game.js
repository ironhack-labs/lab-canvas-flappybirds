function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {
    this.clear();
    this.draw();
    this.moveAll();
  }.bind(this), 1000 / 20);
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
  this.player = new Player(this);
};

Game.prototype.isCollision = function() {

};

Game.prototype.clearObstacles = function() {

};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
}

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
};