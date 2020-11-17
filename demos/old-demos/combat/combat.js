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
textLog.lineContents = [];



// * * * ENTITIES * * *  
// Goal: refactor into classes
  // can't evaluate inside prop: val, even in {}. must assign after creation. 
  // create a func that returns an instantiated and initialized fighty thing.
var player = {
  name: "Boobadoo the Heroo",
  hp: 100,
  damage: 10,
  armor: 1,
}

var enemy = {
  name: "Generic Henchman",
  hp: 15,
  damage: 4,
  armor: 0,
}

// * * * EVENT HANDLING * * *
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
document.addEventListener('keyup',(e) => {
  if(e.code === "KeyA") attack();
});

// * * * COMPY286 * * * 
function boot () {
  
  game.classList.remove("gameOff");
  game.classList.add("gameOn");
  // monitor on
  bootScreen();
  
  
//  setTimeout(function () {
//    // wake textLog
//    var i = 0;
//    let loadScreen = setInterval(function (){
//      textLog.line[i].innerHTML = textLog.lineContents[i];
//      i++;
//      if (i >= textLog.lineCount) {
//        textLog.lines[0].innerHTML = ". " + "Would you like to play a game?";
//        clearInterval(loadScreen);
//      }
//    }, 60);
//  },1000);
  
//    for(i = 0; i < textLog.lineCount; i++) {
//    textLog.lines[i].innerHTML = "." + i;
    }
function kill () {
  game.classList.remove("gameOn");
  game.classList.add("gameOff");
  // monitor off
  for(i = 0; i < textLog.lineCount; i++) {
    textLog.lines[i].innerHTML = "";
    }
  
}

function write2(line,string) {
  // each screen line has a lock once written to. while locked, lineContents
  // values don't print to those lines[]. write handles updating lines[] and lineContents itself, does not use updateTextLog().
  
    textLog.lineContents[line] = string;
    textLog.lines[line].innerHTML = textLog.lineContents[line];
    
}
function print2(str) {
  
  if(game.classList.contains("gameOn")){
    
    arrayRotate(textLog.lineContents);
    textLog.lineContents[15] = str;
    
    updateTextLog();
 
  }    
}
function write(line,string) {
  textLog.lineContents[line] = string;
  updateTextLog();
}
function print(str) {
  
  if(game.classList.contains("gameOn")){
    
    arrayRotate(textLog.lineContents);
    textLog.lineContents[15] = str;
    
    updateTextLog();
 
  }  
  // write the new line
  
}
function clearScreen() {
  for(j = 0; j < textLog.lineCount; j++){
    print(".");
    //i is cursed. #todo
  }
}
function updateTextLog() {
  for(i = 0; i < textLog.lineContents.length; i++) {
      if(textLog.lineContents[i]) {
      textLog.lines[i].innerHTML = textLog.lineContents[i];
      } else {
        textLog.lines[i].innerHTML = "";
      }
    }
}

function bootScreen() {
  let bootLines = [
    ".", ".", ".",
    ".", ".", ".",
    ".", ".", ".",
    "Hi.", ".", ".",
    ".", ".", ".",
    "Would you like to play a game?",
    ".", ".", ".",
    ".",".","I hope so.",
    "This is a little toy.",
    "It doesn't do much, but I learned quite a lot making it.",
    ".", ".", "...",
    "Please be gentle with it.",
    "But don't forget to have fun!",".",
    "A is for ATTACK!"
  ]
  
  let i = 0;
  let go = setInterval(function () {
    print(bootLines[i]);
    i++;
    if (i >= bootLines.length) { clearInterval(go) }
  },150);
} // needs to be refactored into multiple funcs. some elements are using hardcoded values, need to replace with variables.

function screenFlash() {
  textLog.element.classList.add("screenFlash");
  setTimeout(function (){
    textLog.element.classList.remove("screenFlash");
  },100);
} // causes a jump in visible area of the textLog element. might be able to fix by having the class reset transition time to 0 and apply it to the background color rather than the textlog.

// * * * COMBAT DEMO * * *
function attack() {
  screenFlash();
  
  // let's gooo!
  if (game.running) {
    enemy.hp -= Math.floor(player.damage * (Math.random() + 0.5));
    if (enemy.hp > 0){
      player.hp -= enemy.damage;
    }
    write(1, " HP: " + player.hp)
    write(6, enemy.name + " (HP: " + enemy.hp + ")");
    if(enemy.hp <= 0) {
      write(6,"They died!");
      write(3,".");
    }
  }
  
  
  // is this the attack that starts the game?
  if (!game.running) {
    // prepare the screen using writes. stats and player communication
    game.running = true;
    clearScreen();
    write(0, player.name );
    write(1, " HP: " + player.hp)
    write(3, "An enemy " + enemy.name + " appears!")
    write(4, "Defend yourself!");
    write(6, enemy.name + " (HP: " + enemy.hp + ")");
  }
}



// You found Opulent Microfiber Gloves of the Mechanical Keyboard Warrior, +5 kpm and 14% accuracy



// * * * LOOK FOR THE HELPERS * * * 

function toggleClass(element, cssClass) {
  let lmnt = element;
  
  if(element.classList.contains(cssClass)){
    element.classList.remove(cssClass);
  } else {
    element.classList.add(cssClass);
  }
}
function arrayRotate(arr, reverse) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
  return arr;
}
