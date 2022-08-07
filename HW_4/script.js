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


