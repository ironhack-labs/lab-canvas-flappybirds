class Player {
    constructor(ctx) {
      this.ctx = ctx
  
      this.x = 100
      this.maxY = 340
      this.y = this.maxY
  
      this.vx = 0
      this.vy = 0
      this.ay = 0.2
  
      this.speedX = 3
  
      this.width = 46
      this.height = 32
  
      this.img = new Image()
      this.img.src = 'asset/images/sprite.png'
      this.img.isReady = false
  
      this.img.onload = () => {
        this.img.isReady = true
      }
  
      this.horizontalFrames = 3
      this.verticalFrames = 1
  
      this.xFrame = 0
      this.yFrame = 0
  
      this.tick = 0
  
      this.jumping = false
      this.running = false
    }
  
    draw() {
      this.ctx.drawImage(
        this.img,
        (this.img.width * this.xFrame) / this.horizontalFrames,
        (this.img.height * this.yFrame) / this.verticalFrames,
        this.img.width / this.horizontalFrames,
        this.img.height / this.verticalFrames,
        this.x,
        this.y,
        this.width,
        this.height
      )
  
      this.tick++
    }

    animation(){
        if (this.tick % 10 === 0) {
            this.xFrame++
      
            if (this.xFrame >= this.horizontalFrames ) {
              this.xFrame = 0
            }
        }
    }
  
    move() {
    this.animation()
    this.x += this.vx

    this.vy += this.ay
    this.y += this.vy

    if (this.x <= 0) {
      this.x = 0
    }
    if (this.x + this.width >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.width
    }
    }
  
    onKeyDown(keyCode) {
        if (keyCode === SPACE_BAR) {
            this.vy = -5
        }
    }
  
    // collidesWith(coin) {
    //   return this.x < coin.x + coin.width &&
    //     this.x + this.width > coin.x &&
    //     this.y < coin.y + coin.height &&
    //     this.y + this.height > coin.y
    // }
  
}