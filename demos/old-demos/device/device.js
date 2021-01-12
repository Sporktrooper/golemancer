//class ActionButton {
//  constructor(buttonText,effect) {
//    this.element = document.createElement('div');
//    this.element.classList.add('actionButton');
//    this.element.innerHTML = buttonText;
//    this.element.fillBar = document.createElement('div');
//    this.element.fillBar.inner = document.createElement('div');
//    this.element.fillBar.classList.add('fillBar')
//    this.element.fillBar.inner.classList.add('fillBarInner');
//    this.element.fillBar.style['visibility'] = 'hidden';
//    this.element.fillBar.appendChild(this.element.fillBar.inner);
////    this.element.appendChild(this.element.fillBar);
//    this.effect = effect;
//    this.element.addEventListener('click',() => {
//      effect()
//    })
//  }
//  addFillBar() {
//    this.element.appendChild(this.element.fillBar);
//  }
//}

class Device {
  constructor() {
    this.attributes = {
      power: 100,
      speed: 30,
      endurance: 100,
      durability: 5,
      maxDurability: 5,
    }
    this.elements = {
      main: document.createElement('div'),
      name: document.createElement('p'),
      workBar: document.createElement('div'),
      workFiller: document.createElement('div'),
      attributes: {
        main: document.createElement('div'),
        power: document.createElement('p'),
        speed: document.createElement('p'),
        endurance: document.createElement('p'),
        durability: document.createElement('p'),
      },
      buttons: document.createElement('div')
    }
    this.buttons = [];
    this.elements.name.innerHTML = "Unnamed Device";
    this.elements.main.appendChild(this.elements.name);
    this.elements.main.appendChild(this.elements.workBar);
    this.elements.workBar.appendChild(this.elements.workFiller);
    this.elements.workBar.classList.add('fillBar')
    this.elements.workFiller.classList.add('fillBarInner')
    this.elements.main.appendChild(this.elements.attributes.main);
    this.elements.attributes.main.appendChild(this.elements.attributes.power);
    this.elements.attributes.main.appendChild(this.elements.attributes.speed);
    this.elements.attributes.main.appendChild(this.elements.attributes.endurance);
    this.elements.attributes.main.appendChild(this.elements.attributes.durability);
    this.elements.main.appendChild(this.elements.buttons);
    
    this.elements.attributes.power.innerHTML = "Power: " + this.attributes.power;
    this.elements.attributes.speed.innerHTML = "Speed: " + this.attributes.speed;
    this.elements.attributes.endurance.innerHTML = "Endurance: " + this.attributes.endurance;
    this.elements.attributes.durability.innerHTML = "Durability: " + this.attributes.durability + " / " + this.attributes.maxDurability;
  }
  attributeRatios() {
    let attr = this.attributes;
    let attrTotal = attr.power + attr.speed + attr.endurance + attr.maxDurability;
    let ratio = [];
    ratio[0] = 100*(attr.power / attrTotal);
    ratio[1] = 100*(attr.speed / attrTotal);
    ratio[2] = 100*(attr.endurance / attrTotal);
    ratio[3] = 100*(attr.maxDurability / attrTotal);
    
    return ratio;
  }
  modifyAttributes(attr,val) {
    this.attributes[attr] += val;
    let attrName = this.elements.attributes[attr]
    attrName = attrName.innerHTML.split(":");
    this.elements.attributes[attr].innerHTML = attrName[0] + ": " + this.attributes[attr];
    if (attr == "durability") {
      if (this.attributes.durability > this.attributes.maxDurability) {
        this.attributes.durability = this.attributes.maxDurability;
      }
      this.elements.attributes[attr].innerHTML = attrName[0] + ": " + this.attributes.durability + " / " + this.attributes.maxDurability;
    }
  }
  repair(val){
    let self = this;
    self.modifyAttributes("durability",val);
  }
  doWork(funcJob,duration) {
    if(!this.elements.workFiller.classList.contains('filling') && this.attributes.durability > 0) {
      this.elements.workFiller.classList.add('filling');
      this.elements.workFiller.style['animation-duration'] = duration + "ms";
      this.elements.workFiller.addEventListener('animationend',() => {
        funcJob();
        this.elements.workFiller.classList.remove('filling');
      },{once:true});
    }
  }
//  repeatWork(funcJob,duration) {
//    if(!this.elements.workFiller.classList.contains('filling')) {
//      this.elements.workFiller.classList.add('filling');
//      this.elements.workFiller.style['animation-duration'] = duration + "ms";
//      this.elements.workFiller.style['animation-iteration-count'] = 'infinite';
//      this.elements.workFiller.addEventListener('animationiteration',() => {
//        funcJob();
//      })
//    }
//    console.log('repeating work');
//  }
  repeatWork(funcJob,duration) {
    if(!this.elements.workFiller.classList.contains('filling')) {
      this.elements.workFiller.classList.add('filling');
      this.elements.workFiller.style['animation-duration'] = duration + "ms";
      this.elements.workFiller.style['animation-iteration-count'] = 'infinite';
      this.elements.workFiller.addEventListener('animationiteration',() => {
        funcJob();
      })
    }
    console.log('repeating work');
  }
  stopRepeat() {
    if (this.elements.workFiller.classList.contains('filling')) {
      this.elements.workFiller.classList.remove('filling');
      this.elements.workFiller.style['animation-iteration-count'] = 1;
      this.elements.workFiller.removeEventListener('animationiteration',() => {
        funcJob();
      })
    }
    console.log('ending repeat');
  }
  addActionButton(textLabel,action) {
    let newButton = new ActionButton(textLabel,action);
    this.elements.buttons.appendChild(newButton.element);
    this.buttons.push(newButton);
  }
}