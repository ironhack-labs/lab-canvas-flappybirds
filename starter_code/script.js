const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// Interval esta todo nuestro intervalo del juego, es para poderlo parar o seguir
let interval;
// ES una variable auxiliar para tener nocion del tiempo o cuanto frames han pasado
let frames = 0;
// Es un array donde vamos ir guardando los obstacles
// Buena practica, deberiamos de splicear el obstacle que ya no sirve
const obstacles = [];


window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    start()
  };

  // const board = new Board();
  // const flappy = new Flappy();
};