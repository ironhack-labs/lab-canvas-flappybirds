function Game(canvasId) {
  this.canvas = document.querySelector(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.img = new Image();
  this.isGameStart = false;
  this.img.src = "images/bg.png";
  this.player = new Player(this);
  this.obstacles = [];
  this.framesCounter = 0;
}

Game.prototype.drawBackground = function() {
  this.ctx.drawImage(this.img, 0, 0, 1000, 700);
};

Game.prototype.generateObstacle = function(){
    this.obstacles.push(new Obstacles(this));
}

Game.prototype.startGame = function() {
  this.gameStart = true;
  setInterval(function() {
      this.framesCounter++;
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (this.framesCounter % 50 === 0) {
        this.generateObstacle();
      } 

      // Mueve
      this.obstacles.forEach(function (obstacle){
        obstacle.move();
      })
      this.player.move();

      // pinta
      this.drawBackground();
      this.obstacles.forEach(function (obstacle){
        obstacle.draw();
      })
      this.player.draw();
      

    }.bind(this), 1000 / 60);
};
