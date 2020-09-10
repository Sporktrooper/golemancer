var buttons = new Array();
  buttons[0] = document.querySelector("#previous");
  buttons[1] = document.querySelector("#next");

var logBox = {}
logBox.log = document.querySelector("#logEntries")
logBox.write = function(str) {
  let newElement = document.createElement("li");
  let log = document.querySelector("#log");
  let logEntries = document.querySelector("#logEntries");
  
  newElement.innerHTML = str || " ";
  logEntries.appendChild(newElement);
  log.scrollTop = log.scrollHeight;
}
  
var outerI = 0; // laziness

buttons[1].addEventListener("click",function (){
  if(outerI >= 0 && outerI < story.length) {
    logBox.write(story[outerI]);
    outerI++;
  } else {
    outerI = 0;
    logBox.write(story[outerI]);
    outerI++;
  }
});

buttons[0].addEventListener("click",function (){
logBox.write(story[outerI]);
  outerI--;
});

var story = new Array();

story = [
  "The Horadrim rose in the East to meet the threat of the invading forces of Hell.",
  "The Arch-Angel Tyrael championed for humanity among his brethren.",
  "Griswald the Blacksmith gave his life to keep his shop open to support the heroes who came to stop Diablo.",
  "The Traitor Adria, may she rot, may have been a greater evil than even Wirt."
];

