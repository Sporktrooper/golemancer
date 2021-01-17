let uiElements = {
  gameContainer: document.querySelector('#gameContainer'),
//  pointCounter: document.querySelector('#points'),
  resourceBox: document.querySelector('#resources'),
  actionBox1: document.querySelector('#actionBox1'),
  state: document.querySelector('#state'),
  action: document.querySelector('#action'),
}

let points = new Resource("Points", uiElements.resourceBox);

let actions = {};
actions['addPoint'] = () => {
  points.update(1);
};
actions['subtractPoint'] = () => {
  points.update(-1);
};

let d = new Device(actions);

let toggleButton = document.createElement('div');
toggleButton.classList.add('actionButton');
toggleButton.classList.add('toggle');
toggleButton.classList.add('off');
toggleButton.innerHTML = "I / O";
uiElements.actionBox1.appendChild(toggleButton);

toggleButton.addEventListener('click',() => {
  d.toggle();
  if (d.repeating) {
    uiElements.state.innerHTML = "on";
    toggleButton.classList.remove("off");
    toggleButton.classList.add("on");
    
  } else {
    uiElements.state.innerHTML = "off";
    toggleButton.classList.remove("on");
    toggleButton.classList.add("off");
  }
})

let addButton = document.createElement('div');
addButton.classList.add('actionButton');
addButton.innerHTML = "Add";
uiElements.actionBox1.appendChild(addButton);

addButton.addEventListener('click', () => {
  if (toggleButton.classList.contains('on')) {
      toggleButton.click();
  }
  d.action = 'addPoint';
  uiElements.action.innerHTML = "adding";
//  subtractButton.classList.remove('selected');
  actionBox1Buttons.forEach(element => {
    element.classList.remove('selected')
  })
  addButton.classList.add('selected');
})

let subtractButton = document.createElement('div');
subtractButton.classList.add('actionButton');
subtractButton.innerHTML = "Subtract";
uiElements.actionBox1.appendChild(subtractButton);

subtractButton.addEventListener('click', () => {
  if (toggleButton.classList.contains('on')) {
      toggleButton.click();
  }
  d.action = 'subtractPoint';
  uiElements.action.innerHTML = "subtracting";
//  addButton.classList.remove('selected');
  actionBox1Buttons.forEach(element => {
    element.classList.remove('selected')
  })
  subtractButton.classList.add('selected');
})

let actionBox1Buttons = [];
actionBox1Buttons.push(addButton);
actionBox1Buttons.push(subtractButton);

let cloneSlot = document.querySelector('#deviceSlotTemplate').cloneNode(true);
cloneSlot.id = "deviceSlot1";
gameContainer.appendChild(cloneSlot);

console.log(cloneSlot.children);

cloneSlot.name = cloneSlot.children[0].children[0].children[0];
cloneSlot.name.innerHTML  = "test name"