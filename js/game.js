const OBSTACLE_FRAMES = 120

class Game {
    constructor(ctx){
        this.ctx = ctx

        this.background = new Background(ctx)
        this.backgroundfooter = new BackgroundFooter(ctx)
        this.player = new Player(ctx)
        this.lowerObstacles = []
        this.upperObstacles = []

        this.obstacleFramesCount = 0
        this.intervalId = undefined
        this.fps = 1000 / 60
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

                this.obstacleFramesCount++

            }, this.fps)
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    move (){
        this.background.move()
        this.backgroundfooter.move()
        this.player.move()
    }

    draw (){
        this.background.draw()
        this.backgroundfooter.draw()
        this.lowerObstacles.forEach( lowerObstacles => lowerObstacles.draw())
        this.player.draw()
    }


    addLowerObstacle() {
        const max = this.ctx.canvas.height - 100
    
        const y = Math.floor(Math.random() * max)
    
        this.lowerObstacles.push(
          new Lowerobstacle(this.ctx, 700 , y)
        )
        console.log('obstacles')
      }

    onKeyDown(keyCode) {
        this.player.onKeyDown(keyCode)
      }
}

