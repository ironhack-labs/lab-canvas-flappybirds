function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.canvas.width = 450;
  this.canvas.height = 504;
  this.ctx = this.canvas.getContext('2d');
  this.bg = new Image();
  this.bg.src = 'images/bg.png';
  this.bg.xPos = 0;
  this.bg.onload = (function() {
    this.bg.isReady = true;
  }).bind(this);
  this.bird = new Bird("canvas");
  this.obstaclesTop = [];
    setInterval(this.addObstacleTop.bind(this), 2000);
}

Game.prototype.addObstacleTop = function() {
  this.obstaclesTop.push(new ObstacleTop(this.canvas, 10, 100, (Math.floor(Math.random() * (200)))-200));
}

Game.prototype.clearBg = function () {
this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.drawBg = function () {
  if (this.bg.xPos < this.bg.width){
  this.ctx.drawImage(this.bg, this.bg.xPos + 1, 0, this.bg.width, this.bg.height);
  this.ctx.drawImage(this.bg, this.bg.xPos - this.bg.width, 0, this.bg.width, this.bg.height);
  this.bg.xPos += 1;
}
else if (this.bg.xPos == this.bg.width) {
  this.bg.xPos = 0;
  this.ctx.drawImage(this.bg, this.bg.xPos, 0, this.bg.width, this.bg.height);
}
};

Game.prototype.draw = function () {
    this.drawBg();
    this.bird.update();
    var lastObstacle = this.obstaclesTop.length - 1;
    if (this.obstaclesTop[lastObstacle] != undefined){
        this.obstaclesTop[lastObstacle].draw()
    }
};
