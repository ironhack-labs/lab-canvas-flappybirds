function Background(game,x){
    this.game=game
    this.x=x
    this.y=0
    this.speedX=0.5
    this.img=new Image()
    this.img.src="./images/bg.png"

}

Background.prototype.draw=function(){
    this.game.ctx.drawImage(this.img,this.x,this.y,this.game.canvas.width,this.game.canvas.height)
}


Background.prototype.move=function(){
    if(this.x>=(-this.game.canvas.width+this.speedX)){
        this.x-=this.speedX
    }else{
        this.x=this.game.canvas.width-1
    }
    
}