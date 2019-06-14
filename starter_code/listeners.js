//van las teclas
addEventListener( 'keydown', event =>{
    if(event.keyCode === 32&&interval){
        //hacer que flappy brinque
        flappy.flap()
    }
})
