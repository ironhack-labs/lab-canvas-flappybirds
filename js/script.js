window.onload = function () {
  //Create the canvas and its context
  const canvas = document.getElementById("my-canvas");
  const ctx = canvas.getContext("2d");
  let frameId = null;
  let obstacleId = null;

  //Create instances of the classes we want to paint on the canvas
  //Use info from constructors!
  const background = new Background(ctx, canvas.width, canvas.height) //
  //const car = new Car(ctx, canvas.width / 2 - 25, canvas.height - 110);

  function startGame() {
    //Create a loop to animate the game
    frameId = requestAnimationFrame(startGame);
    //Check if the game is working
    console.log("The game is working, WOO!");

    //1-Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //2-Paint the object
    background.drawLoop();
  }

  document.getElementById("start-button").onclick = function () {
    startGame();
  };
};