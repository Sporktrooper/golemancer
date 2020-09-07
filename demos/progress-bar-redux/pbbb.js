// new idea to prototype sometime -
  // mix alchemical ingredients to make a color of potion that is then added (hex or rgb-wise) to the color of an element masking a new progress bar or other toy

var bar = document.querySelector("#bar-holder1");
    bar.b1 = bar.querySelector("#bar1");
var button1 = document.querySelector("#button1");

function fill() {
  bar.b1.className = "bar full"
}



bar.b1.addEventListener("animationend",function() {
  this.className = "bar empty";
  pings++;
},false);
button1.addEventListener("click",function() {
  fill();
},false);

var pings = 0;

function debugBorder(element) {
  if (!element) {
    var debuggeds = document.querySelectorAll(".debug");
    debuggeds.forEach(
    function(currentValue) {
      currentValue.classList.toggle("debug");
    });
  } else {
    
  }
  
}

var builtBar = {};

// create a new bar with container and background.
// made in 3 layers:
//    1. box: holds the button and the barHolder
//    2. barHolder: the progress bar in its inactive state
//    3. the bar itself, which expands across the 
builtBar.box = document.createElement("div");
document.body.appendChild(builtBar.box);
builtBar.box.classList.add("line","flex-container","box");

builtBar.box.button = document.createElement("button");
builtBar.box.button.classList.add("barButton");
builtBar.box.button.innerHTML = "+";

builtBar.box.appendChild(builtBar.box.button);

builtBar.box.barHolder = document.createElement("div");
builtBar.box.appendChild(builtBar.box.barHolder);
builtBar.box.barHolder.classList.add("bar-holder");

builtBar.bar = document.createElement("div");
builtBar.box.barHolder.appendChild(builtBar.bar);
builtBar.bar.classList.add("bar","empty");

builtBar.box.button.addEventListener("click",function () {
  builtBar.bar.classList.toggle("full");
});

class ProgressBar {
  constructor(parent) {
    this._parentElement = parent || null;
    // create the top level div for the progress bar
    this.box = document.createElement("div");
    this.box.classList.add("line", "flex-container", "box");
    if (parent != null) {
      document.querySelector("#" + parent).appendChild(this.box);
    }
    
    this.box.barHolder = document.createElement("div");
    this.box.barHolder.classList.add("bar-holder");
    
    this.bar = document.createElement("div");
    this.bar.classList.add("bar","full");
    
    this.box.button = document.createElement("button");
    this.box.button.classList.add("barButton");
    this.box.button.innerHTML = "+";
    
    this.box.appendChild(this.box.button);
    this.box.appendChild(this.box.barHolder);
    this.box.barHolder.appendChild(this.bar);
    
  }
  
  // Accessors
  set parentElement(parent) {
    this._parentElement = parent;
    document.querySelector("#" + parent).appendChild(this.box);
  }
  get parentElement() {
    return this._parentElement;
  }
  
  // Methods
  fill() {
    this.bar.classList.toggle("full");
    console.log("heeee");
  }
  
}

var builtBar = new ProgressBar();