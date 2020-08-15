window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

    if (!intervalId && !reboot) {
      intervalId = setInterval(update, 1000 / 60)
      $button.innerHTML = "Gaming"
    }

    if(reboot)
    {
      restartGame()
    }
  }

};

function restartGame()
{  
  reboot = false;
  board = new Board()
  flappy = new Flappy(320, 100)
  frames = 0
  while (obstacles.length) { obstacles.pop(); }   
  intervalId = setInterval(update, 1000 / 60)
  $button.innerHTML = "Gaming"
}