// "actions" should be an object containing anonymous functions (() => {}) based on the actions taken in the game. the device can then perform these actions by calling device.actions[method]

class Device {
  constructor(actions,speed,endMax,endRegen) {
    this._action = '';
    this.repeating = false;
    this.speed = speed || 500;
    this.endurance = {
      max: endMax || 10,
      current: endMax || 10,
      regen: endRegen || 0.8,
    }
    this.actions = actions || {};
    
    this.heartbeat = setInterval((device) => {
      this.regenEndurance();
        if(this.unitCard) {
          this.unitCard.update('attrEnduranceCurrent',this.endurance.current);
        }
    },1000,this)
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
//    this.interval = setInterval(this.actions[this._action](this),this.speed)
    this.interval = setInterval(this.actions[this._action],this.speed,this)
  }
  doAction() {
    this.actions[this._action]();
  }
  set action(actionName) {
    this._action = '' + actionName;
    this.toggleOff();
  }
  spendEndurance(val) {
    if(this.endurance.current >= val) {
      this.endurance.current -= val;
      if(this.unitCard) {
        this.unitCard.update('attrEnduranceCurrent', this.endurance.current);
      }
      return true;
    } else {
      return false;
    }
  }
  regenEndurance() {
    if(this.endurance.current < (this.endurance.max - this.endurance.regen)) {
      this.endurance.current += this.endurance.regen;
    } else {
      this.endurance.current = this.endurance.max;
    }
  }
}