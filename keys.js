document.addEventListener("keydown", event => {
    switch (event.keyCode) {
      case 32:
        if (!intervalId) {
          intervalId = setInterval(update, 1000 / 60)
        }
        flappy.jump()
        break
  
      default:
        break
    }
  })