window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame();
  };
  const canvas = this.document.createElement('canvas');
  document.getElementById('game-board').appendChild(canvas);
  canvas.setAttribute('id', 'canvas');
  const ctx = canvas.getContext('2d');
  const player1 = new Player(canvas.width / 2, canvas.height / 2);
  startGame = () => {
    canvas.width = 700;
    canvas.height = 500;
    const bgImage = new this.Image(); //background img
    bgImage.src = './images/bg.png';
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    player1.keyEvent();
    player1.loop();
    // const birdImg = new this.Image();
    // birdImg.src = './images/flappy.png';
    // ctx.drawImage(birdImg, canvas.width / 2, canvas.height / 2, 30, 30);
    requestAnimationFrame(startGame);
  };
};
