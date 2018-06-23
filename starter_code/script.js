window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var game = new Game("canvas");
    game.start();
    $("#start-button").css({"pointer-events": "none"}).blur();
  };
};

function Game(canvasID){
  this.canvas = document.getElementById(canvasID);
  this.framesCounter = 0;
  this.fps = 60;
  this.ctx = canvas.getContext("2d");
  this.reset();

}

Game.prototype.reset = function(){
  this.background = new Background(this);
  this.player = new Player(this);
};

Game.prototype.draw = function(){
  this.background.draw();
  this.player.draw();
};

Game.prototype.moveAll = function(delta){
  this.background.move();
  this.player.move(delta);
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


//start with requestAnimationFrame
Game.prototype.start = function(){
    var lastTime = 0;
    update = function(time){
      this.clear();
      var delta = time-lastTime;
      lastTime = time;
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.background.draw();
      this.player.draw();
      this.moveAll(delta);
      window.requestAnimationFrame(update);
    }.bind(this);
  window.requestAnimationFrame(update);
}
