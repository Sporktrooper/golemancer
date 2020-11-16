// first: relax
// second: display version, because brackets is being screwy
//console.log('v1');
//notes
  // need to refactor device into a class (big pain)
  // added log, need to make things use it.


let gameContainer = document.querySelector('#gameContainer'),
    gameClock = setInterval(function(){tick()},5000),
    baseFillDuration = 0.3,
    device = new Device(),
    buttons = document.querySelector('#buttons'),
    sinceLastEvent = 0;

document.querySelector('#slot1-deviceFrame').appendChild(device.frame);

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

let rockCompartment = new ActionButton("Add a storage compartment to the device using 4 iron.",function() {
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
//grinderHopper.element.classList.add('oneTime');

let deviceGlassSeals = new ActionButton("Use 5 glass to seal the device's machinery.",function(){
  if (resources.glass.qty >= 5 && lighterFrame.inUse == true) {
    deviceGlassSeals.inUse = true;
    device.attributes.endurance += 10;
    logWrite("You install glass plates in the gaping holes left behind after removing excess weight. Bonus, you can still see the machinery working.");
  }
});
deviceGlassSeals.inUse = false;

// ===================== FUNCTIONS ========================

function tick() {
  console.log('tick');
  if (device.attributes.durability.val <= 0) {
    device.bar.inner.style["animation-duration"] = (10 * (100/device.attributes.speed.val)) + "s";
  }
  if(grinderHopper.inUse && !grinderHopper.jammed && Math.random() > 0.7) {
    grinderHopper.jammed = true;
    grind10Rocks.element.inner.filler.style["animation-play-state"] = "paused";
    grind10Rocks.element.inner.filler.style["background-color"] = "red";
  }
}
function finishedWorkCycle() {
  if (device.attributes.durability.val > 0) {
    if(Math.random() > (device.attributes.endurance.val/100)) {
      modifyAttributes('durability',-1)
    }
  }
   addResource("rocks", resources.rock.gatherRate * (device.attributes.power.val/10)); 
  if (Math.random() < 0.05 && sinceLastEvent >= 30) {
    fireEvent();
    console.log("Event firing at " + sinceLastEvent)
    sinceLastEvent = 0;
  }
//  console.log(sinceLastEvent);
  sinceLastEvent++;
}

let log = document.querySelector("#log");
log.ul = document.createElement('ul')
log.appendChild(log.ul)
function logWrite(str) {
  let newLogEntry = document.createElement('li');
  newLogEntry.innerHTML = str;
  log.ul.appendChild(newLogEntry);
  log.scrollTop = log.scrollHeight;
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
      if (device.attributes.durability.val < 0) {
        device.attributes.durability.val = 0;
      }
      device.attributes.durability.element.innerHTML = "Durability: " + device.attributes.durability.val + " / " + device.attributes.maxDurability.val;
      break;
    case "maxDurability":
      device.attributes.maxDurability.val += value;
      break;
  }
}

function fireEvent() {
  eventIndex = Math.floor(Math.random() * eventList.length);
//  logWrite(eventList[eventIndex].description);
  eventList[eventIndex]();
}

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
        buttons.appendChild(lighterFrame.element);
      }
      if (resources.glass.qty >= 5 && lighterFrame.inUse == true) {
        buttons.appendChild(deviceGlassSeals.element);
      }
  }
}

logWrite("The device whirs to life. It stomps out of the workshop and begins collecting rocks.")