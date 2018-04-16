//1. Generar Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//super clase que hereda atributos generales a todos los elementos

//2. Agregar fondo al board, primero crear el constructor de board
function Board() {
    //2. Posición y medidas del board
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;

    //2. Imagen de fondo
    this.img = new Image();
    this.img.src = "images/bg.png";

    //agregar score
    this.score = 0;

    //3. Mover infinitamente el fondo
    this.move = function() {
        this.x--;
        //resetea cuando se acabe x
        if (this.x < -canvas.width) this.x = 0;
    }

    //2. onload por si la imagen pesa mucho, tenerla lista antes
    this.img.onload = function() {
        this.draw();
    }.bind(this);


    //2. método para dibujar la clase
    this.draw = function() {
        //3.ejecutar mover para que se dibuje en otra posición
        this.move();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        //dibujar segunda para cubir hoyos ******
        ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
        //muevo, dibujo, muevo
    }

    this.drawScore = function() {
        //sacar segundos
        this.score = Math.floor(frames / 60);
        ctx.font = "50px courier";
        ctx.fillStyle = "peru";
        ctx.fillText(this.score, this.width / 2, this.y + 50);
    }

    this.drawFinalScore = function() {
        //sacar segundos
        this.score = Math.floor(frames / 60);
        ctx.font = "70px courier";
        ctx.fillStyle = "peru";
        ctx.fillText(this.score, 425, 325);
    }
}

function Faby() {
    this.x = 400;
    this.y = 200;
    this.width = 65;
    this.height = 50;
    this.img = new Image();
    this.img.src = "images/flappy.png";
    this.img.onload = function() {
        this.draw();
    }.bind(this);
    this.draw = function() {
        //cada que se dibuje esté más abajo
        this.y++;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this.y < 0 || this.y > canvas.height - this.height) gameOver();
    }

    //gravedad
    this.move = function() {
        this.y -= 30;
    }
    this.isTouching = function(pipe) {
        //recibo el pipe y se deben cumplir 4 validaciones para saber si está tocándolo
        return (this.x < pipe.x + pipe.width) &&
            (this.x + this.width > pipe.x) &&
            (this.y < pipe.y + pipe.height) &&
            (this.y + this.height > pipe.y);
    }

}

//clase, molde para los pipes
function Pipe(y, height) {
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height = height;
    this.img = new Image();
    this.img.src = "images/obstacle_top.png";
    //función para que se dibuje a sí mismo
    this.draw = function() {
        this.x--;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

function Pipe2(y, height) {
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height = height;
    this.img = new Image();
    this.img.src = "images/obstacle_bottom.png";
    //función para que se dibuje a sí mismo
    this.draw = function() {
        this.x--;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

//2.VARIABLES GLOBALES
var board = new Board();
var faby = new Faby();
//arreglo para ir agregando todos los pipes nuevos
var pipes = [];

var intervalo;
//ver cuántas veces se está updateando
var frames = 0;

//FUNCIONES AUXILIARES
function generatePipes() {
    //true si los frames no son divisibles entre 300 = 5s
    if (!(frames % 300 === 0)) return;
    //lugar por donde pasa el pajarín
    var ventana = 100;
    //generar height al azar, mínimo 50
    var randomHeight = Math.floor(Math.random() * 200) + 50;
    //crear 2 pipes
    var pipe = new Pipe(0, randomHeight);
    var pipe2 = new Pipe2(randomHeight + ventana, canvas.height - (randomHeight + ventana));
    pipes.push(pipe);
    pipes.push(pipe2);
}

function drawPipes() {
    pipes.forEach(function(pipe) {
        pipe.draw();
    });
}

//GAME OVER
function gameOver() {
    stop();
    board.drawFinalScore();
    ctx.beginPath();
    ctx.rect(60, 90, 800, 80);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.font = "70px courier";
    ctx.fillText("Press R to Restart", 80, 150);
    ctx.beginPath();
    ctx.rect(60, 200, 800, 80);
    ctx.fillStyle = "yellow";
    ctx.fillText("Score", 350, 250);
    ctx.closePath();
}

//función de validación que valide que el juego está terminado
function checkCollision() {
    //verifica si el pajarín está tocando cada pipe
    pipes.forEach(function(pipe) {
        if (faby.isTouching(pipe)) gameOver();
    });
}

//MAIN FUNCTIONS
//Update: se encarga de que todo se mueva
function update() {
    generatePipes();
    frames++;
    console.log(frames);
    //va creando y borrando, cambiando x & y
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.draw();
    faby.draw();
    drawPipes();
    board.drawScore();
    checkCollision();
}

function startGame() {
    if (intervalo > 0) return;
    intervalo = setInterval(function() {
        update();
    }, 1000 / 60); //60fps 
    //HAZ UNA FUNCIÓN APARTE PARA RESETEAR TODO******
    faby.y = 150;
    pipes = [];
    board.score = 0;
    frames = 0;
}

function stop() {
    clearInterval(intervalo);
    intervalo = 0;
}



//LISTENERS

//para que start sólo funcione una vez
const button = document.getElementById("start-button");
button.addEventListener("click", function() {
    startGame();
    button.remove();
}, { once: true });

addEventListener("keydown", function(e) {
    if (e.keyCode === 32) {
        faby.move();
    }
});

addEventListener("r", function(e) {
    if (e.keyCode === 82) {
        update();
        startGame();
    }
});