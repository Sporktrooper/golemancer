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
var golemimage;
var dummytext = "";
var ticks = 0;
var hourglass = Date.now();

function preload ()
{
  this.load.image('golem', 'assets/golem-1.jpg');  
  this.load.image('lightbulb', 'assets/light.gif');
}

function create ()
{

  golemimage = this.add.sprite(400,300,'golem').setInteractive();
  
  golemimage.on('pointerdown', function (pointer) {

    this.setTint(0xff0000);
    rotateImage();
  });

  golemimage.on('pointerout', function (pointer) {

    this.clearTint();
  });

  golemimage.on('pointerup', function (pointer) {

    this.clearTint();
  });

  lightbulb = this.add.sprite(0,0,'lightbulb').setInteractive();

  lightbulb.on('pointerdown', function (pointer) {
    clickedBulb();
  });
}

function update ()
{
  // rotateImage();
  debugText();
}

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
                  + (Date.now() - hourglass);
  hourglass = Date.now();
}

function rotateImage(){
  golemimage.angle += 10;
}

function clickedBulb(){
  switch (lightbulb.state){
    
    case null:
      
      // Lightbulb state undefined, turn it on

      lightbulb.state = true;
      this.setTint(0x00ff00);
      console.log(lightbulb.state);

      break;

    case true:

      // Lightbulb is on

      lightbulb.state = false;
      this.setTint(0xff0000);
      console.log(lightbulb.state);

      break;

    case false:

      // Lightbulb is off

      lightbulb.state = true;
      this.setTint(0x00ff00)
      console.log(lightbulb.state);

    default: 
      // Wtf
      console.log("dun goofed");
  }
}













