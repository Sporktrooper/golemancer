let mainElement = document.querySelector('.testbed');

let a = new Entity();
a.parent = {_element: mainElement};
a.cssClass = 'player';

let testBar = new ProgressBar2({_element: mainElement})
