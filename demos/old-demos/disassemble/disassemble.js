var armorElements = document.querySelectorAll(".armor");
console.log(armorElements);
console.log(armorElements.item(1));


for (let i = 0; i < armorElements.length; i++) {
  armorElements.item(i).addEventListener("click", function() {
    armorElements.item(i).classList.add("vanish");
  })
  armorElements.item(i).addEventListener("mouseover", function() {
    document.querySelector(".infobox").innerHTML = 
      "This armored plate is constructed from an alloy of iron and refined Platonic Earth. Total plating on the forearm weighs 850g and can withstand temperatures of up to 3500F before the Aetheric enamel boils off."
  });
}


document.querySelector(".switch").addEventListener("click", function() {
  document.querySelector(".switch.post").classList.add("switchFlip");
  for (let i = 0; i < document.querySelectorAll(".conduit").length; i++) {
  document.querySelectorAll(".conduit").item(i).classList.add("conduitPulse");
  }
});