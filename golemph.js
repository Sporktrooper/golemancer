var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var clickCount = 0;
var clickCounter;


function preload ()
{
  this.load.image('golem', 'assets/golem-1.jpg');  
}

function create ()
{
  // game.stage.backgroundColor = '#124184';
  this.add.image(400,300,'golem');
  clickCounter = game.add.text(5,5, 'Total clicks: '+ clickCount, {fill: '#ffffff', font: '14pt Arial'});
  game.add.button(200, 150, 'button', actionOnClick, this);
}

function update ()
{
}

function actionOnClick()
{
  clickCount++;
  clickCounter.setText('Total clicks: ' + clickCount);
}