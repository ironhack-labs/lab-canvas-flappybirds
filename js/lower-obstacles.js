class Lowerobstacle {
    constructor(ctx,x,y){
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = 138
        this.height = 793

        this.img = new Image ()
        this.img.src = './images/obstacle_bottom.png'

        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }        
    
        this.vx = -3

        
    }

    draw(){
        this.ctx.save()
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height,
        )
        this.ctx.restore()
        this.move()
    }
    move() {
        this.x += this.vx
      }
}