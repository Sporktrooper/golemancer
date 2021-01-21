// "actions" should be an object containing anonymous functions (() => {}) based on the actions taken in the game. the device can then perform these actions by calling device.actions[method]

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
  doAction() {
    this.actions[this._action]();
  }
  set action(actionName) {
    this._action = '' + actionName;
    this.toggleOff();
  }
}