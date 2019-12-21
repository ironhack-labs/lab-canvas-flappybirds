window.onload = function() {
  const canvas = this.document.createElement('canvas');
  canvas.setAttribute('id', 'myCanvas');
  document.getElementById('game-board').appendChild(canvas);
  canvas.classList.add('display-none');
  const ctx = canvas.getContext('2d');
  canvas.width = 700;
  canvas.height = 500;
  document.getElementById('start-button').onclick = function() {
    document.querySelector('img').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';
    canvas.classList.remove('display-none');
    startGame();
  };
  const player1 = new Player(canvas.width / 2, canvas.height / 2);
  const obstacle = new Obstacle();
  const bgImage = new this.Image(); //background img
  bgImage.src = './images/bg.png';
  let obstacles = [];

  startGame = () => {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    player1.keyEvent();
    player1.loop();
    // obstacle.getTopObstacle();
    // obstacle.getBottomObstacle();
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

    requestAnimationFrame(startGame);
  };

  createObstacles = () => {
    if (Math.floor(Math.random() * 25) % 2 === 0) {
      obstacles.push(new Obstacle());
    }

    setTimeout(() => {
      createObstacles();
    }, 3000);
  };
  createObstacles();
};
