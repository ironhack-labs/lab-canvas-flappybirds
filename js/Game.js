class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.intervalId = undefined;
        this.background = new Background(ctx)
        this.footer = new Footer(ctx)
    }

    start() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
            }, 1000 / 60);
        }
    }
    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    draw() {
        this.background.draw();
        this.footer.draw();
    }
    move() {

    }
}