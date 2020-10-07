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
      console.log(this);
    }
    this.elements = {
      frame: document.createElement('div'),
      descriptionBox: document.createElement('div'),
      slot: this.slot._element,
      name: document.createElement('p'),
      description: document.createElement('p'),
    }
    this.elements.name.innerHTML = this.name;
    this.elements.description.innerHTML = this.description;
    
    this.elements.descriptionBox.classList.add('descriptionBox');
    this.elements.slot.classList.add('slot');
    this.elements.frame.classList.add('workLocFrame');
    this.elements.name.classList.add('descriptionBoxP')
    this.elements.description.classList.add('descriptionBoxP')
    
    this.elements.frame.appendChild(this.elements.slot);
    this.elements.frame.appendChild(this.elements.descriptionBox);
    
    this.elements.descriptionBox.appendChild(this.elements.name);
    this.elements.descriptionBox.appendChild(this.elements.description);
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
  }
  energyChange(val) {
    this.energy += val;
    this.elements.energyStatus.innerHTML = this.energy + '/' + this.energyMax;
  }
  set parent(newParent) {
    newParent.appendChild(this._element);
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
  points.valueElement.innerHTML = points._value;
}
points.changePoints(0);
points.titleElement.innerHTML = 'Points: ';
points.holderElement.appendChild(points.titleElement);
points.holderElement.appendChild(points.valueElement);
points.holderElement.classList.add('points');
gameContainer.appendChild(points.holderElement);


// create slot/item observer
let obs = new SlotItemObserver(gameContainer);

// set up work locations


// -- charging dock
let chargeLoc = new WorkLocation();
chargeLoc.parent = gameContainer;
chargeLoc.name = 'Charging Dock'
chargeLoc.description = "Recharges a worker's batteries at a rate of 1/sec.";
chargeLoc.slot.effect = function() {
  if (this.occupant.energy < this.occupant.energyMax) {
    this.occupant.energyChange(1);
  }
}
obs.addSlot(chargeLoc.slot);

// -- point grinder
let workLoc = new WorkLocation();
workLoc.parent = gameContainer;
workLoc.name = 'Point Grinder'
workLoc.description = "Turns energy into points a rate of 1/sec.";
workLoc.slot.effect = function() {
  if (this.occupant) {
    if (this.occupant.energy > 0) {
    this.occupant.energyChange(-1);
    points.changePoints(1);
    }
  }
}
obs.addSlot(workLoc.slot);

// set up worker
let worker = new Worker();
worker.location = chargeLoc.slot;
worker.parent = chargeLoc.slot._element
worker.effectOnSlot = function(slot) {
chargeLoc.slot.occupant = worker;
}
chargeLoc.slot.occupant = worker;
obs.addItem(worker);

obs.intervalStart()