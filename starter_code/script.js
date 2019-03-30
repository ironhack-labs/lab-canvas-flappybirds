var canvasDOMEl;
/** @type {CanvasRenderingContext2D} */
var ctx;
var w;
var h;
var w2;
var h2;
var posY;
var counter;
var imgBG = new Image();
imgBG.src = './images/bg.png';
var imgBird = new Image();
imgBird.src = './images/flappy.png';

class Bird {
  constructor () {
    this.width = 100;
    this.height = h2;
    // this.speedX;
    // this.speedY;
    this.gravity = 1;
    this.gravitySpeed = 0.98;
  }

  update () {
    this.x--;
  }

  newPos () {
    this.y += this.gravity * this.gravitySpeed;
  }
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  canvasDOMEl = document.getElementById("canvas")
  w = window.innerWidth
  h = window.innerHeight
  h2 = h / 2
  w2 = w / 2
  PI2 = 2 * Math.PI
  
  canvasDOMEl.setAttribute("height", window.innerHeight)
  canvasDOMEl.setAttribute("width", window.innerWidth)
  
  ctx = canvasDOMEl.getContext("2d")

  function startGame() {
    setInterval(() => {
      ctx.clearRect(0, 0, w, h);
      draw();
      counter++;
    }, 1000/60);
  }
};

function draw() {
  bg();
  flappy();
}

function bg() {
  ctx.drawImage(imgBG,w2 - 450,0,900,504);
}

function flappy() {
  ctx.drawImage(imgBird,w2 - 400,250,55,35);
}

posY=0;
window.onkeydown = function (e) {
    if (e.keyCode === 32) {
      console.log(e);
      posY++;
      flappy();
    }
};

// posX=0;
// window.onkeydown = function (e) {
//   if(posX > 25) {
//     if (e.keyCode === 37) {
//       posX-=5;
//       drawCar();
//     }
//   }
//   if(posX < 300) {
//     if (e.keyCode === 39) {
//       posX+=5;
//       drawCar();
//     }
//   }
// };




