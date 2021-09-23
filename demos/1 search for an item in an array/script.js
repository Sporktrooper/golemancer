let testArray = [
  {
    name: "alpha",
    type: ['item','weapon']
  },
  {
    name: "beta",
    type: ['item','gadget']
  },
  {
    name: "gamma",
    type: ['test']
  }
];

//console.log(testArray);

//let testArrayFiltered = testArray.filter(element => element.name == "alpha");
//console.log(testArrayFiltered);

for (let i = 0; i < testArray.length; i++) {
  if(testArray[i].name == "gamma") {
//    console.log("name: " + testArray[i].name + " at " + i)
  }
}

let isFound = testArray[0].type.includes('item');
//console.log(isFound);

function find(tag) {
  console.log('searching test array for ' + tag)
  for (let i = 0; i < testArray.length; i++) {
    if(testArray[i].type.includes(tag)) {
      console.log(testArray[i].name + " is a " + tag)
    }
  }
}

find('weapon');