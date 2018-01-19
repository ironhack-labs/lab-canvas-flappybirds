window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
};

function startGame() {
  var img = new Image();
  img.src = "images/bg.png";
  var imgFlappy = new Image();
  imgFlappy.src = "images/flappy.png";

  var canvas = document.getElementById("example");
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

    drawFlappy(flappy);
    requestAnimationFrame(updateCanvas);
  }
  img.onload = updateCanvas;

  var flappy = {
    x: 25,
    y: 25,
    moveUp: function() {
      this.y -= 25;
    },
    moveDown: function() {
      this.y += 25;
    },
    moveLeft: function() {
      this.x -= 25;
    },
    moveRight: function() {
      this.x += 25;
    }
  };

  function drawFlappy(flappy) {
    // imgFlappy.onload = function() {
    ctx.drawImage(imgFlappy, flappy.x, flappy.y, 50, 50);
    // };
  }

  document.onkeydown = function(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 38:
        flappy.moveUp();
        console.log("up", flappy);
        break;
      case 40:
        flappy.moveDown();
        console.log("down", flappy);
        break;
      case 37:
        flappy.moveLeft();
        console.log("left", flappy);
        break;
      case 39:
        flappy.moveRight();
        console.log("right", flappy);
        break;
    }
    updateFlappy();
  };

  function updateFlappy() {
    ctx.clearRect(0, 0, 1500, 1700);
    ctx.fillText("Ghost_x: " + flappy.x, 580, 40);
    ctx.fillText("Ghost_y: " + flappy.y, 580, 60);
    drawFlappy(flappy);
  }

  updateFlappy();
}
