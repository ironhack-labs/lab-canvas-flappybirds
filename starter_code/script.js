var canvas = document.getElementById("mainGame");
var ctx = canvas.getContext("2d");



//classes

function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "./images/bg.png";
    this.score = 0;
    this.music = new Audio();
    this.music.src = "images/Mario and Luigi - Partners in Time - Main Title 2.mp3" 
    
    
    this.img.onload = function(){
        this.draw();
    }.bind(this);

    this.move = function(){
        this.x--;
        if(this.x < -canvas.width)this.x = 0;
    }

    this.draw = function(){
        this.move();
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height)
        

    }
    
    this.drawScore = function(){

        this.score = Math.floor(frames/60);
        ctx.font = "50px Avenir";
        ctx.fillStyle = "white";    
        ctx.fillText(this.score,this.width/2,this.y+50);
    }
}

//flappy

function Flappy(){
    this.x =150;
    this.y = 150;
    this.width = 30;
    this.height=30;
    this.img = new Image();
    this.img.src = "images/flappy.png";
    this.img.onload = function(){
        this.draw();
    }.bind(this);
    this.draw = function(){
        this.y += 1;
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        if(this.y < 0 || this.y > canvas.height - this.height){
            gameOver();
        }
    }
    this.move = function(){
        this.y -=20;
            
        
        }

    this.isTouching = function(pipe){
        return (this.x < pipe.x + pipe.width) &&
                (this.x + this.width > pipe.x)&&
                (this.y < pipe.y + pipe.height)&&
                (this.y + this.height > pipe.y);

    }


    

}

//pipes

function Pipe(y,height){
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height=height;

    this.draw = function(){
        this.x --;
        ctx.fillStyle = "green"; 
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }


}


//declaraciones

var tablero = new Board();
var flappy = new Flappy();
var pipes =[];


var intervalo;
var frames = 0;

//aux function
function generatePipes(){
        if(!(frames % 200 === 0))return;
        var ventana = Math.floor(Math.random()*100)+50;
        var randomHeight = Math.floor(Math.random()* 200 ) + 50;
        var pipe = new Pipe(0,randomHeight);
        var pipe2 = new Pipe(randomHeight+ventana ,canvas.height-(randomHeight+ventana));
        pipes.push(pipe);
        pipes.push(pipe2);
}

function drawPipes(){
    pipes.forEach(function(pipe){
        pipe.draw();
    })
}

function gameOver(){
    stop();
    ctx.fillStyle = "red";
    ctx.font = "100px courier";
    ctx.fillText("Game Over", 100,130);
}

//funcion de validacion

function checkCollition(){
    pipes.forEach(function(pipe){
       if(flappy.isTouching(pipe)) gameOver();
    })
}

//main function

function update(){
    generatePipes();
    frames ++;
    console.log(frames);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.draw();
    drawPipes();
    flappy.draw();
    tablero.drawScore();
    checkCollition();
}

function start(){
    //extras que necesitemos inicializar
    tablero.music.play();
    if(intervalo>0)return;
    intervalo = setInterval(function(){
    update();  
    } , 1000/60)
    pipes=[]
    flappy.y = 150;
    frames = 0;
    tablero.score = 0;
}

function stop(){
    tablero.music.pause();
    clearInterval(intervalo);
    intervalo=0;
}

//listeners (observadores)

//comienza el juego
document.getElementById("startButton")
    .addEventListener("click",function(){
        start();
    })
document.getElementById("pauseGame")
    .addEventListener("click",function(){
        stop();
    })

addEventListener("keydown",function(e){
    if(e.keyCode===32){
        flappy.move();
    }
})


