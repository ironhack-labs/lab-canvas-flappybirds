const canvas = document.getElementById('my-canvas')

const ctx = canvas.getContext('2d')

const game = new Game(ctx)

const button = document.getElementById('start-button')

button.onclick = () => {
  button.remove()

  game.start()
}

document.addEventListener('keydown', (event) => {
  game.onKeyDown(event.keyCode)
})

