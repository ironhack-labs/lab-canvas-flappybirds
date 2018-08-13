function FabyConstructor(y, vy, ctx) {
  this.y = y;
  this.x = 100;
  this.vy = vy;
  this.ctx = ctx;
  this.width = 30 * 1.418;
  this.height = 30;

  this.drawFaby = function() {
    this.fabyImg = new Image();
    this.fabyImg.src = 'images/flappy.png';
    this.ctx.drawImage(this.fabyImg, this.x, this.y, this.width, this.height);
  };
  //simple animation
  this.update = function() {
    this.y += this.vy;

    if (this.y >= 470) {
      this.y = 470;
      this.vy = 0;
    }
  };
  //reaction to spacebar
  this.newPos = function() {
    this.y -= 10;
    this.vy = -4;
  };

  this.stopMove = function() {
    this.vy = 2;
  };

  this.checkIfCrash = function(obstacle) {
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var myleft = this.x;

    var otherleft = obstacle.x;
    var othertop = obstacle.y;
    var otherbottom = obstacle.y + obstacle.height;
    var otherright = obstacle.x + obstacle.width;
    var crash = true;
    if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
      crash = false;
    }
    return crash;
  };
}
