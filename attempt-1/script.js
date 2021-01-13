let points = 0;
let uiElements = {
  pointCounter: document.querySelector('#points'),
  actionBox1: document.querySelector('#actionBox1'),
  state: document.querySelector('#state'),
  action: document.querySelector('#action'),
}

let actions = {};
actions['addPoint'] = () => {
  points++;
  updateUI();
};
actions['subtractPoint'] = () => {
  points--;
  updateUI();
};

function updateUI() {
  uiElements.pointCounter.innerHTML = points;
}

//let device = {
//  action: '',
//  repeating: false,
//  speed: 1000,
//  actions: actions,
//}

let d = new Device(actions);

let toggleButton = document.createElement('div');
toggleButton.classList.add('actionButton');
toggleButton.innerHTML = "Toggle";
uiElements.actionBox1.appendChild(toggleButton);

toggleButton.addEventListener('click',() => {
  d.toggle();
  if (d.repeating) {
    uiElements.state.innerHTML = "on";
  } else {
    uiElements.state.innerHTML = "off";
  }
})

let addButton = document.createElement('div');
addButton.classList.add('actionButton');
addButton.innerHTML = "Add";
uiElements.actionBox1.appendChild(addButton);

addButton.addEventListener('click', () => {
  d.action = 'addPoint';
  uiElements.action.innerHTML = "adding";
})

let subtractButton = document.createElement('div');
subtractButton.classList.add('actionButton');
subtractButton.innerHTML = "Subtract";
uiElements.actionBox1.appendChild(subtractButton);

subtractButton.addEventListener('click', () => {
  d.action = 'subtractPoint';
  uiElements.action.innerHTML = "subtracting";
})