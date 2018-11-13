window.onload = function () {
  var ctx;
  var bck = new Image();
  bck.src = './images/bg.png';

  var flappy = new Image();
  flappy.src = './images/flappy.png';

  var bottomObst = new Image();
  bottomObst.src = './images/obstacle_bottom.png';

  var topObst = new Image();
  topObst.src = './images/obstacle_top.png';

  var myObstacles = [];

  document.getElementById("start-button").onclick = function () {
    startGame();
  };


  function startGame() {
    player = new Player(0,110);
    myGame.start();
    updateCanvas();
  }

  myGame = {
    canvas: document.createElement("canvas"),
    start: function () {
      this.canvas.width = 800;
      this.canvas.height = 370;
      ctx = this.canvas.getContext("2d");
      document.getElementById('game-board').appendChild(this.canvas);
      // this.animation = requestAnimationFrame(updateGameArea);
      this.interval = setInterval(updateGameArea, 10);
    },
    clear: function () {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    frames: 0,
    stop: function () {
      clearInterval(this.interval);
    },
    points: 0,
    score: function () {
      this.points = (Math.floor(this.frames / 5))
      ctx.font = '18px monospace';
      ctx.fillStyle = 'black';
      ctx.fillText('Score: ' + this.points, 350, 50);
    },
  };

  var background = {
    img: bck,
    x: 0,
    speed: -1,

    move: function () {
      this.x += this.speed;
      this.x %= myGame.canvas.width;
    },

    draw: function () {
      ctx.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + myGame.canvas.width, 0);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0);
      }
    },
  };

  function Player(x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;

    this.update = () => {
      ctx.drawImage(flappy, this.x, this.y, this.height, this.width);
    };
    this.newPos = function () {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    this.left = function () {
      return this.x
    };
    this.right = function () {
      return (this.x + this.width)
    };
    this.top = function () {
      return this.y
    };
    this.bottom = function () {
      return this.y + (this.height)
    };
    // this.crashWith = function (obstacle) {
    //   return !((this.bottom() < obstacle.top()) ||
    //     (this.top() > obstacle.bottom()) ||
    //     (this.right() < obstacle.left()) ||
    //     (this.left() > obstacle.right()))
    // }
  }

  function BottomObstacle(width,height,x, y) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.height = height;
    this.width = width;

    this.update = function () {
      ctx.drawImage(bottomObst, this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    this.left = function () {
      return this.x
    };
    this.right = function () {
      return (this.x + this.width)
    };
    this.top = function () {
      return this.y
    };
    this.bottom = function () {
      return this.y + (this.height)
    };
  }
  function TopObstacle(width,height,x, y) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.height = height;
    this.width = width;

    this.update = function () {
      ctx.drawImage(topObst, this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    this.left = function () {
      return this.x
    };
    this.right = function () {
      return (this.x + this.width)
    };
    this.top = function () {
      return this.y
    };
    this.bottom = function () {
      return this.y + (this.height)
    };
  }

  function updateCanvas() {
    background.move();
    background.draw();
  }
  function updateGameArea(){
    // for (i = 0; i < myObstacles.length; i += 1) {
    //   if (player.crashWith(myObstacles[i])) {
    //     myGame.stop();
    //     return;
    //   }
    // }
    myGame.clear();
    updateCanvas();
    myGame.frames += 1;
    if (myGame.frames % 200 === 0) {
      x = myGame.canvas.width;
      minHeight = 20;
      maxHeight = 150;
      height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      minGap = 60;
      maxGap = 150;
      gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      myObstacles.push(new TopObstacle(80,height , x, 0));
      myObstacles.push(new BottomObstacle(80, x -height- gap, x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
      myObstacles[i].x += -1;
      myObstacles[i].update();
    }


    player.newPos();
    
    player.update();
    
    myGame.score();

  }

  function moveUp() {
    player.speedY -= 1;
}

function moveDown() {
    player.speedY += 1;
}

function moveLeft() {
    player.speedX -= 1;
}

function moveRight() {
    player.speedX += 1;
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 38:
            moveUp();
            break;
        case 40:
            moveDown();
            break;
        case 37:
            moveLeft();
            break;
        case 39:
            moveRight();
            break;
    }
}

document.onkeyup = function (e) {
    stopMove();
}

function stopMove() {
    player.speedX = 0;
    player.speedY = 0;
}


}