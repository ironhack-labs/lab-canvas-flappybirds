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
        this.obstacle = new Obstacle();
        this.obstacles = [];
        this.interval;
    }

    init() {
        this.clear();
        this.drawBackground();
        this.player.update();
        this.createObstacles();
        this.interval = setInterval(()=> {
            this.clear();
            this.drawBackground();
            this.player.update();
            this.player.newPos();
            this.player.move();
            this.player.hitBottom();
            for(let i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].createTopObstacle();
                this.obstacles[i].createBottomObstacle();
                this.obstacles[i].move();
                if(this.player.detectCollision(this.obstacles[i])) {
                    clearInterval(this.interval);
                    alert("YOU CRASHED");
                }
            }
        }, 1000 / 60);
    }

    drawBackground() {
        this.backgroundImg.src = "./images/bg.png";
        this.ctx.drawImage(this.backgroundImg, 0, 0, this.canvas.width, this.canvas.height);
    }

    createObstacles() {
        if (Math.floor(Math.random() * 10) % 1 === 0) {
            this.obstacles.push(new Obstacle(this));
        }
   
        setTimeout(() => {
            this.createObstacles();
        }, 3000);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}