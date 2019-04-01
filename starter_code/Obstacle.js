class Obstacle {
  constructor(game) {
    this.game = game;
    this.imgObsTop = new Image();
    this.imgObsTop.src = "./images/obstacle_top.png";
    this.imgObsBot = new Image();
    this.imgObsBot.src = "./images/obstacle_bottom.png";
    this.y= -Math.floor(Math.random()*(650 -400)+400);
    //this.y=-600;
    this.x=this.game.w;
    this.dif=850;
    this.vx=3;
    this.yBot=this.y+this.dif;
    this.obsW=75;
  }

  
  drawObs() {
    this.game.ctx.beginPath();
    this.game.ctx.drawImage(this.imgObsTop,this.x-75,this.y,this.obsW,700);
    this.game.ctx.drawImage(this.imgObsBot,this.x-75,this.yBot,this.obsW,700);
    this.game.ctx.closePath();
  }

  moveObs() {
    this.x -= this.vx;
    if (this.x <= 0) this.x = 0;
  }
    
}