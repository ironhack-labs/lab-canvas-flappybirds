window.onload = function() {
  document.getElementById("start-button").onclick = () => {
    let game = new Game();
    game.init();
  };
};
