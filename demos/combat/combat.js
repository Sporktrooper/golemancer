// collect elements
var game = document.querySelector("#game");
var resetSwitch = document.querySelector("#reset");
var powerLED = document.querySelector("#powerLED");
var textLog = {
  element: document.querySelector("#textLog"),
  lineCount: document.querySelector("#textLog").childElementCount,
  columns: 50,
  
}
textLog.lines = Array.from(textLog.element.children);
textLog.lines.reverse();



// listen for input
resetSwitch.addEventListener('click', function () {
  if (resetSwitch.classList.contains("switchOff")) {
    boot();
    resetSwitch.classList.remove("switchOff");
    resetSwitch.classList.add("switchOn");
    
    powerLED.classList.remove("ledOff");
    powerLED.classList.add("ledOn");
      } else {
        kill();
      
        resetSwitch.classList.remove("switchOn");
        resetSwitch.classList.add("switchOff");
        
        powerLED.classList.remove("ledOn");
        powerLED.classList.add("ledOff");
      }
  
});

function boot () {
  
  game.classList.remove("gameOff");
  game.classList.add("gameOn");
  // monitor on
  
  
}

function kill () {
  game.classList.remove("gameOn");
  game.classList.add("gameOff");
  // monitor off
  
  
}

function toggleClass(element, cssClass) {
  let lmnt = element;
  
  if(element.classList.contains(cssClass)){
    element.classList.remove(cssClass);
  } else {
    element.classList.add(cssClass);
  }
}

function print(str) {
  
  // move everything up
  for(i=textLog.lineCount-1;i>0;i--){
    textLog.lines[i].innerHTML = textLog.lines[i].innerHTML;
    console.log(textLog.lines[i].innerHTML);
  }
  
  // write the new line
  textLog.lines[0].innerHTML = str;
  
}

// You found Opulent Microfiber Gloves of the Mechanical Keyboard Warrior, +5 kpm and 14% accuracy

for (i=0;i<16;i++){
  print("line #" + i,i);
}