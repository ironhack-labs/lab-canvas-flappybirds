window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame();
    canvas.classList.remove('display-none');
  };
  const canvas = this.document.createElement('canvas');
  document.getElementById('game-board').appendChild(canvas);
  canvas.setAttribute('id', 'myCanvas');
  canvas.classList.add('display-none');
  const ctx = canvas.getContext('2d');
  const player1 = new Player(canvas.width / 2, canvas.height / 2);
  const obstacle = new Obstacle();
  const bgImage = new this.Image(); //background img
  canvas.width = 700;
  canvas.height = 500;
  bgImage.src = './images/bg.png';
  startGame = () => {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    player1.keyEvent();
    player1.loop();
    obstacle.getTopObstacle();
    requestAnimationFrame(startGame);
  };
};
