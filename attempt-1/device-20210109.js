// each device has 4 user facing components:
// 1. Properties
//    Describes the device, including its name and attribute values.
//    Holds methods for updating properties.
//    * Element must have the same name as the property.
// 2. Activity
// 3. Actions
//    A list of buttons that select the activity or make a change to properties.
// 4. Log
//    I've written this thing half a dozen times. Normal fare - add a new UL LI and scroll to the bottom. Will copy from another project later.

class Properties {
  constructor(parent,name) {
    this.parent = parent;
    this.name = "Unnamed" || name;
  }
  update(prop,val) {
    this[prop] = val;
  }
}

class ActivityHolder {
  constructor(parent) {
    this.parent = parent;
    this.activityTitle = "idle";
    this.activeInterval = [];
    this.interval = 1000; // how often to perform the action in ms
    this.action = (parent) => {
      console.log(parent);
    }
  }
  startAction(repeating) {
    if (repeating == 1) {
      this.activeInterval.push(setInterval(this.action(this.parent),this.interval));
    } else {
      this.action(this.parent);
    }
  }
  stopAction() {
    while(this.activeInterval.length > 0) {
      clearInterval(this.activeInterval[0]);
      this.activeInterval.shift();
    }
  }
}

class ActionButton {
  constructor(parentDevice) {
    
  }
}

class ActionMenu {
  constructor(parent) {
    this.parent = parent;
    this.menu = {};
    
  }
  addButton() {
    let button = new ActionButton(this.parent);
  }
  addAction(name, action) {
    this.menu[name] = action;
  }
}

class Log {
  constructor(parent) {
    this.parent = parent;
    
  }
}

class Device {
  constructor() {
    this.properties = new Properties(this);
    this.activityHolder = new ActivityHolder(this);
    this.actionMenu = new ActionMenu(this);
    this.log = new Log(this);
    
    
  }
}

let points = 0;

let d = new Device();
//console.log(d);
d.properties.update("name","Tester McTest");
console.log(d);
d.activityHolder.startAction();

d.actionMenu.addAction('test action',(parent) => {
  points++;
  console.log(points);
});

//d.actionMenu.menu['test action'](d);
d.activityHolder.action = d.actionMenu.menu['test action'];
d.activityHolder.startAction(1);