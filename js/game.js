class Game {
    constructor(ctx) {
        this.ctx = ctx

        // this.bird = new Bird(ctx)
        this.background = new Background(ctx)
        this.floor = new Floor(ctx)
        this.bird = new Bird(ctx)

        this.intervalId = undefined
        this.fps = 1000 / 60

        this.obstacles = []

        this.obstaclesFrameCount = 0
    }

    start() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                // aquí se llama a todo (mover, draw).
                this.clear()
                this.draw()
                this.move()
                this.addObstacles()

                this.obstaclesFrameCount++
                
            }, this.fps);
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    draw() {
        this.background.draw()
        this.floor.draw()
        this.bird.draw()
        this.obstacles.forEach(obstacle => obstacle.draw());
        
        
    }

    move() {
        this.floor.move()
        this.bird.move()
    }

    onKeyDown(keyCode) {
        this.bird.onKeyDown(keyCode)
    }

    onKeyUp(keyCode) {
        this.bird.onKeyUp(keyCode)
    }

    addObstacles() {
        
    }


}