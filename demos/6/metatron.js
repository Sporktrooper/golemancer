class Metatron {
  // required class: Memory
  constructor(body) {
    this.body = body;
    this.memories = [];
    this.morale = 0;
  }
  callRandomMemory() {
    return this.memories[Math.floor(Math.random()*this.memories.length)]
  }
  createMemory(sphere,intensity,positivity,comment) {
    let newMemory = new Memory(sphere,intensity,positivity)
    newMemory.comment = comment;
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