var states = { preload, create, update }
var game = new Phaser.Game(400, 300, Phaser.AUTO, 'phaser-game', states)

var ball, brick, paddle
var leftKey, rightKey

function preload() {
  game.load.image('ball', 'ball.png')
  game.load.image('brick', 'brick.png')
  game.load.image('paddle', 'paddle.png')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  var group = game.add.group(undefined, null, undefined, true)

  ball = group.create(game.world.centerX, 50, 'ball')
  brick = group.create(game.world.centerX - 25, 20, 'brick')
  paddle = group.create(game.world.centerX - 25, 280, 'paddle')

  ball.anchor.setTo(0.5, 0.5)
  ball.body.velocity.setTo(200, 200)
  ball.body.collideWorldBounds = true
  ball.body.bounce.set(1)

  brick.anchor.setTo(0, 0.5)
  brick.body.immovable = true

  paddle.anchor.setTo(0, 0.5)
  paddle.body.collideWorldBounds = true
  paddle.body.immovable = true

  ;[leftKey, rightKey] = ['LEFT', 'RIGHT'].map((key) => {
    return game.input.keyboard.addKey(Phaser.Keyboard[key])
  })
}

function update() {
  if (leftKey.isDown && !paddle.body.blocked.left) {
    paddle.body.x -= 10
  } else if (rightKey.isDown && !paddle.body.blocked.right) {
    paddle.body.x += 10
  }

  game.physics.arcade.overlap(ball, brick, brickHandler, null, this)
  game.physics.arcade.overlap(ball, paddle, paddleHandler, null, this)
}

function brickHandler(ball, brick) {
  brick.kill()
}

function paddleHandler(ball, paddle) {
  ball.body.velocity.y *= -1
}
