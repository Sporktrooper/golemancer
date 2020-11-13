// first: relax
// second: display version, because brackets is being screwy
//console.log('v1');
//notes
  // need to refactor device into a class (big pain)
  // added log, need to make things use it.

let gameContainer = document.querySelector('#gameContainer'),
//    gameClock = document.querySelector('#gameClock'),
    gameClock = setInterval(function(){tick()},5000),
    device = {
      frame: document.querySelector('#deviceFrame'),
      name: document.createElement('div'),
      summary: document.createElement('div'),
      bar: document.createElement('div'),
      details: document.createElement('div'),
      attributes: {
        power: { val: 10, element: document.createElement('p') },
        speed: { val: 500, element: document.createElement('p') },
        endurance: { val: 40, element: document.createElement('p') },
        durability: { val: 30, element: document.createElement('p') },
        maxDurability: { val: 30, element: document.createElement('p') },
      },
    },
    baseFillDuration = 0.3,
    resources = {
      element: document.querySelector('#resources'),
      rock: { qty: 0, element: document.createElement('p'), gatherRate: 1 },
      iron: { qty: 0, element: document.createElement('p') },
      sand: { qty: 0, element: document.createElement('p') },
      glass: { qty: 0, element: document.createElement('p') }
    },
    buttons = document.querySelector('#buttons');
//    grind10Rocks = document.createElement('div'),
//    repairDevice = document.createElement('div');

resources.rock.element.innerHTML = "Rocks: " + resources.rock.qty;
resources.element.appendChild(resources.rock.element);
resources.iron.element.innerHTML = "Iron: " + resources.iron.qty;
resources.sand.element.innerHTML = "Sand: " + resources.sand.qty;

device.name.innerHTML = "The Device";
device.name.id = "deviceName";
device.frame.appendChild(device.name);

device.summary.state = "semi-autonomous machine";
device.summary.capabilities = "capable of retrieving rocks."

device.summary.innerHTML = "A " + device.summary.state + " " + device.summary.capabilities;
device.summary.id = "deviceSummary";
device.frame.appendChild(device.summary);

device.bar.id = "deviceBar";
device.frame.appendChild(device.bar);
device.bar.inner = document.createElement('div');
device.bar.inner.id = 'deviceBarInner';
device.bar.appendChild(device.bar.inner);
device.bar.inner.style["animation-duration"] = (baseFillDuration * (100/device.attributes.speed.val)) + "s";
device.bar.inner.addEventListener('animationiteration', finishedWorkCycle);

device.details.id = "deviceDetails";
device.frame.appendChild(device.details);

device.attributes.elements = document.createElement('div');
device.details.appendChild(device.attributes.elements);

device.attributes.power.element.innerHTML = "Power: " + device.attributes.power.val;
device.attributes.elements.appendChild(device.attributes.power.element);
device.attributes.power.element.upgrade = document.createElement('span');
device.attributes.power.element.upgrade.classList.add('upgradeText');
device.attributes.power.element.upgrade.innerHTML = " Upgrade";
device.attributes.powerUpgradeCost = Math.round(device.attributes.power / 3);

device.attributes.speed.element.innerHTML = "Speed: " + device.attributes.speed.val;
device.attributes.elements.appendChild(device.attributes.speed.element);
device.attributes.speed.element.upgrade = document.createElement('span');
device.attributes.speed.element.upgrade.classList.add('upgradeText');
device.attributes.speed.element.upgrade.innerHTML = " Upgrade";
device.attributes.speedUpgradeCost = Math.round(device.attributes.speed.val / 3);

device.attributes.endurance.element.innerHTML = "Endurance: " + device.attributes.endurance.val;
device.attributes.elements.appendChild(device.attributes.endurance.element);

device.attributes.durability.element.innerHTML = "Durability: " + device.attributes.durability.val + " / " + device.attributes.maxDurability.val;
device.attributes.elements.appendChild(device.attributes.durability.element);




// ======================== BUTTONS =========================

class ActionButton {
  constructor(buttonText,clickAction,repeat) {
    this.element = document.createElement('div');
    this.element.classList.add('actionButton');
    this.elementFill = document.createElement('div');
    this.elementFill.classList.add('actionButtonFill');
    this.element.innerHTML = buttonText || "buttonText undefined";
    this.element.addEventListener('click', clickAction);
    
    this.element.inner = document.createElement('div');
    this.element.inner.classList.add('actionButtonFill');
    this.element.inner.filler = document.createElement('div');
    this.element.inner.filler.classList.add('actionButtonFillInner');
    if(!repeat == true) {
//      console.log('repeat was true')
      this.element.classList.add('oneTime');
      this.inUse;
    }
  }
  cycleTime(speedInMS){
    this.element.inner.filler.style["animation-duration"] = speedInMS + "ms";
  }
}

let grind10Rocks = new ActionButton('Grind 10 rocks',function() { do_grind10Rocks() },true);
function do_grind10Rocks() {
  if (resources.rock.qty >= 10) {
    removeResource("rocks",10);
    addResource("iron",1)
    if (sandHopper.inUse) {
      addResource("sand",1);
    }
  }
  if (grinderHopper.inUse && grinderHopper.jammed) {
    grind10Rocks.element.inner.filler.style["animation-play-state"] = "running";
    grind10Rocks.element.inner.filler.style["background-color"] = "blue";
  }
  
}

let smeltGlass = new ActionButton('Smelt glass (Costs 3 sand)', function() { do_smeltGlass() },true);

function do_smeltGlass() {
  if (resources.sand.qty >= 3 && sandHopper.inUse == true) {
    removeResource("sand",3);
    addResource("glass",1);
  }
}

let repairDevice = new ActionButton("Repair device using 1 iron.", function() { do_repairDevice() },true);

function do_repairDevice() {
  if (resources.iron.qty > 0 && device.attributes.durability.val < device.attributes.maxDurability.val) {
    removeResource("iron",1);
    modifyAttributes("durability",25);
    device.bar.inner.style["animation-duration"] = (baseFillDuration * (100/device.attributes.speed.val)) + "s";
  }
}

let sandHopper = new ActionButton("Use 3 iron to add a sand collector to the grinder", function() {
  if (resources.iron.qty >= 3) {
    removeResource("iron",3);
    buttons.removeChild(sandHopper.element);
    sandHopper.inUse = true;
    logWrite("You install the hopper and begin collecting sand.")
  }
});
sandHopper.inUse = false;

let rockCompartment = new ActionButton("Add a storage compartment to the device using 4 iron)",function() {
  if (resources.iron.qty >= 4) {
    removeResource("iron",4);
    modifyAttributes("power",device.attributes.power.val * 3);
    modifyAttributes("speed",-device.attributes.speed.val / 2)
    buttons.removeChild(rockCompartment.element);
    rockCompartment.inUse = true; 
    device.summary.capabilities.innerHTML = ""
    logWrite("The device repeatedly opens and closes the compartment door. You shoo it out of the workshop.");
  }
});
rockCompartment.inUse = false;

let lighterFrame = new ActionButton("Streamline the device. It becomes faster, but more fragile. (Costs 3 glass and 3 iron)",function(){
  if (resources.iron.qty >= 3 && resources.glass.qty >= 3) {
    removeResource("iron",3);
    removeResource("glass",3);
    modifyAttributes("speed",40);
    modifyAttributes("endurance",-15);
    buttons.removeChild(lighterFrame.element);
    lighterFrame.inUse = true;
    logWrite("You remove the 'unnecessary' components from the device. It moves more gracefully without the extra weight, but is more prone to damage.");
  }
});
lighterFrame.inUse = false;

let grinderHopper = new ActionButton("Install a hopper on top of the grinder. Automates rock grinding but it's prone to jamming. (Costs 10 iron and 5 glass)",function(){
  if (resources.iron.qty >= 10 && resources.glass.qty >= 5) {
    removeResource("iron",10);
    removeResource("glass",5);
    grind10Rocks.element.appendChild(grind10Rocks.element.inner);
    grind10Rocks.element.inner.appendChild(grind10Rocks.element.inner.filler);

    grind10Rocks.element.inner.filler.addEventListener('animationiteration', function() {
      do_grind10Rocks();
    });
    grinderHopper.inUse = true;
    buttons.removeChild(grinderHopper.element);
    logWrite("You attach the hopper and wait for it to inevitably jam.")
  }
});
grinderHopper.inUse = false;
grinderHopper.jammed = false;
grinderHopper.element.classList.add('oneTime');

// ===================== FUNCTIONS ========================

function tick() {
  if (device.attributes.durability.val == 0) {
    device.bar.inner.style["animation-duration"] = (10 * (100/device.attributes.speed.val)) + "s";
  }
//  checkForUpgrades();
  if(grinderHopper.inUse && !grinderHopper.jammed && Math.random() > 0.7) {
    grinderHopper.jammed = true;
    grind10Rocks.element.inner.filler.style["animation-play-state"] = "paused";
    grind10Rocks.element.inner.filler.style["background-color"] = "red";
    console.log('tried to pause grinder, did it work?');
  }
}
function finishedWorkCycle() {
  if (device.attributes.durability.val > 0) {
    if(Math.random() > (device.attributes.endurance.val/100)) {
      modifyAttributes('durability',-1)
    }
  }
   addResource("rocks", resources.rock.gatherRate * (device.attributes.power.val/10)); 
}

let log = document.querySelector("#log");
log.ul = document.createElement('ul')
log.appendChild(log.ul)
function logWrite(str) {
  let newLogEntry = document.createElement('li');
  newLogEntry.innerHTML = str;
  log.ul.appendChild(newLogEntry);
}

function addResource(type,qty) {
  switch (type) {
    case "rocks":
      if (resources.rock.qty >= 10 && !grind10Rocks.element.parentElement){
        buttons.appendChild(grind10Rocks.element);
      }
      resources.rock.qty += qty;
      resources.rock.element.innerHTML = "Rocks: " + resources.rock.qty;
      break;
    case "iron":
      resources.iron.qty += qty;
      resources.iron.element.innerHTML = "Iron: " + resources.iron.qty;
      displayUpgrade("iron");
      break;
    case "sand":
      if(resources.sand.qty == 0 && !resources.sand.element.parentNode) {
        resources.element.appendChild(resources.sand.element);
      }
      resources.sand.qty += qty;
      resources.sand.element.innerHTML = "Sand: " + resources.sand.qty;
      displayUpgrade("sand");
      break;
    case "glass":
      if(resources.glass.qty == 0 && !resources.glass.element.parentNode) {
        resources.element.appendChild(resources.glass.element)
      }
      resources.glass.qty += qty;
      resources.glass.element.innerHTML = "Glass: " + resources.glass.qty;
  }
}

function removeResource(type,qty) {
  switch (type) {
    case "rocks":
      resources.rock.qty -= qty;
      resources.rock.element.innerHTML = "Rocks: " + resources.rock.qty;
      break;
    case "iron":
      resources.iron.qty -= qty;
      resources.iron.element.innerHTML = "Iron: " + resources.iron.qty;
      break;
    case "sand":
      resources.sand.qty -= qty;
      resources.sand.element.innerHTML = "Sand: " + resources.sand.qty;
      break;
    case "glass":
      resources.glass.qty -= qty;
      resources.glass.element.innerHTML = "Glass: " + resources.glass.qty;
  }
}

function modifyAttributes(attribute,value) {
  switch (attribute) {
    case "power":
      device.attributes.power.val += value;
      device.attributes.power.element.innerHTML = "Power: " + device.attributes.power.val;
      break;
    case "speed":
      device.attributes.speed.val += value;
      device.attributes.speed.element.innerHTML = "Speed: " + device.attributes.speed.val;
      device.bar.inner.style["animation-duration"] = (baseFillDuration * (100/device.attributes.speed.val)) + "s";
      break;
    case "endurance":
      device.attributes.endurance.val += value;
      device.attributes.endurance.element.innerHTML = "Endurance: " + device.attributes.endurance.val;
      break;
    case "durability":
      device.attributes.durability.val += value;
      if (device.attributes.durability.val > device.attributes.maxDurability.val) {
        device.attributes.durability.val = device.attributes.maxDurability.val;
      }
      device.attributes.durability.element.innerHTML = "Durability: " + device.attributes.durability.val + " / " + device.attributes.maxDurability.val;
      break;
    case "maxDurability":
      device.attributes.maxDurability.val += value;
      break;
  }
}

//function checkForUpgrades() {
//  if (resources.iron.qty >= device.attributes.powerUpgradeCost) {
//    device.attributes.power.element.upgrade.innerHTML = " Upgrade (Costs " + device.attributes.powerUpgradeCost + " iron)";
//    device.attributes.power.element.appendChild(device.attributes.power.element.upgrade);
//  }
//  if (resources.iron.qty >= device.attributes.speedUpgradeCost) {
//    device.attributes.speed.element.upgrade.innerHTML = " Upgrade (Costs " + device.attributes.speedUpgradeCost + " iron)";
//    device.attributes.speed.element.appendChild(device.attributes.speed.element.upgrade);
//  }
//  
//}

function displayUpgrade(resource) {
  switch (resource) {
    case "iron" :
      if(resources.iron.qty >= 0 && !resources.iron.element.parentNode) {
        resources.element.appendChild(resources.iron.element);
        buttons.appendChild(repairDevice.element);
      }
      if(resources.iron.qty >= 3 && sandHopper.inUse == false) {
        buttons.appendChild(sandHopper.element);
      }
      if(resources.iron.qty >= 5 && rockCompartment.inUse == false) {
        buttons.appendChild(rockCompartment.element);
      }
      if (resources.glass.qty >= 3 && resources.iron.qty >= 3 && !lighterFrame.inUse) {
        buttons.appendChild(lighterFrame.element);
      }
      if(resources.iron.qty >= 10 && resources.glass.qty >= 5 && !grinderHopper.inUse) {
        buttons.appendChild(grinderHopper.element);
      }
      break;
    case "sand":
      if (resources.sand.qty >= 3 && !smeltGlass.element.parentElement) {
        buttons.appendChild(smeltGlass.element);
      }
      break;
    case "glass":
      if (resources.glass.qty >= 3 && resources.iron.qty >= 3 && !lighterFrame.inUse) {
        buttons.appendCHild(lighterFrame.element);
      }
  }
}