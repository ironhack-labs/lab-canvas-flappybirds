// update() {
//     const ctx = myGameArea.context;
//     ctx.fillStyle = this.color;

//     ctx.imageSmoothingEnabled = true;
//     ctx.imageSmoothingQuality = "high";
//     // ctx.fillRect(this.x, this.y, this.width, this.height);
//     if (this.color === "red") {
//       const banoonImg = new Image();
//       banoonImg.src = "img.png";
//       banoonImg.style = "object-fit: cover;";
//       ctx.drawImage(banoonImg, this.x, this.y, this.width, this.height);
//     } else {
//       const banoonImg = new Image();
//       banoonImg.src = "img/bamboo.png";
//       banoonImg.style = "object-fit: cover;";
//       ctx.drawImage(banoonImg, this.x, this.y, this.width, this.height);
//     }
//   }

//   newPos() {
//     this.x += this.speedX;
//     this.y += this.speedY;
//   }

//   left() {
//     return this.x;
//   }
//   right() {
//     return this.x + this.width;
//   }
//   top() {
//     return this.y;
//   }
//   bottom() {
//     return this.y + this.height;
//   }

//   crashWith(obstacle) {
//     return !(
//       this.bottom() < obstacle.top() ||
//       this.top() > obstacle.bottom() ||
//       this.right() < obstacle.left() ||
//       this.left() > obstacle.right()
//     );
//   }
// }