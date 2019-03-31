 window.onload = function() {
  var canvas = document.getElementById("#myCanvas");
  var w = window.innerWidth;
  var h = window.innerHeight;
  var h2 = h / 2;
  var w2 = w / 2;

  canvas.setAttribute("height", window.innerHeight);
  canvas.setAttribute("width", window.innerWidth);

  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");
 
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    loadImages();
    drawBackground();
    drawFaby();
    obstacle();
  }

function drawBackground() {
  ctx.drawImage(imgBack, w2/2, 0, w2,h2);
  }
function drawFaby() {
  ctx.drawImage(imgFaby, w2/2, 200, w2/ 10, h2 / 10)
}
function obstacle() {
  // Top Obstacle
  ctx.drawImage(imgObs, w2-100, 0, 50, 150);
  ctx.drawImage(imgObs, w2+100, 0, 50, 100);
  // Bottom Obstacle
  ctx.drawImage(imgBotObs, w2-100, h2-100, 50, 100);
  ctx.drawImage(imgBotObs, w2+100, h2-150, 50, 150);
}

function loadImages() {
  // Background Image
  imgBack = new Image();
  imgBack.src = "./images/bg.png";
  // Flappy Image
  imgFaby = new Image();
  imgFaby.src = "./images/flappy.png";
  // Top Obstacle
  imgObs = new Image();
  imgObs.src = "./images/obstacle_top.png";
  // Bottom Obstacle
  imgBotObs = new Image();
  imgBotObs.src = "./images/obstacle_bottom.png";
}

  class Faby {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.speedX = speedX;
      this.speedY = speedY;
      this.gravity = gravity;
      this.gravitySpeed = gravitySpeed;
    } 
    update () {
      ctx.clearRect(0,0, w, h);
    }
    newPos() {
    }
  }
};




