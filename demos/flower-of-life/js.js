var canvas = document.querySelector("#canvas");
var cv = canvas.getContext("2d");
const centerDots = true;

var center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  }

var radius = 60;

//drawSmiley();
function drawSmiley() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
     var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.stroke();
  }
}

//drawSquareDemo();
function drawSquareDemo() {
  
  cv.fillStyle = "rgb(200, 0, 0)";
  cv.fillRect(10, 10, 50, 50);
  
  cv.fillStyle = "rgba(0, 0, 200, 0.5)";
  cv.fillRect(30, 30, 50, 50);
  
} // end of drawSquareDemo()

//drawRightTriangle();
function drawRightTriangle() {
  cv.beginPath();
  cv.moveTo(100,100);
  cv.lineTo(50,50);
  cv.lineTo(100,50);
  cv.closePath();
  cv.stroke();
} // end of drawRightTriangle()

drawCircle([center.x, center.y],radius);
function drawCircle(origin,rad) {
  cv.beginPath();
  if (centerDots) cv.arc(origin[0], origin[1], 1, 0, Math.PI * 2, true);
  cv.moveTo(origin[0] + rad, origin[1]);
  cv.arc(origin[0], origin[1], rad, 0, Math.PI * 2, true);
  cv.stroke();
}

drawCircle([center.x + radius, center.y], radius);

{
  cv.beginPath();
  cv.moveTo(center.x + radius / 2,center.y + radius);
  cv.lineTo(center.x + radius / 2,center.y - radius);
  cv.stroke();
}