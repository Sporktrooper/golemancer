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


function preload ()
{
  this.load.image('golem', 'assets/golem-1.jpg');  
}

function create ()
{
  this.add.image(400,300,'golem');
  this.add.text(400,300,'Hello world');
}

function update ()
{
}