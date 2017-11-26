function Game(canvasId, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext('2d');
  this.bird = new Bird(this.canvas, "./images/flappy.png");
  // debugger
  this.pipe= new Pipe(this.canvas,"./images/obstacle_bottom.png", this.width);
  this.bg= new Background(this.canvas,"./images/bg.png",this.width);
  //this.obstacles = [];
  //this.intervl =setInterval(this.addObstacle.bind(this), 3000);
  //this.points=0;
}

Game.prototype.isReady = function() {
  return this.bird.isReady();
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.clear();
  this.bg.draw();
  this.pipe.draw();
  this.bird.updateBird();
  // if (this.isReady()) {
  //   this.bird.draw();
  // }

  // if (this.isReady()) {
  //   this.paintRoad();
  //   this.drawScore();
  //   this.bird.draw();
  //   for (var i = 0; i < this.obstacles.length; i++) {
  //     // debugger
  //     if (this.obstacles[i].y > 500) {
  //       this.obstacles.splice(i, 1);
  //     } else {
  //       this.obstacles[i].draw();
  //       this.crashFront(i);
  //     }
  //   }
  // }

  window.requestAnimationFrame(this.draw.bind(this));
};
