function Obstacle(game){
  this.game = game;
  this.x = game.canvas.width;
  this.vx = 5;
  this.pipeRatio = 138/793;
  this.minHeight = 150;
  this.maxHeight = 250;
  this.minGap = 60;
  this.maxGap = 150;
  this.gap = Math.floor(Math.random()*(this.maxGap-this.minGap+1)+this.minGap);
  this.heightTop= Math.floor(Math.random()*(this.maxHeight-this.minHeight+1)+this.minHeight);
  this.heightBottom = this.heightTop-this.gap;
  this.imgTop = new Image();
  this.imgTop.src = './images/obstacle_top.png';
  this.imgBottom = new Image();
  this.imgBottom.src = './images/obstacle_bottom.png';
}

Obstacle.prototype.draw = function(){
  this.game.ctx.drawImage(this.imgTop, this.x, 0, 400*this.pipeRatio, this.heightTop);
  this.game.ctx.drawImage(this.imgBottom, this.x, this.game.canvas.height-this.heightBottom, 400*this.pipeRatio, this.heightBottom);
};

Obstacle.prototype.move = function(){
  this.x -= this.vx;
};