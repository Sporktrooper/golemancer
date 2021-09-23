class Entity {
  constructor(name,element) {
    this.name = name || "Unnamed Entity";
    this.contents = document.createElement("div");
    this.environment = { name: "limbo" };
    this.element = element || document.createElement("div");
    this.element.appendChild(this.contents);
  }
}

class Environment extends Entity {
  constructor(name,element) {
    super(name || "Unnamed Environment",element);
//    this.element.appendChild(this.contents);
  }
  addEntityToEnvironment(entity) {
    this.contents.appendChild(entity.element);
    entity.environment = this;
  }
}

class Actor extends Entity {
  constructor(name,element) {
    super(name || "Unnamed Actor",element);
    this.mind = new Metatron(this)
  }
  take(object) {
    if(this.environment == object.environment){
      this.contents.appendChild(object.element);
      object.environment = this.contents;
    }
  }
  drop(object) {
    this.environment.contents.appendChild(object.element);
    object.environment = this.environment;
  }
  give(recipient,objToGive) {
    recipient.contents.appendChild(objToGive.element);
    objToGive.environment = recipient.contents;
  }
}