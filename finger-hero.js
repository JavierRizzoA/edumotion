var FPS = 30;
var ctx = document.getElementById('finger-hero-canvas').getContext('2d');

setInterval(function() {
  update();
  draw();
}, 1000 / FPS);

function update() {

}

function draw() {
  ctx.clearRect(0, 0, 640, 480);
  drawFrets();
}

function drawFrets() {
  for(var i = 0; i < 5; i++) {
    ctx.moveTo(250 + 35 * i, 0);
    ctx.lineTo(180 + 70 * i, 480);
    ctx.stroke();
  }
}
