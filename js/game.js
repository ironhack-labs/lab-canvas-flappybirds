class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = 768
        this.canvas.height = 1024
        this.ctx = this.canvas.getContext('2d')
    
        this.fps = 1000 / 60
        this.drawInterval = undefined
    
        this.background = new Background(this.ctx)
        this.faby = new Faby(this.ctx,100,500)
    
        this.points = 0
        

      }
    
      start() {
        if (!this.drawInterval) {
          //this.sounds.theme.play()
          this.drawInterval = setInterval(() => {
            this.clear()
            this.move()
            this.draw()
            //this.checkCollisions()
          }, this.fps);
        }
      }
    
      clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
    
      draw() {
        this.background.draw()
        this.faby.draw()
    
        // this.ctx.save()
        // this.ctx.font = '18px Arial'
        // this.ctx.fillText(`Score: ${this.points}`, 30, 25)
        // this.ctx.restore()
      }
    
      move() {
        this.background.move()
        this.faby.move()
      }
    
    //   onKeyEvent(event) {
    //     this.mario.onKeyEvent(event)
    //     this.background.onKeyEvent(event)
    //     this.coins.forEach(coin => coin.onKeyEvent(event))
    //   }
    
    //   checkCollisions() {
    //     const restCoins = this.coins.filter(coin => !this.mario.collidesWith(coin))
    //     const newPoints = this.coins.length - restCoins.length
    //     this.points += newPoints
    
    //     if (newPoints) {
    //       this.sounds.coin.currentTime = 0
    //       this.sounds.coin.play()
    //     }
    
    //     this.coins = restCoins
    //   }
    }