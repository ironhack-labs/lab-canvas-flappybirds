function CreateObstacle(ctx) {
  this.topx = 100;
  this.topy = 550;
  this.width = 500;
  this.height = 500; //Math.floor(Math.random()*200);
  this.ctx = ctx;
}
CreateObstacle.prototype.render = function() {
  var imgObs = new Image();
  imgObs.src = "./images/obstacle_top.png";
  
  this.ctx.drawImage(imgObs, this.topx, this.topy);
};
