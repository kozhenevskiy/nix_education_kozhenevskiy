import { emplyeeArr } from './emplyeeArr.js'


// task 1

class Employee {
    constructor(id, employeeName, surname, salary, workExperience, isPrivileges, gender){
        this.id = id;
        this.employeeName = employeeName;
        this.surname = surname;
        this.salary = salary;
        this.workExperience = workExperience;
        this.isPrivileges = isPrivileges;
        this.gender = gender;
    }


    // task 2

    getFullName(){
        return `${surname} ${employeeName}`;
    }
    
    
    // task 7

    get fullInfo(){
        let result = [];

        for (let key in this) {
            result.push(`${key} - ${this[key]}`);
        }
        
        console.log(result.join(', '));
    }

    set fullInfo(obj) {
        for (let key in obj) {
            for (let key2 in this) {
                if (key === key2) {
                    this[key2] = obj[key];
                }
            }
        }

        console.log(this);
    }
}


// task 3

const arrOfEmployees = [];

const createEmployeesFromArr = (arr) => {
    let employeeValues = [];

    for (let i = 0; i < arr.length; i++) {
        employeeValues = Object.values(arr[i]);
        
        arrOfEmployees.push(new Employee(...employeeValues));

        employeeValues = [];
    }

    console.log(arrOfEmployees);
};

createEmployeesFromArr(emplyeeArr);


// task 4

const getFullNamesFromArr = (arr) => {
    const arrOfEmployeesFullNames = [];

    for (let i = 0; i < arr.length; i++) {
        arrOfEmployeesFullNames.push(`${arr[i].employeeName} ${arr[i].surname}`);
    }

    console.log(arrOfEmployeesFullNames);
}

getFullNamesFromArr(arrOfEmployees);


// task 5 

const getMiddleSalary = (arr) => {
    let sumSalary = 0;

    for (let i = 0; i < arr.length; i++) {
        sumSalary += arr[i].salary ;
    }

    let avarageSalary = sumSalary / arr.length;

    console.log(avarageSalary);
}

getMiddleSalary(arrOfEmployees);


// task 6

const getRandomEmployee = (arr) => {
    console.log(arr[Math.floor(Math.random() * arr.length)]);
}

getRandomEmployee(arrOfEmployees);


// task 7

const employeeObj = new Employee(...Object.values(arrOfEmployees[0]));0

employeeObj.fullInfo = {employeeName: 'Вася', salary: 9000, email: 'top'};

employeeObj.fullInfo;