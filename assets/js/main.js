var states = { preload, create, update }
var game = new Phaser.Game(400, 300, Phaser.AUTO, 'phaser-game', states)

var bricks = [], ball, paddle
var leftKey, rightKey

function preload() {
  game.load.image('ball', 'ball.png')
  game.load.image('brick', 'brick.png')
  game.load.image('paddle', 'paddle.png')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  var group = game.add.group(undefined, null, undefined, true)

  ball = group.create(game.world.centerX, 100, 'ball')
  paddle = group.create(game.world.centerX - 25, 280, 'paddle')

  ball.anchor.setTo(0.5, 0.5)
  ball.body.velocity.setTo(200, 200)
  ball.body.collideWorldBounds = true
  ball.body.bounce.set(1)

  paddle.anchor.setTo(0, 0.5)
  paddle.body.collideWorldBounds = true
  paddle.body.immovable = true

  for (var i = 3; i--;) {
    buildBrickRow(group, i * 25 + 20)
  }

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

  for (var brick of bricks) {
    game.physics.arcade.overlap(ball, brick, brickHandler, null, this)
  }

  game.physics.arcade.overlap(ball, paddle, paddleHandler, null, this)
}

function brickHandler(ball, brick) {
  brick.kill()
}

function paddleHandler(ball, paddle) {
  ball.body.velocity.y *= -1
}

function buildBrickRow(group, y) {
  var brickCount = 6
  var gutter = (game.world.width - (brickCount * 50)) / 2

  for (var i = brickCount; i--;) {
    var x = gutter + (i * 50)
    var brick = group.create(x, y, 'brick')

    brick.anchor.setTo(0, 0.5)
    brick.body.immovable = true
    bricks.push(brick)
  }
}
