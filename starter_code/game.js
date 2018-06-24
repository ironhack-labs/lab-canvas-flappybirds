function Game() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;

  this.reset();
}
Game.prototype.start = function() {
  this.interval = setInterval(function() {
    this.clear();

    this.framesCounter++;
    
    this.draw();
    this.moveAll();

  }.bind(this), 1000 / this.fps);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
};

Game.prototype.moveAll = function() {
  this.background.move();
}