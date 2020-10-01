class ProgressBar {
  constructor(parent) {
    this.obj = this;
    this._parentElement = parent || null;
    // create the top level div for the progress bar
    this.box = document.createElement("div");
    this.box.classList.add("line", "flex-container", "box");
    if (parent != null) {
      document.querySelector(parent).appendChild(this.box);
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
    document.querySelector(parent).appendChild(this.box);
  }
  get parentElement() {
    return this._parentElement;
  }
  
  // Methods
  fill() {
    this.bar.classList.toggle("full");
    console.log("heeee");
  }
  register() {
    this.box.button.addEventListener("click",function (){
      console.log("yee");
    });
  }
}