window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var img = new Image();
    img.src = "images/bg.png";

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var backgroundImage = {
      img: img,
      x: 0,
      speed: -3,

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

    function updateCanvas() {
      backgroundImage.move();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      backgroundImage.draw();
      faby.drawFaby();
      requestAnimationFrame(updateCanvas);
    }

    var faby = {
      x: 30,
      y: canvas.height / 2,
      width: 50,
      height: 40,
      speedX: 2,
      speedY: 2,
      gravity: 0.1,
      gravitySpeed: 1,
      update: function() {},
      newPos: function() {}
    };

    function drawFaby(bird) {
      var imgFaby = new Image();
      img.onload = function() {
        ctx.drawImage(img, faby.x, faby.y, 50, 50);
      };
      imgFaby.src = "images/flappy.png";
    }

    imgFaby.onload = updateCanvas;

    var SPACE_BAR = 32;
    var spaceBar = false;

    document.onkeydown = function up(event) {
      if (event.SPACE_BAR) {
        spaceBar = true;
      }
    };

    document.onkeyup = function down(event) {
      if (event.SPACE_BAR) {
        spaceBar = false;
      }
    };
    function gravitySwitcher(faby) {
      if (spaceBar === true) {
        faby.gravity = faby.gravity * -1;
      } else if (spaceBar === false) {
        faby.gravity = 0.1;
      }
    }
  }
};
