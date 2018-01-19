var imgUP = new Image();
var imgDown = new Image();
var obstaclesSize = 200;
var ObstacleUp = function(ctx, canvasSize){
  this.posX = canvasSize.w - 100;
  this.posY =  canvasSize.h - obstaclesSize + 50;
  this.imgScale = 300/800;

}
ObstacleUp.prototype.render = function(ctx){
    imgUP.src="./images/obstacle_bottom.png";
    ctx.drawImage(imgUP, this.posX, this.posY, obstaclesSize*this.imgScale,obstaclesSize);

}


var ObstacleDown = function(ctx, canvasSize){
  this.posX = canvasSize.w -100;
  this.posY = 0 ;
  this.imgScale = 300/800;

}

ObstacleDown.prototype.render = function(ctx){
  imgDown.src="./images/obstacle_top.png";
  ctx.drawImage(imgDown, this.posX, this.posY, obstaclesSize*this.imgScale,obstaclesSize);

}