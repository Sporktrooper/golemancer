class Metatron {
  constructor() {
    this.matrix = [[[]]];
    this.matrix2 = [];
  }
}

class Memory {
  constructor(x,y,z,sphere) {
    this.x = 0 || x;
    this.y = 0 || y;
    this.z = 0 || z;
    this.intensity = 0;
    this.positivity = 0;
    this.sphere = "" || sphere;
  }
}


//let testArray = [],
//    cubeSize = 10;
//for(let i = 0; i < cubeSize; i++) {
//  testArray.push([]);
//  for(let j = 0; j < cubeSize; j++) {
//    testArray[i].push([])
//  }
//}
//
//function addTo3DArray(cube,x,y,z,obj) {
//  if(x < cube.length && y < cube.length && z < cube.length) {
//    cube[x][y][z] = obj; 
//  } else if(x || y || z > cube.length) {
//    
//  } else {
//    
//  }
//}
//
//addTo3DArray(testArray,4,2,8,"find me");
//console.log(testArray[4][2][8])

let spheres = [
  "violence",
  "benevolence",
]

let testArray = [];

console.log(testArray.find(v => v.x === 0));
console.log(testArray.findIndex(v => v.x === 0));

function generateRandomMemory() {
  let memory = new Memory(Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10), spheres[Math.round(Math.random(spheres.length))]);
  testArray.push(memory);
}

for(let i = 0; i < 10; i++) {
  generateRandomMemory();
}

console.log(testArray);

console.log(testArray.find(v => v.x >= 3))