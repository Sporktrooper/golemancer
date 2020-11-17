class Combat {
  constructor() {
    this.combatants = new Array();
  }
  attack(attacker,target,damage) {
    target.hp -= damage;
    pushLog(attacker.name + ' attacks ' + target.name + ' for ' + damage + ' points of damage!')
    if(target.hp > 0) {
      // combat continues
      updateEventDetails('combat')
    } else {
      pushLog(target.name + ' is defeated!')
      this.combatants.pop();
      updateEventDetails('clear');
    }
  }
}
class Enemy {
  constructor() {
    this.name = 'Enemy';
    this.hp = 3;
  }
}
class Event {
  constructor(title, description, effect, resolution) {
    this.title = title || 'no title set';
    this.description = description || 'no description set';
    this.effect = effect || function() { console.log('no effect defined') };
    this.resolution = resolution || function() { console.log('no resolution defined') };
  }
}
class Hero {
  constructor() {
    this.name = 'Hero';
    this._hp = 10;
  }
  set hp(hp) {
    this._hp = hp;
    hpVal.innerHTML = this._hp;
  }
  get hp() {
    return this._hp;
  }
  set hpChange(val) {
    this._hp += val;
    hpVal.innerHTML = this._hp;
  }
}

function pushLog(newLogText) {
  let newLogEntry = document.createElement('li');
  newLogEntry.innerHTML = newLogText;
  log.appendChild(newLogEntry);
  log.scrollTop = log.scrollHeight;
}

function fireEvent(index) {
  pushLog(events[index].description);
  events[index].effect();
  eventName.innerHTML = events[index].title;
  eventDesc.innerHTML = events[index].description;
}

let log = document.querySelector('#log'),
    hero = new Hero,
    activeCombat = new Combat(),
    events = new Array(),
    fightButton = document.querySelector('#fight'),
    searchButton = document.querySelector('#search'),
    hpVal = document.querySelector('#hpVal'),
    heroName = document.querySelector('#heroName'),
    eventName = document.querySelector('#eventName'),
    eventDesc = document.querySelector('#eventDescription'),
    eventDetails = document.querySelector('#eventDetails');


hpVal.innerHTML = hero.hp;
heroName.innerHTML = hero.name;

activeCombat.combatants.push(hero);

events.push({
  title: 'template',
  description: 'a blank event',
  effect: function() {},
});
events.push({
  title: 'a tricky rock',
  description: 'the hero stumbles over a rock and loses 1hp.',
  effect: function() {
    hero.hp -= 1;
    hpVal.innerHTML = hero.hp;
  }
});
events.push({
  title: 'combat',
  description: 'the hero encounters a foe.',
  effect: function() {
    activeCombat = new Combat();
    let enemy = new Enemy();
    activeCombat.combatants.push(hero);
    activeCombat.combatants.push(enemy);
    updateEventDetails('combat');
  },
});
events.push(new Event('healing spring','the hero finds a healing spring.',function() {
  hero.hp = 10;
  console.log('spring effect fired');
}));

fightButton.addEventListener('click',function() {
  if(activeCombat.combatants.length > 1) {
    activeCombat.attack(hero,activeCombat.combatants[1],1);
  }
});
searchButton.addEventListener('click',function() {
  if(activeCombat.combatants.length == 1) {
   fireEvent(Math.floor(Math.random()*events.length)) 
  } else {
    pushLog('the hero is unable to search, a foe awaits!')
  }
})

function updateEventDetails(eventType) {
  switch (eventType) {
    case 'combat':
      eventDetails.innerHTML = 'Enemy HP: ' + activeCombat.combatants[1].hp;
      break;
    case 'clear':
      eventName.innerHTML = '';
      eventDesc.innerHTML = '';
      eventDetails.innerHTML = '';
  }
}