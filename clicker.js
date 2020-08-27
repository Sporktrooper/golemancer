let number = 0;
let cursors = 0;

let mapText = "";

var mapGrid = createArray(10,10);


function clickButton(i) {
  number = number + i;
  document.getElementById("number").innerHTML = number;
}

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(cookies >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	cookies = cookies - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('cookies').innerHTML = cookies;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

function buyCursor2() {
  let cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
  if (number >= cursorCost) {
    cursors += 1;
    number -= cursorCost;
    document.getElementById('cursors').innerHTML = cursors;
    document.getElementById('number').innerHTML = number;
  }
  
  document.getElementById('cursorCost').innerHTML = Math.floor(10 * Math.pow(1.1,cursors));
}

function save() {
  let save = {
    number: number,
    cursors: cursors
  }
  console.log("save ran")
  
  localStorage.setItem("save", JSON.stringify(save));
}

function load() {
  let saveGame = JSON.parse(localStorage.getItem("save"));
  console.log("load ran");
}

function deleteSaves() {
  localStorage.removeItem("save");
  console.log("saves deleted")
}

window.setInterval(function() {
  clickButton(cursors);
}, 1000);

function buildMap() {
  let map = document.getElementById("map");
  let mapCell = map.childNodes[1];
  mapCell.classList.add("map-cell");
  
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
        this.location[0] -= 1;
        placeEntity(this.element,this.location[0],this.location[1]);
        console.log("went up" + " " + this.location[0]);
        break;
        
      case "down":
        this.location[0] += 1;
        placeEntity(this.element,this.location[0],this.location[1]);
        console.log("went down" + " " + this.location[0]);
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