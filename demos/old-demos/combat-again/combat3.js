class LogBox {
  constructor(parent) {
    this.parent = parent || false;
    this.logContainer = document.createElement("div");
    this.log = document.createElement("ul");
    this.logContainer.classList.add("logContainer");
    this.logContainer.appendChild(this.log);
    
    if (parent) {
      parent.appendChild(this.logContainer);
    }
  }
  write(str){
    let newElement = document.createElement("li");
    newElement.innerHTML = str;
    this.log.appendChild(newElement);
    this.logContainer.scrollTop = this.logContainer.scrollHeight;
  }
  
    
  
}
class Destructible {
  constructor() {
//    this._uid = Math.random();
    this._hpMax = 10;
    this._hpCurrent = this._hpMax;
    
  }
  set maxHP(newMax) {
    this._hpMax = newMax;
    this._hpCurrent = newMax;
  }
  set takeDamage(dmg){
    this._hpCurrent -= dmg;
  }
}
class Combatant extends Destructible {
  constructor() {
    super();
    this._attackDamage = 8;
    this.vision = new Array;
    this._name = "Unnamed Combatant"
  }
//  see(seenThing){ 
//    if(!(this == seenThing) && !(this.vision.includes(seenThing))){
//      this.vision.push(seenThing);
////      console.log(this.name + " sees " + seenThing.name);
//    }
//  }
  see (sceneActors) {
    for (let i = 0; i < sceneActors.length; i++) {
      if(!(this == sceneActors[i]) && !(this.vision.includes(sceneActors[i]))){
      this.vision.push(sceneActors[i]);
      }
    }
  }
  get attack(){
    // creates an attack object targeting a random seen enemy
    let attack = {};
    attack.attacker = this;
    attack.type = "attack"
    attack.target = this.vision[Math.floor(Math.random() * this.vision.length)];
    attack.damage = this._attackDamage + Math.floor(Math.random()*this._attackDamage);
    return attack;
  }
  set damage(newDmg) {
    this._attackDamage = newDmg;
  }
  set name(newName) {
    this._name = newName;
  }
  get name() {
//    console.log(this._name);
    return this._name;
  }
  set takeDamage(dmg){
    this._hpCurrent -= dmg;
    if (this._hpCurrent <= 0) {
      // I'm dead, tell the scene
      let deathEvent = {};
      deathEvent.type = "death";
      deathEvent.subject = this;
      scene.action(deathEvent);
      console.log(deathEvent);
    }
//    this.element.HP.innerHTML = this._hpCurrent + " / " + this._hpMax;
  }
}
class DisplayedCombatant extends Combatant {
  constructor() {
    super();
    this.element = document.createElement("div");
    this.element.classList.add("combatant")
    this.element.name = document.createElement("div");
    this.element.name.innerHTML = this._name;
    this.element.appendChild(this.element.name);
    this.element.HP = document.createElement("div");
    this.element.HP.innerHTML = this._hpCurrent + " / " + this._hpMax;
    this.element.appendChild(this.element.HP);
  }
  attachToParent(parent) {
    parent.appendChild(this.element);
  }
  set name(newName) {
    this._name = newName;
    this.element.name.innerHTML = this._name;
  }
  get name() {
//    console.log(this._name);
    return this._name;
  }
  set color(newColor) {
    this.element.style.backgroundColor = newColor;
  }
  set takeDamage(dmg){
    this._hpCurrent -= dmg;
    this.element.HP.innerHTML = this._hpCurrent + " / " + this._hpMax;
  }
}

class ExperimentalCombatant extends DisplayedCombatant {
  constructor() {
    super();
  }
  
}
class Scene {
  constructor(log) {
    this.log = log || false; // the log is the destination for player-oriented scene output
    this.actors = new Array; // actors (animated and otherwise) present in the scene
  }
  addActor(actor) {
    this.actors.push(actor);
    for (let i = 0; i < this.actors.length; i++) {
      this.actors[i].see(this.look);
    }
  }
  get look() {
    return this.actors;
  }
  action(action){
    switch (action.type) {
      case "attack":
        action.target.takeDamage = action.damage;
        this.log.write(action.attacker.name 
                       + " strikes " 
                       + action.target.name
                       + " for "
                       + action.damage
                       + " points of damage. "
                       + action.target.name
                       + " has "
                       + action.target._hpCurrent
                       + "hp remaining."
        );
        break;
      case "death":
        console.log(this.actors.find(action.subject));
        
      default:
        this.log.write("I don't understand that action.");
    }
  }
}

class Combat {
  constructor(log) {
    this.log = log || false;
    this.fighters = new Array;
  }
  addFighter(fighter) {
//    console.log("Combat operator received fighter: " + fighter._name);
    this.fighters.push(fighter)
  }
  beginRound() {
    // announce combatants to each other
    for (let i = 0; i < this.fighters.length; i++) {
      for (let j = 0; j < this.fighters.length; j++){
        this.fighters[i].see(this.fighters[j]);
      }
    }
    
    let actions = new Array;
    // request actions from combatants
    for (let i = 0; i < this.fighters.length; i++) {
      actions.push(this.fighters[i].attack);
    }
    
    // execute actions
    for (let i = 0; i < actions.length; i++) {
      actions[i].target.takeDamage = actions[i].damage;
      t.write(this.fighters[i].name 
              + " attacks " 
              + actions[i].target.name 
              + " for " 
              + actions[i].damage
              + ", "
              + actions[i].target._hpCurrent
              + "hp left.");
      
    }
  }
}

let main = document.querySelector("#main");
let t = new LogBox(main);  // future jeff problem: Combatant class relies on the logbox being called t.

let combatantBox = document.querySelector(".combatantBox");
combatantBox.combatants = document.querySelectorAll(".combatant");






//let combat = new Combat(t);

let botBlue = new ExperimentalCombatant();
botBlue.name = "Blue Bomber";
botBlue.attachToParent(document.querySelector(".combatantBox"));
botBlue.color = "#77f";

let botRed = new ExperimentalCombatant();
botRed.name = "Red Rocket";
botRed.attachToParent(document.querySelector(".combatantBox"));
botRed.color = "#f77"


let botGreen = new ExperimentalCombatant();
botGreen.name = "Green Grenadier"
botGreen.attachToParent(document.querySelector(".combatantBox"));
botGreen.color = "#7f7"


let scene = new Scene(t);
scene.addActor(botBlue)
scene.addActor(botRed);
scene.addActor(botGreen);

function check4Death(actor) {
  // hey man ya ded?
  if (actor._hpCurrent <= 0) {
    return true; // ya man
  } else {
    return false; // nah man
  }
}