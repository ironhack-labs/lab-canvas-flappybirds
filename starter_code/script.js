//canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//ctx.fillRect(0, 0, 100, 112);

//globals
let interval;
let images = {
  bg:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
  flappy:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
  topPipe:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true",
  bottomPipe:
    "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true"
};
let frames = 0;
let pipes = [];
let music = new Audio();
let music2 = new Audio();
music.src =
  "http://66.90.93.122/ost/gears-of-war/sgxglent/02%20Emergence%20Day.mp3";
music.loop = true;
music.currentTime = 0;
music2.src =
  "http://66.90.93.122/ost/cowboy-bebop-tsuioku-no-serenade-serenade-of-reminiscence-playstation-2-gamerip/ivmpgmij/bgm64.mp3";
//clases
function Board() {
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;
  this.image = new Image();
  this.image.src = images.bg;
  this.draw = function() {
    if (this.x < -canvas.width) this.x = 0;
    this.x--;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  };
  this.image.onload = this.draw.bind(this);
}

class Flappy {
  constructor() {
    this.x = 150;
    this.y = 50;
    this.width = 50;
    this.height = 40;
    this.image = new Image();
    this.image.src = images.flappy;
    this.image.onload = this.draw.bind(this);
  }
  draw() {
    //abajo
    if (this.y < canvas.height - this.height) this.y += 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  checkIfTouch(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
}

function Pipe(height = 100, y = 0, isTop = true) {
  this.x = canvas.width + 60;
  this.y = y;
  this.width = 60;
  this.height = height;
  this.image = new Image();
  this.image.src = isTop ? images.topPipe : images.bottomPipe;
  this.draw = function() {
    this.x -= 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };
  this.image.onload = this.draw.bind(this);
}

//instances
let board = new Board();
let flappy = new Flappy();

//let pipe1 = new Pipe();

//main functions
function start() {
  music.play();
  interval = setInterval(update, 1000 / 60);

  //if (music.paused) music.play();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  board.draw();
  //pipe1.draw();
  generatePipes();
  drawPipes();
  checkCollision();
  flappy.draw();
  drawTime();
}

function gameOver() {
  clearInterval(interval);
  music.pause();
  music2.play();
  ctx.font = "33px 'Press Start 2p";
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER", 80, 200);

  ctx.font = "20px 'Press Start 2p'";
  ctx.fillText("[SPACE] TO RESTART", 50, 280);

  ctx.save();
  ctx.font = "35px 'Press Start 2p";
  ctx.fillStyle = "black";
  ctx.StrokeText("GAME OVER", 80, 200);

  addEventListener("keydown", e => {
    if (e.keyCode === 32) {
      document.location.reload();
      clearInterval(interval);
      interval = 0;
    }
  });
  // addEventListener("keydown" e=>{
  //   if(e.keyCode === 32){
  //     canvas.clearRect()
  //   }
  // })
}

//aux functions
function generatePipes() {
  if (frames % 200 !== 0) return;
  let height = Math.floor(Math.random() * 300) + 50;
  let top = new Pipe(height);
  let y = height + 100;
  let height2 = canvas.height - y;
  let bottom = new Pipe(height2, y, false);
  pipes.push(top);
  pipes.push(bottom);
}
function drawPipes() {
  pipes.forEach((pipe, index) => {
    if (pipe.x < -60) pipes.splice(index, 1);
    pipe.draw();
  });
}
function checkCollision() {
  pipes.forEach(pipe => {
    if (flappy.checkIfTouch(pipe)) {
      gameOver();
    }
  });
}
function drawTime() {
  ctx.font = "15px 'Press Start 2p";
  ctx.fillText("Score:", 30, 25);
  ctx.fillText(Math.floor(frames / 100), 55, 48);
}

//listeners
addEventListener("keydown", e => {
  if (e.keyCode === 38) {
    if (flappy.y > 35) {
      flappy.y -= 35;
    }
  } else if (e.keyCode === 13) {
    start();
  }
});

// addEventListener("keydown", e=>){
//     if(gameOver()=== true){
//       if(e.keyCode === 32){
//         return start()
//       }

//     }
// }
document.querySelector("button").addEventListener("click", () => {
  music2.pause();
});
