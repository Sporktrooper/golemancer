class ItemManager {
  constructor() {
    this.name = "Unnamed Inventory"
    this._obj = this;
    this._element = document.createElement("div");
    this._parent = {};
    this._canSee = new Array();
    this._contents = new Array();
  }
  set parent(newParent){
    newParent._element.appendChild(this._element);
    this._parent = newParent;
  }
  
  lookAt(otherEntity) {
    this._canSee = otherEntity._contents;
  }
  lookFor(entityByName) {
    let soughtItem = this._canSee.find(element => element.name == entityByName);
    return soughtItem;
  }
  set cssClass(cssClass) {
    this._element.classList.toggle(cssClass);
  }
  // requestItem - triggers the other party's giveItem
  requestItem(item, holder) {
    holder.giveItem(item, this);
  }
  // receiveItem - adds item to contents
  receiveItem(item) {
    // should not be used at runtime, only during setup. doing this during runtime does not perform any inventory checks. it should only be called when creating new items or attaching orphaned items. it will be called by giveItem or requestItem as needed.
    this._contents.push(item);
    item.parent = this;
//    console.log(this.name + " received the " + item.name)
  }
  // giveItem - triggers the other party's receiveItem
  giveItem(item, recipient) {
    let itemToGive = this._contents.find(element => element == item);
    recipient.receiveItem(itemToGive);
    this._contents.splice(this._contents.indexOf(itemToGive),1);
  }
}
