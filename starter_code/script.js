let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let bg = new Background(ctx, 'images/bg.png', 2)
let p1 = new Player(ctx, "images/flappy.png")
let on = false;
let intervalId;
let frames = 0;
var myObstacles = [];



window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    if(!on){
      intervalId = setInterval(function(){
        update();
        drawEverything();
      }, 1000/60);
      on = true;
    } else {
      on = false;
      clearInterval(intervalId);
    }
  }
};

function update() {
  //create obstacles
    frames++;
    if (frames % 240 === 0) {
      x = ctx.canvas.width;
      minHeight = 70;
      maxHeight = ctx.canvas.height - 100;
      height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
      minGap = 150;
      maxGap = 250;
      gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      gapMiddle = Math.floor(Math.random()*ctx.canvas.height);
      myObstacles.push(new Obstacle(ctx, x, height-900, "images/obstacle_top.png"));
      myObstacles.push(new Obstacle(ctx, x, height + gap, "images/obstacle_bottom.png"));
    }
    //update everything
    bg.update();
    p1.update();
    for( let i =0; i < myObstacles.length; i++){
      myObstacles[i].update();
    }
}

function drawEverything() {
    bg.draw();
    p1.draw();
    for( let i =0; i < myObstacles.length; i++){
      myObstacles[i].draw();
    }
}

