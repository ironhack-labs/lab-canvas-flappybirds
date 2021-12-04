class Player {
    constructor(ctx){
        this.ctx = ctx

        this.width = 80
        this.height = 55

        this.x = 225
        this.y = 100

        this.img = new Image ()
        this.img.src = './images/flappy.png'

        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }

        this.vx = 0
        this.vy = 0

        this.ay = 0.3

        this.jumping = false
        this.maxY = 370

    }

    draw (){
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height,
        )
    }

   /* setUpListeners(event){
        const status = event.type === 'keydown'

        if(event.KeyCode === KEY_SPACEBAR){
            this.movements.up = status
        }

    }*/

    move (){
 
        this.vy += this.ay
        this.y += this.vy

        console.log('test caida')

        if (this.y <= 0) {
          this.y = 0
        }
        if (this.y >= this.maxY) {
          this.y = this.maxY
          this.jumping = false
        }
    }

    onKeyDown(keyCode) {
        if (keyCode === KEY_SPACEBAR) {
          this.vy = -5
          this.jumping = true
        }
    }


    collidesWith(obstacle) {
        console.log('entra')

        if (
          this.x < obstacle.x + obstacle.width &&
          this.x + this.width > obstacle.x &&
          this.y < obstacle.y + obstacle.height &&
          this.y + this.height > obstacle.y
        ) {
            console.log('collision')
          return true
        }
        
        return false
      }

}