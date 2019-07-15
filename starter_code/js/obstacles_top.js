class Obstacle_top{
  constructor(ctx,posX,posY,){
    this.ctx = ctx
    this.pox=posX
    this.posY=posY


    this.width=60
    this.height=100

    this.velX = 5
   
    //this.obstacles.push(new Obstacle(this.ctx, 30,0,this.height,30, Math.floor(Math.random() * 100 + 200)))


    this.imagetop = new Image()
    this.imagetop.src = 'images/obstacle_top.png'
  }

  draw(){
  
    this.ctx.drawImage(this.imagetop,0,0,100,100)
   
  }


  move() {
    this.posX -= 5
  }
}