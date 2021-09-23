class ActionMenu {
  constructor(unitCard) {
    this.parent = unitCard;
    this.elt = this.parent.actionMenu;
    this.elt.addEventListener('click',function(e) {
      
      if(e.target.classList.contains('selected')){
        e.target.classList.remove('selected');
        unitCard.device.action = '';
        unitCard.device.toggleOff();
      } else {
        let deselect = e.target.parentElement.children;
        for(let i = 0; i < deselect.length; i++) {
          deselect[i].classList.remove('selected');
        }
        e.target.classList.add('selected');
        unitCard.device.action = e.target.dataset.action;
        unitCard.device.toggleOff();
        unitCard.device.toggleOn();
      }
    })
  }
  makeButton(actionName, label, actionDesc) {
    // actionName: name of the action method, label: text that appears on the button, actionDesc: description that appears in the current action box.
    let newButton = new ActionButton(actionName,label,actionDesc);
    this.elt.appendChild(newButton.elt)
  }
  attachButton(actionButton) {
    let buttonCopy = actionButton.elt.cloneNode(true);
    this.elt.appendChild(buttonCopy);
  }
  removeButton(actionButton) {
    let selectedButton = this.elt.querySelector('.selected');
    this.elt.removeChild(selectedButton);
  }
}

class UnitCard {
  constructor(device) {
    this.device = device;
    device.unitCard = this;
    this.elt = document.querySelector('#templates').querySelector('.unitCard').cloneNode(true);
    this.name = this.elt.querySelector('.name');
    this.description = this.elt.querySelector('.description');
    this.attributes = this.elt.querySelector('.attributes');
    this.actionMenu = this.elt.querySelector('.actionMenu');
    this.attrSpeed = this.elt.querySelector('.attrSpeed');
    this.attrEnduranceMax = this.elt.querySelector('.attrEnduranceMax');
    this.attrEnduranceCurrent = this.elt.querySelector('.attrEnduranceCurrent');
    this.attrEnduranceRegen = this.elt.querySelector('.attrEnduranceRegen')
    
    this.name.innerHTML = device.name;
    this.attrSpeed.innerHTML = device.speed;
    this.attrEnduranceMax.innerHTML = device.endurance.max;
    this.attrEnduranceCurrent.innerHTML = device.endurance.current;
    this.attrEnduranceRegen.innerHTML = device.endurance.regen;
    
    this._actionMenu = new ActionMenu(this);
  }
  update(elementKey,val) {
    if (typeof val === 'number') {
      val = val.toFixed(1);
    }
    this[elementKey].innerHTML = val;
  }
}

class ActionButton {
  constructor(actionName, label) {
    this.elt = document.createElement('div');
    this.elt.classList.add('actionButton');
    this.elt.innerHTML = label
    this.elt.dataset.action = actionName;
  }
}