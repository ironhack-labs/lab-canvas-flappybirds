// ---------------------------------------------------------------------------
// ----------------------- Flappy bird game ----------------------------------
// Rules, use the space bar to make flappy elevated for a short perdiod of time
// when the space bar is not pressed, gravity makes flappy fall
// avoid collisions and fall to the floor, 
// ---------------------------------------------------------------------------

// wait for screen to load and then run the whole logic
window.onload = function() {

  //---------------------------------------------------------------------------
  // Part 1: DOM Manipulation: create canvas

  //create canvas DOM and its context
	const canvas = document.getElementById("my-canvas");
  canvas.width = 768;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // DOM elements: Start button
  const btnStart = document.getElementById("start-button");

  //---------------------------------------------------------------------------
  // Part 2: Create object instances and variables

  // Constant values: bird and obstacles
  const birdWidth = canvas.width / 9;     // 85px
  const birdHeight = canvas.height / 11;  // 93px
  const birdPosX =  canvas.width / 3;     // 256px
  const birdPosY = canvas.height / 2;     // 512px
  const obstacleWidth = canvas.width / 6; // 96px
  const obstaclePosX = canvas.width;
  const obstacleTopPosY = 0;
  const obstacleSpeed = 2;
  
  const gap = birdHeight * 3;   // fixed gap betwenn pipes pairs
  const minHeight = canvas.height / 7;    // fixed min pipe height
  const maxRandomGap = canvas.height - (2*minHeight) - gap;   // max random extra height

  // dynamic values
  let obstacleBottomPosY = 0;           
  let obstacleTopHeight = 0;
  let obstacleBottomHeight = 0;
  let randomHeight = 0;

  let collision = false;  

  // obstacles array start empty
  const obstaclesArray = [];

  // setInterval IDs
  let frameId = null;       // for the game loop setInterval
  let obstaclesId = null;   // for the obstacles setInterval
  let scoreId = null;       // for the score

  //We create instances of the classes we want to paint in the canvas
	//using the information we decided on their constructors
	const background = new Background(ctx, canvas.width, canvas.height);
	const faby = new Bird (ctx, birdPosX, birdPosY, birdWidth, birdHeight);

  //object score
  const score = {
    points: 0,
    draw: function () {
      ctx.font = "80px Roboto";
      ctx.fillStyle = 'white';
      ctx.fillText(this.points, canvas.width / 2, canvas.height / 10);
    }
  }
  
  //---------------------------------------------------------------------------
  // Part 3: Functions and game logic

  // update everything: canvas, bird, obstacles, score, gameOver
  function update () {
    updateCanvas();
    updateBird();
    updateObstacles();
    updateScore();
  }

  // update canvas
  function updateCanvas () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
  }

  // update bird
  function updateBird () {
    faby.newPos()
    faby.draw();
  }

  // Update obstacles: 1. draw each, 2. move each, 3. check each, 4. remove 
  // the old ones from the array
  function updateObstacles () {
    obstaclesArray.forEach((element) => {
      element.draw();
      element.move();
      checkCollision(faby,element)
    });
    //removeObstacles();
  }

  // update score
  function updateScore () {
    score.points = obstaclesArray.length;
    score.draw();
  }

  // Check for collisions
  function checkCollision(bird, pipe) {
      collision =                             // top pipe:
      (bird.x < pipe.x + pipe.width &&        // check left side of bird
      bird.x + bird.width > pipe.x &&         // check right side of bird
      bird.y < pipe.topY + pipe.topHeight &&  // check top of bird
      bird.y + bird.height > pipe.topY) ||    // check bottom of bird

                                                    // bottom pipe
      (bird.x < pipe.x + pipe.width &&              // check left side of bird
      bird.x + bird.width > pipe.x &&               // check right side of bird
      bird.y < pipe.BottomY + pipe.bottomHeight &&  // check top of bird
      bird.y + bird.height > pipe.BottomY)          // check bottom of bird

      if (collision) {
        cancelAnimationFrame(frameId);
        clearInterval(obstaclesId);
        alert("Game Over");
        window.location.reload();
      }

  }

  // Create random obstacles and add them to the obstacles array
  function createObstacles () {
    randomHeight = Math.random() * maxRandomGap; // calculare random gap
    obstacleTopHeight = minHeight + randomHeight;
    obstacleBottomHeight = minHeight + maxRandomGap - randomHeight;
    obstacleBottomPosY = obstacleTopHeight + gap;

    // create obstacle pair with random heigth
    let obstacle = new Obstacle (
      ctx,                          // canvas context
      obstaclePosX,                 // position x
      obstacleTopPosY,              // top position y
      obstacleBottomPosY,           // bottom position y
      obstacleWidth,                // width
      obstacleTopHeight,            // top height (random)
      obstacleBottomHeight,         // bottom height (random)
      obstacleSpeed                 //speed
    );

    // add obstacle to array
    obstaclesArray.push(obstacle);
  }

  // remove obstacle from array: when they go to the left of the canvas
  function removeObstacles() {
    obstaclesArray = obstaclesArray.filter(pipe => {
      return (pipe.x + pipe.width > 0);
    });
  }

  // bird goes up when spacebar is pressed
  function moveBirdUp(event) {
    if (event.keyCode === 32) {     // spacebar keycode is no. 32 
      event.preventDefault();
      if (event.repeat) {           // if the repeat behavior kicks in then do nothing  
        //console.log("still pressed");
        return;
      }
        else {                      // call the function only once
          faby.spaceBarClicked();
          //console.log("pressed"); 
        }
    }
  }

  // bird falls down when space bar is released
  function moveBirdDown(event) {
    if (event.keyCode === 32) { 
      faby.spaceBarReleased();
      //console.log("released");
    }
  }

  //---------------------------------------------------------------------------
  // Part 4: SetIntervals

  // Start and loop game
  function startGame() {
    // 0: create loop to animate the game
    frameId = requestAnimationFrame(startGame);

    //update game
    update();
  }

  // create obstacles
  obstaclesId = setInterval (createObstacles, 4000);

  //---------------------------------------------------------------------------
  // Part 5: Event listeners

  btnStart.addEventListener('click', (event) => {
    startGame();
    //console.log(event.currentTarget)
    event.currentTarget.disabled = true;
  });

  /*
  document.getElementById("start-button").onclick = function(event) {
    startGame();
  }
  */
  
  window.addEventListener('keydown', moveBirdUp);

  window.addEventListener('keyup', moveBirdDown);

};
