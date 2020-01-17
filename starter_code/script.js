const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0;
let interval;

const imgs = {
    background: "./images/bg.png",
    flappy: './images/flappy.png',
    pipeBottom: './images/obstacle_bottom.png',
    pipeTop: './images/obstacle_top.png'
}

class Background {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.img = new Image();
        this.img.src = imgs.background;
        this.img.onload = () => {
            this.draw();
        }
    }
    draw() {
        this.x--;
        if (this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
    }
}

class FlappyBird {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.width = 50;
        this.height = 50;
        this.img = new Image();
        this.img.src = imgs.flappy;
        this.img.onload = () => {
            this.draw();
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    fly() {
        this.y -= 25;
    }
}

const background = new Background();
const flappy = new FlappyBird();

const update = () => {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    background.draw();
    flappy.draw();
}

functio


window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame();
    };

    document.addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 32:
                flappy.fly()
        }
    })

    function startGame() {
        interval = setInterval(update, 1000 / 60)
    }

};