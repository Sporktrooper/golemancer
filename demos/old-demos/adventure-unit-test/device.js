class Device {
  constructor() {
    console.log('device created');
    this.frame = document.createElement('div');
    this.name = document.createElement('div');
    this.summary = document.createElement('div');
    this.bar = document.createElement('div');
    this.details = document.createElement('div');
    
    this.attributes = {
      power: { val: 10, element: document.createElement('p') },
      speed: { val: 500, element: document.createElement('p') },
      endurance: { val: 40, element: document.createElement('p') }, 
      durability: { val: 30, element: document.createElement('p') },
      maxDurability: { val: 30, element: document.createElement('p') },
    }
    
    
    
    this.name.innerHTML = "The Device";
    this.name.id = "deviceName";
    this.name.classList.add("deviceName");
    this.frame.appendChild(this.name);

    this.summary.state = "semi-autonomous machine";
    this.summary.capabilities = "capable of retrieving rocks."

    this.summary.innerHTML = "A " + this.summary.state + " " + this.summary.capabilities;
    this.summary.id = "deviceSummary";
    this.summary.classList.add("deviceSummary");
    this.frame.appendChild(this.summary);

    this.bar.id = "deviceBar";
    this.bar.classList.add("deviceBar");
    this.frame.appendChild(this.bar);
    this.bar.inner = document.createElement('div');
    this.bar.inner.id = 'deviceBarInner';
    this.bar.inner.classList.add("deviceBarInner");
    this.bar.appendChild(this.bar.inner);
    this.bar.inner.style["animation-duration"] = (baseFillDuration * (100/this.attributes.speed.val)) + "s";
    this.bar.inner.addEventListener('animationiteration', finishedWorkCycle);

//    this.details.id = "deviceDetails";
    this.frame.appendChild(this.details);

    this.attributes.elements = document.createElement('div');
    this.details.appendChild(this.attributes.elements);

    this.attributes.power.element.innerHTML = "Power: " + this.attributes.power.val;
    this.attributes.elements.appendChild(this.attributes.power.element);

    this.attributes.speed.element.innerHTML = "Speed: " + this.attributes.speed.val;
    this.attributes.elements.appendChild(this.attributes.speed.element);
    
    this.attributes.endurance.element.innerHTML = "Endurance: " + this.attributes.endurance.val;
    this.attributes.elements.appendChild(this.attributes.endurance.element);

    this.attributes.durability.element.innerHTML = "Durability: " + this.attributes.durability.val + " / " + this.attributes.maxDurability.val;
    this.attributes.elements.appendChild(this.attributes.durability.element);
    
    this.log = document.createElement('ul');
    
    this.writeLog = function(str) {
      let newLogEntry = document.createElement('li');
      newLogEntry.innerHTML = str;
      this.log.appendChild(newLogEntry);
    }

  }
}
