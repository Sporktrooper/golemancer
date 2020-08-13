var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
var vial;

function preload ()
{
  this.load.image('golem', 'assets/golem-1.jpg');  
  this.load.image('lightbulb', 'assets/light.gif');
  this.load.image('vial', 'assets/brass-vial-border.png');
  this.load.image('substance', 'assets/substance.gif');
  this.load.image('grayBar', 'assets/grayBar.gif');
  this.load.image('grayBorder', 'assets/grayBorder.gif');
}

function create ()
{

  // golemimage = this.add.sprite(400,300,'golem').setInteractive();
  
  // golemimage.on('pointerdown', function (pointer) {

  //   this.setTint(0xff0000);
  //   rotateImage();
  // });

  // golemimage.on('pointerout', function (pointer) {

  //   this.clearTint();
  // });

  // golemimage.on('pointerup', function (pointer) {

  //   this.clearTint();
  // });

  // lightbulb = this.add.sprite(200,200,'lightbulb').setInteractive();

  // lightbulb.on('pointerdown', function (pointer) {
  //   clickedBulb();
  // });


  // Create the brass vial frame and its properties
  var vialText = this.add.text(350, 250, '', { font: '16px Courier', tint: '#0xb19d12'});
  vial = this.add.image(150, 300, 'vial');
  vial.setDataEnabled();
  vial.data.set('name', 'Vial of Substance');
  vial.data.set('capacity', 50);
  vial.data.set('rate', 1);
  vial.fillQty = 0;
  
  vialText.setText([
    'Name: ' + vial.data.get('name'),
    'Capacity: ' + vial.data.get('capacity'),
    'Fill Rate: ' + vial.data.get('rate')
  ]); 

  this.substanceMeter = this.add.image(250, 465, 'grayBar');
  this.substanceMeter.setTint('0x3333aa');
  this.substanceMeter.setOrigin(1,1);
  this.substanceMeter.scaleY = vial.fillQty;

  this.substanceMeterBorder = this.add.image(250,465, 'grayBorder');
  this.substanceMeterBorder.setTint('0xb19d12')


  if(debug == true){ mdText = this.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' }); }

}

function update ()
{

  var pointer = this.input.activePointer;

  mdText.setText([
    'x: ' + pointer.x,
    'y: ' + pointer.y    
  ]);

  this.substanceMeter.scaleY = vial.fillQty;
  if(vial.fillQty <= 3.2){
    vial.fillQty += 0.05
    console.log(vial.fillQty);
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










