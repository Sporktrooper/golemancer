function Array2D(x, y) {
    var array2D = new Array(x);
    for(var i = 0; i < array2D.length; i++)
    {
        array2D[i] = new Array(y);
    }
    return array2D;
}


let gridSize = 10,
    circles = new Array2D(gridSize, gridSize),
    circles2 = new Array2D(gridSize, gridSize)
    gameContainer = document.querySelector('#gameContainer'),
    circleSize = 100,borderThickness = 3;

for (let i = 0; i < circles.length; i++) {
  for (let j = 0; j < circles.length; j++) {
    circles[i][j] = document.createElement('div');
    circles[i][j].classList.add('circle');
    circles[i][j].style.height = circleSize + 'px';
    circles[i][j].style.width = circleSize + 'px';
    circles[i][j].style.borderWidth = borderThickness + 'px';
    circles[i][j].style.top = (i * (circleSize + borderThickness)) + "px";
    circles[i][j].style.left = (j * (circleSize + borderThickness)) + 'px';
    gameContainer.appendChild(circles[i][j]);
  }
}

for (let i = 0; i < circles2.length; i++) {
  for (let j = 0; j < circles2.length; j++) {
    circles2[i][j] = document.createElement('div');
    circles2[i][j].classList.add('circle');
    circles2[i][j].style.height = circleSize + 'px';
    circles2[i][j].style.width = circleSize + 'px';
    circles2[i][j].style.borderWidth = borderThickness + 'px';
    circles2[i][j].style.top = 50 + (i * (circleSize + borderThickness)) + "px";
    circles2[i][j].style.left = 43 + (j * (circleSize + borderThickness)) + 'px';
    gameContainer.appendChild(circles2[i][j]);
  }
}