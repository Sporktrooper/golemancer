// quietly

//class ActionButton {
//  constructor(name, buttonText,clickAction,repeat) {
//    this.effect = clickAction;
//    this.element = document.createElement('div');
//    this.element.id = name;
//    this.element.classList.add('actionButton');
//    this.element.innerHTML = buttonText || "buttonText undefined";
//    this.element.addEventListener('click', () => {
//      if(!this.element.inner.parentElement) {
//        this.effect();
//      }
//      this.element.inner.filler.style["animation-play-state"] = "running";
//      if(!repeat == true) {
//        this.element.parentNode.removeChild(this.element);
//      }
//    });
//    
//    this.element.inner = document.createElement('div');
//    this.element.inner.classList.add('actionButtonFill');
//    this.element.inner.filler = document.createElement('div');
//    this.element.inner.filler.classList.add('actionButtonFillInner');
//    this.element.inner.appendChild(this.element.inner.filler);
//    this.element.inner.filler.style["animation-play-state"] = "paused";
//    this.element.inner.filler.addEventListener('animationiteration',() => {
//      this.effect();
//      if(!repeat) {
//       this.element.inner.filler.style["animation-play-state"] = "paused"; 
//      }
//    })
//    if(!repeat == true) {
////      console.log('repeat was true')
//      this.element.classList.add('oneTime');
//      this.inUse;
//    }
//  }
//  cycleTime(speedInMS){
//    this.element.inner.filler.style["animation-duration"] = speedInMS + "ms";
//  }
//  hasDuration(state) {
//    this.element.appendChild(this.element.inner);
////    this.element.inner.filler.style["animation-iteration-count"] = 1;
////    this.element.addEventListener('click',() => {
////    })
////    this.
//  }
//  automaticRepeat(state) {
//    if(state == true) {
//      this.element.appendChild(this.element.inner);
//      this.element.inner.filler.style["animation-play-state"] = "running";
//      this.element.inner.filler.style["animation-iteration-count"] = "infinite";
//    } else {
//      this.element.inner.filler.style["animation-iteration-count"] = 1;
//    }
//  }
//}

class Entity {
  constructor() {
    this.globalFrame = document.createElement('div');
  }
  checkSuccess(odds) {
    if (Math.random() < odds) {
        return true;
      } else {
        return false;
      }
  }
}

class Golemancer extends Entity {
  constructor() {
    super();
    this.attributes = {
      age: 0,
    }
    this.skills = {
      construction: 0,
      vision: 0,
      execution: 0
    }
  }
}

class Device extends Entity {
  constructor(creator) {
    super();
    this._attributes = { 
      power: 10 * creator.skills.construction,
      speed: 10 * creator.skills.vision,
      endurance: 10 * creator.skills.execution,
      durability: 30 + creator.skills.construction + creator.skills.vision + creator.skills.execution,
      maxDurability:  30 + creator.skills.construction + creator.skills.vision + creator.skills.execution,
    };
    this.skills = {
      execution: 0,
    };
    this.buttons = {};
    this.name = "Unnamed Device";
    this.elements = {};
    this.elements.attributes = document.createElement('div');
    this.elements.name = document.createElement('span');
    this.elements.name.innerHTML = this.name;
    this.elements.attributes.power = document.createElement('div');
    this.elements.attributes.speed = document.createElement('div')
    this.elements.attributes.endurance = document.createElement('div')
    this.elements.attributes.durability = document.createElement('div')
    this.elements.attributes.appendChild(this.elements.attributes.power);
    this.elements.attributes.appendChild(this.elements.attributes.speed);
    this.elements.attributes.appendChild(this.elements.attributes.endurance);
    this.elements.attributes.appendChild(this.elements.attributes.durability);
    this.elements.attributes.power.innerHTML = "Power: " + this._attributes.power;
    this.elements.attributes.speed.innerHTML = "Speed: " + this._attributes.speed;
    this.elements.attributes.endurance.innerHTML = "Endurance: " + this._attributes.endurance;
    this.elements.attributes.durability.innerHTML = "Durability: " + this._attributes.durability + " / " + this._attributes.maxDurability;
    this.elements.log = document.createElement('div');
    this.elements.log.classList.add("log")
    this.elements.log.ul = document.createElement('ul');
    this.elements.log.appendChild(this.elements.log.ul);
    
    this.elements.actionButtons = document.createElement('div');
    this.globalFrame.appendChild(this.elements.name);
    this.globalFrame.appendChild(this.elements.attributes);
    this.globalFrame.appendChild(this.elements.log);
    this.globalFrame.appendChild(this.elements.actionButtons);
  }
  get power() {
    return this._attributes.power;
  }
  writeLog(str) {
    let newLogEntry = document.createElement('li');
    newLogEntry.innerHTML = str;
    this.elements.log.ul.appendChild(newLogEntry);
    this.elements.log.scrollTop = this.elements.log.scrollHeight;
  }
  addActionButton(name, text, effect, repeat, duration) {
    let newButton = new ActionButton(name, text, effect, repeat, duration);
    newButton.parent = this;
//    this.elements.actionButtons.appendChild(newButton.element);
    this.buttons[name] = newButton;
    if(duration != undefined) {
      newButton.hasDuration(true);
    }
  }
  attachButton(actionButton) {
    actionButton.parent.elements.actionButtons.appendChild(actionButton.element)
  }
  modifyAttributes(attr,val) {
    this._attributes[attr] += val;  
    
    switch (attr) {
      case "durability":
        this.elements.attributes.durability.innerHTML = "Durability: " + this._attributes["durability"] + " / " + this._attributes.maxDurability;
        break;
      case "endurance":
        this.elements.attributes.endurance.innerHTML = "Endurance: " + this._attributes["endurance"];
    }
  }
}

//let golemancer = new Golemancer();
//golemancer.skills.construction = 1;
//golemancer.skills.vision = 1;
//golemancer.skills.execution = 1;
//console.log(golemancer);
//let device = new Device(golemancer);
//console.log(device);
//
//document.querySelector('#gameContainer').appendChild(device.globalFrame)
//
//device.addActionButton('test','test button',function() {
//  device.writeLog('test button pressed');
//},true)
//
//device.addActionButton('repeat-test',"Make test button repeat",function() {
//  device.buttons["test"].automaticRepeat(true);
//},false);