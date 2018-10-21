// Canvas
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d');
canvas.height = 504;
canvas.width = 900;
var height = canvas.height;
var width = canvas.width;
var gameUpdate;

// Declarations
var bg;
var player;
var pipes;
var frames;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").style.visibility = 'hidden';
    startGame();
    bg = new Background(ctx, './images/bg.png', 2, 0);
    player = new Faby(ctx, './images/flappy.png', 'speedx', -6, 2, 200, 200 );
    pipes = [];
    frames = 0;

  };
  
  function startGame() {
    document.querySelector('#game-board').appendChild(canvas);
   
    gameUpdate = setInterval(()=> {
      update();
      drawEverything();
    }, 1000/60);
  }
};

function drawEverything() {
  ctx.clearRect(0, 0, width, height)
  bg.draw() 
  player.draw()
  drawPipes();

}

function update()  {
  frames++;
  player.update()
  bg.update()
  updatePipes();
  generatePipes();
  checkCrashes();
  checkPipeCrash()
}

// Pipe functions
function generatePipes() {
  if (frames < 300) return;
  frames = 0;
  let randomNumb = Math.random() * 150;
  let pipeCouple = {
    x: width,
    topImg: new Image(),
    topImgY: -300 + randomNumb,
    bottomImg: new Image(),
    bottomImgY: 300 + randomNumb,
  }

  pipeCouple.topImg.src = './images/obstacle_top.png';
  pipeCouple.bottomImg.src = './images/obstacle_bottom.png';
  pipes.push(pipeCouple);
}

function drawPipes() {
  pipes.forEach(function(pipeCouple){
  this.ctx.drawImage(pipeCouple.topImg, pipeCouple.x , pipeCouple.topImgY , 100 , 400);
  this.ctx.drawImage(pipeCouple.bottomImg, pipeCouple.x , pipeCouple.bottomImgY , 100 , 400)
  });
}

function updatePipes() {
  pipes.forEach(function(pipeCouple){
    pipeCouple.x--;
  });
}

function checkPipeCrash() {



  pipes.forEach(function(pipes) {

    let width = 100;
    height = 400;
    if (player.x + player.width > pipes.x && player.x < pipes.x + width) {
      
      console.log('PLAYER-Y',player.y)
      console.log(pipes.topImgY)


      if (player.y > pipes.topImgY + height) {
        console.log('touch up')


      }

      
 
    }
  });
  
  return false;

}

// Check for crashes
function checkCrashes() {
  if (player.y === 0 || player.y === height - player.height) {
    gameOver()
  }
}


function gameOver() {
  player.gravity = 100
  setTimeout(function() {
    clearInterval(gameUpdate)
    document.getElementById("start-button").style.visibility = 'visible'
    ctx.font = "80px Arial";
    ctx.fillText("GAME OVER", 200, 200);
    console.log(player.y)
  }, 100)


}

// Spacebar Listener
let isJumping = false;
window.addEventListener('keydown', function(e) {
  if (e.keyCode === 32 && !isJumping) {
      player.jump();
  }
})