document.addEventListener("keydown", e => {
  if (requestId) {
    console.log(e)

    if (e.code === 'Space') {
      bird.update()
    }
  }
})