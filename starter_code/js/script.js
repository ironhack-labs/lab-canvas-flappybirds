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
  ground.src = './images/fg.png';
  bgImage.src = './images/bg.png';
  const obstacles = [];

  startGame = () => {
    // ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height - 70);
    move();
    clear();
    draw();
    if (obstacles.length > 0) {
      for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].getBottomObstacle();
        obstacles[i].getTopObstacle();

        // player1.crashCollision(obstacles[i]);
        // if (obstacles[i].y <0) {
        //   obstacles.splice(i, 1);
        // }
      }
    }
    ctx.drawImage(ground, 0, canvas.height - 70, canvas.width, 70);
    player1.keyEvent();
    player1.loop();

    requestAnimationFrame(startGame);
  };

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  let x = 0;
  const speed = 0.3;
  function move() {
    x += speed;
    x %= canvas.width;
  }

  function draw() {
    ctx.drawImage(bgImage, x, 0);
    if (speed < 0) {
      ctx.drawImage(bgImage, x + canvas.width, 0);
    } else {
      ctx.drawImage(bgImage, x - canvas.width, 0);
    }
  }

  createObstacles = () => {
    if (Math.floor(Math.random() * 25) % 2 === 0) {
      obstacles.push(new Obstacle());
    }
    setTimeout(() => {
      createObstacles();
    }, 3000);
  };
};
