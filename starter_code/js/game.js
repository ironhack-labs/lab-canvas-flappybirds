var App = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    score: undefined,
    keySpace: 32,
    init: function (canvadId) {
        this.canvas = document.getElementById(canvadId);
        this.ctx = this.canvas.getContext("2d");
        this.fps = 60;
        this.background = new Background(this);
        this.faby = new Faby(this);
        this.obstacle = []
        this.interval = setInterval(
            function () {
                this.clear();
                this.framesCounter++;
                // controlamos que frameCounter no sea superior a 1000
                if (this.framesCounter > 1000) {
                    this.framesCounter = 0;
                }
                // controlamos la velocidad de generación de obstáculos
                if (this.framesCounter % 50 === 0) {
                    this.generateObstacle();
                }
                // this.score += 0.01; FIX SCORE
                this.moveAll();
                this.drawAll();
                // eliminamos obstáculos fuera del canvas
                // this.clearObstacles();
                if (this.colision()) {
                    this.gameOver();
                }
            }.bind(this),
            1000 / this.fps
        );
    },
    stop: function () {
        clearInterval(this.interval);
    },
    gameOver: function () {
        this.stop();
        if (confirm("GAME OVER. Play again?")) {
            this.reset();
            this.start();
        }
    },
    //esto elimina los obstáculos del array que estén fuera de la pantalla
    /* clearObstacles: function () {
        this.obstacles = this.obstacles.filter(function (obstacle) {
            return obstacle.x >= 0;
        });
    }, */
    generateObstacle: function () {
        this.obstacles.push(new Obstacle(this));
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawAll: function () {
        this.background.draw();
        this.faby.draw();
        // this.obstacles.forEach(function (obstacle) { obstacle.draw(); });
    },
    moveAll: function () {
        this.background.move();
        this.faby.move();
        // this.obstacles.forEach(function (obstacle) { obstacle.move(); });
    },
    colision: function () {
        if (this.faby.y >= this.canvas.height - this.faby.height || this.faby.y <= -9) {
            return true;
        }
    }
    //chequea si ha sucedido una colisión
        // colisiones genéricas 
        // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
        // esto chequea que el personaje no estén en colisión con cualquier obstáculo
        /*
        return this.obstacles.some(function (obstacle) {
            return (
                ((this.faby.x + this.faby.w) >= obstacle.xTop &&
                    this.faby.x < (obstacle.xTop + obstacle.wTop) &&
                    this.faby.y + (this.faby.h - 20) >= obstacle.y)
            );
        }.bind(this));
    }, */
};
