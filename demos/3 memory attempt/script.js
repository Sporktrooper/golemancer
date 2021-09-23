class Metatron {
  // required class: Memory
  constructor() {
    this.memories = [];
    this.morale = 0;
  }
  callRandomMemory() {
    return this.memories[Math.floor(Math.random()*this.memories.length)]
  }
  createMemory(sphere,intensity,positivity) {
    let newMemory = new Memory(sphere,intensity,positivity)
    this.memories.push(newMemory);
  }
  qtyMemsBySphere(sphere) {
    return this.memories.filter(mem => mem.sphere === sphere).length;
  }
  remember(memory){
    console.log("I remember...")
    console.log(memory)
    this.morale += memory.positivity
  }
}

class Memory {
  // AXES OF MEMORY
  // x: valentus, power & competence.         degree to which the memory effects performance
  // y: affectus, emotional intensity.        
  // z: impetus, impulse and drive to action. 
  constructor(sphere,intensity,positivity) {
    this.x = 0; //|| x;
    this.y = 0; //|| y;
    this.z = 0; //|| z;
    this.intensity = intensity || 0; // weight memories based on intensity. 
                                     // higher intensity memories fire more often.
    this.positivity = positivity || 0; // emotional response, affects golem morale.
    this.sphere = sphere || "idleness";
  }
  static Spheres = [
    "idleness",
    "violence",
    "benevolence",
    "industry",
  ];
}

//let spheres = [
//  "violence",
//  "benevolence",
//  "industry",
//]

//let testArray = [];
let mind = new Metatron();

mind.createMemory("violence",10,-3);
mind.createMemory("benevolence",5,5);
//console.log(mind.callRandomMemory())
//console.log(mind.qtyMemsBySphere("idleness"))
mind.remember(mind.callRandomMemory())
console.log(mind.morale)
//console.log(testArray.find(v => v.x === 0));
//console.log(testArray.findIndex(v => v.x === 0));
//console.log(testArray.find(v => v.x >= 3))
//
//function generateRandomMemory() {
//  let memory = new Memory(
//    spheres[Math.round(Math.random(spheres.length))])
//        Math.round(Math.random()*10), 
//        Math.round(Math.random()*10), 
//        Math.round(Math.random()*10);
//  return memory;
//}

//for(let i = 0; i < 10; i++) {
//  mind.memories.push(generateRandomMemory())
//}
//
//function countSpheres(memoryArray,sphereToFilterBy) {
//  let sphereCounter = memoryArray.filter(v => v.sphere === sphereToFilterBy);
//  return sphereCounter;
//}

//let sphereCount = countSpheres(mind.memories,"violence");
//console.log(sphereCount);

//let violentMemories = sphereCount.length;
//console.log("There were " + violentMemories + " violent memories.");

//console.log(mind.callRandomMemory());
//console.log(mind.Spheres);
//mind.checkSpheres();

