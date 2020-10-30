window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    flappyBirdsApp.init('my-canvas')
  }
};
