window.onload = function () {
  var canvas = document.querySelector("#game-board");

  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");

  canvas.setAttribute("height", window.innerHeight);
  canvas.setAttribute("width", window.innerWidth);

  window.onresize = function () {
    // alert('hola')
    startGame();
  
    canvas.setAttribute("height", window.innerHeight);
    canvas.setAttribute("width", window.innerWidth);
    
    w = window.innerWidth
    h = window.innerHeight
    w2 = w / 2
    h2 = h / 2
  }

  let w = window.innerWidth;
  let h = window.innerHeight;
  let w2 = w / 2;
  let h2 = h / 2;



  // var boton = ;
  // var logo = ;

  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    bg()
    flappy()
    obstacle_bottom()
    obstacle_top()
    hideHtml()

    function draw() {
      var PI2 = 2 * Math.PI
      //   var img1 = new Image();   // Create new <img> element
      // img1.src = './images/bg.png';
      // ctx.drawImage('./images/bg.png',0,0)

      ctx.beginPath()
      ctx.fillStyle = this.color;
      ctx.arc(3, 3, 20, 0, PI2)
      ctx.fill()
      ctx.closePath()
    }
    draw()

    function hideHtml() {
      // debugger
      // var boton = document.querySelector("#img")
      document.getElementById("main").classList.toggle("hola");
    }

    function bg() {
      var img = new Image();
      imgScale = 15 / 31;
      img.onload = function () {
        ctx.drawImage(img, 0, 0, w, h);
      };
      img.src = "./images/bg.png";

      // ctx.beginPath()
      // var img1 = new Image(); // Create new <img> element
      // img1.src = "./images/bg.png";
      // ctx.drawImage("./images/bg.png", 0, 0);
      // ctx.closePath()
    }


    function flappy() {
      var flappy = new Image();
      flappyScale = 10 / 30;
      flappy.onload = function () {
        ctx.drawImage(flappy, 20, h2, 100, 80);
      };
      flappy.src = "./images/flappy.png";
    }


 var centerObs = Math.floor(Math.random() +60)


    function obstacle_bottom() {
      var obstacle_bottom = new Image();
      obstacle_bottom.src = "./images/obstacle_bottom.png";
      obstacle_bottom.onload = function () {
        ctx.drawImage(obstacle_bottom, w2, h - 80);
      };
    }

    function obstacle_top() {
      var obstacle_top = new Image();
      obstacle_top.onload = function () {
        ctx.drawImage(obstacle_top, w2, -400);
      };
      obstacle_top.src = "./images/obstacle_top.png";
    }

    // function obsAbajo() {
    //   var obsAbajo = new Image();

    //   obsAbajo.src = "./images/obstacle_bottom.png";
    //   obsAbajoScale = 10 / 30;
    //   obsAbajo.onload = function () {
    //     ctx.drawImage(obsAbajo, w2, h, w2, h2);
    //   };
    // }
    // obsAbajo()
  }
};



// class pajaro {
//   constructor (we,he,ctx,r){
//       this.posX = we;
//       this.posY = he;
//       this.ctx = ctx;
//       this.radius = r;
//       this.y0 = this.posY * 0.5;
//       this.y = this.y0;
//       this.gY = 0;
//       this.setListeners();
//   }
//   // drawBall (){
//   //     // aquí pintamos una pelota
//   //     this.ctx.beginPath()
//   //     this.ctx.clearRect(0, 0, w, h)
//   //     this.ctx.save()
//   //     this.ctx.fillStyle = "green"
//   //     this.ctx.arc(this.posX, this.y, this.radius, 0, 2 * Math.PI)
//   //     this.ctx.fill()
//   //     this.ctx.restore()
//   //     this.ctx.closePath()
//   // }

//   drawBall  () {
//     var flappy = new Image();
//     flappyScale = 10 / 30;
//     flappy.onload = function () {
//       ctx.drawImage(flappy, this.posX, this.y,, 100, 80);
//     };
//     flappy.src = "./images/flappy.png";
//   }
//   move() {
//       // Aumenta la velocidad en el eje y.
//       var gravity = 0.4;
  
//       // el limite de la pelota es la posición original
//       // if (this.y >= this.y0) {
//       //   this.gY = 1;
//       //   this.y = this.y0;
//       // } 
//       // else { 
//       //   this.gY += gravity;
//       //   this.y += this.gY;
//       // }
//       if (this.y <= this.radius) {
//         this.gY = 0;
//         this.gY += gravity;
//         this.y = this.radius;
//         this.y += this.gY;
//       } 
//       else if (this.y >= (h -this.radius)) {
//           this.gY = 1;
//           this.y = h - this.radius;
//       }
//       else { 
//         this.gY += gravity;
//         this.y += this.gY;
//       }
//   }
//   setListeners() {
//       document.onkeydown = function(event) {
//           // console.log(event.keyCode);
//       //   if (event.keyCode === 38 && this.y == this.y0) {
//         if (event.keyCode === 32 && this.y >= this.radius) {
//           this.y -= 10;
//           this.gY -= 10;
//         }
//       }.bind(this);
//   }
// }