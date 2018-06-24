function Obstacle(game) {
  this.game = game;
  this.x = game.canvas.width;
  this.xv = 2;
  this.ratio = 138/793;
  this.minObsHeight = 100;
  this.maxObsHeight = 250;
  this.minGap = 50;
  this.maxGap = 150;
  this.gap = Math.floor(Math.random()*(this.maxGap - this.minGap+1) + this.minGap);
  this.heightTop = Math.floor(Math.random()*(maxObsHeight-minObsHeight+1)+minObsHeight);
  this.heightBottom = this.heightTop - this.gap;
  this.imageTop = new Image();
  this.imageTop.src = 'images/obstacle_top.png';
  this.imageBottom = new Image();
  this.imageBottom.src = 'images/obstacle_bottom.png';
}


Obstacle.prototype.draw = function(){
  this.game.ctx.drawImage(this.imageTop, this.x, 0, 250*this.ratio, this.heightTop);
  this.game.ctx.drawImage(this.imageBottom, this.x, this.game.canvas.height-this.heightBottom, 250*this.ratio, this.heightBottom);
};

Obstacle.prototype.move = function(){
  this.x -= this.vx;
};