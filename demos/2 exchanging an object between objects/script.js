class Entity {
  constructor(name) {
    this.name = name || "Unnamed Entity";
    this.contents = []
    this.environment = { name: "limbo" };
  }
}

class Environment extends Entity {
  constructor(name) {
    super(name || "Unnamed Environment");
  }
}

class Actor extends Entity {
  constructor(name) {
    super(name || "Unnamed Actor");
  }
  take(object) {
    addLogLine(this.name + " takes " + object.name);
    this.contents.push(object);
    
    let objectIndexInEnvironment = this.environment.contents.indexOf(object.name)
//    console.log(this.environment.contents)
    this.environment.contents.pop(objectIndexInEnvironment);
    
    
    if(this.contents.includes(object)) {
      addLogLine(this.name + " has " + object.name);
    }
  }
  drop(entity) {
    addLogLine(this.name + " tries to drop " + entity.name)
//    console.log(this.contents);
    this.contents.pop(entity);
    addEntityToEnvironment(entity,this.environment);
  }
  give(recipient,objToGive) {
    addLogLine(this.name + " gives " + objToGive.name + " to " + recipient.name);
    recipient.take(objToGive);
    this.contents.pop(objToGive);
  }
}

let logList = document.querySelector('#logList');

let alpha = new Actor('Alpha'),
    beta = new Actor('Beta'),
    ball = new Entity('ball'),
    cube = new Entity('cube');

function addLogLine(logText) {
  let newli = document.createElement('li');
  newli.innerHTML = logText;
  logList.appendChild(newli);
}
function addEntityToEnvironment(entity,environment) {
  environment.contents.push(entity);
  entity.environment = environment;
  addLogLine(entity.name + ' added to ' + environment.name)
}

let testEnvironment = new Environment('a small room');
addLogLine(testEnvironment.name + ' created')

addEntityToEnvironment(alpha,testEnvironment);
addEntityToEnvironment(beta,testEnvironment);
addEntityToEnvironment(ball,testEnvironment);
addEntityToEnvironment(cube,testEnvironment);

alpha.take(cube);
alpha.take(ball);
alpha.drop(ball);
alpha.give(beta,cube);
beta.take(ball);
beta.give(alpha,ball);
beta.take(cube);