function Pipe(ctx){
     this.ctx=ctx;
     this.x=800;
     this.yT=0;
     this.yB=800;
     this.vx=5;
     this.imgTop=new Image();
     this.imgTop.src="images/obstacle_top.png"
     this.imgBottom=new Image();
     this.imgBottom.src="images/obstacle_bottom.png"
     this.randYT=Math.random()*305;
     this.randYB=Math.random()*305;
}

Pipe.prototype.draw=function(){
     this.ctx.drawImage(this.imgTop, this.x, this.yT, 130, this.randYT);
     this.ctx.drawImage(this.imgBottom, this.x, this.yB, 130, -this.randYB);
}

Pipe.prototype.move=function(){
     this.x-=this.vx;
}



