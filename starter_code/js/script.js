window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").setAttribute("class", "disabled");
    document.getElementById("start-button").setAttribute('disabled','disabled');
    startGame();
  };

  function startGame() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasSize = { w: canvas.width, h: canvas.height };
    window.gravity = 0.1;

    var img = new Image();
    img.src = "./images/bg.png";
    var speed = 30;
    var y = 0;

    var dx = -0.75;
    var imgW = 900;
    var imgH = 505;
    var x = 0;
    var clearX;
    var clearY;

    img.onload = function() {
      if (imgW > canvasSize.w) {
        x = CanvasXSize + imgW;
      }
      if (imgW > canvasSize.w) {
        clearX = imgW;
      } else {
        clearX = canvasSize.w;
      }
      if (imgH > canvasSize.y) {
        clearY = imgH;
      } else {
        clearY = canvasSize.y;
      }
      return setInterval(draw, speed);
    };

    function draw() {
      ctx.clearRect(0, 0, clearX, clearY);
      if (imgW <= canvasSize.w) {
        if (x > canvasSize.w) {
          x = -imgW + x;
        }
        if (x > 0) {
          ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        if (x - imgW > 0) {
          ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
      } else {
        if (x > canvasSize.w) {
          x = canvasSize.w - imgW;
        }
        if (x > canvasSize.w - imgW) {
          ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
      }
      x -= dx;
      ctx.drawImage(img, x, y, imgW, imgH);
      bird.update();
      bird.render();
      obstaclesUp[0].render(ctx);
      obstaclesDown[0].render(ctx);
    }

    var bird = createBird(ctx, canvasSize);

    function update() {
      ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);
    }
    setInterval(draw, 20);

    var obstaclesUp = [];
    var obstaclesDown = [];

    function newObstacles() {
      var objUp1 = new ObstacleUp(ctx, canvasSize);
      var objDown1 = new ObstacleDown(ctx, canvasSize);
      obstaclesUp.push(objUp1);
      obstaclesDown.push(objDown1);
    }
    newObstacles();
    console.log(obstaclesUp);

    document.onkeydown = function(e) {
      if (e.keyCode == 32) {
        bird.userPull = 0.3;
      }
    };

    document.onkeyup = function(e) {
      if (e.keyCode == 32) {
        bird.userPull = 0;
      }
    };
  }
};
