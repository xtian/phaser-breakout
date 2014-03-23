var states = { preload, create, update }
var game = new Phaser.Game(400, 300, Phaser.AUTO, 'phaser-game', states)

var ball, paddle

function preload() {
  game.load.image('ball', 'ball.png')
  game.load.image('paddle', 'paddle.png')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  ball = game.add.sprite(game.world.centerX, 0, 'ball')
  game.physics.enable(ball, Phaser.Physics.ARCADE)
  ball.body.velocity.setTo(200, 200)
  ball.body.collideWorldBounds = true
  ball.body.bounce.set(1)

  paddle = game.add.sprite(game.world.centerX, game.world.centerY, 'paddle')
  paddle.anchor.setTo(0.5, 0.5)
}

function update() {
  paddle.x = game.input.x
}
