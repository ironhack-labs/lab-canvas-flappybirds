window.onload = function() {

  document.getElementById("start-button").onclick = function() {
    document.querySelector('#jump-button').focus();
    startGame();
  };

  //Dynamic creation of the canvas
  let canvasElem = document.createElement("canvas");
  document.querySelector('#game-board').appendChild(canvasElem);
  document.querySelector('body canvas').setAttribute("width", "888px");
  document.querySelector('body canvas').setAttribute("height", "497px");
  document.querySelector('body canvas').setAttribute("id", "canvas");

  function startGame(){
    let canvas = document.querySelector('body canvas');
    let ctx = document.querySelector('body canvas').getContext('2d');
    game.init(ctx, canvas);
    game.renderer();
  }
};