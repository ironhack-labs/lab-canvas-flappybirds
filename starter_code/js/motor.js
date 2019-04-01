function draw() {
  // Creación de variables para modificacion de movimiento
  // debugger
  var radius = 20;
  // var TOP_KEY = 38;
  // var ground = h - radius;
  var ball = new Ball(radius * 8, h - radius, ctx, radius);
  var framecounter = 0;
  var obstacles = [];
  var posicion;
  // llamada de función que pinta
  setInterval(function() {
    framecounter++;
    // ball.drawBall();
    // ball.move();
    // console.log(framecounter);
    drawAll(ball, obstacles);
    ball.move();
    if (framecounter % 100 == 0) {
      posicion = Math.floor(ball.y);
      // console.log(posicion);
      generateObstacle(obstacles, posicion);
    }
    if (obstacles.length > 0) {
      for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].move();
        // if (ball.posY + ball.radius === h) {
        //   alert("hola lau");
        // }
        // if (obstacles[i].x < ball.posX + ball.radius &&
        //     obstacles[i].x + obstacles[i].w > ball.posX &&
        //     obstacles[i].posTop < ball.posY + ball.radius &&
        //     obstacles[i].h + obstacles[i].posTop > ball.posY) {
        //     alert("collision TOP!")
        // }
        // if (obstacles[i].x < ball.posX + ball. &&
        //     obstacles[i].x + obstacles[i].width > ball.posX &&
        //     obstacles[i].y < ball.y + ball.height &&
        //     obstacles[i].height + obstacles[i].y > ball.y) {
        //     alert("collision TOP!")
        //  }
        // if (obstacles[i].x < ball.posX + ball.radius &&
        //     obstacles[i].x + obstacles[i].w > ball.posX &&
        //     obstacles[i].posTop < ball.posY + ball.radius &&
        //     obstacles[i].h + obstacles[i].posTop > ball.posY) {
        //     alert("collision TOP!")
        // }
        // if (obstacles[i].x < ball.posX + ball.radius &&
        //     obstacles[i].x + obstacles[i].w > ball.posX &&
        //     obstacles[i].posBottom < ball.posY + ball.radius &&
        //     obstacles[i].h + obstacles[i].posBottom > ball.posY) {
        //     alert("collision bottom!")
        // };

        // if (obstacles[i].x < ball.posX + ball.radius &&
        //     obstacles[i].x + obstacles[i].w > ball.posX &&
        //     obstacles[i].posBottom < ball.posY + ball.radius &&
        //     obstacles[i].h + obstacles[i].posBottom > ball.posY) {
        //     alert("collision bottom!")
        // };
      }
    }
    if (obstacles.length > 0) {
      if (obstacles[0].x <= -obstacles[0].w) {
        obstacles.shift();
      }
    }
  }, 1000 / 60);
}

function generateObstacle(obstacles, playerHeigth) {
  obstacles.push(new Obstaculo(playerHeigth, this.radius, this.ctx));
}

function drawAll(ball, obstacles) {
  this.ctx.beginPath();
  this.ctx.clearRect(0, 0, w, h);
  this.ctx.save();
  ball.drawBall();
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].draw();
  }
  this.ctx.fill();
  this.ctx.restore();
  this.ctx.closePath();
}