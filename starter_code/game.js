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
    this.dx = 5;
    this.offsetCounter=0;
    this.bird = new Bird(this.ctx,this.width/12,this.height/2,0,0,0,0);

}

Game.prototype.init = function(){

    var intervalID =  setInterval(function(){
        this.clear();
        this.moveAll();
        this.drawGame();
        this.bird.update();
        this.offsetCounter++;
        console.log(this.obstaclesArray.length);
        if(this.offsetCounter % 50 ===0){
        
            this.generateObstacles();
        }

        if(this.isCollision()){
            console.log("COLISION");
            clearInterval(intervalID);
        }

    }.bind(this),1000 / this.fps)

    
    
}

Game.prototype.drawGame = function(){
    this.drawBackground();
    this.bird.drawBird();

    if(this.obstaclesArray.length>0){
        this.obstaclesArray.forEach(function(obstacle) {
            obstacle.draw();
            obstacle.move();
            
        })
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

    var pos = Math.floor(Math.random()*2);
    console.log("pos "+pos);

    this.obstaclesArray.push(new Obstacles(this.ctx,xObs,yObs,pos));
}

Game.prototype.clearObstacle = function(){
    this.obstaclesArray = this.obstaclesArray.filter(function(obstacle){
        return obstacle.x >=0;
    })
}


// if( a.x+a.w >= b.x && b.x+b.w >= a.x &&
// 	a.y+a.h >= b.y && b.y+b.h >= a.y
// ){}

Game.prototype.isCollision = function(){
    var col = false;

    this.obstaclesArray.forEach(function(obstacle){
        console.log("pajaro "+this.bird.x);
        if(this.bird.x + this.bird.width >= obstacle.x && this.bird.x +this.bird.width >= this.bird.x &&
            this.bird.y + this.bird.height >= obstacle.y && obstacle.y +height >= this.bird.y){
                    return true;
            }
    }.bind(this))
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

