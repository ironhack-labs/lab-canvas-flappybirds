class Character {
  constructor(ctx, width, height, gravitySpeed, keys) {
    this._ctx = ctx;
    this._width = width;
    this._height = height;
    this._posX = 40;
    this._speedY = undefined;
    this._gravity = undefined;
    this._gravitySpeed = gravitySpeed;
    this._posY = 300;

    this._image = new Image();
    this._image.src = "images/flappy.png";

    this._keys = keys;
  }

  draw() {
    this._ctx.drawImage(
      this._image,
      this._posX,
      this._posY,
      this._width,
      this._height
    );
  }

  move() {
    this._speedY = 1.1;
    this._gravity = 0.4
    this._speedY += this._gravity
    this._posY += this._speedY;
   
    console.log(`pos y ${this._posY}`)
    console.log(`speed ${this._speedY}`)
  }

  jump() {
    window.onkeydown = e => {
      if (e.keyCode === 32) {
        this._speedY = 30;
        this._posY -= this._speedY;
    //   } else {
        // this._posY += this._speedY;
        // this._speedY = -1;
        // console.log("hola");
      }
    };
  }

  //   setListeners() {
  //     console.log("hola");
  // document.onkeydown = e => {
  //   if (this._keys) {
  //       console.log("hola")
  //     this._speedY--
  //   }
  // };
  //   }
}
