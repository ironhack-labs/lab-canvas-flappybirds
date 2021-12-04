class Game {
    constructor(ctx) {
        this.ctx = ctx;

    this.background = new Background(ctx);
    this.footerBackground = new FooterBackground(ctx);
    }

    start() {
        this.draw();
    }

    draw() {
        this.background.draw();
        this.footerBackground.draw();
    }
}