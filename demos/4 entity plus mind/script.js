let field = new Environment("field");

let alpha = new Actor("Alpha");
//alpha.mind = new Metatron(alpha);

alpha.mind.createMemory("benevolence",10,10);
alpha.mind.remember(alpha.mind.memories[0])
console.log(alpha.mind.morale);

let ball = new Entity('ball');
field.addEntityToEnvironment(ball);
field.addEntityToEnvironment(alpha);
console.log(field.contents);
alpha.take(ball);
console.log(alpha.mind.memories);