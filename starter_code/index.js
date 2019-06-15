//window.onload = function() {
  //Game.init("canvas")
//};

/////
var game = new Game()

window.onload = function() {
  // Se crea automaticamente la etiqueta canvas
    //const parentCanvas = document.getElementById('game-board')
    //parentCanvas.innerHTML = `<canvas id="canvas"></canvas>`;
    
    document.getElementById("start-button").onclick = function () {
    startGame();
    };

    function startGame() {
    game.init('canvas')
    }

    
}