const OBSTACLE_FRAMES = 120

class Game {
    constructor(ctx){
        this.ctx = ctx

        this.background = new Background(ctx)
        this.backgroundfooter = new BackgroundFooter(ctx)
        this.player = new Player(ctx)
        this.obstacles = []
        

        this.obstacleFramesCount = 0
        this.intervalId = undefined
        this.fps = 1000 / 60
        this.score = 0
    }

    start (){
        if(!this.intervalId) {
            this.intervalId = setInterval(() => {
                if (this.obstacleFramesCount % OBSTACLE_FRAMES === 0) {
                    this.addLowerObstacle()
          
                    this.obstacleFramesCount = 0
                  }
                this.clear()

                this.move()

                this.draw()

                this.checkCollissions()

                this.obstacleFramesCount++




            }, this.fps)
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.width > 0)


    }

    move (){
        this.background.move()
        this.backgroundfooter.move()
        this.player.move()
    }

    draw (){
        this.background.draw()
        this.obstacles.forEach( obstacle => obstacle.draw())
        this.backgroundfooter.draw()
        this.player.draw()
        this.drawScore()
    }

    drawScore() {
        this.ctx.save()
    
        this.ctx.fillStyle = 'orange'
        this.ctx.font = ' bold 20px sans-serif'
    
        this.ctx.fillText(`Score: ${this.score} ptos`, 80, 40)
    
        this.ctx.restore()
    }


    addLowerObstacle() {
        const max = this.ctx.canvas.height - 50
    
        const y = Math.floor(Math.random() * max)
    
        this.obstacles.push(
          new Lowerobstacle(this.ctx, 900 , y)
        )
      }


    /*addUpperObstacle() {
        const max = this.ctx.canvas.height - 50
    
        const y = Math.floor(Math.random() * max)
    
        this.upperObstacles.push(
          new Lowerobstacle(this.ctx, 900 , y)
        )
      }*/

    onKeyDown(keyCode) {
        this.player.onKeyDown(keyCode)
      }

      checkCollissions() {
        const condition = this.obstacles.some(obstacle => this.player.collidesWith(obstacle))
    
        if (condition) {
          this.gameOver()
          console.log('fin')
        }
    }

      gameOver() {
        clearInterval(this.intervalId)
    
        this.ctx.save()
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.font = 'bold 32px sans-serif'
        this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)
        this.ctx.fillText(`Your final Score ${this.score}` , this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 50)

        this.ctx.restore()

      }

}

