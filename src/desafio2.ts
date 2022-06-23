interface PersonData {
    name: string,
    age: number,
    occupation: string
};

let person1: PersonData = {
    name: 'Maria',
    age: 29,
    occupation: 'Atriz'
};
let person2 = {
    name: 'Roberto',
    age: 19,
    occupation: 'Padeiro'
};
let person3 = {
    name: 'Laura',
    age: 32,
    occupation: 'Atriz'
};
let person4 = {
    name: 'Carlos',
    age: 19,
    occupation: 'Padeiro'
}; 


function getPersonDetail(person: PersonData) {
    return `${person.name}, is ${person.age} years old, and the job is ${person.occupation}.`;
}
console.log(getPersonDetail(person1));
console.log(getPersonDetail(person2));
console.log(getPersonDetail(person3));
console.log(getPersonDetail(person4));
