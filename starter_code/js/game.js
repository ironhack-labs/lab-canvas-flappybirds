window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").style.display = "none"
    startGame()
  };
}

function startGame() {
  flappyBird.init('mycanvas')
}

const flappyBird = {
  version: '1.0',
  name: 'Fappy-Bird',
  description: 'Un pájaro que evita obstáculos',
  author: 'María',
  canvasDom: undefined,
  ctx: undefined,
  winW: undefined,
  winH: undefined,
  fps: 60,
  keys: {
    TOP_KEY: 38,
    SPACE: 32
  },
  init: function(canvasId) {
    this.canvasDom = document.getElementById(canvasId);
    this.ctx = this.canvasDom.getContext("2d");
    this.winW = window.innerWidth
    this.winH = window.innerHeight
    this.setDimensions()
    this.start()
  },
  setDimensions: function () {
    this.canvasDom.setAttribute('width', this.winW)
    this.canvasDom.setAttribute('height', this.winH)
  },
  setHandlers: function () {
    window.onresize = () => this.setDimensions()
  },
  start: function() {
    this.reset();
    this.fps = 15;
    this.interval = setInterval(() => {
      this.clear();
      this.framesCounter++;
      if (this.framesCounter % 50 === 0) {
        this.generateObstacle();
      }
      if (this.isCollision()) {
        
          this.gameOver();
      }
      this.moveAll();
      this.drawAll();
      this.clearObstacles();

    }, 1000 / this.fps);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  gameOver: function() {
    this.stop();

    if (confirm("GAME OVER. Play again?")) {
      this.reset();
      this.start();
    }
  },
  reset: function(){
    this.background = new Background(this.canvasDom.width, this.canvasDom.height, this.ctx);
    this.player = new Player(this.canvasDom.width, this.canvasDom.height, this.ctx, this.keys)
    this.obstacles = []
    this.framesCounter = 0;
    
  },
  drawAll: function() {
    this.background.draw();
    this.player.drawImage();
    this.obstacles.forEach(function(obstacle) {
      obstacle.drawObstacles()
      
    });
  },
  moveAll: function() {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(function(obstacle) {
      obstacle.moveObstacle();
    });
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
  },
  generateObstacle: function() {
    this.obstacles.push(new ObstacleTop(this.ctx, this.winW));
  },
  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x >= 0;
    });
  },
  isCollision: function() {
    return this.obstacles.some(obstacle => {
       return(this.player.x + this.player.w > obstacle.x && 
        obstacle.x + obstacle.w > this.player.x && 
        this.player.y + this.player.h > obstacle.y && 
        obstacle.y + obstacle.h > this.player.y ) 
       
     });
   },
}