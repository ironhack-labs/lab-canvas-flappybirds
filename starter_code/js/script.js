window.onload = function() {
  var game = new Game("canvas");
  document.getElementById('start-button').onclick = function(){
    game.start();
    document.getElementById('start-button').onclick = undefined;
  };
};
