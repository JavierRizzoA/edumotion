import Leap from 'leapjs';
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

var controllerOptions = {enableGestures: true};
Leap.loop(controllerOptions, (frame) => {
  if (frame.hands.length > 0) {
    var hand = frame.hands[0];
    if (hand.confidence > 0.5 && hand.pinchStrength  > 0.6) {
      var pinchFinger = findPinchFinger(hand);
      //console.log(pinchFinger);
    }
  }
});

let findPinchFinger = (hand) => {
  let pincher;
  let closest = 500;
  for(let f = 1; f < 5; f++)
  {
    let current = hand.fingers[f];
    let distance = Leap.vec3.distance(hand.thumb.tipPosition, current.tipPosition);
    if(current != hand.thumb && distance < closest)
    {
      closest = distance;
      pincher = current; 
    }
  } 

  return pincher.type - 1;
}
