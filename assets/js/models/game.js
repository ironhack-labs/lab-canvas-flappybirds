class Game {
    constructor(ctx) {
        this.ctx = ctx;

    this.background = new Background(ctx);
    this.footerBackground = new FooterBackground(ctx);
    this.player = new Player(ctx);
    }

    start() {
        this.draw();
    }

    draw() {
        this.background.draw();
        this.footerBackground.draw();
        this.player.draw();
    }
    
    move() {
        this.player.move();
    }

    /* oneKeyUp(keyCode) {
        this.player.oneKeyUp(keyCode);
    }
 */
    oneKeyDown(keyCode) {
        this.player.oneKeyDown(keyCode);    
    }

}