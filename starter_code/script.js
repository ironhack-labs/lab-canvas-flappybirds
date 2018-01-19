var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
document.getElementById("start-button").onclick = function() {
  startGame();
};
//function StartGame
function startGame() {
  var img = new Image();
  img.src = "./images/bg.png";
  //backgroundimage definition
  var backgroundImage = {
    img: img,
    x: 0,
    speed: -1,

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
    }
  };

  img.onload = updateCanvas;

  function updateCanvas() {
    backgroundImage.move();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();

    requestAnimationFrame(updateCanvas);
  }

  // --- FABY MODELING ---

  var imgFaby = new Image();
  imgFaby.src = "./images/flappy.png";

  var faby = {
    img: imgFaby,
    x: 15,
    y: canvas.height / 4,
    width: 50,
    height: 50,
    vx: 5,
    vy: 5,
    gravity: 0.8,
    gravitySpeed: 0.5

    // move: function(keypressed) {
    //   if (keypressed) {
    //     gravity = -0.5;
    //   } else {
    //     gravity = 0.5;
    //   }
    //   faby.y = faby.y + faby.vy * gravity;
    // }
  };

  imgFaby.onload = updateFaby;

  function updateFaby() {
    ctx.drawImage(faby.img, faby.x, faby.y, faby.width, faby.height);
    //faby.move(keypressed);
    requestAnimationFrame(updateFaby);
  }

  var SPACE = 32;

  document.onkeydown = function(event) {
    if (event.keyCode == SPACE) {
      keyPressed = true;
    }
  };
  document.onkeyup = function(event) {
    if (event.keyCode == SPACE) {
      keyPressed = false;
    }
  };
}
