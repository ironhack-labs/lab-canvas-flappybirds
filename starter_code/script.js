window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame();
  };

  const canvas = this.document.createElement('canvas');
  this.document.body.appendChild(canvas);
  canvas.setAttribute('id', 'canvas');
  const ctx = canvas.getContext('2d');
  function startGame() {
    requestAnimationFrame(startGame);
    const bgImage = new this.Image();
    bgImage.src = './images/bg.png';
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  }
};
