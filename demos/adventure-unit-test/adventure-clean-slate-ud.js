let golemancer = new Golemancer();
golemancer.skills.construction = 1;
golemancer.skills.vision = 1;
golemancer.skills.execution = 2;
console.log(golemancer);
let device = new Device(golemancer);
console.log(device);

document.querySelector('#gameContainer').appendChild(device.globalFrame)

//device.addActionButton('test','test button',function() {
//  device.writeLog('test button pressed');
//},true)
//
//device.addActionButton('repeat-test',"Make test button repeat",function() {
//  device.buttons["test"].autoRepeat = true;
//  device.buttons["test"].hasDuration();
//},false);
//
//device.addActionButton('collect-rocks',"Collect rocks",function(){
//  device.writeLog("collected rocks maybe");
//},true)
//
//device.buttons['collect-rocks'].hasDuration(true);
////device.buttons['collect-rocks'].autoRepeat = true;

device.writeLog("The device whirs to life and awaits instructions.")
device.addActionButton('collect-rock',"Collect a rock.",function() {
  if(device._attributes.durability > 0) {
    addResource("rocks",1); 
    if (resources.rock.qty == 10) {
      addRepeatRocksButton();
    }
    if(!device.buttons['collect-rock'].autoRepeat) {
      device.writeLog("The device brings you a rock.");
      }
    if(!device.checkSuccess(device._attributes.endurance/100)){
      device.modifyAttributes("durability",-1);
      console.log('durability lost to rocks');
    }
  }
  if(device._attributes.durability == 0) {
    console.log('no durability left');
    device.buttons['collect-rock'].element.inner.filler.style["animation-play-state"] = "paused"
  }
},true,1000)
//device.buttons['collect-rock'].autoRepeat = true;

function addRepeatRocksButton() {
  device.addActionButton('repeat-collect-rock',"Keep collecting rocks.",function() {
    device.buttons['collect-rock'].autoRepeat = true;
    device.buttons['collect-rock'].element.innerHTML = "Keep collecting rocks.";
    device.buttons['collect-rock'].hasDuration(true);
  })
}

addResource('rocks',15)

device.addActionButton('grind-rocks',"Grind 10 rocks",function() {
  if(resources.rock.qty < 10) {
    device.buttons['grind-rocks'].canRun = false;
    console.log('not enough rocks');
  }
  if(resources.rock.qty >= 10) {
    device.buttons['grind-rocks'].canRun = true;
    console.log('enough rocks');
  }
},true,5000)