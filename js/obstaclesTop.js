class ObstaclesTop {

    constructor(ctx, posX, posY, width, height, speed) {
        this.ctx = ctx
    
        this.pos = {
            x : posX,
            y : posY,
        } 
    
        this.size = {
          width: width,
          height: height
        }
    
        this.image = undefined
        
        this.speed = speed
    
        this.startGame()
    
      }
    
      startGame() {
        this.image = new Image()
        this.image.src = './images/witch-obstacle-top.png'
      }
    
    
      draw() {
        this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.width, this.size.height)
      }
    
      move() {
        this.pos.x -= this.speed
        
      }
}