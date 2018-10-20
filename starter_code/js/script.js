
// Canvas
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d');
canvas.height = 504;
canvas.width = 900;
var height = canvas.height;
var width = canvas.width;



// Declarations
var bg = new Background(ctx, './images/bg.png', 2,);
var player = new Faby(ctx, './images/flappy.png', 'speedx', 'speedy', 5, 'gravitySpeed', 200, 200 );
var pipes = [];
var frames = 0;


// Pushing pipes to pipes array





window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").style.display = 'none';
    startGame();
  };
  
  function startGame() {
    document.querySelector('#game-board').appendChild(canvas);
   
    setInterval(()=> {
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

function update() {
  frames++;
  player.update() 
  bg.update()
  updatePipes();
  generatePipes();
  checkCrashes();
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
  this.ctx.drawImage(pipeCouple.bottomImg, pipeCouple.x , pipeCouple.bottomImgY , 100 , 400);

  });
}

function updatePipes() {
  pipes.forEach(function(pipeCouple){
    pipeCouple.x--;
  });
}

// Check for crashes

function checkCrashes() {

  

  // console.log(player.y) 
  if (frames >= 299  ) console.log(pipes[0].topImgY+400)



}


// Spacebar Listener
let isJumping = false;
window.addEventListener('keydown', function(e) {
  if (e.keyCode === 32) {
    if (!isJumping) {
      player.gravity = -player.gravity;
      isJumping = true;
      setTimeout(function(){ 
        isJumping = false
        player.gravity = -player.gravity;
       }, 500);
    }
  }
})



