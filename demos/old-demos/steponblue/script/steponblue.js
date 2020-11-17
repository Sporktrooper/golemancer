class Line {
  constructor() {
    this.element = document.createElement('div')
    this.element.classList.add('trackLine');
    this.steps = new Array(4);
    for(let i = 0; i < this.steps.length; i++) {
      this.steps[i] = document.createElement('div');
      this.steps[i].classList.add('trackStep');
      this.element.appendChild(this.steps[i])
    }
    this.element.activeStep = Math.floor(Math.random()*4);
    this.steps[this.element.activeStep].classList.add('on');
  }
}

let score = {val: 0,
             highVal: 0,
             add: function() { 
               this.val++;
               scoreVal.innerHTML = this.val;
               this.newHigh();
             },
             reset: function() { 
               this.val = 0;
               scoreVal.innerHTML = this.val;
             },
             newHigh: function() {
               if (this.val > this.highVal) {
                 this.highVal = this.val;
                 highScore.innerHTML = this.highVal;
               }
             },
            }

let highScore = document.querySelector('#highScore');
let scoreVal = document.querySelector('#scoreVal');
scoreVal.innerHTML = score.val;
let track = document.querySelector('#track');
let gameContainer = document.querySelector('#gameContainer');
let buttons = new Array();
buttons[0] = document.querySelector('#btn1');
buttons[1] = document.querySelector('#btn2');
buttons[2] = document.querySelector('#btn3');
buttons[3] = document.querySelector('#btn4');

let inputReceived = false;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click',function(){buttons[i].effect()})
  
  document.addEventListener('keydown', (e) => {
    if (e.keyCode == (49 + i) && !inputReceived) {
//      inputReceived = true;
      buttons[i].effect();
      buttons[i].classList.add('active');
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.keyCode == (49 + i)) {
      inputReceived = false;
      buttons[i].classList.remove('active');
    }
  });
}

buttons[0].effect = function() {
  if(track.currentStep.element.activeStep == 0) {
//    console.log('match');
    track.advance();
    score.add();
  } else {
    score.reset();
  }
}
buttons[1].effect = function() {
  if(track.currentStep.element.activeStep == 1) {
//    console.log('match');
    track.advance();
    score.add();
  } else {
    score.reset();
  }
}
buttons[2].effect = function() {
  if(track.currentStep.element.activeStep == 2) {
//    console.log('match');
    track.advance();
    score.add();
  } else {
    score.reset();
  }
}
buttons[3].effect = function() {
  if(track.currentStep.element.activeStep == 3) {
//    console.log('match');
    track.advance();
    score.add();
  } else {
    score.reset();
  }
}

//document.addEventListener('keydown',function(e) {
//  if(e.keyCode == 49) {
//    console.log('1key');
//  }
//})

track.lines = new Array();

track.fill = function() {
  for (let i = 0; i < 6; i++) {
    track.lines.push(new Line);
    track.appendChild(track.lines[i].element);
  }
  track.currentStep = track.lines[0];
}
track.fill();

track.advance = function() {
  track.removeChild(track.currentStep.element);
  track.lines.shift();
  track.lines.push(new Line);
  track.appendChild(track.lines[5].element)
  track.currentStep = track.lines[0];
}