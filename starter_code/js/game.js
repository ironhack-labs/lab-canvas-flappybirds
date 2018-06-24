function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {
    //Clear despues del set interval para que la imagen no se multiplique o arrastre
    this.clear();

    this.draw();

  }.bind(this), 1000 / this.fps);
};


Game.prototype.stop = function() {

};

Game.prototype.gameOver = function() {

};

Game.prototype.reset = function() {
  this.background = new Background(this);
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
}

Game.prototype.moveAll = function() {

};