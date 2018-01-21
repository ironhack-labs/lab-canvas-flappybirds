window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
};

  var gravity = 2;

function startGame() {
  var img = new Image();
  img.src = "images/bg.png";
  var imgFlappy = new Image();
  imgFlappy.src = "images/flappy.png";
  var imgObst = new Image();
  imgObst.src = "images/obstacle_bottom.png";
  var imgObstTop = new Image();
  imgObstTop.src = 'images/obstacle_top.png';

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
    obst.move();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();

    drawFlappy(flappy);
    flappy.y+=gravity;
    obst.draw();
    //obst.drawTop();
    if(flappy.y>450 || (flappy.x < obst.x && flappy.y>obst.y)){
      alert("GAME OVER");
      document.location.reload();
    }
    requestAnimationFrame(updateCanvas);
  }
  img.onload = updateCanvas;

  var flappy = {
    x: 25,
    y: canvas.width/3,
    moveUp: function() {
      this.y -= 30;
    },
  };

  function drawFlappy(flappy) {
    // imgFlappy.onload = function() {
    ctx.drawImage(imgFlappy, flappy.x, flappy.y, 50, 50);
    // };
  }

  document.onkeydown = function(e) {
    e.preventDefault();
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 32:
        flappy.moveUp();
        console.log("up", flappy);
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

  var obst = {
    img : imgObst,
    imgTop: imgObstTop,
    x : 0,
    y:400,
    speed : -3,
    
    move: function() {
      this.x += this.speed;
      this.x %= canvas.width;
    },
    draw: function() {
      ctx.drawImage(this.img, this.x, this.y);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + canvas.width, this.y);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, this.y);
      }
    },
    drawTop: function() {
      ctx.drawImage(this.imgObstTop, this.x, this.y);
      if (this.speed < 0) {
        ctx.drawImage(this.imgObstTop, this.x + canvas.width, this.y);
      } else {
        ctx.drawImage(this.imgObstTop, this.x - this.img.width, this.y);
      }
  }

}
}
