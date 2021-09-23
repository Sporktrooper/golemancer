//let listA = document.querySelector("#listA"),
//    listB = document.querySelector("#listB"),
//    ball = document.querySelector("#ball"),
//    cube = document.querySelector("cube");

//listB.appendChild(ball);

//let alpha = {
//      contents: listA
//    },
//    beta = {
//      contents: listB
//    }

//function moveBall(item,recipient) {
//  recipient.contents.appendChild(item);
//}
function checkContents(container) {
  let contentArray = [];
  for(let i = 0; i < container.children.length; i++) {
    contentArray.push(container.children[i])
    console.log(contentArray[i].innerHTML);
  }
}

//moveBall(ball,beta)
//console.log(beta.contents.children);
//checkContents(listA);

let alpha = new Actor("Alpha",document.querySelector("#alpha"));
let gamma = new Actor("Gamma",document.querySelector("#gamma"));
let ball = new Entity("ball",document.querySelector("#ball"))
let cube = new Entity("cube");
cube.element.innerHTML = "cube";
//gamma.element.appendChild(gamma.contents);
//gamma.holder = document.createElement("li");
//gamma.holder.appendChild(gamma.element);

let field = new Environment("field",document.querySelector("#field"));
field.element.appendChild(field.contents);
field.addEntityToEnvironment(ball);
field.addEntityToEnvironment(alpha);
field.addEntityToEnvironment(gamma);
field.addEntityToEnvironment(cube);


//field.addEntityToEnvironment(alpha);
//field.addEntityToEnvironment(gamma);
gamma.take(ball);

//field.element.appendChild(gamma.element);
//gamma.drop(ball);