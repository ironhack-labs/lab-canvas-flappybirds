FB.ImageManager = {
  image: new Image(),
  dataset: ['bg.png', 'flappy.png', 'obstacle_bottom.png', 'obstacle_top.png'],
  loadedImages: {},
  loadImages: function(){
    let name;
    for(let image of this.dataset){
      name = image.split('.')[0];
      this.loadedImages[name] = {};
      this.loadedImages[name].img = new Image();
      this.loadedImages[name].img.src = 'images/'+image;
      this.loadedImages[name].pos = {};
      this.loadedImages[name].pos.x = 0;
      this.loadedImages[name].pos.y = 0;
    }
  },
  init: function(){
    this.loadImages();
  },

};