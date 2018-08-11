var myGameArea, bird;

window.onload = function() {

  bird = new Bird(50, 250, 49.8, 35.1)
  var obstacleArr = [];
  var background = new Image();
  background.src = "./images/bg.png";
  console.log(background)

  const canvas = document.createElement('canvas');
  canvas.width = 700;
  canvas.height = 500;
  canvas.style = 'border: 4px green solid';
  document.querySelector('#game-board').insertBefore(canvas, null);
  const context = canvas.getContext('2d');

    




  myGameArea = {
    start() {
      background.onload = () => {
        context.drawImage(background, 0, 0, 100, 100)
        console.log('hello')
      }
      this.interval = setInterval(update, 40);
    },
    clear() {
      context.clearRect(0, 0, 700, 500)
    },
    frame: 0,
    stop() {
      clearInterval(this.interval)
    },
    score: 0,
    restart() {
      obstacleArr = [];
      this.frame = 0;
      context.clearRect(0, 0, 700, 500);
      this.stop()
    }
    
  }


  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  document.querySelector('#restart').onclick = () => {
    myGameArea.restart()
    startGame();
  }

  function startGame() {
    myGameArea.start()

    bird.create(context)

    update()
  }

  const updateScore = (ctx) => {
    ctx.clearRect(0, 0, 700, 500)
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${myGameArea.score}`, 550, 30); 
  }

  const update = () => {
    context.drawImage(background, 0, 0, 100, 100)
    obstacleArr.forEach(i => {
      if (crashWithObstacle(i)) {
        myGameArea.stop()
      }
    })
    if (crashWithBorder()) {
      myGameArea.stop()
    }
    bird.newPos()


    myGameArea.frame ++;
    myGameArea.clear();
    updateScore(context);

    if (myGameArea.frame % 100 === 0) {
    console.log(obstacleArr)

      const canvasWidth = canvas.width;
      const maxHeight = 150;
      const minHeight = 80;
      const height = Math.floor(Math.random()*(maxHeight + 1)) + minHeight

      const minGap = 120;
      const maxGap = 150;
      const gap = Math.floor(Math.random()*(maxGap + 1)) + minGap;

      // count ++;
      // let x = 200 + count*50;

      const obs_top = new Component(canvasWidth, 0, 30, height, 'orange');
      obs_top.createTop(context);
      obstacleArr.push(obs_top);

      const obs_btm = new Component(canvasWidth, height + gap, 30, 500 - height - gap, 'blue');
      obs_btm.createBtm(context)
      obstacleArr.push(obs_btm)
      console.log(obstacleArr)
    }
    let passedNum = 0
    obstacleArr.forEach(i => {
      i.x -= 4;
      i.update(context)
      if (bird.left() > i.x) {
        passedNum ++ 
      }
    })
    myGameArea.score = passedNum / 2;
    



    bird.create(context)
    obstacleArr.forEach(i => i.update(context))
  }

  // crash - obstacle 
  const crashWithObstacle = (obstacle) => {
    return (!(bird.top() > obstacle.bottom() ||
       bird.bottom() < obstacle.top() ||
       bird.left() > obstacle.right() ||
       bird.right() < obstacle.left()))
  }

  // crash - top-border / bottom-border 
  const crashWithBorder = () => {
    return (bird.top() < 0 || bird.bottom() > 500)
  }


  document.onkeydown = (e) => {
    switch(e.keyCode) {
      case 38: bird.moveUp(); break;

    }
  }

  // canvas.onclick = () => {
  //     bird.moveUp();
  // }
};
