let points = document.querySelector("#points");
points.val = 0;

let newBarCost = document.querySelector("#newBarCost");
newBarCost.val = 0;

let bars = new Array;
let addBarButton = document.querySelector("#btnAddBar");
addBarButton.addEventListener("click", function() {
  if(points.val >= newBarCost.val){
    bars.push(new ProgressBar("#container"));
    points.val -= newBarCost.val;
    points.innerHTML = points.val;
    newBarCost.val = Math.floor(bars.length * 1.6);
    newBarCost.innerHTML = newBarCost.val;
  }
  
});

let lineTedium = document.createElement("div");
let btnReduceTedium = document.createElement("button");
btnReduceTedium.innerHTML = "Reduce Tedium";
lineTedium.cost = document.createElement("span");
lineTedium.costValue = document.createElement("span");
lineTedium.costValue.innerHTML = 10;
lineTedium.cost.innerHTML = " Cost: " + lineTedium.costValue.innerHTML;
btnReduceTedium.addEventListener("click", e => addFeature("reduceTedium"));

//document.querySelector("#buttons").appendChild(lineTedium);
lineTedium.appendChild(btnReduceTedium);
lineTedium.appendChild(lineTedium.cost);

ProgressBar.prototype.finished = function() {
  this.bar.classList.remove("full");
  points.val++;
  points.innerHTML = points.val;
  if (points.val >= 10) {
    document.querySelector("#buttons").appendChild(lineTedium);
  }
}

function addFeature (feature) {
  switch (feature) {
    case "reduceTedium":
      points.val -= lineTedium.costValue.innerHTML;
      points.innerHTML = points.val;
      document.querySelector("#buttons").removeChild(lineTedium);
      autoClick();
      break;
    default:
      console.log("no features to add with the name " + feature);
      break;
  }
}

function autoClick() {
  
  let autoClicker = setInterval(function() {
    let autoBars = bars.slice();
    for(let i = 0; i < bars.length; i++){
//      if(autoBars[i].classList.contains("full")) {
//        autoBars.splice(i,1);
//        console.log(autoBars[i]);
//      }
      let clickIndex = Math.floor(Math.random() * autoBars.length)
//      console.log(clickIndex);
      console.log(autoBars[clickIndex]);
      
    }
  },1000)
}