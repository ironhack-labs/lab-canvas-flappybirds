window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  var canvas=document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  function Board(){
    this.x=0;
    this.y=0;
    this.width=canvas.width;
    this.height=canvas.height;
    this.img=new Image();
    this.img.src='images/city.gif';
    this.sound=new Audio();
    this.sound.src='http://66.90.93.122/ost/super-mario-bros.-1-3-anthology/gczrgwrx/1%2001%20Main%20Theme%20Overworld.mp3';
    this.soundGameOver=new Audio();
    this.soundGameOver.src='http://66.90.93.122/ost/super-mario-world-original-soundtrack/lwxletwr/210%20-%20game%20over.mp3';
    this.soundJump=new Audio();
    this.soundJump.src='http://66.90.93.122/ost/super-mario-bros.-1-2-3-hop-step-jump/sawbcbhj/03%20-%20mario%20original%20sound%20effect%20library.mp3';
    this.score=0;
    this.segmentEnd=0;


    this.img.onload=function(){
      this.draw();
    }.bind(this);
    
    this.move=function(){
      this.x--;
      this.x= (this.x<-canvas.width) ? 0:this.x;
    }
    this.draw=function(){
      this.move();
      ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
      ctx.drawImage(this.img,this.x+this.width,this.y,this.width,this.height);
    }
    this.drawScore=function(){
      this.score=Math.floor(frames/60);
      ctx.font='50px '
      ctx.fillStyle='white';
  
      ctx.fillText(this.score,this.width/2,this.y+50);
    }
    
  }
  

function playJumpSound(startTime, endTime){
    board.segmentEnd = endTime;
    board.soundJump.currentTime = startTime;
    board.soundJump.play();
    board.soundJump.addEventListener('timeupdate', function (){
      if (board.segmentEnd && board.soundJump.currentTime >= board.segmentEnd) {
          board.soundJump.pause();
      }   
      console.log(board.soundJump.currentTime);
  }, false);
}

function Flappy(){
  this.x=150;
  this.y=150;
  this.width=50;
  this.height=50;
  this.img=new Image();
  this.img.src='images/flappy.png';
  this.img.onload=function(){
    this.draw();
  }.bind(this);
  this.draw=function(){
    this.y++;
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    if(this.y<0||this.y>canvas.height-this.height)gameOver();
    
  }
  this.move=function(){
    this.y-=50;
  }
}

function SuperMan(){
  this.x=150;
  this.y=150;
  this.width=50;
  this.height=50;
  this.img=new Image();
  this.img.src='images/super1.png';
  this.img.onload=function(){
    this.draw();
  }.bind(this);
  this.draw=function(){
    this.y++;
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    if(this.y<0||this.y>canvas.height-this.height)gameOver();
    
  }
  this.move=function(){
    this.y-=50;
  }
  this.isTouching=function(pipe){
    return (this.x<pipe.x+pipe.width)&&(this.x+this.width>pipe.x)&&
    (this.y<pipe.y+pipe.height)&&(this.y+this.height>pipe.y)

  }
}

function Pipe(y, height, type){
  this.x=canvas.width;
  this.y=y;
  this.width=50;
  this.height=height;
  this.img=new Image();
  this.img.src='images/obstacle_top.png';
  this.img2=new Image();
  this.img2.src='images/building.png';

  this.draw = function(){
    this.x--;
    if(type){
      ctx.drawImage(this.img,this.x,this.y,this.width, this.height);
    }else{
      ctx.drawImage(this.img2,this.x,this.y,this.width, this.height);
    }
    //ctx.fillStyle='green';
    //ctx.fillRect(this.x,this.y,this.width,this.height);
  }
  
}

function gameOver(){
  stop();
  ctx.font ='100px courier';
  ctx.strokeStyle='red';
  ctx.lineWidth= 8;
  ctx.strokeText('Game Over',50,200);
  board.sound.pause();
  board.soundJump.pause();
  board.soundGameOver.play();


}
function stop(){
  clearInterval(intervalo);
  intervalo=0;
}
function generatePipes(){
  if(!(frames%300===0)) return;
  var space=150;
  var randomHeight=Math.floor(Math.random()*200)+50;
  var pipe=new Pipe(0,randomHeight,true);
  var pipe2=new Pipe(randomHeight+space, canvas.height-(randomHeight+space),false);
  pipes.push(pipe);
  pipes.push(pipe2);
}
function drawPipes(){
  pipes.forEach(function(pipe){
    pipe.draw();
  });
}
function checkCollition(){
  pipes.forEach(function(pipe){
    if(superMan.isTouching(pipe)) gameOver();

  });
}
//Event listeners
addEventListener('keydown',function (e){
if(e.keyCode==32){
  playJumpSound(0.3,0.5);
  superMan.move();
}
});
  //declaraciones
var intervalo;  
var board=new Board();
//var flappy=new Flappy();
var superMan=new SuperMan();
var frames=0;
var pipes=[];
function update(){
  frames++;
  console.log(frames);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  generatePipes();
  board.draw();
  //flappy.draw();
  superMan.draw();
  drawPipes();
  checkCollition();
  board.drawScore();
}
  function startGame() {
    if(intervalo>0) return;
    intervalo=setInterval(function(){
    update();
    },1000/60);
    board.sound.play();

  }

};
/*function playJump(){
  board.soundJump.currentTime=0;
  board.soundJump.play();
  board.soundJump.addEventListener('timeupdate', function (){
    if (board.soundJump.currentTime >= 0.5) {
        board.soundJump.pause();
    }
}, false);
}*/