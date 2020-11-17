let number = 0;
let cursors = 0;

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

