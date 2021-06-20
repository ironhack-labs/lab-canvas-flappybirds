window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

  }

};

// The Canvas
const canvas = document.getElementById("my-canvas");
let ctx = canvas.getContext("2d");

// The Background Canvas
const backgroundCanvas = document.getElementById("my-canvas-background");
let backgroundCtx = backgroundCanvas.getContext("2d");