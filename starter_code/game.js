var KEY_UP = 32;

function Game(id){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.x=0;
    this.y=0;
    this.width=1200;
    this.height=700;
    this.img= new Image();
    this.obstaclesArray = [];
    this.src= "images/bg.png";
    this.setListeners();
    this.dx = 10;
    this.offsetCounter=0;
    this.bird = new Bird(this.ctx,this.width/12,this.height/2,0,0,0,0);

}

Game.prototype.init = function(){

    setInterval(function(){
        this.clear();
        this.moveAll();
        this.drawGame();
        this.bird.update();
        this.offsetCounter++;
        console.log(this.obstaclesArray.length);
        if(this.offsetCounter % 200 ===0){
            console.log(this.offsetCounter);
            this.generateObstacles();
        }

    }.bind(this),1000 / this.fps)
    
}

Game.prototype.drawGame = function(){
    this.drawBackground();
    this.bird.drawBird();

    if(this.obstaclesArray.length>0){
    //     this.obstaclesArray.forEach(function(obstacle) {
          
            this.obstaclesArray[0].draw();
            this.obstaclesArray[0].move();
            
        // })
   //+ }
    }
   
}

Game.prototype.moveAll = function(){
    this.moveBackground();
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.clearObstacle();
  };


Game.prototype.drawBackground = function(){
    this.img.src = this.src;
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
}

Game.prototype.moveBackground = function(){
    this.x -= this.dx;

    if(this.x < -this.width){
        this.x = 0;
    }

}
Game.prototype.generateObstacles = function(){
    var xObs =1100;
    var yObs = 300;
    this.obstaclesArray.push(new Obstacles(this.ctx,xObs,yObs));
}

Game.prototype.clearObstacle = function(){
    this.obstaclesArray = this.obstaclesArray.filter(function(obstacle){
        return obstacle.x >=0;
    })
}

Game.prototype.setListeners = function() {
    document.onkeydown = function(e) {
      e.preventDefault();
      
      if(e.keyCode === KEY_UP){
          //UP
          this.bird.speedy=10;
      }
        
        
    }.bind(this);
  }

