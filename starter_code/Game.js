/** @type {CanvasRenderingContext2D} */
class Game {
  constructor(id, width, height){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
    this.w= this.canvas.width;
    this.h= this.canvas.height;
    this.w2 = this.w/2;
    this.h2 = this.h/2;   
    this.bird = new Bird(this);
    this.background = new Background(this);
    this.obstacles = [];
    this.counter = 0;
    this.intervalId;
  
  }


  startGame() {
    this.intervalId = setInterval(()=>{
      this.ctx.clearRect(0,0,this.w,this.h);
      this.counter++;
      if (this.counter%100 ===0){
        this.obstacles.push(new Obstacle(this));
      }
      this.checkColision();
      this.move();
      this.draw();

    }, 1000/60);
  }

  stopGame() {
    clearInterval(this.intervalId);
  }


  draw() {
    this.background.drawBackground();
    this.bird.drawBird();
    this.obstacles.forEach(obstacle => obstacle.drawObs());
  }

  move(){
    window.onkeydown = function (e) {
      if (e.keyCode === 32) {
        this.bird.moveBird();
      }
    }.bind(this);
    this.bird.gravity();
    this.obstacles.forEach(obstacle => obstacle.moveObs());

  }

  checkColision(){
    var dy = this.bird.y;
    var dx= this.bird.x;
    var dW=this.bird.birdW;
    if (dy+35 == this.h ) {this.stopGame()};
    this.obstacles.forEach(obstacle => {
    console.log(dx, dW, obstacle.x, obstacle.y +700, dy);

  //     if 
  //     //   (((dy < obstacle.y +700) &&
  //     //  (dy > obstacle.yBot)) 
  //     //  ((dx + dW>= obstacle.x) 
  //     //   (dx <= obstacle.x + obstacle.obsW)))
       
  //       (!(obstacle.yBot > dy < obstacle.y +700) &&
  //       (dx + dW > obstacle.x) && (dx < obstacle.x + obstacle.obsW));
        
  //       {
  //         console.log("colision");
  //         this.stopGame();
  //       }
    });
  }
  


}