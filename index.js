// CONFIG
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  dom: {
    createContainer: true,
  },
  scene: {
    preload,
    create,
    init
  },
}

const game = new Phaser.Game(config)

// INITIAL
function init() {
    (this.score = 0),
    (this.drag = false),
    (this.secretWords = ['FEAR', 'FEEL', 'LET', 'TEAR', 'RED']),
    (this.count = this.secretWords.length),
    (this.wordList = []),
    (this.finalWordList = []),
    (this.finalWord = ''),
    (this.totalWord = 5),
    (this.style = {
      'color': 'black',
      'font-size': '2rem',
      'font-weight': 'bolder',
      'cursor': 'context-menu'
    })
}

//PRELOAD
function preload() {
  this.load.html('text', 'src/text.html')
  this.load.image('background', 'texture/bg.jpg')
  this.load.image('box', 'texture/box.jpg')
}


//CREATE
function create() {

  // RESET DATA HELPER FUNCTION
  const resetData = () => {
    this.finalWordList = []
    this.finalWord = ''
    this.wordList = []
  }
  // RESET GAME HELPER FUNCTION
  const restart = () => {
    this.sys.game.destroy(true);
    game = new Phaser.Game(config)
  }

  // CREATE BACKGROUND
  const bg = this.add.sprite(0, 0, 'background')
  bg.setOrigin(0, 0)

  // CREATE SCORE TEXT CIRCLE
  this.scoreText = this.add.text(100, 20, 'score: ' + this.score, {
    fontSize: '24px',
  })

  // CREATE SECRET WORD LIST
   this.head = this.add.text(540, 20, 'Secret Words', {
     fontSize: '24px',
   })

   for (let i = 0; i < this.secretWords.length; i++) {
    this.secretWordText = []
   this.secretWordText[i] = this.add.text(600, 50+(i*20), this.secretWords[i], {
     fontSize: '16px',
   })
   }

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

   //CREATE RESTART BUTTON AND EVENT
   this.resetButton = this.add.dom(620, 520, 'button', this.buttonStyle, 'RESET')
   this.resetButton.addListener('click')

   this.resetButton.on('click', (e) => {
     const rest = confirm('Are you sure ?')
     rest ? restart() : null
   })

   // this.showWord = this.add.text(200, 220, 'WORD' , {
   //   fontSize: '24px',
   // })

  // TEXT AREA

  this.text = this.add.dom(620, 320).createFromCache('text')
  this.text.addListener('mousedown')
  this.text.addListener('mousemove')
  this.text.addListener('mouseup')
  this.text.addListener('mouseleave')

  this.text.on('mousedown', (e) => {
    this.drag = true
  })
  
  this.text.on('mousemove', (e) => {
    if (this.drag) {
      if (
        e.target.value !== undefined &&
        this.wordList.includes(e.target.value) === false
        ) {
          this.wordList.push(e.target.value)
        }
        // this.showWord.setText(this.wordList)
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
    if (this.secretWords.includes(this.finalWord)) {
      let checked = false
      
      if (this.finalWord === 'FEAR' && checked === false) {
        if(this.secretWords[1] !== null){
          this.add.dom(100, 150, 'h2', this.style, 'F')
        }
        this.add.dom(100, 202, 'h2', this.style, 'E')
        this.add.dom(100, 254, 'h2', this.style, 'A')
        this.add.dom(100, 306, 'h2', this.style, 'R')
        this.score += 10;
        this.scoreText.setText('score: ' + this.score);
        this.count--
        this.secretWords[0] = null
        checked = true
      }

      if (this.finalWord === 'FEEL' && checked === false) {
        if(this.secretWords[0] !== null){
          this.add.dom(100, 150, 'h2', this.style, 'F')
        }
        this.add.dom(152, 150, 'h2', this.style, 'E')
        this.add.dom(204, 150, 'h2', this.style, 'E')
        if(this.secretWords[2] !== null){
          this.add.dom(256, 150, 'h2', this.style, 'L')
        }
        this.score += 10;
        this.scoreText.setText('score: ' + this.score);
        this.count--
        this.secretWords[1] = null
        checked = true
      }

      if (this.finalWord === 'LET' && checked === false) {
        if(this.secretWords[1] !== null){
          this.add.dom(256, 150, 'h2', this.style, 'L')
        }
        this.add.dom(256, 202, 'h2', this.style, 'E')
        if(this.secretWords[3] !== null){
          this.add.dom(256, 254, 'h2', this.style, 'T')
        }
        this.score += 7;
        this.scoreText.setText('score: ' + this.score);
        this.count--
        this.secretWords[2] = null
        checked = true
      }

      if (this.finalWord === 'TEAR' && checked === false) {
        if(this.secretWords[2] !== null){
          this.add.dom(256, 254, 'h2', this.style, 'T')
        }
        this.add.dom(308, 254, 'h2', this.style, 'E')
        this.add.dom(360, 254, 'h2', this.style, 'A')
        if(this.secretWords[4] !== null){
          this.add.dom(412, 254, 'h2', this.style, 'R')
        }
        this.score += 10;
        this.scoreText.setText('score: ' + this.score);
        this.count--
        this.secretWords[3] = null
        checked = true
      }

      if (this.finalWord === 'RED' && checked === false) {
        if(this.secretWords[3 ] !== null){
          this.add.dom(412, 254, 'h2', this.style, 'R')
        }
        this.add.dom(412, 306, 'h2', this.style, 'E')
        this.add.dom(412, 358, 'h2', this.style, 'D')
        this.score += 7;
        this.scoreText.setText('score: ' + this.score);
        this.count--
        this.secretWords[4] = null
        checked = true
      }

      if(this.count === 0) {
        setTimeout(() => {
          const rest = confirm('YOU WON!, DO YOU WANT TO PLAY AGAIN ?')
          rest ? restart() : null
        }, 300);
      }

    } else {
      alert('wrong or already exist')
    }
    // RESET DATA
    resetData()
  })

  this.text.on('mouseleave', (e) => {
    // RESET DATA
    resetData()
    if(this.drag === true){
      alert('Please stay on text circle.')
      this.drag = false
    }
  })

}