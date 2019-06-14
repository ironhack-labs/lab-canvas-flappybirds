addEventListener("keydown", function keyDown(e) {
  if (!e.isTrusted) return;
  switch (e.keyCode) {
    case 32:
      bird.jump();
      break;
  }
});
