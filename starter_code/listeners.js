addEventListener('keydown', event => {
  if(event.keyCode === 32 && interval){
    flappy.flap()
  }
})