window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").setAttribute('class', 'pressed');
    let game = new Game();
    game.init();

  };

};
