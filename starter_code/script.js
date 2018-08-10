var myGameArea, bird, obstacleArr;

window.onload = function() {

  bird = new Bird(0, 0, 49.8, 35.1)
  obstacleArr = [];
  let count = 0;



  myGameArea = {
    canvas: document.createElement('canvas'),
    start() {
      this.canvas.width = 700;
      this.canvas.height = 500;
      this.canvas.style = 'border: 4px green solid';
      document.querySelector('#game-board').insertBefore(this.canvas, null);
      this.context = this.canvas.getContext('2d');
      this.interval = setInterval(update, 100)
    },
    clear() {
      this.context.clearRect(0, 0, 700, 500)
    },
    frame: 0,
    stop() {
      clearInterval(this.interval)
    }
    
  }


  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    myGameArea.start()
    // crate bird
    bird.create(myGameArea.context)

    // create obstacle
    update()
  }

  const update = () => {
    obstacleArr.forEach(i => {
      if (crash(i)) {
        myGameArea.stop()
      }
    })
    bird.y += 5;
    myGameArea.frame ++;
    myGameArea.clear();
    if (myGameArea.frame % 80 === 0) {
      const canvasWidth = myGameArea.canvas.width;
      const maxHeight = 200;
      const minHeight = 40;
      const height = Math.floor(Math.random()*(maxHeight + 1)) + minHeight

      const minGap = 80;
      const maxGap = 200;
      const gap = Math.floor(Math.random()*(maxGap + 1)) + minGap;

      count ++;
      let x = 200 + count*50;

      const obs_top = new Component(canvasWidth, 0, 20, height, 'orange');
      obs_top.createTop(myGameArea.context);
      obstacleArr.push(obs_top);

      const obs_btm = new Component(canvasWidth, height + gap, 20, 500 - height - gap, 'blue');
      obs_btm.createBtm(myGameArea.context)
      obstacleArr.push(obs_btm)

    }
    obstacleArr.forEach(i => {
      i.x -= 1;
      i.update(myGameArea.context)
    })



    bird.create(myGameArea.context)
    obstacleArr.forEach(i => i.update(myGameArea.context))
  }

  const crash = (obstacle) => {
    return !(bird.top() > obstacle.bottom() ||
       bird.bottom() < obstacle.top() ||
       bird.left() > obstacle.right() ||
       bird.right() < obstacle.left()) 
  }

  document.onkeydown = (e) => {
    switch(e.keyCode) {
      case 38: bird.moveUp(); break;
      // case 40: bird.moveDown(); break;
      // case 37: bird.moveLeft(); break;
      // case 39: bird.moveRight(); break;
    }
  }
};
