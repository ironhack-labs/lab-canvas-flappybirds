const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 10,
    started: false,
    obstacles: [],
    count: 0,


    init() {
        this.canvas = document.getElementById(`canvas`);
        this.ctx = this.canvas.getContext("2d");

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.setListeners();




        this.start()

    },

    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.moveAll();
            this.clear();
            this.drawAll();
            this.clearObstacles();
            this.scoreShow()
            if (this.detectCol() || this.birdOut()) this.crashed()
            if (this.count % 500 == 0 && this.started) {
                this.createObstacles();
            }
            this.count++

        }, this.fps / 60)

    },

    drawAll() {
        this.background.draw();
        this.bird.draw();
        this.obstacles.forEach(elm => elm.draw())
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.bird = new Bird(this.ctx, this.width, this.height)
        this.obstacles = []

    },
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    },
    moveAll() {
        this.background.move();
        this.bird.move();
        this.obstacles.forEach(elm => elm.move())

    },

    setListeners() {
        document.onkeydown = e => {
            if (this.started)
                e.keyCode === 32 ? this.bird.jump() : null
            else {
                this.bird.gravity = 0.15
                this.started = true
                this.bird.jump()
                this.count=0
            }

        }

    },

    clearObstacles() {

        this.obstacles.forEach(elm => {

            if (elm.posX + elm.width <= 0) this.obstacles.shift()

        })

    },

    createObstacles() {
        let obj = new Obstacles(this.ctx, this.width, this.height)
        obj.randomIzer();
        this.obstacles.push(obj)
    },

    detectCol() {
        return this.obstacles.some(
            obs =>
            (this.bird.posX + this.bird.width >= obs.posX &&
                this.bird.posY <= obs.posY + obs.height) ||
            (this.bird.posX + this.bird.width >= obs.posX &&
                this.bird.posY + this.bird.height >= obs.posY + obs.height + obs.spaceEmpty)

        )
    },

    birdOut() {

        return this.bird.posY + this.bird.height >= this.canvas.height
    },

    crashed() {
        confirm("Continue?")?this.restart(): window.close()
    },

    scoreShow() {

        this.ctx.font = "30px Arial";
        this.ctx.fillText(`Score: ${this.count}`, 50, 50)
    },
    restart(){

        this.started=false
        this.reset()
    }

}

console.log(this.bird.velY)