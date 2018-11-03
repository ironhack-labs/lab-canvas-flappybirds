function GameLogic() {
  this.canvas = document.getElementById("myCanvas");
  this.ctx = this.canvas.getContext("2d");
  this.background = new Background(this);
  this.fps = 60;
  this.flappi = new Flappi(this);
  this.intervalID = null;
  this.tuberia = new Tuberias(this);

}

GameLogic.prototype.draw = function() {
  this.background.draw();
  this.flappi.draw();
  this.tuberia.draw();
};

GameLogic.prototype.init = function() {
  this.intervalID = setInterval(function (){
    this.moveAll();
    this.draw();
    if(this.colision()) {
      clearInterval(this.intervalID);
      alert("Game Over =(");
    }
  }.bind(this), 1000/this.fps);
};

GameLogic.prototype.moveAll = function() {
this.background.move();
this.tuberia.move();
this.flappi.move();
}

GameLogic.prototype.colision = function() {
if (this.flappi.y > this.canvas.height) {
  return true;
}

}


