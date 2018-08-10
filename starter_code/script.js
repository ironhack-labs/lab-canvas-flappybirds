window.onload = function() {

  const bird = new Bird(0, 0, 49.8, 35.1)

  const myGameArea = {
    canvas: document.createElement('canvas'),
    start() {
      this.canvas.width = 700;
      this.canvas.height = 500;
      this.canvas.style = 'border: 4px green solid';
      document.querySelector('#game-board').insertBefore(this.canvas, null);
      this.context = this.canvas.getContext('2d');
      this.interval = setInterval(updateBird, 100)
    },
    clear() {
      this.context.clearRect(0, 0, 700, 500)
    }
    
  }


  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    myGameArea.start()

    bird.create(myGameArea.context)
  }

  const updateBird = () => {
    myGameArea.clear();
    bird.create(myGameArea.context)
  }

  document.onkeydown = (e) => {
    switch(e.keyCode) {
      case 38: bird.moveUp(); break;
      case 40: bird.moveDown(); break;
      case 37: bird.moveLeft(); break;
      case 39: bird.moveRight(); break;
    }
}
};
