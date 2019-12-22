window.onload = function() {
  const canvas = this.document.createElement('canvas');
  canvas.setAttribute('id', 'myCanvas');
  document.getElementById('game-board').appendChild(canvas);
  canvas.classList.add('display-none');
  const ctx = canvas.getContext('2d');
  canvas.width = 700;
  canvas.height = 550;
  //start button
  document.getElementById('start-button').onclick = function() {
    document.querySelector('img').style.width = '150px';
    document.getElementById('start-button').style.display = 'none';
    canvas.classList.remove('display-none');
    startGame();
    createObstacles();
  };
  const player1 = new Player(canvas.width / 2, canvas.height / 2);
  const bgImage = new this.Image(); //background img
  const ground = new this.Image();
  const obstacles = [];
  let score = 0;
  ground.src = './images/fg.png';
  bgImage.src = './images/bg.png';

  startGame = () => {
    clear();
    //1.background
    // ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height - 70);
    //2.background - animation
    move();
    draw();
    //draw obstacles
    if (obstacles.length > 0) {
      for (let i = 0; i < obstacles.length; i++) {
        //create obstacles
        obstacles[i].getBottomObstacle();
        obstacles[i].getTopObstacle();
        player1.crashCollision(obstacles[i]);
        //delete obstacles
        if (obstacles[i].x < -70 && obstacles.length > 7) {
          obstacles.splice(i, 1);
        }
        //check collision
        if (player1.crashCollision(obstacles[i])) {
          // obstacles.splice(i, 1);
          score--;
        }
        if (this.Math.round(obstacles[i].x + obstacles[i].width) == 0) {
          score += 5;
        }
      }
    }
    ctx.drawImage(ground, 0, canvas.height - 70, canvas.width, 70); //draw the ground/bottom of canvas
    player1.keyEvent(); //bird controller state identifier
    player1.loop(); //draw and bird controller

    //score
    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Score : ' + score, 10, 20);

    requestAnimationFrame(startGame);
  };

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  //background animation move and draw
  let x = 0;
  const speed = 0.3;
  function move() {
    x += speed;
    x %= canvas.width;
  }

  function draw() {
    ctx.drawImage(bgImage, x, 0);
    ctx.drawImage(ground, x, canvas.height - 70, canvas.width, 70);
    if (speed < 0) {
      ctx.drawImage(bgImage, x + canvas.width, 0);
    } else {
      ctx.drawImage(bgImage, x - canvas.width, 0);
    }
  }

  //Create obstacles
  createObstacles = () => {
    if (
      Math.floor(Math.random() * 25) % 3 === 0 &&
      player1.controller.gameState
    ) {
      obstacles.push(new Obstacle());
    }
    setTimeout(() => {
      createObstacles();
    }, 3000);
  };
};
