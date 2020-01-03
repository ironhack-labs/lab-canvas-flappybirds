class Game {
    constructor(){
        this.canvas = document.createElement('canvas');
        document.getElementById('game-board').appendChild(this.canvas);
        this.canvas.setAttribute('id', 'canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 900;
        this.canvas.height = 500;
        this.backgroundImg = new Image();
        this.player = new Player();
        this.interval;
    }

    init() {
        this.clear();
        this.drawBackground();
        this.player.update();
        this.interval = setInterval(()=> {
            this.clear();
            this.drawBackground();
            this.player.update();
            this.player.newPos();
            this.player.move();
            this.player.hitBottom();
        }, 1000 / 60);
    }

    drawBackground() {
        this.backgroundImg.src = "./images/bg.png";
        this.ctx.drawImage(this.backgroundImg, 0, 0, this.canvas.width, this.canvas.height);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}