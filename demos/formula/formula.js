var jug5 = {
  capacity: 5,
  contents: 0,
  element: document.querySelector("#jug5Display"),
};
var jug3 = {
  capacity: 3,
  contents: 0,
  element: document.querySelector("#jug3Display"),
};

updateContainers();


function fillContainer(container) {
  container.contents = container.capacity;
  updateContainers();
}

function pour(source, destination) {
  while (destination.capacity - destination.contents != 0 && source.contents > 0) {
    source.contents--;
    destination.contents++;
  }
updateContainers();
}

function updateContainers() {
  jug5.element.innerHTML = jug5.contents + " of " + jug5.capacity;
  jug3.element.innerHTML = jug3.contents + " of " + jug3.capacity;
  
  if (jug5.contents == 4) {
    document.querySelector("#riddle").innerHTML = "Solved!"
    document.querySelector("#first").style.backgroundColor = '#0f9';
  }
}

function dump(container) {
  container.contents = 0;
  updateContainers();
}