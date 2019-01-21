var game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  keys: {
    SPACE : 32
  },

  start: function (canvasSelector) {
    this.canvas = document.getElementById(canvasSelector);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    
    this.reset();

    this.interval = setInterval(function () {
      this.clear(); 

      this.framesCounter++;

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
      if (this.framesCounter % 100 === 0) {
        this.generateObstacle();
      }

      this.score += 0.01;

      this.moveAll(); 
      this.drawAll(); 
      this.clearObstacles();

      if (this.isCollision()) {
        this.gameOver();
      }

      

    }.bind(this), 1000 / this.fps);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  gameOver: function () {
    this.stop();
  },


  
  reset: function () {
    this.background = new DrawBackground(this);
    this.player = new Player(this);
    this.framesCounter = 0;
    this.obstacles = [];
    this.scoreBoard = ScoreBoard;
    this.score = 0;
  },
  clearObstacles: function () {
    this.obstacles = this.obstacles.filter(function (obstacle) {
      return obstacle.x >= -140;
    });
  },
  generateObstacle: function () {
    this.obstacles.push(new Obstacle(this));
  },

  isCollision: function () {
      return this.obstacles.some(function (obstacle) {
      return (
        ((this.player.x + (this.player.w - 10)) >= obstacle.x &&
          this.player.x < (obstacle.x + obstacle.w) &&
          this.player.y + (this.player.h - 10) >= obstacle.y)
      );
    }.bind(this));
  },


  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawAll: function () {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach(function (obstacle) { 
      obstacle.draw()
    });
    this.drawScore();
  },
 
  moveAll: function () {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(function (obstacle) { 
      obstacle.move()
    });
  },

  drawScore: function () {
    this.scoreBoard.update(this.score, this.ctx)
  }


};