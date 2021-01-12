let points = 0;


let action = () => {
  console.log('action fired');
//  console.log(this);
}

action();

let actions = {};
actions['addPoint'] = () => {
  points++;
};
actions['subtractPoint'] = () => {
  points--;
};

actions['addPoint']();
console.log(points)

//let device = {
//  action: '',
//  repeating: false,
//  speed: 1000,
//  actions: actions,
//}
