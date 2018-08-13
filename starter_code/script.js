var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var isGameStarted = false;
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;

window.onload = function() {
  //Start button begins game
  document.getElementById('start-button').onclick = function() {
    if (!isGameStarted) {
      startGame();
      isGameStarted = true;
    }
  };

  //background image
  var img = new Image();
  img.src = 'images/bg.png';

  var background = {
    x: 0,
    loop: function() {
      this.x--;
      if (this.x <= -900) {
        this.x = 0;
      }
    }
  };

  //Faby contructor function
  function FabyConstructor(y, vy) {
    this.y = y;
    this.vy = vy;

    this.drawFaby = function() {
      var fabyImg = new Image();
      fabyImg.src = 'images/flappy.png';
      ctx.drawImage(fabyImg, 100, this.y, 30 * 1.418, 30);
    };
    //simple animation
    this.update = function() {
      this.y += this.vy;

      if (this.y >= 470) {
        this.y = 470;
        this.vy = 0;
      }
    };
    //reaction to spacebar
    this.newPos = function() {
      this.y -= 10;
      this.vy = -3;
    };

    this.stopMove = function() {
      this.vy = 2;
    };
  }
  //first Faby drawn
  var faby = new FabyConstructor(250, 2);

  //obstacle constructor

  var obstacleImageTop = new Image();
  var obstacleImageBottom = new Image();
  obstacleImageTop.src = 'images/obstacle_top.png';
  obstacleImageBottom.src = 'images/obstacle_bottom.png';

  function Obstacle(width, height, obstacleImg, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
  }

  var myObstacles = [];
  var frames = 0;

  function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].x--;
      console.log('updating an obstacle');
    }
  }

  function drawObstacles() {
    //done temporarily to see the obstacles
    x = 500;
    minHeight = 20;
    maxHeight = 400;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Obstacle(10, height, obstacleImageTop, x, 0));
    myObstacles.push(new Obstacle(10, x - height - gap, obstacleImageBottom, x, height + gap));
    console.log('drawing an obstacle');
    console.log(myObstacles);
  }

  //spacebar functions and key events
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 32:
        faby.newPos();
        console.log('spacebar');
        break;
      case 37:
        console.log('move left');
        break;
    }
    updateCanvas();
  };
  document.onkeyup = function(e) {
    faby.stopMove();
  };

  //updating of canvas
  function updateCanvas() {
    console.log(faby.vy);
    faby.update();
    if (frames % 120) {
      updateObstacles();
    }
    ctx.clearRect(0, 0, 900, 500);
    ctx.drawImage(img, background.x, 0, 900, 500);
    ctx.drawImage(img, background.x + 900, 0, 900, 500);
    drawObstacles();
    faby.drawFaby();
    frames++;
  }

  //initial startgame call
  function startGame() {
    setInterval(function() {
      background.loop();
      updateCanvas();
    }, 10);
  }
};
