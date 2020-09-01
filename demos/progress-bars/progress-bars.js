class ProgressBar {
  constructor (element) {
    this.element = element;
    this.fill = 0;
    this.state = "start"; // "start", "running", "finished"
    this.autoB = false;
  }
  
  move() {
    var obj = this;
    
    if (this.state == "start") {
      this.state = "running";
      var elem = document.getElementById("bar1");
      var width = document.getElementById("bar1").style.width;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          obj.state = "finished";
        } else {
          width++;
  //        elem.style.width = width + "%";
          document.getElementById("bar1").style.width = width + "%";
        }
      }
    }
  }
  
  reset() {
    if (this.state == "finished") number.add();
    this.state = "start"
    document.getElementById("bar1").style.width = "";
    }
  
  auto() {
    if (this.autoB == true && (testBar.state != "running")) {
      this.reset();
      this.move();
    }
  }
}


var testBar = new ProgressBar(document.querySelector("#bar1"));

var number = {
  element: document.querySelector("#number"),
  value: 0,
}

var barTender = setInterval(() => {
  testBar.auto();
},250);

number.element.innerHTML = number.value;
number.add = () => {
  number.element.innerHTML = ++number.value;
}

var autoButton = document.querySelector("#autoButton");
autoButton.addEventListener('click', () => {
  if (testBar.autoB == true) {
    testBar.autoB = false;
    autoButton.classList.remove("btnTrue");
    autoButton.classList.add("btnFalse");
  } else {
    testBar.autoB = true;
    autoButton.classList.remove("btnFalse");
    autoButton.classList.add("btnTrue");
  }
});

var resetButton = document.querySelector("#resetButton");
resetButton.addEventListener('click', () => {
  testBar.reset();
});

var goButton = document.querySelector("#goButton");
goButton.addEventListener('click', () => {
  testBar.move();
});