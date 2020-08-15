document.addEventListener("keydown", event => {
    switch (event.keyCode) {
      case 32:
        if (!intervalId && !reboot) {
          intervalId = setInterval(update, 1000 / 60)
          $button.innerHTML = "Gaming"
        }

        if(reboot)
        {
          restartGame();
        }

        flappy.jump()
        break
  
      default:
        break
    }
  })
  