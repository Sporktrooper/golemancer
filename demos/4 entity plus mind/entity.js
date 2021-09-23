class Entity {
  constructor(name) {
    this.name = name || "Unnamed Entity";
    this.contents = []
    this.environment = { name: "limbo" };
    this.mind = new Metatron(this)
  }
}

class Environment extends Entity {
  constructor(name) {
    super(name || "Unnamed Environment");
  }
  addEntityToEnvironment(entity) {
    this.contents.push(entity);
    entity.environment = this;
  }
}

class Actor extends Entity {
  constructor(name) {
    super(name || "Unnamed Actor");
  }
  take(object) {
    let objectIndexInEnvironment = this.environment.contents.indexOf(object)
    console.log(objectIndexInEnvironment);
    this.contents.push(object);
    this.environment.contents.pop(objectIndexInEnvironment);
    
    
    if(this.contents.includes(object)) {
      this.mind.createMemory("industry",1,1,"took " 
                             + object.name 
                             + " from " 
                             + this.environment.name
                            );
    }
  }
  drop(entity) {
    this.contents.pop(entity);
    this.environment.addEntityToEnvironment(entity,this.environment);
    this.mind.createMemory("industry",1,1,"dropped " 
                       + entity.name 
                       + " into " 
                       + this.environment.name
                      );
  }
  give(recipient,objToGive) {
    recipient.take(objToGive);
    this.contents.pop(objToGive);
    this.mind.createMemory("industry",1,1,"gave " 
                       + objToGive.name 
                       + " to " 
                       + recipient.name
                      );
  }
}
