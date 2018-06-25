
window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    var game = new Game("canvas");
    game.start();
    $("#start-button").css({ "pointer-events": "none" }).blur();
  };
};
function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.ctx = canvas.getContext("2d");
  this.framesCounter = 0
  this.fps = 60;
  this.reset();

}

Game.prototype.reset = function(){
  this.background = new Background(this);
};  

Game.prototype.draw = function() {
  this.background.draw()
}


Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


Game.prototype.start = function(){
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.background.draw();
    window.requestAnimationFrame(update);
  }.bind(this);
window.requestAnimationFrame(update);

function startGame(){
  game.start()
}








 







