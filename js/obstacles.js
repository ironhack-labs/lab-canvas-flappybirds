class Obstacles {

    constructor(ctx, posX, posY, width, height, speed) {
        this.ctx = ctx
    
        this.pos = {
            x : posX,
            y : posY,
        } 
    
        this.width = width
        this.height = height
    
        this.image = undefined
        
        this.speed = speed
    
        this.startGame()
    
      }
    
      startGame() {
        this.image = new Image()
        this.image.src = './'
      }
    
    
      draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
      }
    
      move() {
        this.pos.x += this.speed
      }
}