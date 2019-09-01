const Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  width: undefined,
  height: undefined,
  obstacles: [],
  obstaclesDown: [],
  counter: 0,
  score: undefined,
  keys: {
    SPACE: 32
  },
  
  init: function(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth * .98;
    this.height = window.innerHeight * .98;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.start();
  },

  start: function() {
    this.fps = 60;
    this.reset();
    this.intervalID = setInterval(() => {
      this.clear();
      this.counter++;
      if (this.counter > 1000) this.counter = 0;
      if (this.counter % 100 == 0) this.score++; 
      this.drawAll();
      this.moveAll();
      this.generateObstacles();
      this.clearObstacles();
      this.isCollision();
      this.drawScore();
      console.log(this.counter);
    }, 1000 / this.fps);
  },

  stop: function() {
    clearInterval(this.intervalID);
  },

  gameOver: function() {
    this.stop();
    return (confirm(`SCORE = ${this.score}`)) ? this.start() : this.reset();
  },

  reset: function() {
    this.background = new Background(this.width, this.height, this.ctx);
    this.player = new Player(this.width, this.height, this.ctx, this.keys);
    this.scoreboard = scoreBoard;
    this.scoreboard.init(this.ctx);
    this.score = 0;
    this.obstacles = [];
  },

  drawAll: function() {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach(obs => obs.draw()) 
  },

  moveAll: function () {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(obs => obs.move()) 
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  generateObstacles: function() {
    if (this.counter % 100 === 0) {
      this.obstacles.push(new Obstacles(this.ctx, this.canvas.width))
    }
  },

  clearObstacles: function() {   
    this.obstacles.forEach( (obs, idx) => {
      if(obs.paramX <= 0) {
        this.obstacles.splice(idx, 1)
      } 
    })
  },

  isCollision: function() {   
    this.obstacles.some(obs => {
			if (
				this.player.paramX + this.player.width > obs.paramX &&
				this.player.paramX < obs.paramX + obs.width &&
				this.player.paramY < obs.paramY + obs.height
			) {
				this.gameOver()
			} else if (
				this.player.paramX + this.player.width > obs.paramX &&
				this.player.paramX < obs.paramX + obs.width &&
				this.player.paramY + this.player.height > obs.paramY + obs.height + obs.distance
			) {
				this.gameOver()
			}
		})
  },
  
  drawScore: function () {       
    this.scoreboard.update(this.score);
  },

};