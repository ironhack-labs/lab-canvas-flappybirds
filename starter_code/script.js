window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var game = new Game("canvas");
    game.start();
    $("#start-button").css({"pointer-events": "none"}).blur();
  };
};

function Game(canvasID){
  this.canvas = document.getElementById(canvasID);
  this.fps = 60;
  this.ctx = canvas.getContext("2d");
  this.reset();
  this.timeBetweenObstacles = 2000;
  this.seconds = 0;

}

Game.prototype.reset = function(){
  this.clear();
  this.background = new Background(this);
  this.player = new Player(this);
  this.obstacles = [];
  this.score = 0;
  this.seconds = 0;
  this.exit= false;
};

Game.prototype.draw = function(){
  this.background.draw();
  this.player.draw();
  this.obstacles.forEach(function(e){
    e.draw();
  });
  this.drawScore();
};

Game.prototype.moveAll = function(delta){
  this.background.move();
  this.player.move(delta);
  this.obstacles.forEach(function(e){
    e.move();
  });
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.generateObstacle = function(){
  if (this.seconds >2) {
    this.obstacles.push(new Obstacle(this));
  }
}

Game.prototype.clearObstacles = function(){
  this.obstacles=this.obstacles.filter(function(e){
    return e.x >= 0;
  });
};

Game.prototype.isColision = function(){
  return this.obstacles.some(function (e){
    return (
      ((this.player.x + 3*this.player.width/4)  > e.x) && 
      ((this.player.y + this.player.height/4 < e.topEnds) || 
      ((this.player.y + this.player.height) > e.bottomStarts)));
  }.bind(this));
}

Game.prototype.outOfCanvas = function(){
  if((this.player.y < -this.player.height - 10) || ((this.player.y+this.player.height + 10)>this.canvas.height)){
    return true;
  }
  return false;
}
Game.prototype.gameOver = function(){
  this.exit = true;
  if(confirm("GAME OVER. \n"+
              "your Score is "+ parseInt(this.score)+"\nPlay again?")) {
    this.reset();
    this.obstacles = [];
  } else {
    location.reload();
  }
}

Game.prototype.clear = function(){
  this.ctx.clearRect(0 ,0 ,this.canvas.width, this.canvas.height);
}

Game.prototype.drawScore = function() {
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "rgb(255, 255, 255)";
  this.ctx.fillText("score: "+parseInt(this.score), 600, 50);
}

//start with requestAnimationFrame
Game.prototype.start = function(){
    var lastTime = 0;
    this.clear();
    update = function(time){
      console.log(this.obstacles)
      if (this.seconds != parseInt(time/this.timeBetweenObstacles)){
        this.seconds = parseInt(time/this.timeBetweenObstacles);
        this.generateObstacle();
      }
      this.clearObstacles();
      if ((this.outOfCanvas()) || (this.isColision())){
        this.gameOver();
      }
      this.score += 0.1;
      this.clear();
      var delta = time-lastTime;
      lastTime = time;
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.draw();
      this.moveAll(delta);
      if(this.exit){
        this.clear;
        return;
      }
      window.requestAnimationFrame(update);
    }.bind(this);
  window.requestAnimationFrame(update);
}
