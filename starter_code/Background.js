class Background{
  constructor(game){
   this.game = game;
   this.imgBack = new Image();
   this.imgBack.src = "./images/bg.png";


  }

  drawBackground() {
    this.game.ctx.beginPath();
    this.game.ctx.drawImage(this.imgBack,0,0,this.game.w,this.game.h);
    this.game.ctx.closePath();
}

}