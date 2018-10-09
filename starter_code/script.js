window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
  var img = new Image();
  img.src = './images/bg.png';

  var canvas = document.getElementsByTagName("canvas")[0];
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = 'white';
  ctx.font = '18px serif'; //Esto es por si me da tiempo a hacer la puntuación
  
  // Primera iteración: bucle infinito con el fondo

  var backgroundImage = {
  img: img,
  x: 0,
  height: 420,
  speed: -1,
  frames: 0,

  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  },

  draw: function() {
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

// Segunda iteración: Flappy (se llamaba Faby,
//pero le he cambiado el nombre sin querer)

var img = new Image();
img.src = './images/flappy.png';

var flappy = {
  width: 50,
  height: 50,
  x: 100,
  y: 100,
  speedX: 0,
  speedY: 0,
  gravity: 3,
  gravitySpeed: 0,
  img: img,
  newPos: function() {
    this.x += this.speedX;
    this.y += this.speedY;
  },
  draw: function() {
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  },
  update: function() {
    this.y += (this.gravity-this.gravitySpeed);
    this.x += this.speedX;
  }
};

function hitBottom () {
  var rockbottom = canvas.height-flappy.height;
    if (flappy.y > rockbottom) {
      flappy.y = rockbottom;
      console.log("Game over");
    }
 }

function updateCanvas() {
  backgroundImage.move();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flappy.update();
  backgroundImage.draw();
  flappy.draw();
  hitBottom();
  
  requestAnimationFrame(updateCanvas);
}

img.onload = updateCanvas();

document.onkeydown = function(e) {
  if(e.keyCode == 32){
    flappy.gravitySpeed = 6;
  }
}
  
document.onkeyup = function(e) {
  if (e.keyCode == 32) {
    flappy.gravitySpeed = 0;
  }
};

var thePipes = [];

// backgroundImage.frames +=1;
// if (backgroundImage.frames % 120 === 0) {
//   x = backgroundImage.width;
//   minHeight = 20;
//   maxHeight = 200;
//   height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
//   minGap = 50;
//   maxGap = 200;
//   gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
//   thePipes.push(new component(10, height, "green", x, 0));
//   thePipes.push(new component(10, x - height - gap, "green", x, height + gap));
// }

  };
};
