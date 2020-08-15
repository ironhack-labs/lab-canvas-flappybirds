document.addEventListener("keydown", event => {

    switch (event.keyCode) {
        case 32:
            if (!intervalId) {
                intervalId = setInterval(update, 24)
            }
            flappy.jump()

            break
        default:
            break

    }

})

document.addEventListener("keydown", event => {

    switch (event.keyCode) {
        case 13:

            location.reload()


        default:
            break

    }

})

/* //window.onload = function() {
    var button = document.getElementById('artButton');
    button.onclick = artHandler;
//} */