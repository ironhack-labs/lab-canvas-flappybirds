class Background {
    constructor (ctx){
        this.ctx = ctx

        this.x =  0
        this.vx = -1

        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height

        this.img = new Image ()
        this.img.src = './images/bg.png'

        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }

    }

    draw (){
        if (this.img.isReady){
            this.ctx.drawImage(
                this.img,
                this.x,
                0,
                this.width,
                this.height,               
            )
            this.ctx.drawImage(
                this.img,
                this.x + this.width,
                0,
                this.width,
                this.height,               
            )

        }
    }

    move (){
        this.x += this.vx
        if(this.x + this.width <= 0){
            this.x = 0
        }
    }
}