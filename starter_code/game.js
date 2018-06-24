function Game() {
  this.backgrounds = [];
  this.player = new Player(this);
  this.obstacles = [];
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.reset();
  this.framesCounter = 0;
  this.points = new Points(this)
  this.score = document.getElementById("score");
}

Game.prototype.start = function() {
  var that = this;
  that.points.start()
  this.interval = setInterval(function() {
    that.framesCounter++;
    
    if (that.framesCounter > 1000) {
      that.framesCounter = 1;
    }

    if (that.framesCounter % 500 === 0) {
      that.obstacles.push(new Obstacle(that));
    }
    that.drawAll();
    that.moveAll();
  });
};

Game.prototype.gameOver = function() {
  clearInterval(this.interval);
  window.removeEventListener("keyup",spaceFunction);
  this.drawAll()
  var that = this
  //this.ctx.rotate(2*Math.PI);
  setTimeout(function(){
    that.player.y-=5
    that.player.vY-=0.8;
    var inter=setInterval(function(){
      that.clear()
      that.player.g = 0.012
      that.player.move()
      that.drawAll()
      if (that.player.y  > that.canvas.height){
        clearInterval(inter)
        that.showScore()
      }
    })
  },250)
  
  
};

Game.prototype.showScore = function(){
  
  document.getElementById("game-board").style.position="relative"
  this.canvas.style.position="relative"
  this.score.style.display="block"
  this.score.style.top="40%"
  this.score.style.left="35%"

  document.getElementById("text").innerText="Your Score: " + this.points.points

}

Game.prototype.checkColisions = function() {
  if (this.player.y >= this.canvas.height - 50) {
    this.player.y = this.canvas.height - 50
    this.player.vY = 0
    this.points.stop()
    this.gameOver();
  }
  if(this.player.y <= 0){
    this.player.y = 0;
    this.player.vY = 0
    this.points.stop()
    this.gameOver();
  }
  var that = this;
  this.obstacles.forEach(function(e) {
    var dif = e.x + e.w - (that.player.x + that.player.w);

    if (dif <= 100 && dif >= -40) {
      if (
        that.player.y <= e.y + e.h ||
        that.player.y + that.player.h >= e.y + e.h + e.space
      ) {
        if (that.player.x + that.player.w >= e.x) {
          that.points.stop()
          that.gameOver();
        }
        e.w
      }
    }
  });
};

Game.prototype.reset = function() {
  this.backgrounds.push(new Background(this, 0));
  this.backgrounds.push(new Background(this, 900));
  this.player = new Player(this);
  this.obstacles.push(new Obstacle(this));

  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.points = new Points(this)
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.drawBackgrounds = function() {
  this.backgrounds.forEach(e => {
    e.draw();
  });
};

Game.prototype.drawObstacles = function() {
  this.obstacles.forEach(function(e) {
    e.draw();
  });
};

Game.prototype.drawAll = function() {
  this.clear();
  this.drawBackgrounds();
  this.drawObstacles();
  this.points.draw()
  this.player.draw();
};

Game.prototype.moveAll = function() {
  this.backgrounds.forEach(e => {
    e.move();
  });
  var that = this;
  this.obstacles.forEach(function(e) {
    if (e.x < -e.w) {
      that.obstacles.shift();
    }
    e.move();
  });
  this.player.move();
  this.checkColisions();
};
