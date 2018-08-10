var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var isGameStarted = false;

window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    if (!isGameStarted) {
      startGame();
      isGameStarted = true;
    }
  };

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

  var fabyImg = new Image();
  fabyImg.src = 'images/flappy.png';

  var vy = 2;
  var gs = 1;
  var gravitySpeed = 0.9;

  //Faby contructor function
  function FabyConstructor(y, vy){
    this.y = y;
    this.vy = vy;
    this.drawFaby= function() {
      ctx.drawImage(fabyImg, 40, this.y, 30 * 1.418, 30);
    };
    this.update=function() {
      this.y += this.speedY;
      this.speedY += this.gravitySpeed;
    };
    this.newPos=function() {
      y -= 0.000001;
      if (y)
    };
  }

var faby = new FabyConstructor(250, 2)





    
    
    
  };

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

  function updateCanvas() {
    console.log(faby.vy);
    faby.update();
    ctx.clearRect(0, 0, 900, 500);
    ctx.drawImage(img, background.x, 0, 900, 500);
    ctx.drawImage(img, background.x + 900, 0, 900, 500);
    faby.drawFaby();
  }

  function startGame() {
    setInterval(function() {
      background.loop();
      updateCanvas();
    }, 10);
  }
};
