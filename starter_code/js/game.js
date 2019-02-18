var Game = {

    canvas: undefined,
    ctx: undefined,
    fps: 60,
    scoreBoard: undefined,
    init: function(id) {

        this.canvas = document.getElementById(id);

        this.ctx = this.canvas.getContext("2d");

        this.w = window.innerWidth;

        this.h = window.innerHeight;

        this.canvas.width = this.w;

        this.canvas.height = this.h;

        this.background = new Background(this);

        this.start();

    },
    start: function() {

        //   this.reset();

        this.interval = setInterval(function() {

            // this.clear();

            // this.framesCounter++;

            //  // // controlamos que frameCounter no sea superior a 1000

            // if (this.framesCounter > 1000) {

            //   this.framesCounter = 0;

            // };

            // // //  controlamos la velocidad de generación de obstáculos

            // if (this.framesCounter % 50 === 0) {

            //   this.generateObstacle();

            // };

            // this.score += 0.01;

            this.moveAll();

            this.drawAll();

            // // // eliminamos obstáculos fuera del canvas

            // this.clearObstacles();

            // if (this.isCollision()) {

            //     this.gameOver();

            // }

        }.bind(this), 1000 / this.fps)

    },
    //dibuja todos los assets del juego
    drawAll: function() {

        this.background.draw();

        this.player.draw();

        //   this.obstacles.forEach(function (obstacle) { 

        // obstacle.draw(); });

        //   this.drawScore();
    },
    //mueve todos los objetos del escenario, el fondo, el jugador y los obstáculos
    moveAll: function() {

        this.background.move();

        // this.player.move();

        // this.obstacles.forEach(function(obstacle) { 
        // obstacle.move(); });
    }

}