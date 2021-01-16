const config = {
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

const game = new Phaser.Game(config)

function init() {
  this.score = 0,
  this.drag = false,
  this.secretWords = ['FEAR', 'FEEL', 'LET', 'TEAR', 'RED'],
  this.count = this.secretWords.length,
  this.wordList = [],
  this.finalWordList = [],
  this.finalWord = '',
  this.totalWord = 5,
  this.style = {
    'color': 'blue',
    'font': '35px Arial',
    'font-weight': 'bold'
}
}

function preload() {
  this.load.html('text', 'tex/text.html');
  this.load.image('background', 'tex/bg.png')
  this.load.image('box', 'tex/box.jpg')
  this.load.image('box-a', 'tex/box-a.jpg')
}

function create() {

  // CREATE BACKGROUND
  const bg = this.add.sprite(0, 0, 'background')
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
  this.box6 = this.add.sprite(100, 306, 'box')
  this.box7 = this.add.sprite(256, 150, 'box')
  this.box8 = this.add.sprite(256, 202, 'box')
  this.box9 = this.add.sprite(256, 254, 'box')
  this.box10 = this.add.sprite(308, 254, 'box')
  this.box11 = this.add.sprite(360, 254, 'box')
  this.box12 = this.add.sprite(412, 254, 'box')
  this.box13 = this.add.sprite(412, 306, 'box')
  this.box14 = this.add.sprite(412, 358, 'box')

  // TEXT AREA

  this.text = this.add.dom(600, 300).createFromCache('text');
  this.text.addListener('mousedown');
  this.text.addListener('mousemove');
  this.text.addListener('mouseup');

  this.text.on('mousedown', (e) => {
    this.drag = true
  })

  this.text.on('mousemove', (e) => {
    if(this.drag){
      if(e.target.value !== undefined && this.wordList.includes(e.target.value) === false){
        this.wordList.push(e.target.value)

      }
    }
  })


  this.text.on('mouseup', (e) => {
    this.drag = false

    // WORD ARRAY TO STRING
    for (let i = 0; i < this.wordList.length; i++) {
      this.finalWordList.push(this.wordList[i][0])
    }
    this.finalWord = this.finalWordList.join('')
    
    // WORD CHECK


    if( this.secretWords.includes(this.finalWord) ){

      let checked = false;

      if(this.finalWord === 'LET' && checked === false){
        this.add.dom(256, 120, 'h2', this.style, 'L');
        this.add.dom(256, 172, 'h2', this.style, 'E');
        this.add.dom(256, 224, 'h2', this.style, 'T');
        this.count--
        this.secretWords.splice(2,1)
        checked = true
      }

    }
    else{
      alert('wrong or already exist');
    }




    // RESET DATA
    this.finalWordList = []
    this.finalWord = ''
    this.wordList = []
  })


}

function update() {
  // IS WORD TRUE ?
  // if (this.input.activePointer.isDown) {
  //   this.box5 = this.add.sprite(100, 254, 'box-a')
  // }
}

function end() {}
