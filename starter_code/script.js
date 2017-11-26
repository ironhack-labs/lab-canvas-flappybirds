function Game(canvas) {
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext('2d');
  this.xPos = 0;

  this.bg = new Image();
  this.bg.src = "images/bg.png";
  // this.bg.onload = function (){
  //   this.ctx.drawImage(this.bg,0,0);
  //
  // };

  this.faby = new Faby(this.canvas, "images/flappy.png");



}

Game.prototype.drawBg = function() {
  if (true) {
    this.ctx.save();
    this.ctx.drawImage(this.bg,this.xPos,0);
    this.ctx.restore();
  }

};

Game.prototype.draw = function() {
  if (true) {
    //this.clear();
    this.drawBg();
    this.faby.drawFaby();

  }
  window.requestAnimationFrame(this.draw.bind(this));
};







window.onload = function() {
  var game = new Game("canvas");
  console.log(game);
  game.draw();


  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

  }

};
