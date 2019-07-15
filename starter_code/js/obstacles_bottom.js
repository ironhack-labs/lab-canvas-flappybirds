class Obstacle_bottom{
  constructor(ctx,posX,posY){
    this.ctx = ctx
    this.pox=posX
    this.posY=posY

    this.velX = 5
    //this.obstacles.push(new Obstacle(this.ctx, 30,0,this.height,30, Math.floor(Math.random() * 100 + 200)))
    this.width=60
    this.height=100

   
    
    this.imagebottom = new Image()
    this.imagebottom.src = 'images/obstacle_bottom.png'
  }

  draw(){
    console.log('dibujo obstaculos')
    this.ctx.drawImage(this.imagebottom,0,200,100,100)
    //this.obstacles.push(new Obstacle(this.ctx,this.width,0,this.height,30, Math.floor(Math.random() * 100 + 200)))
    //constructor(ctx,posX,posY_top,posY_bottom,width,height)
  }


  move() {
    this.posX -= 5
  }
}