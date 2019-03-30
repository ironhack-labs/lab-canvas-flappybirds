class Bird {
  constructor(game) {
    this.game = game
    this.imgBird = new Image();
    this.imgBird.src = "./images/flappy.png";
    this.y=this.game.h2;
    this.vy=50;
    this.grav=2;
    this.birdW=50;
    


      
  }

  
  drawBird() {
    this.game.ctx.beginPath();
    this.game.ctx.drawImage(this.imgBird,this.game.w2/2,this.y,this.birdW,35);
    this.game.ctx.closePath();
  }

  
  
   gravity() {
      this.y =this.y + this.grav;
    };

    moveBird(){
      if((this.y > 0) && (this.y < this.game.canvas.height)){
      this.y -= this.vy;
    }
    }
}
