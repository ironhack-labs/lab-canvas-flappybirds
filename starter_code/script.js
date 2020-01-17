

const images = {
  bg: 'images/bg_flapy.jpeg',
  flappy: '',
  logo: 'images/logo.png',
  obstacle_bot: 'images/obs_bot.png',
  obstacle_top: 'images/obstacle_top.png'
}


class Background{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.bg
    this.img.onload = () => {
      this.draw()
    }
  }
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

  }

};
