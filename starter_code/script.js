window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    start();
  };



var canvas = document.getElementById('mainGame');
var ctx = canvas.getContext('2d');

// TEST ctx.fillRect(0,0,canvas.width, canvas.height);

/////////////////////////
//////// Classes ////////
/////////////////////////
//Clases con mayusculas en una funcion
function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "images/bg.png";
    this.score = 0;


    this.img.onload = function(){
        this.draw();
    }.bind(this)  ; //si hay dos puntos despues de this. necesitamos bind


    this.move = function(){
        this.x--;
        if (this.x < -canvas.width)
            this.x = 0;
    };

    this.draw = function(){
        this.move();
        ctx.drawImage(this.img, this.x,this.y,this.width,this.height);
        ctx.drawImage(this.img, this.x + canvas.width,this.y,this.width,this.height);
    };

    this.drawScore = function(){
      this.score = Math.floor(frames / 60);
      ctx.font = "50px Avenir";
      ctx.fillStyle = "Black";
      ctx.fillText(this.score, this.width/2, this.y+50);
    }


} // End of Board

function Flappy(){
    this.x = 150;
    this.y = 150;
    this.width = 65;
    this.height = 50;
    this.img = new Image();
    this.img.src = "images/flappy.png";

    this.img.onload = function(){
        this.draw();
    }.bind(this);

    this.draw = function(){
        //hack
        this.y += 1;
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        if(this.y < 0 || this.y > canvas.height - this.height) {
            gameOver();
        }
    };

    this.move = function(){
        this.y -= 50 ;
        //esto es una validacion
    };

    this.isTouching = function(pipe){
        return (this.x < pipe.x + pipe.width) &&
                (this.x + this.width > pipe.x) &&
                (this.y < pipe.y + pipe.height) &&
                (this.y + this.height > pipe.y);
    };
}



//pipes

function Pipe(y,height){
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height = height;
    this.draw = function(){
        this.x--;
        this.img = new Image();
        this.img.src = "images/obstacle_bottom.png";

        this.img.onload = function(){
          this.draw();
        }.bind(this);
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);

        this.img2 = new Image();
        this.img2.src = "images/obstacle_top.png";

        this.img.onload = function(){
          this.draw();
        }.bind(this);
        ctx.drawImage(this.img,this.x, this.y, this.with,this.height);
    };
}

///////////////////////////////////////
//////////   declaraciones   //////////
///////////////////////////////////////
// minusculas porque es un objeto
//objetos arriba y variables globales baajo

var board = new Board();
var flappy = new Flappy();
var pipes = [];

var interval;
var frames = 0; //Cuantas veces se va a ejecutar

///////////////////////////////////////
//////////   aux Functions   //////////
///////////////////////////////////////


function generatePipes(){
    if(!(frames % 300 === 0)) return;
    var ventanita = 150;
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
    ctx.font = "120px courier";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 8;
    ctx.strokeText("Game Over", 125,200);
    ctx.font = "50px Avenir";
    ctx.fillStyle = "black";
    ctx.fillText('Click StartGame to Restart', 50, 300);

}

// Funcion de validacion
function checkCollition(){
    pipes.forEach(function(pipe){
        if(flappy.isTouching(pipe)) gameOver();
    });
}


////////////////////////////////////////
//////      main functions     /////////
////////////////////////////////////////

//Animaciones con pudate

function update(){
    
    generatePipes();
    frames++;
    console.log(frames);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    flappy.draw();
    drawPipes();
    board.drawScore();
    checkCollition();
}


function start(){
        //si ya esta corriendo return
        if(interval > 0) return;
        //extras que necesitemos inicializar
    interval = setInterval(function(){
        update();
    }, 1000/60);
    flappy.y = 150;
    pipes = [];
    board.score = 0;
    frames = 0;
}

function stop(){
    clearInterval(interval);
    interval = 0;
}

////////////////////////////////////////////
//////    listeners - Observadores    //////
////////////////////////////////////////////

addEventListener('keydown', function(e){
    if(e.keyCode === 32){
        flappy.move();
    }
    if(e.keyCode === 82){
      start();
    }
});


  }
