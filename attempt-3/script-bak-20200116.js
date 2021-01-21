let firstCard = document.querySelector('.unitCard').cloneNode(true),
//    secondCard = document.querySelector('.unitCard').cloneNode(true),
    gameContainer = document.querySelector("#gameContainer");

let points = new Resource("Points",document.querySelector("#resources"));

let actions = {};
actions['makePoint'] = () => {
  points.update(1);
}
actions['spendPoint'] = () => {
  points.update(-1);
}

let firstDevice = new Device(actions),
    secondDevice = new Device(actions);
firstDevice.name = "Test Device #1";
secondDevice.name = "Test Device #2";

gameContainer.appendChild(firstCard);
//gameContainer.appendChild(secondCard);

firstCard.id = 'firstCard';
firstCard.elements = {};
firstCard.elements.name = firstCard.querySelector('.name')
firstCard.elements.description = firstCard.querySelector('.description');
firstCard.elements.attributes = firstCard.querySelector('.attributes');
firstCard.elements.action = firstCard.querySelector('.action');
firstCard.elements.actionMenu = firstCard.querySelector('.actionMenu');
firstCard.elements.attrSpeed = firstCard.querySelector('.attrSpeed');

firstCard.elements.name.innerHTML = firstDevice.name
firstCard.elements.description.innerHTML = "This card is a test, made by cloning the template.";
firstCard.elements.attrSpeed.innerHTML = firstDevice.speed

addPointBtn = document.createElement('div');
addPointBtn.classList.add('actionButton');
addPointBtn.innerHTML = "Make Points";
firstCard.elements.actionMenu.appendChild(addPointBtn);
addPointBtn.addEventListener('click',() => {
  firstDevice.action = 'makePoint'
  firstCard.elements.action.innerHTML = 'Making points';
  firstDevice.toggleOn();
});

class UnitCard {
  constructor(device) {
    this.device = device;
    this.elt = document.querySelector('#templates').querySelector('.unitCard').cloneNode(true);
    this.name = this.elt.querySelector('.name');
    this.description = this.elt.querySelector('.description');
    this.attributes = this.elt.querySelector('.attributes');
    this.action = this.elt.querySelector('.action');
    this.actionMenu = this.elt.querySelector('.actionMenu');
    this.attrSpeed = this.elt.querySelector('.attrSpeed');
    
    this.name.innerHTML = device.name;
    this.attrSpeed.innerHTML = device.speed;
  }
}

let testCard = new UnitCard(secondDevice);
gameContainer.appendChild(testCard.elt);

class ActionMenu {
  constructor(unitCard) {
    this.parent = unitCard;
    this.elt = this.parent.actionMenu;
    this.elt.addEventListener('click',function(e) {
      console.log(e.target);
      let deselect = e.target.parentElement.children;
      console.log(deselect);
      console.log(deselect.length)
      for(let i = 0; i < deselect.length; i++) {
        deselect[i].classList.remove('selected');
      }
      e.target.classList.add('selected');
    })
  }
  makeButton(actionName, label, actionDesc) {
    // actionName: name of the action method, label: text that appears on the button, actionDesc: description that appears in the current action box.
    let newButton = new ActionButton(actionName,label,actionDesc);
    this.elt.appendChild(newButton.elt)
  }
}

class ActionButton {
  constructor(actionName, label, actionDesc) {
    this.elt = document.createElement('div');
    this.elt.classList.add('actionButton');
    this.elt.innerHTML = label;
  }
}

testCard._actionMenu = new ActionMenu(testCard);
//testCard._actionMenu.elt.addEventListener('click',function(e) {
//  console.log(e.target)
//  
//  e.target.classList.add('selected');
//})
testCard._actionMenu.makeButton('makePoint',"Make points","Making points");
testCard._actionMenu.makeButton('spendPoint',"Spend points","Spending points");