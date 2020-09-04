//collect elements
var game = document.querySelector("#game");
var resetSwitch = document.querySelector("#reset");
var powerLED = document.querySelector("#powerLED");

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

function toggleClass(element, cssClass) {
  let lmnt = element;
  
  if(element.classList.contains(cssClass)){
    element.classList.remove(cssClass);
  } else {
    element.classList.add(cssClass);
  }
}



var testlmnt = document.querySelector("#test");
console.log("None: " + testlmnt.classList);

toggleClass(testlmnt,"glowing");

console.log("On: " + testlmnt.classList);

toggleClass(testlmnt,"glowing");

console.log("Gone: " + testlmnt.classList);


var disco = setInterval(() => {
  toggleClass(glowTest,"glowing");
},100);