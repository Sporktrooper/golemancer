var mapGrid = createArray(10,10); // create a 2d array to hold the map elements

function createArray(length) { 
  // createArray(arg1, arg2, arg3, ..., argN) = create multidemsional array
  // my first func copied from stackexchange!
    let arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

function buildMap() {
  // get the array, the map container, and the pre-filled map tile(s)
  let map = document.getElementById("map");
  let mapPalette = document.getElementById("map-palette");
  let mapCellEmpty = mapPalette.children[0];
  let mapCellBlocked = mapPalette.children[1];
  mapPalette.style.display = "none";
  
  console.log(mapPalette);
  
  for(i = 0; i < 10; i++){
    // fill the map grid with tiles. x and y are backwards from i and j
    for(j = 0; j < 10; j++){
      if(Math.random() > 0.1) {
        var newCell = mapCellEmpty.cloneNode(true);
      } else {
        var newCell = mapCellBlocked.cloneNode(true)
      }
      // newCell.innerHTML = j + " " + i;
      mapGrid[j][i] = newCell;
      map.appendChild(newCell);
    }
  }
}



class Player {
  // player class, an entity that exists on the map grid
  // has a div on the dom that is appended to whatever map cell is described in .location
  constructor() {
    this.name = "new player"
    this.symbol = "@"
    this.location = [5, 5]; // x, y on map grid
    this.element = document.getElementById("player");
    
    placeEntity(this.element,this.location[0],this.location[1]);
  }
  
  go(dir) {
    // handles movement one tile at a time based on cardinal direction
    switch(dir) {
      case "up":
        if (this.location[1] > 0 
            && (mapGrid[this.location[0]][this.location[1] - 1]).dataset.traversable != "false") {
          this.location[1] -= 1;
          placeEntity(this.element,this.location[0],this.location[1]);
        }
        break;
        
      case "down":
        if (this.location[1] < mapGrid.length - 1 
            && (mapGrid[this.location[0]][this.location[1] + 1]).dataset.traversable != "false") {
          this.location[1] += 1;
          placeEntity(this.element,this.location[0],this.location[1]);
        }
        break;
        
      case "left":
        if (this.location[0] > 0
            && (mapGrid[this.location[0] - 1][this.location[1]]).dataset.traversable != "false") {
          this.location[0] -= 1;
          placeEntity(this.element,this.location[0],this.location[1]);
        }
        break;
      
      case "right":
        if (this.location[0] < mapGrid.length -1
            && (mapGrid[this.location[0] + 1][this.location[1]]).dataset.traversable != "false") {
          this.location[0] += 1;
          placeEntity(this.element,this.location[0],this.location[1]);
        }
        break;
        
      default:
        
        break;
    }
  }
}

buildMap();

let player = new Player();


function placeEntity(entity,x,y) {
  // place an entity on any given map grid coord
  mapGrid[x][y].appendChild(entity);
}

document.addEventListener('keydown', (e) => {
  // handle keyboard input
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