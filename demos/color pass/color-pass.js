function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p]+type, callback, false);
    }
}

class Entity {
  constructor () {
    this.position = {x: 0, y: 0};
    this.size = {x: 0, y: 0}
    this.color = "#ccc";
    this.element = document.createElement("div");
    this.element.style.backgroundColor = this.color;
    this.element.classList.add("entity");
  }
  move(location) {
    this.position = location;
    this.element.style.left = location.x + "em" || this.position.x;
    this.element.style.top = location.y + "em" || this.position.y;
  }
  moveAnimated(location) {
    let x = location.x;
    let y = location.y;
    this.element.animate([
      { transform: 'translateX(' + this.position.x + 'em' + ')',
        transform: 'translateY(' + this.position.y + 'em' + ')'
      },
      
      { transform: 'translateX(' + x + 'em)',
        transform: 'translateY(' + y + 'em)'
      }
    ], 
      {  
        duration: 1000,
        fill: "forwards"
      
      });
  }
}

let a = new Entity();
let field = document.querySelector(".field")

field.appendChild(a.element);

//a.move({x: 2, y: 10});

//a.moveAnimated({x:1,y:1},1000);
a.moveAnimated({x:10,y:1},1000);
//a.moveAnimated({x:20,y:10},2000);
