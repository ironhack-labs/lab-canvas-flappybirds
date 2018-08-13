var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var isGameStarted = false;
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;
var faby = new FabyConstructor(250, 4, ctx);
var crashedBird = true;
var imageTop = 'images/obstacle_top.png';
var imageBottom = 'images/obstacle_bottom.png';
var myObstacles = [];
var frames = 0;
var interval;
window.onload = function() {
  //Start button begins game
  document.getElementById('start-button').onclick = function() {
    if (!isGameStarted) {
      startGame();
      isGameStarted = true;
    }
  };

  //background image
  var backImg = new Image();
  backImg.src = 'images/bg.png';

  var background = {
    x: 0,
    loop: function() {
      this.x--;
      if (this.x <= -900) {
        this.x = 0;
      }
    }
  };
  function drawScore() {
    var scoreText = 'Score: ' + frames;
    ctx.font = '30px sans-serif';
    ctx.fillStyle = 'green';
    ctx.fillText(scoreText, 700, 45);
  }

  function createObstacle() {
    var x = canvasWidth;
    var minHeight = 20;
    var maxHeight = 400;
    var height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    var minGap = 50;
    var maxGap = 200;
    var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Obstacle(40, height, x, 0, imageTop, ctx));
    myObstacles.push(new Obstacle(40, x - height - gap, x, height + gap, imageBottom, ctx));
  }

  function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].x -= 10;
      myObstacles[i].drawObstacles();
      if (faby.checkIfCrash(myObstacles[i])) {
        stopGame();
        console.log('obstacle logs a crash');
        return;
      }
    }
  }

  //spacebar functions and key events
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 32:
        faby.newPos();
        console.log('spacebar');
        break;
    }
    updateCanvas();
  };
  document.onkeyup = function(e) {
    faby.stopMove();
  };

  //updating of canvas
  function updateCanvas() {
    ctx.clearRect(0, 0, 900, 500);
    faby.update();

    if (frames % 75 === 0) {
      createObstacle();
    }

    ctx.drawImage(backImg, background.x, 0, 900, 500);
    ctx.drawImage(backImg, background.x + 900, 0, 900, 500);

    drawScore();
    faby.drawFaby();
    updateObstacles();
    frames++;
  }
  //comment

  //initial startgame call
  function startGame() {
    interval = setInterval(function() {
      background.loop();
      updateCanvas();
    }, 1000 / 40); //!!
  }

  //End Game
  function stopGame() {
    clearInterval(interval);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '40px monospace';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER!', canvasWidth / 3, canvasHeight / 3);
    this.ctx.fillText('Score: ' + frames, canvasWidth / 3, canvasHeight / 2);
    console.log('end of game');
  }
};
