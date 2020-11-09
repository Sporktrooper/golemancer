class Character {
  constructor() {
    this.attributes = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    };
    this.hp = 0;
    this.damage = '1d6';
  }
  roll(XdY) {
    let parsed = XdY.split('d'),
        x = parseInt(parsed[0]),
        dY = parseInt(parsed[1]),
        results = new Array(x);
    for (let i = 0; i < x; i++) {
      results[i] = Math.floor(Math.random()*dY+1)
    }
    let sum = results.reduce(function(a, b){
      return a + b;
    },0);
    return sum;
  }
  testAttr(attr, mod) {
    mod = mod || 0;
    let roll = this.roll('1d20');
    if (attr > roll + mod) {
//      console.log("Success. Roll " + roll + "+" + mod + " was less than " + attr);
      return true;
    } else {
//      console.log("Failure. Roll " + roll + "+" + mod + " was greater than " + attr);
      return false;
    }
  }
  attack(attr,target) {
    if(this.testAttr(attr)){
      target.hp -= this.damage;
    } else {
      console.log('attack missed')
    }
  }
}
class Combat {
  constructor() {
    this.combatants = new Array();
  }
  addCombatant(combatant,team)
}


let dummy = new Character;
let roll = dummy.roll;
//console.log(dummy.roll('2d6'));
//console.log(dummy.roll('1d6'));
//console.log(dummy.testAttr(10,2))

//dummy.attributes.strength = 18;
dummy.attributes.strength = roll('3d6');
dummy.attributes.dexterity = roll('3d6');
dummy.attributes.constitution = roll('3d6');
dummy.attributes.intelligence = roll('3d6');
dummy.attributes.wisdom = roll('3d6');
dummy.attributes.charisma = roll('3d6');
dummy.hp = roll('1d8');

console.log(dummy.attributes)

let monster = {
  hp: roll('1d8'),
  hd: 1
}