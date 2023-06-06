document.addEventListener("keydown", e => {
  if (requestId) {
    if (e.code === 'Space') {
      bird.update()
    }
  }
})