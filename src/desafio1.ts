/*Primeira solução*/

const employee: {code: number, name: string} = {
    code: 10,
    name:'John'
}

console.log(employee.code)
console.log(employee.name)

/*usando o interface*/

interface EmployeesData {
    code: number;
    name: string;
}
const employee2 = {} as EmployeesData;
    employee2.code = 10;
    employee2.name = 'John';
    
console.log(employee2.code, employee2.name)






