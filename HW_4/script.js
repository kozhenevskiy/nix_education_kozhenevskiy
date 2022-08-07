import { studentArr } from './studentArr.js'

// task 1

class Student {
    static id = 1;
    static listOfStudents = []; 

    constructor (enrollee) {
        this.id = Student.id++;
        Object.assign(this, enrollee);

        Student.listOfStudents.push(this);

        Student.listOfStudents.sort((a, b) => { return b.ratingPoint - a.ratingPoint });

        for (let i = 0; i < Student.listOfStudents.length; i++) { 
            if (Student.listOfStudents[i].ratingPoint >= 800 && i <= 4) {
                Student.listOfStudents[i].isSelfPayment = false;
            } else {
                Student.listOfStudents[i].isSelfPayment = true;
            }
        }

        if (Student.listOfStudents.length >= 6) {
            if (Student.listOfStudents[4].ratingPoint === Student.listOfStudents[5].ratingPoint) {
                if (Student.listOfStudents[4].schoolPoint < Student.listOfStudents[5].schoolPoint) {
                    Student.listOfStudents[4].isSelfPayment = true;
                    Student.listOfStudents[5].isSelfPayment = false;
                }
            }
        }

        Student.listOfStudents.sort((a, b) => { return a.id - b.id });  
    }


}

new Student (studentArr[0]);

new Student (studentArr[1]); 

new Student (studentArr[2]); 

new Student (studentArr[3]); 

new Student (studentArr[4]); 

new Student (studentArr[5]); 

new Student (studentArr[6]); 

new Student (studentArr[7]);

new Student (studentArr[8]);

new Student (studentArr[9]);

new Student (studentArr[10]);

console.log(Student.listOfStudents);


// task 2

class CustomString {
    reverse(str) {
        console.log(str.split('').reverse().join(''));
    }

    ucFirst(str) {
        console.log(str[0].toUpperCase() + str.slice(1));
    }

    ucWords(str) {
        let arr = str.split(' ');

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
        }

        str = arr.join(' ');

        console.log(str);
    }
}

const myString = new CustomString();

myString.reverse('qwerty');

myString.ucFirst('qwerty');

myString.ucWords('qwerty qwerty qwerty');


// task 3

class Validator {
    static patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    static patternDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

    checkIsEmail (email) {
        if (email.match(Validator.patternEmail)) {
            console.log(true);
        } else {
            console.log(false);
        }
    }

    checkIsDomain (domain) {
        if (domain.match(Validator.patternDomain)) {
            console.log(true);
        } else {
            console.log(false);
        }
    }

    checkIsDate (date) {
        if (!isNaN(Date.parse(date))) {
            console.log(true);
        } else {
            console.log(false);
        }
    }

    checkIsPhone (phone) {
        if (phone.slice(0, 3) === '+38') {
            console.log(true);
        } else {
            console.log(false);
        }
    }
}

var validator = new Validator();

validator.checkIsEmail('vasya.pupkin@gmail.com');

validator.checkIsDomain('google.com');

validator.checkIsDate('30.11.2019');

validator.checkIsDate('2019-11-30');

validator.checkIsPhone('+38 (066) 937-99-92');