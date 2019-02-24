function Game() {
  this.canvas = gameBoard.querySelector("canvas");
  this.canvas.classList.add("red");
  this.canvas.width = 1000;
  this.canvas.height = 800;
  this.ctx = this.canvas.getContext("2d");
  this.fps = 30;

  this.reset();
}

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
}

Game.prototype.start = function() {
  this.interval = setInterval(function(){
    this.clear();
    this.moveAll();
    this.draw();
  }.bind(this),1000/this.fps);
}

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

Game.prototype.moveAll=function() {
  this.background.move();
  this.player.move();
}