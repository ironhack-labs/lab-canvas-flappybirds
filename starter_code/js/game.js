function Game(canvas) {
  this.canvas = document.getElementById(canvas)
  this.ctx = this.canvas.getContext("2d")
  this.fps = 60
  this.reset()
}

Game.prototype.start = function() {
  this.interval = setInterval(function (){
    this.clear()
    this.framesCounter++
    if (this.framesCounter > 1400) {
      this.framesCounter = 0
    }

    if (this.framesCounter % 70 === 0) {
      this.generateObstacle();
    }

    this.draw()
    this.step()

    this.clearObstacles()
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
}

Game.prototype.step = function() {
  this.background.move()
  this.obstacles.forEach(function(obstacle) {
    obstacle.move()
  })
}

Game.prototype.reset = function() {
  this.background = new Background(this)
  this.obstacles = []
  this.framesCounter = 0
  this.score = 0
}

Game.prototype.generateObstacle = function() {
  var yTop = Math.random() * ((this.canvas.height / 2) - (this.canvas.height / 4)) + this.canvas.height / 4
  console.log(yTop)
  this.obstacles.push(new Obstacle(this, yTop))
}

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.x >= -100;
  })
}
