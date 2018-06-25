function Game(canvasId){
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;

}

Game.prototype.startGame = function () {
    this.interval = setInterval(function(){
      this.draw();
    }.bind(this), 1000 / this.fps);
    
  }


Game.prototype.draw = function(){
  this.background.draw();
}