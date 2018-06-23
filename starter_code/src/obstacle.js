function Obstacle(game, position, index) {
  this.game = game;
  this.ratio = 138 / 793;
  this.obstacleSize = 100;
  this.width = this.obstacleSize;
  this.height = this.obstacleSize / this.ratio;
  this.position = position;
  this.speedX = -1;
  this.x = this.game.canvas.width;
  this.y = this.getVerticalPosition(index);

  this.image = new Image();
  this.image.src = "images/obstacle_" + position + ".png";
}

Obstacle.prototype.draw = function() {
  this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

Obstacle.prototype.move = function() {
  this.x += this.speedX;
};

Obstacle.prototype.getVerticalPosition = function(index) {
  if (this.position === "top") {
    return Math.floor(Math.random() *
          (this.game.canvas.height - this.game.player.height * 5 - 100)) +
          100 - this.height;
  } else {
    var prevObstacle = this.game.obstacles[index - 1];
    var randomGapHeight = Math.floor(this.game.player.height * (Math.random() * (5 - 2) + 2));

    return prevObstacle.y + prevObstacle.height + randomGapHeight;
  }
};
