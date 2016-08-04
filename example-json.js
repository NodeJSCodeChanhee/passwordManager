var person = {
	name : 'Andrew',
	age : 24
};

var personJSON = JSON.stringify(person);

console.log(personJSON);
console.log(typeof personJSON);

var personObject = JSON.parse(personJSON);

console.log(personObject);
console.log(typeof personObject);

console.log('Challenge AREA');

var animal ='{"name" : "Halley"}';

var animalObject = JSON.parse(animal);
animalObject.age = 34;

animal = JSON.stringify(animalObject);

console.log(animal);
//convert it into javascript object
// add age prop
// convert back to JSON
// log out
//