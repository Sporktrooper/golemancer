class DragSlot {
  // Represents an empty slot into which a DragItem can be dropped.
  constructor() {
    this._element = document.createElement('div');
    this._element.obj = this;
    this.occupant;
    this._element.addEventListener('drop', (e) => {
      if(this._element.firstChild == null) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move'; 
        let data = document.getElementById(e.dataTransfer.getData('text'))
        e.target.appendChild(data);
        this.occupant = data.obj;
        this.effectOnOccupant();
        this.occupant.effectOnSlot(this);
        this.occupant.location = this;
      } 
    });
    this._element.addEventListener('dragover', (e) => {
      if(this._element.firstChild == null){
        e.preventDefault();  
      }
    });
  }
  effect() {
    // override
  }
  effectOnOccupant() {
    // override
  }
  onExit(occupant) {
    // override
  }
}

class DragItem {
  // Represents a draggable item on the grid.
  constructor() {
    this.location;
    this._element = document.createElement('div');
    this._element.classList.add('draggable');
    this._element.obj = this;
    this._element.setAttribute('draggable', true);
    this._element.setAttribute('id',Math.random());
    this._element.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
      e.dataTransfer.effectAllowed = 'move';
      this.location.onExit(this)
    });
  }
  onLeave() {
    // override
  }
  effectOnSlot(slot) {
    // override
  }
  
}

class SlotItemObserver {
  // tracks dragslots and drag items and the interval that causes them to fire their respective events
  constructor(parent) {
    this.slots = new Array();
    this.items = new Array();
    this._interval;
    this.elements = {
      parent: parent || null,
      top: document.createElement('div'),
    }
    this.cycleTime = 1000;
    if (this.elements.parent) {
      this.elements.parent.appendChild(this.elements.top);
//      console.log('attached to parent')
    }
    this.intervalStart = function() {
      this._interval = setInterval(() => {
        for(let i = 0; i < this.slots.length; i++) {
          this.slots[i].effect();
        }
      }, this.cycleTime);
    }
  }
  addSlot(slot) {
    let newSlot = slot || new DragSlot();
    this.slots.push(newSlot);
  }
  addMultipleSlots(qty) {
    for (let i = 0; i < qty; i++) {
      this.addSlot();
    }
  }
  addItem(item) {
    let newItem = item || new DragItem();
    this.items.push(newItem);
  }
  intervalStop() {
    clearInterval(this._interval);
  }
}