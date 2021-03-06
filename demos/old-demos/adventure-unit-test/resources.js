class Resource {
  constructor(label,parent) {
    this.label = label + ": ";
    this.element = document.createElement('p');
    this.qty = 0;
    this.element.innerHTML = this.label + this.qty;
    parent.appendChild(this.element);
  }
  update(val) {
    this.qty += val;
    this.element.innerHTML = this.label + this.qty;
  }
}

//let resources = {
//      element: document.querySelector('#resources'),
//      rock: { qty: 0, element: document.createElement('p'), gatherRate: 1 },
//      iron: { qty: 0, element: document.createElement('p') },
//      sand: { qty: 0, element: document.createElement('p') },
//      glass: { qty: 0, element: document.createElement('p') }
//    }

//let resources = {
//  element: document.querySelector("#resources")
//}
//resources.rock = new Resource("Rocks", resources.element);
//resources.iron = new Resource("Iron", resources.element);
//resources.sand = new Resource("Sand", resources.element);
//resources.glass = new Resource("Glass", resources.element);

//resources.rock.element.innerHTML = "Rocks: " + resources.rock.qty;
//resources.element.appendChild(resources.rock.element);
//resources.iron.element.innerHTML = "Iron: " + resources.iron.qty;
//resources.sand.element.innerHTML = "Sand: " + resources.sand.qty;

function addResource(type,qty) {
  switch (type) {
    case "rocks":
      resources.rock.qty += qty;
      resources.rock.element.innerHTML = "Rocks: " + Math.floor(resources.rock.qty);
      break;
    case "iron":
      resources.iron.qty += qty;
      resources.iron.element.innerHTML = "Iron: " + resources.iron.qty;
      displayUpgrade("iron");
      break;
    case "sand":
      resources.sand.qty += qty;
      resources.sand.element.innerHTML = "Sand: " + resources.sand.qty;
      displayUpgrade("sand");
      break;
    case "glass":
      resources.glass.qty += qty;
      resources.glass.element.innerHTML = "Glass: " + resources.glass.qty;
  }
}

function removeResource(type,qty) {
  switch (type) {
    case "rocks":
      resources.rock.qty -= qty;
      resources.rock.element.innerHTML = "Rocks: " + Math.floor(resources.rock.qty);
      break;
    case "iron":
      resources.iron.qty -= qty;
      resources.iron.element.innerHTML = "Iron: " + resources.iron.qty;
      break;
    case "sand":
      resources.sand.qty -= qty;
      resources.sand.element.innerHTML = "Sand: " + resources.sand.qty;
      break;
    case "glass":
      resources.glass.qty -= qty;
      resources.glass.element.innerHTML = "Glass: " + resources.glass.qty;
  }
}

//let testResource = new Resource("Kibits",resources.element);