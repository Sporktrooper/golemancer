'use strict'

class WorkLocation {
  constructor(name,description,cycleTime) {
    // Name the work location
    this.name = name;
    this.slot = new DragSlot();
    this.description = description;
    this.effect = function () { 
      // override after instantiating
    }
    this.cycleTime = cycleTime;
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
}

let slotTest = document.querySelector("#slotTest");
let wlctest = new WorkLocation("test bench","a bench made for testing",1000);
slotTest.appendChild(wlctest.elements.frame);

let updateCycle = 1000;

let main = document.querySelector('#gameContainer');

let productionSlots = new Array();
let productionTools = new Array();
let chargingDock = {
  description: "<p>Charging Dock</p><p>Recharges the worker at a steady rate.</p>",
}
let pointMakerSlot = {
  description: "<p>Point Grinder</p><p>Turns energy into points.</p>"
}

let points = {
  _element: document.createElement('p'),
}
points._element.innerHTML = "Points: ";
points.value = {
  qty: 0,
  _element: document.createElement('span'),
  update: function() {
    points.value._element.innerHTML = points.value.qty;
  }
}
points.value._element.innerHTML = points.value.qty;
points._element.appendChild(points.value._element)
points._element.style.position = "absolute";
points._element.style.bottom = 0;
main.appendChild(points._element);

productionSlots.element = document.querySelector("#productionSlots");


productionSlots.push(new DragSlot());
productionSlots.push(new DragSlot());

for (let i = 0; i < productionSlots.length; i++) {
//  productionSlots.element.appendChild(productionSlots[i]._element);
  let toolbox = document.createElement('div');
  toolbox.classList.add('tools');
  toolbox.id = "tools-" + i;
//  productionSlots.element.appendChild(toolbox);
  productionTools.push(toolbox);
}



let worker = new DragItem();
worker.energyMax = 10;
worker.energy = worker.energyMax;
worker._element.style.textAlign = "center";
worker._element.innerHTML = 
  "<p>Worker</p>" 
  + "<p>"
  + worker.energy
  + " / "
  + worker.energyMax
  + "</p>";
wlctest.elements.slot.appendChild(worker._element);
productionTools[0].innerHTML = chargingDock.description;
productionTools[1].innerHTML = pointMakerSlot.description;

worker.updateEnergy = function() {
  worker._element.innerHTML = 
  "<p>Worker</p>" 
  + "<p>"
  + worker.energy
  + " / "
  + worker.energyMax
  + "</p>";
}

let workerWatcher = setInterval(function() {
    if (productionSlots[0]._element.firstChild) {
      if (worker.energy < worker.energyMax) {
        worker.energy += 1;
        worker.updateEnergy();
      }
    } else if (productionSlots[1]._element.firstChild) {
      if (worker.energy > 0) {
        worker.energy -= 1;
        worker.updateEnergy();
        points.value.qty += 1;
        points.value.update();
      }
    } else {
      console.log("something weird happened with the worker location");
    }
},updateCycle);