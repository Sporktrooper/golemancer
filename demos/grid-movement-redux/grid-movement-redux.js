function Array2D(x, y) {
    var array2D = new Array(x);
    for(var i = 0; i < array2D.length; i++)
    {
        array2D[i] = new Array(y);
    }
    return array2D;
}
function move(dir) {
  switch (dir) {
    case 'ArrowUp':
      if (player.y > 0 && grid[player.y - 1][player.x].occupied != true) {
        grid[player.y][player.x].occupied = false;
        playerPos(player.x, player.y - 1);
        itemCheck(player.x, player.y);
//        console.log(player.x + "," + player.y)
        }
      break;
    case 'ArrowDown':
      if (player.y < rows.length - 1 && grid[player.y + 1][player.x].occupied != true) {
        grid[player.y][player.x].occupied = false;
        playerPos(player.x,player.y + 1)
        itemCheck(player.x, player.y);
//        console.log(player.x + "," + player.y)
        }
      break;
    case 'ArrowLeft':
      if (player.x > 0 && grid[player.y][player.x - 1].occupied != true) {
        grid[player.y][player.x].occupied = false;
        playerPos(player.x - 1, player.y)
        itemCheck(player.x, player.y);
//        console.log(player.x + "," + player.y)
        }
      break;
    case 'ArrowRight':
      if (player.x < grid[0].length - 1 && grid[player.y][player.x + 1].occupied != true) {
        grid[player.y][player.x].occupied = false;
        playerPos(player.x +1 ,player.y)
        itemCheck(player.x, player.y);
//        console.log(player.x + "," + player.y)
        }
      break;
    default:
      // not a movement key, do nothing
      break;
  }
  console.log(player.x + "," + player.y)
}
function playerPos(x,y) {
  grid[y][x].appendChild(player);
  grid[y][x].occupied = true;
  player.x = x;
  player.y = y;
}

let player = document.createElement('div');
player.id = 'player';

let gridSize = 9
let grid = new Array2D(gridSize,gridSize),
    rows = new Array(),
    gameContainer = document.querySelector('#gameContainer');

let mapObjects = new Array();

for (let i = 0; i < grid.length; i++) {
  rows[i] = document.createElement('tr')
  for (let j = 0; j < grid.length; j++) {
    grid[i][j] = document.createElement('td');
    rows[i].appendChild(grid[i][j]);
  }
}

let gridElt = document.createElement('table')
for (let i = 0; i < rows.length; i++) {
  gridElt.appendChild(rows[i]);
}
gameContainer.appendChild(gridElt);

playerPos(Math.floor(grid.length/2),Math.floor(grid.length/2));

//document.addEventListener('key')


document.addEventListener('keyup',(e) => {
  if(e.key == 'ArrowUp' || 'ArrowDown' || 'ArrowLeft' || 'ArrowRight') {
    move(e.key);
  }
});

function placeBlocker(x, y) {
  let blocker = document.createElement('div');
  blocker.classList.add('block');
  grid[y][x].appendChild(blocker);
  grid[y][x].occupied = true;
  
}

function placeBlockers(qty) {
  for (let i = 0; i < qty; i++) {
    let x = Math.floor(Math.random() * grid[0].length)
    let y = Math.floor(Math.random() * rows.length)
    if (!grid[y][x].occupied && !grid[y][x].firstChild) {
      placeBlocker(x, y); 
    } else {
      i--;
    }
  }
}

class Pickup {
  constructor(x,y) {
    this.elt = document.createElement('div');
    this.elt.classList.add('pickup');
    grid[y][x].appendChild(this.elt);
  }
}

let pickup = document.createElement('div');
let pickup2 = document.createElement('div');
pickup.classList.add('pickup');
pickup2.classList.add('pickup');
grid[0][0].appendChild(pickup);
grid[3][8].appendChild(pickup2);

placeBlockers(10);

function itemCheck(playerX,playerY) {
  console.log('check for items');
  if(grid[player.y][player.x].firstChild){
    if(grid[player.y][player.x].firstChild.classList.contains('pickup')){
      console.log('pickup found');
      grid[player.y][player.x].removeChild(grid[player.x][player.y].firstChild);
    }
  }
}
