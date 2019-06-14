addEventListener('keydown', event => {
    if(event.keyCode === 32 && interval) {
        // hacer que flappy flappee
        flappy.flap()
    }
})