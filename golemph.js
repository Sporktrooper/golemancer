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
var dummytext;
var ticks = 0;
var hourglass;

function preload ()
{
  this.load.image('golem', 'assets/golem-1.jpg');  
}

function create ()
{
  golemimage = this.add.sprite(400,300,'golem').setInteractive();
  dummytext = this.add.text(0,0,'Hello world',{font: "14pt Arial"});
  hourglass = Date.now();

  golemimage.on('pointerdown', function (pointer) {

    this.setTint(0xff0000);
  });

  golemimage.on('pointerout', function (pointer) {

    this.clearTint();
  });

  golemimage.on('pointerup', function (pointer) {

    this.clearTint();
  })
}

function update ()
{
  rotateImage();
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
  golemimage.angle += 1;
}















