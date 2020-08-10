var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    FPSConfig: { target: 10 },
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
  // game.loop.targetFps = 10;
  golemimage = this.add.sprite(400,300,'golem');
  dummytext = this.add.text(0,0,'Hello world',{font: "14pt Arial"});
  hourglass = Date.now();
}

function update ()
{
  golemimage.angle += 1;
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