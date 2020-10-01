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
  productionSlots.element.appendChild(productionSlots[i]._element);
  let toolbox = document.createElement('div');
  toolbox.classList.add('tools');
  toolbox.id = "tools-" + i;
  productionSlots.element.appendChild(toolbox);
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
productionSlots[0]._element.appendChild(worker._element);
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