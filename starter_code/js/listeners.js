document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 32:
            player.fly();
            break;
            
        case 13:
            start();
            break;

        case 82:
            if(!interval){
                restart();
            }
            
            break;

        default:
            break;
    }
}