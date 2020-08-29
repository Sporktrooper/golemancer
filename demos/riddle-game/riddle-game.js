// had a weird idea for an experiment



function seizure(go) {
  switch (go) {
    case "on":
      setInterval(() => { 
        document.querySelector("#seizure").style.backgroundColor = collorrss();
        document.querySelector("#seizure").style.borderColor = collorrss();
      },100);
            break;
      
    case "off":
      clearInterval();
      // this doesn't actually work :o
      break;
  }
}

function collorrss() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  var col = "rgb(" + r + "," + g + "," + b + ")";
  
  return col;
}