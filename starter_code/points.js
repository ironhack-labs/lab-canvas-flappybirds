function Points(game){
    this.game = game
    this.points=0
    this.game.ctx.font="40px Gruppo"
    this.game.ctx.fillStyle="#ffff00"
}

Points.prototype.start = function(){
    var that = this
    this.id = setInterval(function(){
        that.points++
    },1000)
}

Points.prototype.stop = function(){
    clearInterval(this.id)
}

Points.prototype.restart = function (){
    this.points=0
}

Points.prototype.draw = function(){
    
    this.game.ctx.fillText(this.points,50,50)
}