class ProgressBar {
  constructor(parent) {
    this._obj = this;
    this._parentElement = parent || null;
    // create the top level div for the progress bar
    this._element = document.createElement("div");
    this._element.classList.add("line", "flex-container", "box");
    if (parent != null) {
      parent.appendChild(this._element);
    }
    
    this._element.barHolder = document.createElement("div");
    this._element.barHolder.classList.add("bar-holder");
    
    this.bar = document.createElement("div");
    this.bar.classList.add("bar","full");
    
    this._element.appendChild(this._element.barHolder);
    this._element.barHolder.appendChild(this.bar);  
  }
  
  // Accessors
  set parentElement(parent) {
    this._parentElement = parent;
    parent.appendChild(this._element);
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
    this._element.button.addEventListener("click",function (){
      console.log("yee");
    });
  }
}

class ProgressBar2 {
  constructor(parent) {
    this._obj = this;
    this.parentElement = parent._element || null;
    this._elementOuter = document.createElement('div'); // the static-sized holder for the progress bar
    this._elementOuter.classList.add('barTest')
    this._elementInner = document.createElement('div'); // the dynamically sized progress bar
    this._elementOuter.appendChild(this._elementInner);
    this.parentElement.appendChild(this._elementOuter)
    this._elementOuter.addEventListener("click",() => {
      this._elementInner.classList.add('fill');
    });
    this._elementInner.addEventListener('animationend',() => {
      this._elementInner.classList.remove('fill');
      this.onFinish();
    });
  }
  onFinish() {
    console.log('Override onFinish() with the action that should be performed when this bar fills');
  }
}