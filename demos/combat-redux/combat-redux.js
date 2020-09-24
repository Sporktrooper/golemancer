/*



        QUIT GETTING DISTRACTED

    Vaski
    DZ


*/

class DM {
  // middleman between object interactions. controls the scene and events
  
  static attack(attacker, defender) {
    let a = attacker.attack.damage;
    let d = defender;
    
    b.defend = a;
    
    
  }
}

class Combat {
  // manages combats, including 
  
  constructor(participants) {
    this._combatants = participants || {};
    console.log(this._combatants);
  }
  
  attack() {
//    this._combatants.b._hp -= this._combatants.a._damage;
//    console.log(this._combatants.b._name + " took " + attack + " damage. " + this._combatants.b._hp + "hp remaining.");
    console.log("attacky attacky");
  }
}

class Combatant {
  constructor (name,hp,damage) {
    this._name = name || "Unnamed Combatant";
    this._hp = hp || 1;
    this._damage = damage || 0;
  }
  
//  get attack { 
//    atk = this.attack();
//    return atk;
//  }

//  get defend {
//    def = this.defend();
//    return def;
//  }
  
  get attack () {
    let attackObj = {
      damage: this._damage
    }
    return attackObj;
  }
  
  get defend () {
    let defendObj = {
      
      }
    return defendObj;
    }
  
  set defend (attack) {
    this._hp -= attack;
    console.log(this._name + " took " + attack + " damage. " + this._hp + "hp remaining.");
  }
}


let a = new Combatant();
a._name = "Red Golem";
a._hp = 20;
a._damage = 3;

let b = new Combatant();
b._name = "Blue Golem"
b._hp = 10;
b._damage = 5;

//DM.attack(a,b);

let c = new Combat({a,b})
//let c = new Combat()
