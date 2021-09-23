class Part {
  constructor(parent) {
    this.active = true;
    this.hp = 5;
    this.parent = parent;
    this.children = {};
    
  }
  damage(val) {
    if (val < this.hp) {
      this.hp -= val;
    } else {
      this.hp = 0;
      this.active = false;
    }
  }
}

//let testPart = new Part();
//console.log(testPart);
////testPart.damage(0);
////console.log(testPart);
////testPart.damage(1);
////console.log(testPart);
//testPart.damage(10);
//console.log(testPart);