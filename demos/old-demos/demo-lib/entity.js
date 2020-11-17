// 20200928 0.1
  // this began as Entity from color-pass, with all the item management properties removed.

class Entity {
  constructor() {
    this.name = "Unnamed Entity"
    this._obj = this;
    this._element = document.createElement("div");
    this._parent = {};
    this._canSee = new Array();
  }
  set parent(newParent){
    newParent._element.appendChild(this._element);
    this._parent = newParent;
  }
  moveTo(location){
    this._position = location;
    this._element.style.left = location.x + "em" || this.position.x;
    this._element.style.top = location.y + "em" || this.location.y;
  }
  set cssClass(cssClass) {
    this._element.classList.toggle(cssClass);
  }
  // requestItem - triggers the other party's giveItem
}

