// skill toy idea
//    retractable lanyard with a weighted end.
//    the lanyard cable passes through the center 
//    of a free-spinning fidget spinner     

let mover = document.querySelector("#mover");
let body = document.querySelector("body");
let container = document.querySelector("#container");
body.bg = [4, 9, 4]

let score = {};
score.element = document.querySelector("#score");
score.value = 0;


class Mob {
  constructor (x, y) {
    this._locationX = x || 0;
    this._locationY = y || 0;
    
    this._element = document.createElement("div");
    this._element.classList.add("box");
    this._element.style.left = this._locationX + "em";
    this._element.style.top = this._locationY + "em";
    this._element.obj = this;
    this._element.addEventListener("click", function() {
      this.style.visibility = "hidden";
      score.value++;
      score.element.innerHTML = score.value;
      console.log(this.obj);
    });
    document.querySelector("#container").appendChild(this._element);
    
    
//    this._animation = {};
//    this._animation.bounce = [{
//      //from
//      top: this._locationY
//    },{
//      //to
//      top: (this._locationY - 1) + "em",
//    }],{
//      iterations: 3,
//      duration: 300,
//      direction: "alternate",
//    }
  }
  
  move (x,y) {
    this._element.animate([
      { //from 
        left: this._locationX + "em",
        top: this._locationY + "em"
      },
      { //to 
        left: (this._locationX + x) + "em",
        top: (this._locationY + y) + "em"
      }
    ],{
      iterations: 1,
      duration: 1000,
      
    })
    
    this._locationX += x;
    this._locationY += y;
    this._element.style.left = this._locationX + "em";
    this._element.style.top = this._locationY + "em";
    
  }
  
  bounce () {
    this._element.animate([
      { //from 
//        left: this._locationX + "em",
        top: this._locationY + "em",
        transform: "scale(1)"
      },
      { //to 
//        left: (this._locationX + x) + "em",
        top: (this._locationY + -0.1) + "em",
        transform: "scale(1.1)"
      }
    ],{
      iterations: 6,
      duration: 150,
      direction: "alternate",
      
    }); 
    
  }
  dash () {
    this._element.animate([
      { //from 
        left: this._locationX + "em",
//        top: this._locationY + "em",
        boxShadow: "0em 0em 0.1em 0.1em black"
        
      },
      { //to 
        left: (this._locationX + 10) + "em",
//        top: (this._locationY + -0.1) + "em",
//        transform: "scale(1.1)"
        boxShadow: "-10em 0em 0.2em 0.2em black"
      }
    ],{
      iterations: 1,
      duration: 150,
//      direction: "alternate",
      
    });
    
    this._locationX += 10;
    this._element.style.left = this._locationX + "em";
  }
}

//let testMob = new Mob();
//testMob.move(10,10);

class Level {
  constructor (mobsQty, mode) {
    this._mobs = new Array();
    for (let i = 0; i < mobsQty; i++) {
      let x = Math.floor(Math.random()*20)
      let y = Math.floor(Math.random()*20)
      let mob = new Mob(x,y);
      this._mobs.push(mob);
    }
  }
  moveMobs () {
    for(let i = 0; i < this._mobs.length; i++) {
      let mobY = this._mobs[i]._locationY;
      let mobX = this._mobs[i]._locationX;
      let newY = -10 + Math.floor(Math.random()*20)
      let newX = -10 + Math.floor(Math.random()*20)
      this._mobs[i].move(newX,newY)
    }
  }
}

let lv1 = new Level(10,"passive");