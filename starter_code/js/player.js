function Player(game){
  this.game = game
  this.img = new Image()
  this.img.src = "images/flappy.png"
  this.x = 40
  this.y = 200  
  this.vy = 0.5
  this.gravity = 0.05
  this.w = this.img.width / 6
  this.h = this.img.height /6
}

Player.prototype.draw =  function(){
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
}

Player.prototype.move =  function(){
 this.vy += this.gravity
 this.y += this.vy
}

Player.prototype.jump = function(){
  document.onkeydown = function(event){
    if (event.keyCode === 32){
      console.log(this.y)
      this.y -= 5
      this.vy -= 2  
    }
  }.bind(this)
}