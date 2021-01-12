class ActionButton {
  constructor(name, buttonText,clickAction,repeat,duration) {
    this.effect = clickAction;
    this.autoRepeat = false;
    this.canRun = true;
    this.element = document.createElement('div');
    this.element.id = name;
    this.element.classList.add('actionButton');
    this.element.innerHTML = buttonText || "buttonText undefined";
    this.element.addEventListener('click', () => {
      if(this.canRun == true) {
        console.log('can run');
        this.element.inner.filler.style["animation-play-state"] = "running";
      }
      if(!this.element.inner.parentElement) {
        this.effect();
      }
//      this.element.inner.filler.style["animation-play-state"] = "running";
      if(!repeat == true) {
        this.element.parentNode.removeChild(this.element);
      }
    });
    
    this.element.inner = document.createElement('div');
    this.element.inner.classList.add('actionButtonFill');
    this.element.inner.filler = document.createElement('div');
    this.element.inner.filler.classList.add('actionButtonFillInner');
    this.element.inner.appendChild(this.element.inner.filler);
    this.element.inner.filler.style["animation-play-state"] = "paused";
    this.element.inner.filler.addEventListener('animationiteration',() => {
      this.effect();
      if(!this.autoRepeat) {
       this.element.inner.filler.style["animation-play-state"] = "paused"; 
      }
    })
    if(!repeat == true) {
//      console.log('repeat was true')
      this.element.classList.add('oneTime');
      this.inUse;
    }
    if(duration) {
      this.cycleTime(duration);
      this.hasDuration(true);
    }
  }
  fireEffect(costPaid,repeat) {
    if (costPaid) {
      this.element.inner.filler.style["animation-play-state"] = "running";
      if(!repeat == true) {
        this.element.parentNode.removeChild(this.element);
      }
    }
  }
  cycleTime(speedInMS){
    this.element.inner.filler.style["animation-duration"] = speedInMS + "ms";
  }
  hasDuration(state) {
    if(state == true) {
      this.element.appendChild(this.element.inner);
    } else {
      this.element.removeChild(this.element.inner);
    }
//    this.element.appendChild(this.element.inner);
//    this.element.inner.filler.style["animation-iteration-count"] = 1;
//    this.element.addEventListener('click',() => {
//    })
//    this.
  }
  automaticRepeat(state) {
    if(state == true) {
      this.element.appendChild(this.element.inner);
      this.element.inner.filler.style["animation-play-state"] = "running";
      this.element.inner.filler.style["animation-iteration-count"] = "infinite";
    } else {
      this.element.inner.filler.style["animation-iteration-count"] = 1;
    }
  }
}