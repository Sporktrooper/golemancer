class DragSlot {
  // Represents an empty slot into which a DragItem can be dropped.
  constructor(ownerGrid,oGIndex) {
    this._element = document.createElement('div');
    this._element.addEventListener('drop', (e) => {
      if(this._element.firstChild == null) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move'; 
//        let data = document.getElementById(e.dataTransfer.getData('text'))
        let data = document.querySelector("#" + e.dataTransfer.getData('text'))
//        e.target.appendChild(document.getElementById(e.dataTransfer.getData('text')));
        e.target.appendChild(document.querySelector("#" + e.dataTransfer.getData('text')));
      } 
    });
    this._element.addEventListener('dragover', (e) => {
      if(this._element.firstChild == null){
        e.preventDefault();  
      }
    });
  }
}
class DragItem {
  // Represents a draggable item on the grid.
  constructor() {
    this._element = document.createElement('div');
    this._element.setAttribute('draggable', true)
    this._element.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
      e.dataTransfer.effectAllowed = 'move';
    });
  }
  
}
class GridSlots {
  // Represents a collection of DragSlots
  constructor(size) {
    this._size = size || 1;
    this._grid = new Array();
    
    //add new grid slots until size is reached
    for(let i = 0; i < this._size; i++) {
      let newGridSlot = new DragSlot();
      this._grid.push(newGridSlot);
    }
  }
  addSlot(){
    let newSlot = new DragSlot(this);
  }
}

let testFrame = document.createElement('div');
testFrame.setAttribute('id','testFrame');
document.querySelector('.main').appendChild(testFrame);
let status = document.createElement('div');

tAr = new Array(9);
for (let i = 0; i < tAr.length; i++) {
  tAr[i] = new DragSlot();
  tAr[i]._element.classList.add('box');
  tAr[i]._element.setAttribute('id','box-' + i)
  testFrame.appendChild(tAr[i]._element);
}

let dragItems = new Array(3);
for (let i = 0; i < dragItems.length; i++) {
  dragItems[i] = new DragItem();
  dragItems[i]._element.setAttribute('id','drag-' + i);
  dragItems[i]._element.classList.add('draggable');
  tAr[i]._element.appendChild(dragItems[i]._element);
  
}

let grid = new GridSlots(9);