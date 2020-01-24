window.onload = function() {
  let test=false
  document.getElementById("start-button").onclick = function() {
    test ? null: test=startGame()
  };

  function startGame() {
    game.init();
    return true

  }

};
