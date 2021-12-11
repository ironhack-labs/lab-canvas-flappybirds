class Game {
    constructor(ctx) {
        this.ctx = ctx

        this.background = new Background(ctx)
        this.floor = new Floor(ctx)
        this.bird = new Bird(ctx)

        this.intervalId = undefined
        this.fps = 1000 / 60

        this.obstacles = []
        this.obstaclesFrameCount = 0

        this.score = 0
    }

    start() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {

                if (this.obstaclesFrameCount % 120 === 0) {
                    this.addObstacle()
                    this.obstaclesFrameCount = 0;
                }

                this.clear()
                this.draw()
                this.move()
                this.checkCollisions()

                this.obstaclesFrameCount++
                
            }, this.fps);
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.imgTop.width > 0)
      
        this.obstacles.forEach((obstacle, i) => {
            if (Math.ceil(obstacle.x) - Math.ceil(this.bird.x) === 3) {
                this.score++
            }            
        });     
    }

    draw() {
        this.background.draw()
        this.obstacles.forEach(obstacle => obstacle.draw());   
        this.floor.draw()
        this.bird.draw()      
        this.drawScore()      
    }

    move() {
        this.floor.move()
        this.bird.move()
        this.obstacles.forEach(obstacle => obstacle.move())
    }

    onKeyDown(keyCode) {
        this.bird.onKeyDown(keyCode)
    }

    addObstacle() {
        this.obstacles.push(new Obstacles(this.ctx))
    }

    drawScore() {
        this.ctx.save()

        this.ctx.fillStyle = 'black'
        this.ctx.font = 'bold 24px sans-serif'
        this.ctx.fillText(`Score: ${this.score} points`, 80, 50) 

        this.ctx.restore()
    }

    checkCollisions() {
        const condition = this.obstacles.some(obstacle => this.bird.collidesWith(obstacle))

        if (condition || this.bird.y >= this.bird.maxY) {
            this.gameOver();
        }
    }

    gameOver() {
        clearInterval(this.intervalId);

        this.ctx.save()

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 24px sans-serif';
        this.ctx.fillText(`Game Over`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 30);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Final score: ${this.score}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 30);

        this.ctx.restore();
    }
}