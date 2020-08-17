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

function preload ()
{
  this.load.image('golem', 'assets/golem-1.jpg');  
  this.load.image('lightbulb', 'assets/light.gif');
  this.load.image('grayBar', 'assets/grayBar.gif');
  this.load.image('grayBorder', 'assets/grayBorder.gif');
  this.load.image('arrow', 'assets/arrow.gif');
}

function create ()
{

  
  
  substanceMeter = this.add.image(120, 540, 'grayBar');
  substanceMeter.setTint('0x3333aa');
  substanceMeter.setOrigin(0.5,0.5);
  substanceMeter.fillQty = 0;
  substanceMeter.scaleY = substanceMeter.fillQty;

  this.substanceMeterBorder = this.add.image(130,550, 'grayBorder');
  this.substanceMeterBorder.setOrigin(0.5,0.5);
  this.substanceMeterBorder.setTint('0xb19d12')

  transmutationArrow = this.add.image(240, 290, 'arrow');

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
    console.log(substanceMeter.fillQty);
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

function clickedBulb(){
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










