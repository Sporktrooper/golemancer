let mapText = "";

var mapGrid = createArray(10,10);

function buildMap() {
  let map = document.getElementById("map");
  let mapCell = map.childNodes[1];
  map.removeChild(map.childNodes[1]);
  
  
  for(i = 0; i < 10; i++){
    for(j = 0; j < 10; j++){
      let newCell = mapCell.cloneNode(true);
      mapGrid[i][j] = newCell;
      map.appendChild(newCell);
    }
  }
  

}

// create 2d array, my first func copied from stackexchange!
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

class Player {
  constructor() {
    this.name = "new player"
    this.symbol = "@"
    this.location = [0, 0];
    this.element = document.getElementById("player");
    
    placeEntity(this.element,this.location[0],this.location[1]);
  }
  
  go(dir) {
    switch(dir) {
      case "up":
        if (this.location[1] > 0 && !(this.location[1] > mapGrid.length)) {
          this.location[1] -= 1;
          placeEntity(this.element,this.location[0],this.location[1]);
          console.log("went up" + " " + this.location[1]);  
        } else {
          console.log("stopped at map boundary");
        }
        break;
        
      case "down":
        if (this.location[0] < mapGrid.length && !(this.location[0] > mapGrid.length)) {
        this.location[0] += 1;
        placeEntity(this.element,this.location[0],this.location[1]);
        console.log("went down" + " " + this.location[0]);
        } else {
          console.log("stopped at map boundary");
        }
        break;
        
      case "left":
        this.location[1] -= 1;
        placeEntity(this.element,this.location[0],this.location[1]);
        console.log("went left" + " " + this.location[1]);
        break;
      
      case "right":
        this.location[1] += 1;
        placeEntity(this.element,this.location[0],this.location[1]);
        console.log("went right" + " " + this.location[1]);
        break;
        
      default:
        console.log("we didn't go anywhere");
        break;
    }
  }
}

buildMap();

let player = new Player();


function placeEntity(entity,x,y) {
  mapGrid[x][y].appendChild(entity);
}

document.addEventListener('keyup', (e) => {
  switch(e.code) {
    case "ArrowUp": 
      player.go("up");
      break;
      
    case "ArrowDown":
      player.go("down");
      break;
      
    case "ArrowLeft":
      player.go("left");
      break;
      
    case "ArrowRight":
      player.go("right");
      break;
      
    default:
      break;
  }
});