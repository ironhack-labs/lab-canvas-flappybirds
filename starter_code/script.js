//canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//constants
var interval;
var frames = 0;
var images = {
    flappy:'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true',
    pipeTop: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true',
    pipeBottom: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true',
    bg: 'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true'
}
var sound = new Audio();
sound.src = "http://66.90.93.122/ost/flappy-golf-2/wncucmil/1%20pancakes.mp3";
sound.loop = true;
var pipes = [];

//class
class Board{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = images.bg;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }

    gameOver(){
        ctx.font = "80px Avenir";
        ctx.fillText("Game Over", 20,100);
        ctx.font = "20px Serif";
        ctx.fillStyle = 'peru';
        ctx.fillText("Press 'Esc' to reset", 20,150);
    }

    draw(){
        this.x--;
        if(this.x === -this.width) this.x = 0;
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
        ctx.fillStyle = "white";
        ctx.font = '50px Avenir';
        ctx.fillText(Math.floor(frames / 60), this.width -100, 50 )
    }



}

class Flappy{
    constructor(){
        this.x = 100;
        this.y = 100;
        this.width = 32;
        this.height = 24;
        this.image = new Image();
        this.image.src = images.flappy;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
        this.gravity = 1.5;

    }

    rise(){
        this.y-=30;
    }

    isTouching(item){
        return  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
      }
    

    draw(){
        this.y+=this.gravity;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

}

class Pipe{
    constructor(position, y, height){
        this.x = canvas.width;
        this.y = y;
        this.width = 60;
        this.height = height;
        this.image = new Image();
        this.image.src = position === 'top' ? images.pipeTop : images.pipeBottom;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }
    draw(){
        this.x-=2;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}

//instances
var board = new Board();
var flappy = new Flappy();
//mainFunctions
function update(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    flappy.draw();
    generatePipes();
    drawPipes();
}

function start(){
    if(interval) return;
    interval = setInterval(update, 1000/60);
    sound.play()
}

//aux functions
function generatePipes(){
    if(!(frames%100===0) ) return;
    var height = Math.floor((Math.random() * canvas.height * .6 ) + 30 );
    var pipe1 = new Pipe('top', 0, height);
    var pipe2 = new Pipe(null, pipe1.height + 80, canvas.height - pipe1.y - 80)
    pipes.push(pipe1);
    pipes.push(pipe2);
}

function drawPipes(){
    pipes.forEach(function(pipe){
        pipe.draw();
        if(flappy.isTouching(pipe)){
            finishHim();
        }
    });  
}

function finishHim(){
    clearInterval(interval);
    interval = undefined;
    board.gameOver();
    sound.pause();
    sound.currentTime = 0;
}

function restart(){
    if(interval) return;
    pipes = [];
    frames = 0;
    flappy.x = 100;
    flappy.y = 100;
    start();
}

//listeners
addEventListener('keydown', function(e){
    if(e.keyCode === 66 || e.keyCode === 32 || e.keyCode === 38){
        flappy.rise();
        sound.play();
    }else if(e.keyCode === 27){
        restart();
    }
})

start();