var FPS = 30;
var ctx = document.getElementById('finger-hero-canvas').getContext('2d');
var squares = [];

class Square {
  constructor(finger, length) {
    this.finger = finger;
    this.length = length;
    this.y = -length;
  }

  draw() {
    switch(finger) {
      case 0:
        ctx.fillStyle = '#4CAF50';
        break;
      case 1:
        ctx.fillStyle = '#FF4081';
        break;
      case 2:
        ctx.fillStyle = '#FFEB3B';
        break;
      case 3:
        ctx.fillStyle = '#2196F3';
        break;
    }
    ctx.beginPath();
    ctx.moveTo(this.xAt(this.y, this.finger), this.y);
    ctx.lineTo(this.xAt(this.y + this.length, this.finger), this.y + this.length);
    ctx.lineTo(this.xAt(this.y + this.length, this.finger + 1), this.y + this.length);
    ctx.lineTo(this.xAt(this.y, this.finger + 1), this.y);
    ctx.closePath();
    ctx.fill();

    console.log(this.y);
  }

  update() {
    this.y++;
  }

  xAt(y, f) {
    return 250 + 35 * f * (y/(480 / (-70 + 35 * f)));
  }
}

squares.push(new Square(0, 20));

setInterval(function() {
  update();
  draw();
}, 1000 / FPS);

function update() {
  squares.forEach(function(square) {square.update()});
}

function draw() {
  ctx.clearRect(0, 0, 640, 480);
  drawFrets();
  squares.forEach(function(square) {square.draw()});
}

function drawFrets() {
  for(var i = 0; i < 5; i++) {
    ctx.moveTo(250 + 35 * i, 0);
    ctx.lineTo(180 + 70 * i, 480);
    ctx.stroke();
  }
}
