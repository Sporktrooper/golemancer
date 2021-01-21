class ActionMenu {
  constructor(unitCard) {
    this.parent = unitCard;
    this.elt = this.parent.actionMenu;
    this.elt.addEventListener('click',function(e) {
      let deselect = e.target.parentElement.children;
      for(let i = 0; i < deselect.length; i++) {
        deselect[i].classList.remove('selected');
      }
      e.target.classList.add('selected');
      unitCard.device.action = e.target.dataset.action;
      unitCard.device.toggleOn()
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
}

class UnitCard {
  constructor(device) {
    this.device = device;
    this.elt = document.querySelector('#templates').querySelector('.unitCard').cloneNode(true);
    this.name = this.elt.querySelector('.name');
    this.description = this.elt.querySelector('.description');
    this.attributes = this.elt.querySelector('.attributes');
    this.actionMenu = this.elt.querySelector('.actionMenu');
    this.attrSpeed = this.elt.querySelector('.attrSpeed');
    
    this.name.innerHTML = device.name;
    this.attrSpeed.innerHTML = device.speed;
    this._actionMenu = new ActionMenu(this);
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