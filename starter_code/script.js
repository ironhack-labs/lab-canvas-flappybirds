
  function startGame(Id) {
    this.canvas = document.getElementById(Id)
    this.ctx = this.canvas.getContext("2d");
    this.fps =60;
    this.reset();

  }
  startGame.prototype.run = function(){
    this.interval = setInterval(function (){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.framesCounter++
      if (this.framesCounter > 1300) {
        this.framesCounter = 0
      }
      if (this.framesCounter % 30 === 0) {
        this.generateObstacle();
      }
  
      this.draw()
      this.move()
  
      this.clearObstacles()
  
      if (this.isCollision()) {
        this.gameOver();
      } 
    }.bind(this), 1000 / this.fps)

  }

  startGame.prototype.stop = function() {
    clearInterval(this.interval)
  }
  
  startGame.prototype.draw = function() {
    this.background.draw()
    this.obstacles.forEach(function(obstacle) {
      obstacle.drawObs()
    })
    this.bird.draw()
  }
  startGame.prototype.reset = function() {
    this.background = new Background(this)
    this.bird = new Bird(this)
    this.obstacles = []
    this.framesCounter = 0
  }

startGame.prototype.move= function(){
  this.background.move()
  this.bird.move()
  this.obstacles.forEach(function(obstacle) {
    obstacle.moveObs()
  })
}


startGame.prototype.generateObstacle = function() {
  var yTop = Math.random() * ((this.canvas.height / 2) - (this.canvas.height / 4)) + this.canvas.height / 4
  this.obstacles.push(new Obstacles(this, yTop))
}

startGame.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.x >= -100;
  })
}

startGame.prototype.isCollision = function() {
  return this.obstacles.some(function(obstacle) {
    if ((this.bird.x + this.bird.imgWidth >= obstacle.x) &&
        (this.bird.x < obstacle.x + obstacle.imgWidth)) {
      if (this.bird.y <= obstacle.yTop || this.bird.y >= obstacle.yBottom) {
        return true
      }
    }
  }.bind(this))
}

startGame.prototype.gameOver = function() {
  this.stop()
}