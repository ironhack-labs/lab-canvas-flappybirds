/** @type {CanvasRenderingContext2D} */
class Game {
  constructor(id, width, height){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.setAttribute('width', width)
    this.canvas.setAttribute('height', height)
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
      this.counter++
      if (this.counter%100 ===0){
        this.obstacles.push(new Obstacle(this));
      }
      this.checkColision()
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
    this.obstacles.forEach(obstacle => {
      console.log('1', (this.bird.y > obstacle.y))
      console.log('2', (this.bird.y < obstacle.yBot))
      console.log('3',  (this.bird.x + this.bird.birdW > obstacle.x))
      console.log('4', (this.bird.x < obstacle.x + obstacle.obsW))

      if 
        (((this.bird.y < obstacle.y +700) ||(this.bird.y > obstacle.yBot)) &&
        ((this.bird.x + this.bird.birdW > obstacle.x) ||(this.bird.x < obstacle.x + obstacle.obsW))){
          console.log("colision")
          this.stopGame();
        }
    })
  }
  
  



}