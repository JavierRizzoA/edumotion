//var conn =  (window.controller = new Leap.Controller({background: true}))
//            .use('riggedHand', {
//              positionScale: 0.5,
//              background: true
//            });

var controllerOptions = {enableGestures: true,
  background: true,
loopWhileDisconnected: false};
window.connectNumber = function () {
  conn.connect();
}
window.disconnectNumber = function () {
  if(!!window.conn) window.conn.disconnect();
}


var iter = 0;
var operaciones = ["2 + 3 = __",
                   "4 - 2 = __",
                   "__ * 7 = 21"];
var respuestas = [5, 2, 3];
var operacionesDOM = document.getElementById('operaciones');
operacionesDOM.innerHTML = operaciones[iter];



function countFingers(hand) {
  if(!hand || !window.numberActive) return 0;
  var count = 0;
  hand.fingers.forEach(function( finger) {
    if(finger.extended) count ++;
  });
  return count;
}
