function Game () {
  this.canvas = document.getElementById("canvas");
  this.ctx = canvas.getContext("2d");
  this.background = new Background (this);
  this.fps = 60;
  this.intervalID = null;
  this.flappy = new Flappy(this);


}

Game.prototype.drawAll = function() {
  this.background.draw();
  this.flappy.draw();

}

Game.prototype.moveAll = function(){
  this.background.move();
  this.flappy.move()
}



Game.prototype.init = function (){
  this.intervalID = setInterval (function(){
    this.drawAll();
    this.moveAll();
  } .bind(this), 1000 /this.fps)
}