var states = { preload, create, update }
var game = new Phaser.Game(400, 300, Phaser.AUTO, 'phaser-game', states)

var paddle

function preload() {
  game.load.image('paddle', 'paddle.png')
}

function create() {
  paddle = game.add.sprite(game.world.centerX, game.world.centerY, 'paddle')
  paddle.anchor.setTo(0.5, 0.5)
}

function update() {
  paddle.x = game.input.x
}
