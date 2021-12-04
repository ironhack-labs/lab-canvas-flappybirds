class Game {
    constructor(ctx) {
      this.ctx = ctx
  
      this.background = new Background(ctx)
      this.background2 = new Background2(ctx)
      
      this.player = new Player(ctx)
  
      this.intervalId = undefined
        
      // obstacle
      this.obstacles = [];
      this.obstacleFramesCount = 0;

      //this.score = 0
    }
  
    start() {
      if (!this.intervalId) {
      
        this.intervalId = setInterval(() => {
            // add an obstacle every OBSTACLE_FRAMES
            if (this.obstacleFramesCount % OBSTACLE_FRAMES === 0) {
                this.addObstacle();
                this.obstacleFramesCount = 0;
            }
            this.obstacleFramesCount++;

          this.clear()
  
          this.move()
  
          this.draw()
        //   this.checkCollission()
        }, 1000 / 60)
      }
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    //     // to count the score : check the difference between the length of the obstacles array, before and after the filter
    // const previousObstaclesLength = this.obstacles.length;

    // // delete from the array all the obstacles after they get out of the canvas 
    // this.obstacles = this.obstacles.filter(obstacle => obstacle.x  < this.ctx.canvas.width);
    
    // // add score : 
    // if (this.obstacles.length < previousObstaclesLength) {
    //    this.score++;
    // }

    }
  
    // drawScore() {
    //   this.ctx.fillText(`Score: ${this.score}`, 100, 100)
    // }
  
    draw() {
      this.background.draw()
      this.background2.draw()
      
      this.player.draw()
      console.log("draw")
      //this.obstacles[0].draw();
      this.obstacles.forEach(obstacle => {
        obstacle.draw();
        console.log("hola")
      })
  
    //   this.drawScore()
    }
  
    move() {
      this.background.move()
      this.background2.move()

      this.player.move()
      this.obstacles.forEach(obstacle => obstacle.move());
    }

    addObstacle() {
        // set the random position of the obstacle
        const max = this.ctx.canvas.height - 100;
        const randomY = Math.floor(Math.random() * max);
    
        // set the random size of the obstacle min 30, max 120
        const randomWidth = Math.floor(Math.random() * 120 + 30);
        this.obstacles.push(new Obstacle(this.ctx, randomY));

        console.log(this.obstacles)
    }


  
    onKeyDown(keyCode) {
      this.player.onKeyDown(keyCode)
    }
  
    // onKeyUp(keyCode) {
    //   this.player.onKeyUp(keyCode)
    // }
  }