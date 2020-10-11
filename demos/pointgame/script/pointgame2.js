'use strict'

class WorkLocation {
  constructor(name,description,cycleTime) {
    // Name the work location
    this._name = name;
    this.slot = new DragSlot();
    this.slot.parent = this;
    this._description = description;
    
    this.cycleTime = cycleTime || 1000;
    this.interval;
    
    this.effect = function() {
      this.slot.effect();
    }
    this.elements = {
      frame: document.createElement('div'),
      descriptionBox: document.createElement('div'),
      slot: this.slot._element,
      name: document.createElement('p'),
      description: document.createElement('p'),
      controls: document.createElement('div'),
    }
    this.elements.name.innerHTML = this.name;
    this.elements.description.innerHTML = this.description;
    
    this.elements.descriptionBox.classList.add('descriptionBox');
    this.elements.slot.classList.add('slot');
    this.elements.slot.obj = this;
    this.elements.frame.classList.add('workLocFrame');
    this.elements.name.classList.add('descriptionBoxP');
    this.elements.description.classList.add('descriptionBoxP');
    this.elements.controls.classList.add('controls');
    
    this.elements.frame.appendChild(this.elements.slot);
    this.elements.frame.appendChild(this.elements.descriptionBox);
    
    this.elements.descriptionBox.appendChild(this.elements.name);
    this.elements.descriptionBox.appendChild(this.elements.description);
    this.elements.descriptionBox.appendChild(this.elements.controls);
  }
  set name(newName) {
    this._name = newName;
    this.elements.name.innerHTML = this._name;
  }
  set description(newDescription) {
    this._description = newDescription;
    this.elements.description.innerHTML = this._description;
  }
  set parent(newParent) {
    newParent.appendChild(this.elements.frame);
  }
  
  
}

class Worker extends DragItem {
  constructor(name, energy) {
    super();
    this.name = name || 'Unnamed Worker';
    this.energyMax = energy || 10;
    this.energy = this.energyMax;
    this.elements = {
      name: document.createElement('p'),
      energyStatus: document.createElement('p')
    }
    this.elements.name.innerHTML = this.name;
    this.elements.energyStatus.innerHTML = this.energy + '/' + this.energyMax;
    
    this._element.appendChild(this.elements.name);
    this._element.appendChild(this.elements.energyStatus);
    this._element.classList.add('draggable');
    this.attributes = {
      strength: 1,
      endurance: 10,
    }
    this.attributes.strengthCost = Math.floor(this.attributes.strength * 1.6);
    this.attributes.enduranceCost = Math.floor(this.attributes.endurance * 0.6);
  }
  energyChange(val) {
    this.energy += val;
    this.elements.energyStatus.innerHTML = this.energy + '/' + this.energyMax;
  }
  set parent(newParent) {
    newParent.appendChild(this._element);
    newParent.obj.slot.occupant = this;
    
  }
}




// find the game container
let gameContainer = document.querySelector('#gameContainer');

// set up point counter
let points = {
  _value: 0,
  holderElement: document.createElement('p'),
  valueElement: document.createElement('span'),
  titleElement: document.createElement('span'),
}
points.changePoints = (pointsToSum) => {
  points._value += pointsToSum;
  points.valueElement.innerHTML = Math.floor(points._value);
}
points.changePoints(0);
points.titleElement.innerHTML = 'Points: ';
points.holderElement.appendChild(points.titleElement);
points.holderElement.appendChild(points.valueElement);
points.holderElement.classList.add('points');
gameContainer.appendChild(points.holderElement);


// create slot/item observer
//let obs = new SlotItemObserver(gameContainer);

let chargeLoc = new WorkLocation();
//obs.addSlot(chargeLoc.slot);
gameContainer.appendChild(chargeLoc.elements.frame);
chargeLoc.name = 'Charger';

let pointGrinderLoc = new WorkLocation();
//obs.addSlot(pointGrinderLoc.slot);
gameContainer.appendChild(pointGrinderLoc.elements.frame);
pointGrinderLoc.name = 'Grinder'

chargeLoc.slot.effect = function() {
  if (this.occupant.energy < this.occupant.energyMax) {
    this.occupant.energyChange(1);
  }
//  console.log('in the charger');
}

pointGrinderLoc.slot.effect = function() {
  if (this.occupant.energy > 0) {
    this.occupant.energyChange(-1);
    let workDoneInPoints = this.occupant.attributes.strength;
    points.changePoints(workDoneInPoints);
  }
//  console.log('in the grinder');
}

let worker = new Worker();
worker.parent = chargeLoc.elements.slot;
worker.location = chargeLoc.slot;


// < < <  ! ! ! interval ! ! !  > > >
let interval = setInterval(function() {
  worker.location.effect();
},1000)
// === === === === === === === === ===


let workshopLoc = new WorkLocation();
gameContainer.appendChild(workshopLoc.elements.frame);
workshopLoc.name = 'Workshop';
workshopLoc.slot.effect = function () {
//  console.log('in the workshop');
  this.parent.elements.controls.classList.add('open');
}

let controlPanel = document.createElement('div');
controlPanel.buttons = { button1: document.createElement('button'),
                       button2: document.createElement('button'),
                       button3: document.createElement('button'),
                       }
controlPanel.buttons.button1.innerHTML = 'Upgrade Strength (' + worker.attributes.strengthCost + ')';
controlPanel.buttons.button2.innerHTML = 'Upgrade Endurance (' + worker.attributes.enduranceCost + ')';
controlPanel.buttons.button3.innerHTML = 'Spend 10 points';
controlPanel.appendChild(controlPanel.buttons.button1);
//controlPanel.appendChild(controlPanel.buttons.button2);
//controlPanel.appendChild(controlPanel.buttons.button3);
workshopLoc.elements.controls.appendChild(controlPanel);

controlPanel.buttons.button1.addEventListener('click',(e) => {
  if (points._value > worker.attributes.strengthCost) {
    points.changePoints(-worker.attributes.strengthCost);
    worker.attributes.strength++;
    worker.attributes.strengthCost = worker.attributes.strengthCost*1.6;
    controlPanel.buttons.button1.innerHTML = 'Upgrade Strength (' + Math.ceil(worker.attributes.strengthCost) + ')';
  }
})
controlPanel.buttons.button2.addEventListener('click',(e) => {
  if (points._value > worker.attributes.enduranceCost) {
    points.changePoints(-worker.attributes.enduranceCost);
    worker.attributes.endurance++;
    if (worker.attributes.endurance % 5 == 0) {
      worker.energyMax++;
    }
  }
})
//controlPanel.buttons.button3.addEventListener('click',(e) => {
//  if (points._value > 0) {
//    points.changePoints(-10);
//  }
//})

let pbar = new ProgressBar();
