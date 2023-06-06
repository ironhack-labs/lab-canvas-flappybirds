document.addEventListener("keydown", e => {
  switch (e.keyCode) {
    case 32:
      bird.update()
      return
  }
})