class Upperobstacle {
    constructor(ctx,x,y){
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = 138
        this.height = Math.floor(Math.random())

        this.img = new Image ()
        this.img.src = './js/upper-obstacles.js'
    
        this.vx = 3
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