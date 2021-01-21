
let firstCard = document.querySelector('.unitCard').cloneNode(true),
    gameContainer = document.querySelector("#gameContainer"),
    points = new Resource("Points",document.querySelector("#resources"));

let actions = {};
actions['makePoint'] = () => {
  points.update(1);
  console.log(this);
}
actions['spendPoint'] = () => {
  points.update(-1);
}

let firstDevice = new Device(actions),
    secondDevice = new Device(actions);
firstDevice.name = "Test Device #1";
secondDevice.name = "Test Device #2";

let testCard = new UnitCard(secondDevice);
gameContainer.appendChild(testCard.elt);

testCard._actionMenu.makeButton('makePoint',"Make points","Making points");
testCard._actionMenu.makeButton('spendPoint',"Spend points","Spending points");