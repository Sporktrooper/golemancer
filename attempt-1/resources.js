class Resource {
  constructor(label,parent) {
    this.label = label;
    this.element = document.createElement('p');
    this.qty = 0;
    this.element.innerHTML = this.label + ": " + this.qty;
    parent.appendChild(this.element);
  }
  update(val) {
    if (val < 0 && this.qty < (val * -1)) {
      return false;
    }
    this.qty += val;
    if (this.qty < 0) {
      this.qty = 0;
    }
    this.element.innerHTML = this.label + ": " + this.qty;
    return true;
  }
}