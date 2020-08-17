var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    fps: { target: 30 },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var debug = true;
var mdText;

var substanceMeter = {};
var transmutationArrow = {};
transmutationArrow.state = false;

function preload ()
{
  this.load.image('golem', 'assets/golem-1.jpg');  
  this.load.image('lightbulb', 'assets/light.gif');
  this.load.image('grayBar', 'assets/grayBar.gif');
  this.load.image('grayBorder', 'assets/grayBorder.gif');
  this.load.image('arrow-button', 'assets/arrow-button.png');
}

function create ()
{

  
  
  substanceMeter = this.add.image(120, 610, 'grayBar');
  substanceMeter.setTint('0x3333aa');
  substanceMeter.setOrigin(0.5,1);
  substanceMeter.fillQty = 0;
  substanceMeter.scaleY = substanceMeter.fillQty;
  substanceMeter.capacity = 50;


  substanceMeterBorder = this.add.image(120,360, 'grayBorder');
  substanceMeterBorder.setOrigin(0.5, 0.5);
  substanceMeterBorder.setTint('0xb19d12');


  transmutationArrow = this.add.sprite(240, 290, 'arrow-button').setInteractive();
  transmutationArrow.setOrigin(0.5, 0.5);
  transmutationArrow.angle = 90;
  transmutationArrow.setTint('0xff0000');
  transmutationArrow.on('pointerdown', function(pointer){
    this.setTint('0xffffff');
    //transfer(substanceMeter.fillQty * 
  });

  transmutationArrow.on('pointerup', function(pointer){
    this.clearTint();
  });

  if(debug == true){ mdText = this.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' }); }

}

function update ()
{

  var pointer = this.input.activePointer;

  mdText.setText([
    'x: ' + pointer.x,
    'y: ' + pointer.y    
  ]);

  substanceMeter.scaleY = substanceMeter.fillQty;
  if(substanceMeter.fillQty <= 1){
    substanceMeter.fillQty += 0.001
    if(debug == true){ console.log(substanceMeter.fillQty) };
  }

}


// OLD SHIT, kept for reference

function debugText(){
  ticks++;
  dummytext.text = 'hello world ' 
                  + game.loop.targetFps 
                  + ' ' 
                  + Math.round(game.loop.actualFps) 
                  + ' ' 
                  + game.loop.framesThisSecond 
                  + ' ' 
                  + ticks 
                  + ' ' 
                  + (Date.now() - hourglass); // debug text, displays desired fps, actual fps, ticks since start, etc
  hourglass = Date.now();
}

function rotateImage(){
  golemimage.angle += 10;
}

function toggleButton(){
  switch (lightbulb.state){

    case true:

      // Lightbulb is on

      lightbulb.state = false;
      lightbulb.setTint(0xff0000);
      console.log(lightbulb.state);

      break;

    case false:

      // Lightbulb is off

      lightbulb.state = true;
      lightbulb.setTint(0x00ff00);
      console.log(lightbulb.state);

      break;

    default: 

      // Lightbulb state undefined, turn it on

      lightbulb.state = true;
      lightbulb.setTint(0x00ff00);
      console.log(lightbulb.state);
      // console.log("dun goofed");
  }
}

function transfer(substanceSource, substanceQty, substanceDestination){
  // substanceSource: the container that is providing the substance
  // substanceQty: container capacity * scaleY of fill. ex: 0.89 * 50 = 44.5
  // substanceDestination: the new container for the substance after transfer
}







