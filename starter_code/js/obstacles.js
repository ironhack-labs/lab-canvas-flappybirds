function Obstacles(game){
    this.game = game;
    this.dx= 2;
    this.y=0 ;
    this.x = 500;
    this.w= 70;
    this.h =this.x;
    this.width= 15;
    this.height = game.canvas.height;
  
    this.gap= game.canvas.width * 0.09 *2;
   
    this.imgTop = new Image();
    this.imgTop.src="./images/obstacle_top.png";
    this.imgBottom =new Image();
    this.imgBottom.src="./images/obstacle_bottom.png"
    this.position = Math.floor(Math.random()*(300-0+1)+0);
    this.size = 120;
    
}
Obstacles.prototype.draw =function(){
   
   this.game.ctx.drawImage(this.imgTop, this.x, this.position - this.height, 75, this.height);
   this.game.ctx.drawImage(this.imgBottom, this.x, (this.position) + this.size, 75, this.height);
   };


Obstacles.prototype.move= function(){
    this.x -= this.dx;

};

