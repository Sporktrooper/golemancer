let points = 0;


let action = () => {
  console.log('action fired');
//  console.log(this);
}

action();

let actions = {};
actions['addPoint'] = () => {
  points++;
};
actions['subtractPoint'] = () => {
  points--;
};

actions['addPoint']();
console.log(points)

//let device = {
//  action: '',
//  repeating: false,
//  speed: 1000,
//  actions: actions,
//}

class Device {
  constructor() {
    this._action = '';
    this.repeating = false;
    this.speed = 1000;
    this.actions = {};
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

let device = new Device();
device.actions = actions;
device.actions.addPoint();
console.log(points)

device.actions['subtractPoint']();
console.log(points);

device.action = 'addPoint'
//device.toggle()
console.log(device)

