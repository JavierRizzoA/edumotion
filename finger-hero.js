import Leap from 'leapjs';
var FPS = 30;
var ctx = document.getElementById('finger-hero-canvas').getContext('2d');
var stat = document.getElementById('status');
var squares = [];
var pinchFinger;

window.startFH = function() {
  squares = [];
  squares.push(new Square(2, 30));
  window.intervalFH = setInterval(function() {
    update();
    checkHitbox();
    draw();
  }, 1000 / FPS);
};

window.stopFH = function() {
  clearInterval(window.intervalFH);
};

class Square {
  constructor(finger, length) {
    this.finger = finger;
    this.length = length;
    this.y = -length;
  }

  draw() {
    switch(this.finger) {
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

  }

  update() {
    this.y++;
    if (this.y > 480) {
      var pos = squares.indexOf(this);
      squares.splice(pos,1);
    }
    if(squares[squares.length - 1].y > 35 && Math.floor((Math.random() * 100) + 1) === 99) {
      squares.push(new Square(Math.floor((Math.random() * 4) + 0), 30));
    }
  }

  xAt(y, i) {
    var m = getStep(i);
    return y/m + (250 + 35 * i) ;
  }
}

function update() {
  squares.forEach(function(square) {square.update()});
}

function checkHitbox () {
  squares.forEach(function (square) {
    if(square.y + square.length > 480 - square.length) {
      if(square.y < 480) {
        if(pinchFinger === square.finger) {
          stat.style.backgroundColor = "GREEN";
          console.log("VERDE");
        } else {
          stat.style.backgroundColor = "RED";
        }
      }
    }
  })
}

function draw() {
  ctx.clearRect(0, 0, 640, 480);
  drawFrets();
  squares.forEach(function(square) {square.draw()});
}

function getStep(i) {
  return 480 / ( (180 + 70 * i) - (250 + 35 * i) );
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
    if (hand.pinchStrength  > 0.5) {
      pinchFinger = findPinchFinger(hand);
    }
  }
});

let findPinchFinger = (hand) => {
  let pincher;
  let closest = 500;
  for(let f = 1; f < 5; f++) {
    let current = hand.fingers[f];
    let distance = Leap.vec3.distance(hand.thumb.tipPosition, current.tipPosition);
    if(current != hand.thumb && distance < closest) {
      closest = distance;
      pincher = current; 
    }
  } 
  return pincher.type - 1;
}
