window.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.keyCode === 32) {
        flappy.fly()
    }
})