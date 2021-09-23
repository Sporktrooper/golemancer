
let firstCard = document.querySelector('.unitCard').cloneNode(true),
    gameContainer = document.querySelector("#gameContainer"),
    points = new Resource("Points",document.querySelector("#resources")),
    rocks = new Resource('Rocks',document.querySelector('#resources'));

let actions = {};
actions['makePoint'] = (actor) => {
  points.update(1);
  console.log(actor);
}
actions['spendPoint'] = () => {
  points.update(-1);
}
actions['collectRock'] = (qty) => {
  rocks.update(qty || 1);
}
actions['sellRock'] = function() {
  points.update(rocks.qty);
  rocks.update(-rocks.qty);
  console.log(this);
}

let secondDevice = new Device(actions);
secondDevice.name = "Test Device #2";

let testCard = new UnitCard(secondDevice);
gameContainer.appendChild(testCard.elt);

testCard._actionMenu.makeButton('makePoint',"Make points");
testCard._actionMenu.makeButton('spendPoint',"Spend points");

let newActionButton = document.createElement('div');
newActionButton.classList.add('actionButton');
newActionButton.innerHTML = "New button"
testCard.actionMenu.appendChild(newActionButton);
newActionButton.dataset.action = 'testAction';

let newDupedButton = newActionButton.cloneNode(true);

let collectRocks = new ActionButton('collectRock',"Collect rocks");
testCard._actionMenu.attachButton(collectRocks);

testCard._actionMenu.makeButton('sellRock',"Sell rocks");