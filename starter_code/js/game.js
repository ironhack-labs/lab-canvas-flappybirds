function Game(canvaId){

  this.canvas =document.getElementById(canvaId);
  this.ctx =this.canvas.getContext("2d");
  this.fps = 60;
  this.reset();

}

Game.prototype.start = function() {

  this.interval = setInterval (function() {
       this.clear();
       this.framesCounter++;

       if (this.framesCounter > 1000) {
         this.framesCounter = 1;
       }
       if (this.framesCounter % 200 === 0) {
         this.generateObstacles();
      }
       this.score += 0.02;
       this.draw();
       this.move();

       
       if (this.isCollision()) {
         this.gameOver();
       }
     }.bind(this), 800 / this.fps);
  
  };

  Game.prototype.stop =function(){
    clearInterval (this.interval);
  }
  
  Game.prototype.gameOver = function() {
   this.stop();
    
  if(confirm("Game over.Play again?")) {
    this.reset();
    this.start();
   }
};


Game.prototype.reset = function ()
{
  this.background = new Background(this);
  this.flappy = new Flappy (this);
  this.obstacles =[];
  this.framesCounter = 0;
  this.score = 0;
}

  Game.prototype.draw= function(){
    this.background.draw();
    this.flappy.draw();

    this.obstacles.forEach( function(obstacles){
      obstacles.draw();
    
    });

    this.ctx.font = "30px Sans-serif";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(Math.floor(this.score), 55, 55);
  };

  Game.prototype.move =function(){
    this.background.move();
    this.flappy.move();
    this.obstacles.forEach(function(obstacles){
    obstacles.move();
    });
  };

  Game.prototype.generateObstacles = function() {
    this.obstacles.push(new Obstacles(this));
    };

  Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(obstacle) {
    return obstacle.x >= 80;
    });
    };

    
    
    Game.prototype.clear = function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    Game.prototype.isCollision = function() {
      if (this.flappy.y >= canvas.height) {
        return true
       } else 
       {
       return this.obstacles.some(function(obstacles) {
         if (this.flappy.x + this.flappy.w == obstacles.x ){
              return (
       this.flappy.y + this.flappy.h <= obstacles.position ||
       this.flappy.y + this.flappy.h >= obstacles.position  + obstacles.size
         )}
       }.bind(this));}
      };
      
    
      
    