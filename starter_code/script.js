const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0;
let interval;
let obstacles = [];
let score = 0;

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
        this.y += 5;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    fly() {
        this.y -= 50;
    }
    isTouching(pipe) {
        return (
            this.x < pipe.x + pipe.width &&
            this.x + this.width > pipe.x &&
            this.y < pipe.y + pipe.height &&
            this.y + this.height > pipe.y
        )
    }
}

class Pipe {
    constructor(y, height, imgType) {
        this.x = canvas.width;
        this.y = y;
        this.height = height;
        this.width = canvas.width / 5;
        this.imgTop = new Image();
        this.imgBottom = new Image();
        this.imgTop.src = imgs.pipeTop;
        this.imgBottom.src = imgs.pipeBottom;
        this.imgType = imgType;
    }
    draw() {
        this.x--;
        if (this.imgType) {
            ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.imgBottom, this.x, this.y, this.width, this.height);
        }
    }
}

const background = new Background();
const flappy = new FlappyBird();

const generatePipes = () => {
    if (frames % 300 === 0) {
        const min = 100;
        const max = 300;
        const spaceBetweenPipes = 500;
        const randomHeight = Math.floor(Math.random() * (max - min)) + min;
        obstacles.push(new Pipe(0, randomHeight, false));
        obstacles.push(
            new Pipe(randomHeight + spaceBetweenPipes, canvas.height - randomHeight, true)
        )
        console.log(obstacles);
    }
}

const drawPipe = () => {
    obstacles.forEach(pipe => pipe.draw());
}


const checkCollitions = () => {
    if (flappy.y >= canvas.height - flappy.height) return gameOver()
    obstacles.forEach((pipe, i) => {
        if (pipe.x + pipe.width <= 0) {
            obstacles.splice(i, 1)
        }
        flappy.isTouching(pipe) ? gameOver() : null
    })
}

const drawScore = () => {
    ctx.font = "20px Arial"
    ctx.fillStyle = "white"
    ctx.fillText(`Score: ${score}`, canvas.width - 200, 50);
}
const gameOver = () => {
    const title = "GAME OVER"
    const msj = `Your score is: ${score}`

    ctx.fillStyle = 'red'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText(title, (canvas.width / 2) - 50, 300)
    ctx.fillText(msj, (canvas.width / 2) - 60, 320)
    obstacles = []
    clearInterval(interval)
}

const update = () => {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    background.draw();
    flappy.draw();
    if (frames % 50 === 0) { score++ }
    generatePipes()
    drawPipe();
    checkCollitions();
    drawScore();
}
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
        if (interval) return;
        interval = setInterval(update, 1000 / 60)
    }

};