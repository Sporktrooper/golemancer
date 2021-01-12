function damage(targetDevice,val) {
  targetDevice.repair(-val);
}

let gameContainer = document.querySelector("#gameContainer"),
    device = new Device(),
    buttons = document.createElement('div'),
    resources = {
      element: document.querySelector('#resources'),
    };

resources.rock = new Resource("Rocks",resources.element)
    
gameContainer.appendChild(buttons);
gameContainer.appendChild(device.elements.main)
//device.modifyAttributes('power',-50)


// CSS classes:
//    actionButton: describes the class
//    fillBar: describes the progress bar inside the button
//    fillBarInner: describes the progress bar filler, which is the part that gets animated
class ActionButton {
  constructor(buttonText,effect) {
    this.repeat = false;
    this.element = document.createElement('div');
    this.element.classList.add('actionButton');
    this.element.innerHTML = buttonText;
    this.element.fillBar = document.createElement('div');
    this.element.fillBar.inner = document.createElement('div');
    this.element.fillBar.classList.add('fillBar')
    this.element.fillBar.inner.classList.add('fillBarInner');
    this.element.fillBar.style['visibility'] = 'hidden';
    this.element.fillBar.appendChild(this.element.fillBar.inner);
//    this.element.appendChild(this.element.fillBar);
    this.effect = effect;
    this.element.addEventListener('click',() => {
      this.effect()
    })
  }
  addFillBar() {
    this.element.appendChild(this.element.fillBar);
  }
}

let testButton = new ActionButton('test button',() => {
  device.doWork(function(){
    console.log('did work');
  },5000)
})

let testButton2 = new ActionButton('damage the device',() => {
    damage(device,10);
})

buttons.appendChild(testButton.element);
buttons.appendChild(testButton2.element);

//device.doWork(function() {
//  console.log("work finished");
//},5000)

//let repeatButton = document.createElement('div');
//repeatButton.innerHTML = "Repeat";
//repeatButton.classList.add('repeatButton');
//device.buttons[0].element.appendChild(repeatButton);
//repeatButton.addEventListener('click',() => {
//  repeatButton.classList.add('on')
//})

//device.addActionButton('Gather rocks',function() {
//  let stopButton = new ActionButton('stop', function() {
////      device.buttons[1].repeat = false;
//      device.stopRepeat();
//      device.buttons[1].element.removeChild(stopButton.element);
//    })
//  if (device.buttons[1].repeat == true) {
//    device.repeatWork(function() {
//      resources.rock.update(1);
//      damage(device,1);
//      
//    device.buttons[1].element.appendChild(stopButton.element);
//
//    },1000) 
//  } else {
//        device.doWork(function() {
//      resources.rock.update(1);
//      damage(device,1);
//    },1000)
//  }
//})

device.addActionButton('Stop',function() {
  device.stopRepeat();
});

device.addActionButton('Gather rocks',function() {
  device.repeatWork(function() {
    if(device.attributes.durability > 0) {
    resources.rock.update(1);
    damage(device,1);
      }
  },1000)
})

device.addActionButton('repair',function() {
  device.doWork(function() {
    device.repair(25);
  },2500);
})