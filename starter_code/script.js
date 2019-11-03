/********* Set up Game (canvas) *******************/


let canvas = document.createElement('canvas');
canvas.width = 900;
canvas.height = 504;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

// Background Image
let bgImg = new Background(canvas.width);
//  Bird
let bird = new Bird(canvas.height);
// Top and Bottom Obstacles
let obstacles = [];

let animationID;
let intervalID;

let btnStart = document.getElementById('start-button');

btnStart.addEventListener('mouseup', function() {
  gameStart();
});

/****** Game Start **************/
function gameStart() {
  reset();
  startAnimation();
  intervalID = setInterval(createObstacle, 1500); // create obstacle every 1.5s
}

/***** Listen to spacebar ********/

// bird jump
document.onkeydown = function(e) {
  if (e.keyCode === 32) {
    bird.gravity = -1;
    bird.speedY = -3;
  }
};
// bird fall
document.onkeyup = function(e) {
  if (e.keyCode === 32) {
    bird.gravity = 1;
  }
};

/************ Generate Obstacle ********************/
function createObstacle() {
  let randomPos = Math.floor((Math.random() * canvas.height) / 2);
  let obstacle = new Obstacle(canvas.width, canvas.height, randomPos);
  obstacles.push(obstacle);
}

/************** Check Crush ***************/
function crush(obstacle) {
  if (bird.left() < obstacle.right() && bird.right() > obstacle.left()) {
    return bird.top() < obstacle.top() || bird.bottom() > obstacle.bottom();
  }
}

/***************** Update canvas after the crush ******************/
function updateEverything() {
  bgImg.update();
  bird.update();
  obstacles.forEach(obstacle => obstacle.update());
}

/******** Draw canvas ******************/
function drawEverything() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  bgImg.draw(context);
  bird.draw(context);
  obstacles.forEach(obstacle => obstacle.draw(context));
}

/*************** RESET everything ******************/
function reset() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  bgImg.reset();
  bird.reset();
  obstacles = [];
}

/************** Animation ***********************/
function startAnimation() {
  updateEverything();
  drawEverything();
  animationID = requestAnimationFrame(startAnimation);
  obstacles.forEach(function(obstacle) {
    if (crush(obstacle)) {
      console.log('crush');
      stopAnimation();
      clearInterval(intervalID);
    }
  });
}

function stopAnimation() {
  cancelAnimationFrame(animationID);
}



