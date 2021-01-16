var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  dom: {
    createContainer: true,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    end: end,
    init: init,
  },
}

var game = new Phaser.Game(config)

function init() {
  this.score = 0
}

function preload() {
  this.load.html('text', 'tex/text.html');
  this.load.image('background', 'tex/bg.png')
  this.load.image('box', 'tex/box.jpg')
  this.load.image('box-a', 'tex/box-a.jpg')
}

function create() {
  // CREATE BACKGROUND
  var bg = this.add.sprite(0, 0, 'background')
  bg.setOrigin(0, 0)

  // CREATE SCORE TEXT
  this.scoreText = this.add.text(100, 16, 'score: ' + this.score, {
    fontSize: '24px',
    fill: '#fff',
  })

  // CREATE BOXES
  this.box1 = this.add.sprite(100, 150, 'box')
  this.box2 = this.add.sprite(152, 150, 'box')
  this.box3 = this.add.sprite(204, 150, 'box')
  this.box4 = this.add.sprite(100, 202, 'box')
  this.box5 = this.add.sprite(100, 254, 'box')

  // TEXT AREA

  var wordList = []

  var drag = false

  this.text = this.add.dom(300, 300).createFromCache('text');
  this.text.addListener('mousedown');
  this.text.addListener('mousemove');
  this.text.addListener('mouseup');

  this.text.on('mousedown', function (e) {
    drag = true
  })

  this.text.on('mousemove', function (e) {
    if(drag){
      if(e.target.value !== undefined && wordList.includes(e.target.value) === false){
        wordList.push(e.target.value)
        console.log(wordList)
      }
    }
  })

  this.text.on('mouseup', function (e) {
    drag = false
    console.log('bitti')
  })




}

function update() {
  // IS WORD TRUE ?
  // if (this.input.activePointer.isDown) {
  //   this.box5 = this.add.sprite(100, 254, 'box-a')
  // }
}

function end() {}
