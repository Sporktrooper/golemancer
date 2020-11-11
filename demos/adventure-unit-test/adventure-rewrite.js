let gameContainer = document.querySelector('#gameContainer'),
//    gameClock = document.querySelector('#gameClock'),
    gameClock = setInterval(function(){tick()},1000),
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
    baseFillDuration = 1,
    resources = {
      element: document.querySelector('#resources'),
      rock: { qty: 0, element: document.createElement('p') },
      iron: { qty: 0, element: document.createElement('p') },
      sand: { qty: 0, element: document.createElement('p') }
    },
    buttons = document.querySelector('#buttons'),
    grind10Rocks = document.createElement('div'),
    repairDevice = document.createElement('div');

resources.rock.element.innerHTML = "Rocks: " + resources.rock.qty;
resources.element.appendChild(resources.rock.element);
resources.iron.element.innerHTML = "Iron: " + resources.iron.qty;
resources.sand.element.innerHTML = "Sand: " + resources.sand.qty;

device.name.innerHTML = "The Device";
device.name.id = "deviceName";
device.frame.appendChild(device.name);

device.summary.innerHTML = "A semi-autonomous bipedal machine capable of retrieving rocks.";
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

class Button {
  constructor(buttonText,clickAction) {
    this.element = document.createElement('div');
    this.element.classList.add('actionButton');
    this.element.innerHTML = buttonText || "buttonText undefined";
    this.element.addEventListener('click', clickAction);
  }
}

grind10Rocks.classList.add('actionButton');
grind10Rocks.innerHTML = "Grind 10 rocks";
grind10Rocks.addEventListener('click',function() {
  if (resources.rock.qty >= 10) {
    removeResource("rocks",10);
    addResource("iron",1)
    if (sandHopper.inUse) {
      addResource("sand",1);
    }
  }
});

repairDevice.classList.add('actionButton');
repairDevice.innerHTML = "Repair device (Costs 1 iron, restores 25 Durability)"
repairDevice.addEventListener('click', function() {
  if (resources.iron.qty > 0 && device.attributes.durability.val < device.attributes.maxDurability.val) {
    removeResource("iron",1);
    modifyAttributes("durability",25);
    device.bar.inner.style["animation-duration"] = (baseFillDuration * (100/device.attributes.speed.val)) + "s";
  }
});

let sandHopper = document.createElement('div');
sandHopper.inUse = false;
sandHopper.classList.add('actionButton');
sandHopper.innerHTML = "Install a hopper to collect sand from the grinder. (Costs 5 iron)";
sandHopper.addEventListener('click',function() {
  if (resources.iron.qty >= 5) {
    removeResource("iron",5);
    buttons.removeChild(sandHopper);
    sandHopper.inUse = true;
  }
})


// ===================== FUNCTIONS ========================

function tick() {
  if(resources.iron.qty >= 5 && sandHopper.inUse == false) {
    buttons.appendChild(sandHopper);
  }
  if (device.attributes.durability.val == 0) {
    device.bar.inner.style["animation-duration"] = (10 * (100/device.attributes.speed.val)) + "s";
  }
  checkForUpgrades();
}
function finishedWorkCycle() {
  if (device.attributes.durability.val > 0) {
    if(Math.random() > (device.attributes.endurance.val/100)) {
      modifyAttributes('durability',-1)
    }
  }
   addResource("rocks",device.attributes.power.val/10); 
}

function addResource(type,qty) {
  switch (type) {
    case "rocks":
      if (resources.rock.qty >= 10 && !grind10Rocks.parentElement){
        buttons.appendChild(grind10Rocks);
      }
      resources.rock.qty += qty;
      resources.rock.element.innerHTML = "Rocks: " + resources.rock.qty;
      break;
    case "iron" :
      if(resources.iron.qty == 0) {
        resources.element.appendChild(resources.iron.element);
        buttons.appendChild(repairDevice);
      }
      resources.iron.qty += qty;
      resources.iron.element.innerHTML = "Iron: " + resources.iron.qty;
      break;
    case "sand" :
      if(resources.sand.qty == 0) {
        resources.element.appendChild(resources.sand.element);
      }
      resources.sand.qty += qty;
      resources.sand.element.innerHTML = "Sand: " + resources.sand.qty;
      break;
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
  }
}

function modifyAttributes(attribute,value) {
  switch (attribute) {
    case "power":
      device.attributes.power += value;
      device.attributes.power.element.innerHTML = "Power: " + device.attributes.power;
      break;
    case "speed":
      device.attributes.speed += value;
      device.attributes.speed.element.innerHTML = "Speed: " + device.attributes.speed;
      device.bar.inner.style["animation-duration"] = (baseFillDuration * (100/device.attributes.speed)) + "s";
      break;
    case "endurance":
      device.attributes.endurance += value;
      device.attributes.endurance.element.innerHTML = "Endurance: " + device.attributes.endurance;
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

function checkForUpgrades() {
  if (resources.iron.qty >= device.attributes.powerUpgradeCost) {
    device.attributes.power.element.upgrade.innerHTML = " Upgrade (Costs " + device.attributes.powerUpgradeCost + " iron)";
    device.attributes.power.element.appendChild(device.attributes.power.element.upgrade);
  }
  if (resources.iron.qty >= device.attributes.speedUpgradeCost) {
    device.attributes.speed.element.upgrade.innerHTML = " Upgrade (Costs " + device.attributes.speedUpgradeCost + " iron)";
    device.attributes.speed.element.appendChild(device.attributes.speed.element.upgrade);
  }
}

function displayUpgrade(attribute) {
  switch (attribute) {
    case "power" :
      
      break;
  }
}