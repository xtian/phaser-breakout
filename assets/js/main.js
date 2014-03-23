var states = { preload, create, update }
var game = new Phaser.Game(400, 300, Phaser.AUTO, 'phaser-game', states)

var ball, paddle
var leftKey, rightKey

function preload() {
  game.load.image('ball', 'ball.png')
  game.load.image('paddle', 'paddle.png')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  ball = game.add.sprite(game.world.centerX, 0, 'ball')
  paddle = game.add.sprite(game.world.centerX, 280, 'paddle')

  game.physics.enable([ball, paddle], Phaser.Physics.ARCADE)

  ball.body.velocity.setTo(200, 200)
  ball.body.collideWorldBounds = true
  ball.body.bounce.set(1)

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

  game.physics.arcade.overlap(ball, paddle, collisionHandler, null, this)
}

function collisionHandler(ball, paddle) {
  var diff = 0

  if (ball.x < paddle.x) {
    diff = paddle.x - ball.x
    ball.body.velocity.x = (-10 * diff)
  } else if (ball.x > paddle.x) {
    diff = ball.x - paddle.x
    ball.body.velocity.x = (10 * diff)
  } else {
    ball.body.velocity.x = 2 + Math.random() * 8
  }
}
