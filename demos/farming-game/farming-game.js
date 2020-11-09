function Array2D(x, y) {
    var array2D = new Array(x);
    for(var i = 0; i < array2D.length; i++)
    {
        array2D[i] = new Array(y);
    }
    return array2D;
}

let gridSize = 3
let grid = new Array2D(gridSize,gridSize),
    rows = new Array(),
    mainPanel = document.querySelector('#mainPanel'),
    bottomPanel = document.querySelector('#bottomPanel');

for (let i = 0; i < grid.length; i++) {
  rows[i] = document.createElement('tr')
  for (let j = 0; j < grid.length; j++) {
    grid[i][j] = document.createElement('td');
    grid[i][j].addEventListener('click', function() {
      if (this.classList.contains('filled')) {
        reap(this); 
      } else {
        sow(this);
      }
    })
    rows[i].appendChild(grid[i][j]);
  }
}

let gridElt = document.createElement('table')
for (let i = 0; i < rows.length; i++) {
  gridElt.appendChild(rows[i]);
}
mainPanel.appendChild(gridElt);

let plantTable = document.createElement('table'),
    plantTableRow = document.createElement('tr'),
    plantPoint = document.createElement('td'),
    plantHarvest = document.createElement('td'),
    pointsVal = 1,
    pointsElt = document.querySelector('#pointsVal'),
    upgradePtPlantBtn = document.querySelector('#upgradePointPlant'),
    ptPlantBestHarvest = 2,
    upgradeCost = 10,
    upgradeCostElt = document.querySelector('#upgradeCost'),
    bestHarvestElt = document.querySelector('#bestHarvest');

bestHarvestElt.innerHTML = ptPlantBestHarvest + 2;
upgradeCostElt.innerHTML = upgradeCost;

bottomPanel.appendChild(plantTable);
plantTable.appendChild(plantTableRow);
plantTableRow.appendChild(plantPoint);
plantTableRow.appendChild(plantHarvest);
plantPoint.id = 'plantPoint';
plantHarvest.id = 'plantHarvest';
console.log(plantPoint);

plantPoint.addEventListener('click',function() {
  this.classList.add('plantSelected');
  selectedSlot = barSlots[0];
  plantHarvest.classList.remove('plantSelected');
});

plantHarvest.addEventListener('click',function() {
  this.classList.add('plantSelected');
  selectedSlot = barSlots[1];
  plantPoint.classList.remove('plantSelected');
});

upgradePtPlantBtn.addEventListener('click',function() {
  if (pointsVal >= upgradeCost) {
    pointsVal -= upgradeCost;
    pointsElt.innerHTML = pointsVal;
    ptPlantBestHarvest++;
    bestHarvestElt.innerHTML = ptPlantBestHarvest + 2;
  }
})

function sow(slot) {
  if (!slot.classList.contains('filled') 
      && !slot.classList.contains('planted') 
      && selectedSlot == barSlots[0] 
      && pointsVal > 0) {
    slot.classList.add('planted')
    let fillBar = document.createElement('div');
    fillBar.classList.add('fillBar');
    slot.appendChild(fillBar);
    fillBar.addEventListener('animationend',function() {
      slot.classList.add('filled');
    });
    pointsVal--;
    pointsElt.innerHTML = pointsVal;
  }
}
function reap(slot) {
  if (slot.classList.contains('filled') && selectedSlot == barSlots[1]) {
    slot.classList.remove('filled');
    slot.classList.remove('planted');
    pointsVal += Math.floor(Math.random()*ptPlantBestHarvest+2);
    pointsElt.innerHTML = pointsVal;
    slot.removeChild(slot.firstChild);
    
  }
}

let barSlots = new Array(),
    selectedSlot;

barSlots.push(plantPoint);
barSlots.push(plantHarvest);
plantPoint.classList.add('plantSelected');
selectedSlot = barSlots[0];

