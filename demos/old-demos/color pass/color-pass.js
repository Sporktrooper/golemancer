// a system allowing entities to hold items/other entities and pass their reference between one another and look at items/entities held by others.

class Entity {
  constructor() {
    this.name = "Unnamed Entity"
    this._obj = this;
    this._element = document.createElement("div");
    this._parent = {};
    this._canSee = new Array();
    this._contents = new Array();
  }
  set parent(newParent){
    newParent._element.appendChild(this._element);
    this._parent = newParent;
  }
  moveTo(location){
    this._position = location;
    this._element.style.left = location.x + "em" || this.position.x;
    this._element.style.top = location.y + "em" || this.location.y;
  }
  lookAt(otherEntity) {
    this._canSee = otherEntity._contents;
  }
  lookFor(entityByName) {
    let soughtItem = this._canSee.find(element => element.name == entityByName);
    return soughtItem;
  }
  set cssClass(cssClass) {
    this._element.classList.toggle(cssClass);
  }
  // requestItem - triggers the other party's giveItem
  requestItem(item, holder) {
    holder.giveItem(item, this);
  }
  // receiveItem - adds item to contents
  receiveItem(item) {
    // should not be used at runtime, only during setup. doing this during runtime does not perform any inventory checks. it should only be called when creating new items or attaching orphaned items. it will be called by giveItem or requestItem as needed.
    this._contents.push(item);
    item.parent = this;
//    console.log(this.name + " received the " + item.name)
  }
  // giveItem - triggers the other party's receiveItem
  giveItem(item, recipient) {
    let itemToGive = this._contents.find(element => element == item);
    recipient.receiveItem(itemToGive);
    this._contents.splice(this._contents.indexOf(itemToGive),1);
  }
}

let main = new Entity();
main._element = document.querySelector(".main")
let field = new Entity();
field.name = "Playing Field";

let a = new Entity();
a.name = "Alfa";
a.cssClass = "player"
a.parent = field
a.moveTo({x:5,y:15})

let b = new Entity();
b.name = "Betta";
b.cssClass = "player2"
b.parent = field
b.moveTo({x:30,y:15})

let ball = new Entity();
ball.name = "ball";
ball.cssClass = "ball";
ball.parent = field;


field.receiveItem(a);
field.receiveItem(b);
field.receiveItem(ball);

field.parent = {_element: document.querySelector("body")};
field.cssClass = "field";

a.requestItem(ball,field);

function playGame(players,ball){
  let ballHolder = ball._parent
  let catchers = new Array();
  for (let i = 0; i < players.length; i++){
    if(!players[i]._contents.find(element => element == ball)){
      catchers.push(players[i])
    }
  }
  ballHolder.giveItem(ball,catchers[0]);
  ballHolder.changeColor();
}

let game = setInterval(() => playGame([a,b],ball),300);

Entity.prototype.changeColor = function() {
    ball._element.style.backgroundColor = "rgb(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ")";
}