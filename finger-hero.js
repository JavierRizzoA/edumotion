import Leap from 'leapjs';
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
