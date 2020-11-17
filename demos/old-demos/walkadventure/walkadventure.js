let walkTrack = document.querySelector('.walkTrack'),
    walkButton = document.querySelector('#walk'),
    bar = document.createElement('div'),
    log = document.querySelector('#log'),
    pointsElt = document.querySelector('#points'),
    points = 0;

bar.classList.add('bar');
walkTrack.appendChild(bar);
walkButton.addEventListener('click',function(){
  bar.classList.add('fill');
});


bar.addEventListener('animationend',function(){
  if(bar.classList.contains('fill')) {
    bar.classList.remove('fill');
    bar.classList.add('empty');
    log.innerHTML = pickEvent();
  } else if (bar.classList.contains('empty')) {
    bar.classList.remove('empty');
  } else if (bar.classList.contains('empty') && bar.classList.contains('fill')) {
    console.log('check');
    bar.classList.remove('empty');
    bar.classList.remove('fill');
  }
});

let events = new Array;
events.push({
  description: 'A leaf sails silently past.',
  effect: function(){changePoints(1)}
});
events.push('Small stones roll down a mountainside.');
events.push('Nothing happens.');
events.push('Two birds swoop beneath a bush.');
events.push('A family of geese float along a brook.');
events.push('Flowers tilt towards the sun and dance in the breeze.');

function pickEvent(){
//  let e = Math.floor(Math.random() * events.length);
  let e = 0;
  events[e].effect();
  return events[e].description;
}

function changePoints(val){
  points += val;
  pointsElt.innerHTML = points;
}