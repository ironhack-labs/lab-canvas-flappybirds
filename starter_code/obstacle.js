function Obstacle(game) {
  this.game = game;

  this.w = 75;
 
  this.vx = 8;

  this.x = this.game.canvas.width;
  

  this.calculateHeight();
  
  this.topImg = new Image();
  this.topImg.src = "images/obstacle_top.png"

  this.bottomImg = new Image();
  this.bottomImg.src = "images/obstacle_bottom.png"
}

Obstacle.prototype.draw = function() {
  this.topPosition = 0;
  this.bottomPosition = this.game.canvas.height - this.bottomHeight;
  this.game.ctx.drawImage(this.topImg, this.x, this.topPosition, this.w, this.topHeight)
  this.game.ctx.drawImage(this.bottomImg, this.x, this.bottomPosition, this.w, this.bottomHeight)
};

Obstacle.prototype.move = function() {
  this.x -= this.vx;
};

Obstacle.prototype.calculateHeight = function(){
  var space = 200;
  var maxHeight = this.game.canvas.height - space;

  this.topHeight = Math.floor(Math.random()* ((maxHeight-150) - 150)) + 150;
  this.bottomHeight = maxHeight - this.topHeight;
}