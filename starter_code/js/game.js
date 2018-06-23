function Game(canvas) {
  this.canvas = document.getElementById(canvas)
  this.ctx = this.canvas.getContext("2d")
  this.fps = 60
  this.score = 0
  this.reset()
}

Game.prototype.start = function() {
  this.interval = setInterval(function (){
    this.clear()
    this.framesCounter++
    if (this.framesCounter > 1399) {
      this.framesCounter = 0
    }
    if (this.framesCounter % 70 === 0) {
      this.generateObstacle();
    }

    this.draw()
    this.step()

    this.clearObstacles()

    if (this.isCollision()) {
      this.gameOver();
    } else {
      this.score += 0.01
    }
  }.bind(this), 1000 / this.fps)
}

Game.prototype.stop = function() {
  clearInterval(this.interval)
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Game.prototype.draw = function() {
  this.background.draw()
  this.obstacles.forEach(function(obstacle) {
    obstacle.draw()
  })
  this.player.draw()
  this.ctx.font = '20px Arial'
  this.ctx.fillText('Score: ' + this.score.toFixed(0), 10, 20)
}

Game.prototype.step = function() {
  this.background.move()
  this.player.move()
  this.obstacles.forEach(function(obstacle) {
    obstacle.move()
  })
}

Game.prototype.reset = function() {
  this.background = new Background(this)
  this.player = new Player(this)
  this.obstacles = []
  this.framesCounter = 0
  this.score = 0
}

Game.prototype.generateObstacle = function() {
  var yTop = Math.random() * ((this.canvas.height / 2) - (this.canvas.height / 4)) + this.canvas.height / 4
  this.obstacles.push(new Obstacle(this, yTop))
}

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.x >= -100;
  })
}

Game.prototype.isCollision = function() {
  return this.obstacles.some(function(obstacle) {
    if ((this.player.x + this.player.imgWidth >= obstacle.x) &&
        (this.player.x < obstacle.x + obstacle.imgWidth)) {
      if (this.player.y <= obstacle.yTop || this.player.y >= obstacle.yBottom) {
        return true
      }
    }
  }.bind(this))
}

Game.prototype.gameOver = function() {
  this.stop()
}
