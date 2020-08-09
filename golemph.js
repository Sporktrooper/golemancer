var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },

    fps: 10
};

var game = new Phaser.Game(config);
var golemimage;
var dummytext;
var ticks = 0;

function preload ()
{
  this.load.image('golem', 'assets/golem-1.jpg');  
}

function create ()
{
  golemimage = this.add.sprite(400,300,'golem');
  dummytext = this.add.text(0,0,'Hello world',{font: "14pt Arial"});
}

function update ()
{
  golemimage.angle += 1;
  ticks++;
  dummytext.text = 'hello world 10fps ' + ticks + ' ' + game.time.deltaTime;
}