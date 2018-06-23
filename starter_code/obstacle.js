function Obstacle(game){
    this.game = game
    this.img1 = new Image()
    this.img2 = new Image()
    this.img1.src = "./images/obstacle_top.png"
    this.img2.src = "./images/obstacle_bottom.png"
    this.speedX = 0.5
    this.space = 150
    this.w = 138/2
    this.h = 793/2
    this.x = this.game.canvas.width
    this.y = - Math.floor(Math.random()*(this.game.canvas.height/2)) - 100
    
}

Obstacle.prototype.draw = function(){
    this.game.ctx.drawImage(this.img1,this.x,this.y,this.w,this.h)
    this.game.ctx.drawImage(this.img2,this.x,(this.y+this.h+this.space),this.w,this.h)
}


Obstacle.prototype.move = function(){
    this.x-=this.speedX
}