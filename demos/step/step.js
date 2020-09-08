var main = document.querySelector("#main");
var points = {};
points.val = 0;
points.element = document.querySelector("#points");

var gameOverElement = document.querySelector("#gameOver")


// look for keypresses

document.addEventListener('keydown', controls);
function controls(e) {
  switch(e.code){
    case "KeyA":
      buttonBar.buttonA.classList.add("pushed");
      setTimeout(function() {
        buttonBar.buttonA.classList.remove("pushed");
      },100);
      pushed(track.a);
      break;
      
    case "KeyS":
      buttonBar.buttonS.classList.add("pushed");
      setTimeout(function() {
        buttonBar.buttonS.classList.remove("pushed");
      },100);
      pushed(track.s);
      break;
      
    case "KeyD":
      buttonBar.buttonD.classList.add("pushed");
      setTimeout(function() {
        buttonBar.buttonD.classList.remove("pushed");
      },100);
      pushed(track.d);
      break;
      
    case "KeyF":
      buttonBar.buttonF.classList.add("pushed");
      setTimeout(function() {
        buttonBar.buttonF.classList.remove("pushed");
      },100);
      pushed(track.f);
      break;
      
    case "KeyR":
      if (gameOverElement.style.visibility == "visible"){
        gameOverElement.style.visibility = "hidden";
        createRow();
      }
    
    default: 
      break;
      
  }
}

function pushed(lane) {
  switch (lane.classList.contains("on")) {
          case true:
            lane.classList.remove("on");
            movePoints(1);
            createRow();
          break;
          
          case false:
            gameOver();

          break;
          }
  
}

function createRow() {
  //  put a step somewhere on a set of 4 potential points
  let row = Math.floor(Math.random()*4)
  
  switch (row) {
    case 0:
        track.a.classList.add("on");
      break;
      
    case 1:
        track.s.classList.add("on");
      break;
      
    case 2:
        track.d.classList.add("on");
      break;
      
    case 3:
        track.f.classList.add("on");
      break;
  }
  
}

function gameOver(){
  document.querySelector("#finalScore").innerHTML = points.val;
  gameOverElement.style.visibility = "visible";
  
  track.a.classList.remove("on");
  track.s.classList.remove("on");
  track.d.classList.remove("on");
  track.f.classList.remove("on");
  
  movePoints("gameOver");

}

/* pseudo
function advanceRow() {
  move the row to the next y coord
}

*/

function movePoints(val) {
  
  if(val == "gameOver") {
    points.val = 0
  } else {
    points.val += val;
    points.element.innerHTML = points.val;
  }
}


function create(parent,elementType) {
  let newElement = document.createElement(elementType);
  parent.appendChild(newElement);
  return newElement;
}

var track = {};
track.a = document.querySelector("#trackA");
track.s = document.querySelector("#trackS");
track.d = document.querySelector("#trackD");
track.f = document.querySelector("#trackF");

var buttonBar = create(main,"div");
buttonBar.classList.add("buttonBar");

buttonBar.buttonA = create(buttonBar,"div");
buttonBar.buttonA.classList.add("button");

buttonBar.buttonS = create(buttonBar,"div");
buttonBar.buttonS.classList.add("button");

buttonBar.buttonD = create(buttonBar,"div");
buttonBar.buttonD.classList.add("button");

buttonBar.buttonF = create(buttonBar,"div");
buttonBar.buttonF.classList.add("button");

createRow();