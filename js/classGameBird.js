class Game {
    constructor(ctx) {
        this.ctx = ctx;
        
        
        this.backgroundStatic = new BackgroundStatic(ctx);
        this.backgroundFooter = new BackgroundFooter(ctx);
        this.player = new Player(ctx);

        this.interval = undefined;

    }

    start() {
       if(!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
            }, 1000 / 60)
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
    }

    draw () {
        this.backgroundStatic.draw();
        this.backgroundFooter.draw();
        this.player.draw();
    }

    move () {
        this.backgroundStatic.move();
        this.backgroundFooter.move();
        this.player.move();
    }

    onKeyDown(keyCode){
        this.player.onKeyDown(keyCode);
        
    }
}