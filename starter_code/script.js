var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var isGameStarted = false;

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

  //obstacle constructor
  function Obstacle(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  //first Faby drawn
  var faby = new FabyConstructor(250, 2);

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
    ctx.clearRect(0, 0, 900, 500);
    ctx.drawImage(img, background.x, 0, 900, 500);
    ctx.drawImage(img, background.x + 900, 0, 900, 500);
    faby.drawFaby();
  }
  //initial startgame call
  function startGame() {
    setInterval(function() {
      background.loop();
      updateCanvas();
    }, 10);
  }
};
