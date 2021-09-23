
let firstCard = document.querySelector('.unitCard').cloneNode(true),
    gameContainer = document.querySelector("#gameContainer"),
    resources = {},
    progress = {
      crush: false,
      metalExtractor: false,
    },
    devices = [];

resources.rocks = new Resource('Rocks',document.querySelector('#resources'));

let actions = {};
actions['collectRock'] = (actor) => {
  if(actor.spendEndurance(1)) {
    resources.rocks.update(1);
  }
  if(!progress.crush) {
    checkProgression();
  }
}
actions['addCrusher'] = (actor) => {
  actor.unitCard._actionMenu.makeButton('crushRock','Crush rocks');
  resources.powderedStone = new Resource('Powdered Stone',document.querySelector('#resources'));
  actor.action = '';
  actor.unitCard._actionMenu.removeButton();
}
actions['crushRock'] = (actor) => {
  if(resources.rocks.qty >= 10 && actor.spendEndurance(5)) {
    resources.rocks.update(-10);
    resources.powderedStone.update(5)
  }
  checkProgression();
}
actions['addMagnet'] = (actor) => {
  actor.unitCard._actionMenu.makeButton('extractIron',"Extract iron")
  resources.ironOre = new Resource('Iron Ore',document.querySelector('#resources'));
  actor.action = '';
  actor.unitCard._actionMenu.removeButton();
}
actions['extractIron'] = (actor) => {
  if (resources.ironOre && resources.powderedStone.qty > 5 && actor.spendEndurance(5)) {
    resources.powderedStone.update(-5);
    resources.ironOre.update(Math.round(Math.random() * 5))
  }
 }






let starterDevice = new Device(actions);
devices.push(starterDevice);
starterDevice.name = "Rock Collector";
starterDevice.unitCard = new UnitCard(starterDevice);
starterDevice.unitCard.update('description',"A self-propelled device capable of collecting rocks");

gameContainer.appendChild(starterDevice.unitCard.elt);


//testCard._actionMenu.makeButton('makePoint',"Make points");
//testCard._actionMenu.makeButton('spendPoint',"Spend points");
//testCard._actionMenu.makeButton('sellRock',"Sell rocks");

let collectRocks = new ActionButton('collectRock',"Collect rocks");
starterDevice.unitCard._actionMenu.attachButton(collectRocks);

let addCrusher = new ActionButton('addCrusher',"Add a rock crushing tool")


//let advancedConstructorTest = new Device(actions,900,8,0.7)

function checkProgression() {
  if (!progress.crush && resources.rocks.qty >= 10 ) {
      let addCrusher = new ActionButton('addCrusher',"Add crusher")
      progress.crush = true;
      devices.forEach(element => {
         element.unitCard._actionMenu.attachButton(addCrusher);
    })
  }
  if (resources.powderedStone && !progress.metalExtractor) {
    if (!progress.metalExtractor && resources.powderedStone.qty >= 10) {
      progress.metalExtractor = true;
      let metalExtractor = new Device(actions,2000,20,0.4);
      devices.push(metalExtractor);
      metalExtractor.name = "Metal Extractor";
      metalExtractor.unitCard = new UnitCard(metalExtractor);
      metalExtractor.unitCard.update('description',"A machine for extracting metals from powdered stone");
      gameContainer.appendChild(metalExtractor.unitCard.elt);
      let addMagnet = new ActionButton('addMagnet',"Install a lodestone sieve");
      devices[1].unitCard._actionMenu.attachButton(addMagnet);
    }
  }
}