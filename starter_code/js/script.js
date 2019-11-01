window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    //startGame();
    Game.init();
    document.getElementById("start-button").style.display="none";
  };

  // function startGame() {

  // }

};
