class Game {
    constructor(){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.backgroundImg = new Image();
        this.width = 900;
        this.height = 600;
        this.player = new Player();
        this.interval;
    }

    init() {
        this.clear();
        this.drawBackground();
        this.interval = setInterval(()=> {
            this.clear();
            this.drawBackground();
        }, 10);
    }

    drawBackground() {
        this.backgroundImg.src = "./images/bg.png";
        this.ctx.drawImage(this.backgroundImg, 0, 0, this.width, this.height);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}