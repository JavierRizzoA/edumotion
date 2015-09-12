import Leap from 'leapjs';
import SP from 'serialport-electron';
let {SerialPort} = SP;

window.arduinoActive = false;
window.fhActive = false;

// Store frame for motion functions
var previousFrame = null;
// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var serialPort = null;
SP.list(function (err, ports) {
  if(!ports) {
    console.log("NO PORTS FOUND!");
    return;
  }
  ports.forEach(function(port) {
    serialPort = new SerialPort(port.comName, { baudrate: 9600 });
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

Leap.loop(controllerOptions, function(frame) {
  if(previousFrame && previousFrame.valid) {
    var rotationAxis = frame.rotationAxis(previousFrame);
    var frameString = "Rotation axis: " + vectorToString(rotationAxis, 2) + "<br />";
    document.getElementById('content').innerHTML = "<div>"+frameString+"</div>";
  

    if(!!serialPort && window.arduinoActive) {
      var rotX = doubleToByte(rotationAxis[0], true);
      var rotY = doubleToByte(rotationAxis[2], false);
      if(rotX !== 4) serialPort.write(rotX);
      if(rotY !== 4) serialPort.write(rotY);
      //serialPort.write(doubleToByte(rotationAxis[0], true));
      //serialPort.write(doubleToByte(rotationAxis[2], false));
    }
          
  }
  previousFrame = frame;
});

function doubleToByte(d, axis) {
  if(axis) {
    if(d < -.7) return 'A';
    if(d > .7) return 'B';
  } else {
    if(d < -.7) return 'C';
    if(d > .7) return 'D';
  }
  return 4;
  //return Math.floor((180*(d + 1))/2);
}

function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
  + vector[1].toFixed(digits) + ", "
  + vector[2].toFixed(digits) + ")";
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
  window.arduinoActive = false;
  window.fhActive = false;
  window.stopFH();
  var target = $(e.target).attr("href");
  if(target === '#tilt') {
    arduinoActive = true;
  } else if(target === '#finger') {
    window.fhActive = true;
    window.startFH();
  }
});

