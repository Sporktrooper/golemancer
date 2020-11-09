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
        this.occupant.location = this;
      } 
    });
    this._element.addEventListener('dragover', (e) => {
      if(this._element.firstChild == null){
        e.preventDefault();  
      }
    });
  }
  static createSlot(parent) {
    let newSlot = new DragSlot();
    newSlot._element.classList.add('slot');
    this.slots.push(newSlot);
    parent.appendChild(newSlot._element);
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
    });
  }
}

class SlotItemObserver {
  // tracks dragslots and drag items and the interval that causes them to fire their respective events
  constructor(parent) {
    this.slots = new Array();
    this.items = new Array();
    this.elements = {
      parent: parent || null,
      top: document.createElement('div'),
    }
    this.interval;
    this.cycleTime;
    if (this.elements.parent) {
      this.elements.parent.appendChild(this.elements.top);
//      console.log('attached to parent')
    }
  }
  addSlot(slot) {
    let newSlot = slot || new DragSlot();
    newSlot._element.classList.add('box');
    this.slots.push(newSlot);
    this.elements.top.appendChild(newSlot._element);
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
}

// SLOT OBSERVER TEST

let obsTestElem = document.querySelector(".main");

let observer = new SlotItemObserver(obsTestElem);

let itemBChannel = '255'
observer.addSlot();
observer.addSlot();
observer.cycleTime = 1000;
observer.interval = setInterval(function() {
//  console.log('interval beat');
},observer.cycleTime);



let item = new DragItem();
observer.addItem(item);
observer.slots[0]._element.appendChild(item._element);
observer.slots[0].occupant = item;

observer.printStatuses = function() {
  console.log("Slots:");
  for (let i = 0; i < this.slots.length; i++) {
    console.log(this.slots[i]._element);
  }
  console.log('');
  console.log("Items:");
  for (let i = 0; i < this.items.length; i++) {
    console.log(this.items[i]._element);
  }
}



observer.slots[0].effect = function() {
  if(observer.slots[0]._element.firstChild && itemBChannel > 0){
  observer.slots[0].occupant._element.style.backgroundColor = 'rgb(0,0,' + itemBChannel + ')';
  itemBChannel -= 5;
//  console.log('slot 0 effect fired, ' + itemBChannel + observer.slots[0].occupant._element)
  }
}

observer.slots[1].effect = function() {
  if(observer.slots[1]._element.firstChild && itemBChannel < 255) {
    observer.slots[1].occupant._element.style.backgroundColor = 'rgb(0,0,' + itemBChannel + ')';
    itemBChannel += 5
//    console.log('slot 1 effect fired, ' + itemBChannel);
  }
}


//  3x3 TEST



//let testFrame = document.createElement('div');
//testFrame.setAttribute('id','testFrame');
//document.querySelector('.main').appendChild(testFrame);
//
//
//tAr = new Array(9);
//for (let i = 0; i < tAr.length; i++) {
//  tAr[i] = new DragSlot();
//  tAr[i]._element.classList.add('box');
//  tAr[i]._element.setAttribute('id','box-' + i)
//  testFrame.appendChild(tAr[i]._element);
//}
//
//let dragItems = new Array(3);
//for (let i = 0; i < dragItems.length; i++) {
//  dragItems[i] = new DragItem();
//  dragItems[i]._element.setAttribute('id','drag-' + i);
//  dragItems[i]._element.classList.add('draggable');
//  tAr[i]._element.appendChild(dragItems[i]._element);
//  tAr[i].occupant = dragItems[i];
//  dragItems[i].location = tAr[i];
//  
//}
//
//tAr[0].effectOnOccupant = function() {
//  this.occupant._element.style.backgroundColor = '#0f0'
//}
//
//dragItems[0].effectOnSlot = function() {
//  this.location._element.style.backgroundColor = '#0f0';
//}
//