let golemancer = new Golemancer();
golemancer.skills.construction = 1;
golemancer.skills.vision = 1;
golemancer.skills.execution = 1;
console.log(golemancer);
let device = new Device(golemancer);
console.log(device);

document.querySelector('#gameContainer').appendChild(device.globalFrame)

device.addActionButton('test','test button',function() {
  device.writeLog('test button pressed');
},true)

device.addActionButton('repeat-test',"Make test button repeat",function() {
  device.buttons["test"].automaticRepeat(true);
},false);