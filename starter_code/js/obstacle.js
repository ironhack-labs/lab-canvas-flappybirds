var pipeRatio = 138/793;

function Obstacle(game){
  this.game = game;
  this.x = myGameArea.canvas.width;
  this.minHeight = 20;
  this.maxHeight = 200;
  this.height = Math.floor(Math.random()*(this.maxHeight-this.minHeight+1)+this.minHeight);
  this.minGap = 50;
  this.maxGap = 200;
  this.gap = Math.floor(Math.random()*(this.maxGap-this.minGap+1)+this.minGap);
  this.img = new Image();
}