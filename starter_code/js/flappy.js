function createFlappy(ctx, canvasSize){
    var flappy = {
        x: canvasSize.w/2,
        y: 40,   
        vx: 0,
        vy: 0, 
        userPull: 0,
        radius: 25,
        color: 
