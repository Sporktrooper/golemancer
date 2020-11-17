class ProgressBar {
  constructor(parent) {
    this._parentElement = parent || null;
    // create the top level div for the progress bar
    this.box = document.createElement("div");
    this.box.classList.add("line", "box");
    
      document.querySelector(parent).appendChild(this.box);
      console.log(this.parent);
    
    
    this.box.barHolder = document.createElement("div");
    this.box.barHolder.classList.add("bar-holder");
    
    this.bar = document.createElement("div");
    this.bar.classList.add("bar");
    
    this.box.button = document.createElement("button");
    this.box.button.classList.add("barButton");
    this.box.button.innerHTML = "+";
    
    this.box.appendChild(this.box.button);
    this.box.appendChild(this.box.barHolder);
    this.box.barHolder.appendChild(this.bar);
    this.box.button.addEventListener("click",e => this.fill())
    this.bar.addEventListener("animationend",e => this.finished())
  }
  
  // Accessors
  set parentElement(parent) {
    this._parentElement = parent;
    document.querySelector(parent).appendChild(this.box);
  }
  get parentElement() {
    return this._parentElement;
  }
  
  // Methods
  fill() {
    this.bar.classList.add("full");
  }
  finished() {
    this.bar.classList.remove("full")
    console.log("what should I do when " + this.bar + " is finished?");
  }
}