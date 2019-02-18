var Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    scoreBoard: undefined,

    init: function(id){
      this.canvas = document.getElementById(id);
      this.ctx = this.canvas.getContext("2d");
      this.w = 900;
      this.h = 504;
      this.canvas.width = this.w;
      this.canvas.height = this.h;
      this.start();
    },
    start: function () {
    
        this.reset();
    
        this.interval = setInterval(function () {
            this.clear();
            this.moveAll();
            this.drawAll();





            window.onkeydown = function(e) {
                if (e.keyCode === 37) {
                  console.log("aaaaa")
                  //this.vy -= 10;
                } 
              }
            /*
          
    
          this.framesCounter++;
    
          // controlamos que frameCounter no sea superior a 1000
          if (this.framesCounter > 1000) {
            this.framesCounter = 0;
          }
    
          // controlamos la velocidad de generación de obstáculos
          if (this.framesCounter % 50 === 0) {
            this.generateObstacle();
          }
    
          this.score += 0.01;
    
          
          
    
          // eliminamos obstáculos fuera del canvas
          this.clearObstacles();
    
          if (this.isCollision()) {
            this.gameOver();
          }*/
        }.bind(this), 1000 / this.fps);
      },
      reset: function () {
        this.background = new Background(this);
        this.player = new Player(this);
        //this.scoreBoard = ScoreBoard
        //this.framesCounter = 0;
        //this.obstacles = [];
        //this.score = 0;
      },
      clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      drawAll: function () {
        this.background.draw();
        this.player.draw();
        //this.obstacles.forEach(function (obstacle) { obstacle.draw(); });
        //this.drawScore();
      },  
      moveAll: function () {
        this.background.move();
        this.player.move();
        //this.obstacles.forEach(function (obstacle) { obstacle.move(); });
      }  
}