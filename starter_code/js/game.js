const Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60, 
  scoreBoard: undefined,
  keys: {
    SPACE: 32
  },
  init: function(canvasId){
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions()
    this.start()

  },
  setDimensions: function(){
    this.canvas.setAttribute("width", 500)
    this.canvas.setAttribute("height", 550)
  },
  start: function(){
  this.fps = 60;
  this.reset();
  this.interval = setInterval(()=> {
  this.framesCounter++;
  // controlamos que frameCounter no sea superior a 1000
  if (this.framesCounter > 1000) {
      this.framesCounter = 0;
  }
  //Obstaculos bottom
  if (this.framesCounter % 300 === 0) {
    this.generateObstacleBottom();
  }
  //Obstaculos top
  if (this.framesCounter % 300 === 0) {
    console.log(this.obstaclesTop)
    this.generateObstacleTop();
  }
  if (this.isCollisionBottom()) {
    clearInterval(this.interval);
  }
  if (this.isCollisionTop()) {
    //clearInterval(this.interval);
    console.log("crash")
  }
  this.clearObstacles();
  this.clear()
  this.moveAll();
  this.drawAll(); 
  
  })
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawAll: function() {
    this.background.draw()
    this.player.draw(this.framesCounter)
    this.obstaclesBottom.forEach(function(obstacle) {
      obstacle.draw();
    });
    this.obstaclesTop.forEach(function(obstacle) {
      obstacle.draw();
    });
  },
  reset: function(){
    this.framesCounter = 0;
    this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)
    this.player = new Player(this.canvas.height, this.canvas.width, this.ctx, this.key)
    this.obstaclesBottom = [];
    this.obstaclesTop = [];
  },
  moveAll: function(){
    this.background.move()
    this.player.move()
    this.obstaclesBottom.forEach(function(obstacle) {
      obstacle.move();
    });
    this.obstaclesTop.forEach(function(obstacle) {
      obstacle.move();
    });
  },
  generateObstacleBottom: function() {
    this.obstaclesBottom.push(
      new ObstacleBottom(this.canvas.width, this.player.y0, this.player.h, this.ctx)
    );
  },
  generateObstacleTop: function() {
    this.obstaclesTop.push(
      new ObstacleTop(this.canvas.width, this.player.y0, this.player.h, this.ctx)
    );
  },

  clearObstacles: function() {
    this.obstaclesBottom = this.obstaclesBottom.filter(function(obstacle) {
      return obstacle.x >= -50;
    });
    this.obstaclesTop = this.obstaclesTop.filter(function(obstacle) {
      return obstacle.x >= -50;
    });
  },

  isCollisionBottom: function() {
    return this.obstaclesBottom.some(obstacle => {
      return (
        this.player.x + this.player.w >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + (this.player.h - 20) >= obstacle.y
      );
    });
  },

  isCollisionTop: function() {
    // colisiones genéricas
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    // esto chequea que el personaje no estén en colisión con cualquier obstáculo
    return this.obstaclesTop.some(obstacle => {
      return (
        this.player.x + this.player.w >= (obstacle.x) &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + (this.player.h - 20) >= (obstacle.y)
      );
    });
  },

}