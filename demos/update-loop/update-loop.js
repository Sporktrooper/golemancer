let integerCounter = document.querySelector('#integer'),
    integerValue = 0,
    gainRate = 1,
    tickRate = 10000;

let actions = {
  take: "took",
  hear: "heard",
  see: "saw",
  speak: "said",
}

let updater = setInterval(function() {
  update()
},tickRate);

function update() {
  console.log('tick');
  increment();
}

function increment() {
  integerValue += gainRate;
  integerCounter.innerHTML = integerValue;
}

class Entity {
  constructor(name) {
    this.name = name;
    this.log = [];
    this.inventory = [];
    this.attributes = {
      strength: 1,
      speed: 1
    }
  }
  makeLog(logEntry) {
    this.log.push(logEntry)
  }
  listen(message) {
    //this.log.push('heard "' + message + '"');
//    this.makeLog('heard "' + message + '"')
    this.makeLog(actions.hear + ' "' + message + '"')
  }
  speak(listener,message) {
    listener.listen(message);
    this.log.push('said "' + message + '"')
  }
  take(item) {
    if(!item) {
      console.log("item not found");
    }
    if(item) {
      this.inventory.push(item);
      this.log.push('took ' + item.name);  
    }
  }
  give(recipient) {
    let item = this.inventory.pop();
    if (item) {
      console.log('item exists');
      recipient.take(item)
      this.makeLog('gave ' + item.name);
    }
    if (!item) {
      console.log('item does not exist');
    }
  }
  give2(recipient,item) {
    if (item) {
      console.log('item exists');
      recipient.take(item)
      this.makeLog('gave ' + item.name);
    }
    if (!item) {
      console.log('item not found');
    }
  }
  attack(target) {
    let attack = {
      damage: this.attributes.strength,
      attacker: this,
    }
    target.defend(attack);
  }
  defend(attack) {
    this.makeLog('attacked by ' + attack.attacker.name + '. took ' + attack.damage + ' damage.');
  }
  checkInventory(item) {
    let foundItems = this.inventory.map(items => {
      if(items.name == item.name) {
        console.log(items);
        return items
      }
      
    });
  }
}

let alpha = new Entity("Alpha"),
    beta = new Entity("Beta"),
    tool = new Entity("tool");

alpha.take(tool);
alpha.give(beta);
alpha.give(beta);

alpha.attack(beta);

alpha.speak(beta,"hello");
console.log(alpha.log);
console.log(beta.log);
console.log(beta.inventory);