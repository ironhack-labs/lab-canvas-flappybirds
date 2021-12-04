class Game {
    constructor(ctx) {
        this.ctx = ctx;
        
        this.backgroundStatic = new BackgroundStatic(ctx);
        //this.backgroundFooter = new BackgroundFooter(ctx);
        
        this.interval = undefined;

    }

    start() {
       // if(!this.intervalId) {
            this.intervalId = setInterval(() => {
                // this.clear();
                this.move();
                this.draw();
            }, 1000 / 60)
        //}
    }

    draw () {
        this.backgroundStatic.draw();
        //this.backgroundFooter.draw();
    }

    move () {
       // this.backgroundFooter.move();

    }
}