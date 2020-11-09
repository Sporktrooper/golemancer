let wheels = new Array,
    rollButton = document.querySelector('#rollButton');
wheels.push(document.querySelector('#wheel1'));
wheels.push(document.querySelector('#wheel2'));
wheels.push(document.querySelector('#wheel3'));

function roll() {
  console.log('rolling...');
  
  let flickerCount = 10;
  let a = setInterval(function() {
    if(Math.random() > 0.5) {
      wheels[0].innerHTML = 'X';
    } else {
      wheels[0].innerHTML = 'O';
    }
    if(Math.random() > 0.5) {
      wheels[1].innerHTML = 'X';
    } else {
      wheels[1].innerHTML = 'O';
    }
    if(Math.random() > 0.5) {
      wheels[2].innerHTML = 'X';
    } else {
      wheels[2].innerHTML = 'O';
    }
    
    flickerCount--;
    if(flickerCount <= 0) {
      window.clearInterval(a);
    }
  },50)
  
  for (let i = 0; i < wheels.length; i++) {
    if(Math.random() < 0.25) {
      wheels[i].innerHTML = "X";
    } else {
      wheels[i].innerHTML = "O";
    }
    
    let b = setTimeout(function() {if(wheels[0].innerHTML == 'X' 
       && wheels[1].innerHTML == 'X'
       && wheels[2].innerHTML == 'X') {
      console.log('triple X!');
    }},550);
  }
}

rollButton.addEventListener('click',function() { roll() });