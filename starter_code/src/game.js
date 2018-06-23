function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");

  this.setUp();
}

Game.prototype.setUp = function() {
  this.background = new Background(this);
  this.player = new Player(this);
}

Game.prototype.update = function() {
  this.clear();

  this.move();
  this.draw();
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
}

Game.prototype.move = function() {
  this.background.move();
  this.player.move();
}