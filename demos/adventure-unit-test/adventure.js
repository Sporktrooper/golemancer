let gameContainer = document.querySelector('#gameContainer'),
//    gameClock = document.querySelector('#gameClock'),
    gameClock = setInterval(function(){tick()},1000),
    unitFrame = document.querySelector('#unitFrame'),
    unitName = document.createElement('div'),
    unitSummary = document.createElement('div'),
    unitBar = document.createElement('div'),
    unitDetails = document.createElement('div'),
    baseFillDuration = 1,
    unitAttributes = {
      power: 100,
      speed: 50,
      endurance: 40,
      durability: 35,
      maxDurability: 35,
    },
    resources = document.querySelector('#resources'),
    buttons = document.querySelector('#buttons'),
    grind10Rocks = document.createElement('div'),
    repairDevice = document.createElement('div'),
    unitActionHistory;

//gameClock.addEventListener('animationiteration',function() {
//  console.log('tick');
//});

let rocks = document.createElement('p');
rocks.qty = 0;
rocks.innerHTML = "Rocks: " + rocks.qty;
resources.appendChild(rocks);

let iron = document.createElement('p');
iron.qty = 0;
iron.innerHTML = "Iron: " + iron.qty;

unitName.innerHTML = "The Device";
unitName.id = "unitName";
unitFrame.appendChild(unitName);

unitSummary.innerHTML = "A semi-autonomous bipedal machine capable of retrieving rocks.";
unitSummary.id = "unitSummary";
unitFrame.appendChild(unitSummary);

//unitBar.innerHTML = "Bar placeholder";
unitBar.id = "unitBar";
unitFrame.appendChild(unitBar);
unitBar.inner = document.createElement('div');
unitBar.inner.id = 'unitBarInner';
unitBar.appendChild(unitBar.inner);
unitBar.inner.style["animation-duration"] = (baseFillDuration * (100/unitAttributes.speed)) + "s";
unitBar.inner.addEventListener('animationiteration', finishedWorkCycle);

unitDetails.id = "unitDetails";
unitFrame.appendChild(unitDetails);

unitAttributes.elements = document.createElement('div');
unitDetails.appendChild(unitAttributes.elements);

unitAttributes.elements.power = document.createElement('p');
unitAttributes.elements.power.innerHTML = "Power: " + unitAttributes.power;
unitAttributes.elements.appendChild(unitAttributes.elements.power);

unitAttributes.elements.speed = document.createElement('p');
unitAttributes.elements.speed.innerHTML = "Speed: " + unitAttributes.speed;
unitAttributes.elements.appendChild(unitAttributes.elements.speed);

unitAttributes.elements.endurance = document.createElement('p');
unitAttributes.elements.endurance.innerHTML = "Endurance: " + unitAttributes.endurance;
unitAttributes.elements.appendChild(unitAttributes.elements.endurance);

unitAttributes.elements.durability = document.createElement('p');
unitAttributes.elements.durability.innerHTML = "Durability: " + unitAttributes.durability + " / " + unitAttributes.maxDurability;
unitAttributes.elements.appendChild(unitAttributes.elements.durability);



grind10Rocks.classList.add('actionButton');
grind10Rocks.innerHTML = "Grind 10 rocks";
grind10Rocks.addEventListener('click',function() {
  if (rocks.qty >= 10) {
    removeResource("rocks",10);
    addResource("iron",1)
  }
});

repairDevice.classList.add('actionButton');
repairDevice.innerHTML = "Repair device (Costs 1 iron, restores 25 Durability)"
repairDevice.addEventListener('click', function() {
  if (iron.qty > 0 && unitAttributes.durability < unitAttributes.maxDurability) {
    removeResource("iron",1);
    modifyAttributes("durability",25);
  }
});

let sandHopper = document.createElement('div');
sandHopper.inUse = false;
sandHopper.classList.add('actionButton');
sandHopper.innerHTML = "Construct a hopper for the grinder to collect sand (Costs 5 iron)";

function tick() {
  if(iron.qty >= 5 && sandHopper.inUse == false) {
    buttons.appendChild(sandHopper);
    sandHopper.inUse = true;
  }
}
function finishedWorkCycle() {
  if (unitAttributes.durability > 0) {
   addResource("rocks",1); 
    if(Math.random() > (unitAttributes.endurance/100)) {
      modifyAttributes('durability',-1)
    }
  }
}

function addResource(type,qty) {
  switch (type) {
    case "rocks":
      if (rocks.qty == 10 && !grind10Rocks.parentElement){
        buttons.appendChild(grind10Rocks);
      }
      rocks.qty += qty;
      rocks.innerHTML = "Rocks: " + rocks.qty;
      break;
    case "iron" :
      if(iron.qty == 0) {
        resources.appendChild(iron);
        buttons.appendChild(repairDevice);
      }
      iron.qty += qty;
      iron.innerHTML = "Iron: " + iron.qty;
      break;
  }
}

function removeResource(type,qty) {
  switch (type) {
    case "rocks":
      rocks.qty -= qty;
      rocks.innerHTML = "Rocks: " + rocks.qty;
      break;
    case "iron":
      iron.qty -= qty;
      iron.innerHTML = "Iron: " + iron.qty;
      break;
  }
}

function modifyAttributes(attribute,value) {
  switch (attribute) {
    case "power":
      unitAttributes.power += value;
      unitAttributes.elements.power.innerHTML = "Power: " + unitAttributes.power;
      break;
    case "speed":
      unitAttributes.speed += value;
      unitAttributes.elements.speed.innerHTML = "Speed: " + unitAttributes.speed;
      break;
    case "endurance":
      unitAttributes.endurance += value;
      unitAttributes.elements.endurance.innerHTML = "Endurance: " + unitAttributes.endurance;
      break;
    case "durability":
      unitAttributes.durability += value;
      if (unitAttributes.durability > unitAttributes.maxDurability) {
        unitAttributes.durability = unitAttributes.maxDurability;
      }
      unitAttributes.elements.durability.innerHTML = "Durability: " + unitAttributes.durability + " / " + unitAttributes.maxDurability;
      break;
    case "maxDurability":
      unitAttributes.maxDurability += value;
      break;
  }
}