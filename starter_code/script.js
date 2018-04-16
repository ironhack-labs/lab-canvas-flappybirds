var canvas = document.getElementById("mainGame");
var ctx = canvas.getContext('2d');


//classes
function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "http://ellisonleao.github.io/clumsy-bird/data/img/bg.png"
    this.score = 0;
    this.music = new Audio();
    this.music.src = "assets/Anamanaguchi_-_Airbrushed_Summer_2010_Singles_-_Week_1_i0EC4vV7PoE.mp3"


    this.img.onload = function(){
        this.draw();
    }.bind(this);

    this.move = function(){
        this.x--;
        if(this.x < -canvas.width) this.x = 0;
    }

    this.draw = function(){
        this.move();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
        
    }

    this.drawScore = function(){
        this.score = Math.floor(frames/ 60);
        ctx.font = "50px Arial Black";
        ctx.fillStyle = "darkblue";
        ctx.fillText(this.score, this.width/2,this.y+40);
    }
}

function Flappy(){
    this.x = 150;
    this.y = 150;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = "https://apptractor.ru/wp-content/uploads/2014/05/tappy-Chiken.png"
    this.img.onload = function(){
        this.draw();
    }.bind(this)
    this.draw = function(){
        this.y += 1;
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        if(this.y < 0 || this.y > canvas.height - this.height) gameOver();
    }
    this.move = function(){
        this.y -= 50;
    }
    this.isTouching = function(pipe){
  return(this.x < pipe.x + pipe.width)&&
        (this.x + this.width > pipe.x)&&
        (this.y < pipe.y + pipe.height)&&
        (this.y + this.height> pipe.y);        
    }
    

}
//pipes
function Pipe(y, height){
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height = height;

    this.draw = function(){
        this.x--;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


//declarations
var tablero = new Board();
var pajaro = new Flappy();
var pipes = [];

var intervalo;
var frames = 0;

//aux functions
function generatePipes(){
    if(!(frames % 300 === 0)) return;
    var ventanita = 100;
    var randomHeight = Math.floor(Math.random()* 200) + 50;
    var pipe = new Pipe(0,randomHeight);
    var pipe2 = new Pipe(randomHeight + ventanita, canvas.height - (randomHeight + ventanita));
    pipes.push(pipe);
    pipes.push(pipe2);
}

function drawPipes(){
    pipes.forEach(function(pipe){
        pipe.draw();
    });
}

function gameOver(){
    stop();
    ctx.font = "50px courier";
    ctx.lineWidth = 50;
    ctx.fillText("Game Over", 60,100);
    ctx.fillText('Press R to start', 60, 200);
}

//funcion de validacion
function  checkCollition(){
    pipes.forEach(function(pipe){
        if(pajaro.isTouching(pipe)) gameOver();
    });
}

//main functions
function update(){
    generatePipes();
    frames++;
    console.log(frames);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    tablero.draw();
    pajaro.draw();
    drawPipes();
    tablero.drawScore();
    checkCollition();

}
function start(){
    tablero.music.play();
    if(intervalo > 0) return;
    //extras que necesitemos inicializar
    intervalo = setInterval(function(){
        update();
    }, 1000/60);
    pajaro.y = 150;
    pipes = [];
    tablero.score = 0;
}

function stop(){
    tablero.music.pause();
    clearInterval(intervalo)
    intervalo = 0;
}



//listeners
//comienza el juego
document.getElementById('startButton').addEventListener("click", function(){
    start();
})
document.getElementById('pauseButton').addEventListener("click", function(){
    stop();
})
addEventListener('keydown', function(e){
    if(e.keyCode === 32){
        pajaro.move();
    }
    if(e.keycode === 82){
        start();
    }
});
