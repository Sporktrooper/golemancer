class Device {
  constructor(actions) {
    this._action = '';
    this.repeating = false;
    this.speed = 1000;
    this.actions = actions || {};
  }
  toggle() {
    this.repeating = !this.repeating;
    if(this.repeating) {
      this.interval = setInterval(this.actions[this._action],this.speed)
    } else {
      clearInterval(this.interval)
    }
  }
  toggleOff() {
    this.repeating = false;
    clearInterval(this.interval);
  }
  toggleOn() {
    this.repeating = true;
    this.interval = setInterval(this.actions[this._action],this.speed)
  }
  set action(actionName) {
    this._action = '' + actionName;
    this.toggleOff();
  }
}

//
//let device = new Device();
//device.actions = actions;
//device.actions.addPoint();
//console.log(points)
//
//device.actions['subtractPoint']();
//console.log(points);
//
//device.action = 'addPoint'
////device.toggle()
//console.log(device)
//
