window.onload = function() {
  const canvas = document.getElementById('my-canvas')
  const ctx = canvas.getContext('2d')

  const game = new Game(ctx)

  document.getElementById("start-button").onclick = function() {
    game.start();
  };

  document.addEventListener('keydown', (event) => {
    game.onKeyDown(event.keyCode)
  })

  document.addEventListener('keyup', (event) => {
    game.onKeyUp(event.keyCode)
  })

};
