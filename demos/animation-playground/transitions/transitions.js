let square = document.querySelector('#sq1');
let sqButton = document.querySelector('#btn');

function swapClass() {
  square.classList.toggle('square');
  square.classList.toggle('square1');
  console.log('class swapped');
}

//let clock = setInterval(function() {swapClass()},4000);

sqButton.addEventListener('click',function(){swapClass()});