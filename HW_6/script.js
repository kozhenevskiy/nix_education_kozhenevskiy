import { candidatesArr } from './candidates.js'

// task 1

const arrTask1 = ['Vasya', 'Petya', 'Alexey'];

function removeFromArray (arr, index) {
	arr.splice(index, 1);
	console.log(arr);
}

removeFromArray(arrTask1, 1);


// task 2

const objTask2 = { name: 'Vasya', age: 1};

function returnObjectKeys (obj) {
	let keys = Object.keys(obj);
	console.log(keys);
}

returnObjectKeys(objTask2);


// task 3

const objTask3 = { name: 'Vasya', age: 1};

function returnObjectValues (obj) {
	let values = Object.values(obj);
	console.log(values);
}

returnObjectValues(objTask2);


// task 4

function insertCandidateBefore (candidate, id) {
	const candBefId = candidatesArr.findIndex((element) => {
		return element._id === id;
	}); 

	candidatesArr.splice(candBefId, 0, candidate);
}

insertCandidateBefore(candidatesArr[4], candidatesArr[1]._id);


// task 5

class Candidate {
	constructor(obj) {
		Object.assign(this, obj);
	}

	state() {
		console.log(this.address.split(',')[2].trim());
	}
}

const cand = new Candidate(candidatesArr[6]);

cand.state();


// task 6 

const companyNamesArr = [];

function getCompanyNames (arr) {
	arr.forEach((elem) => {companyNamesArr.push(elem.company)})

	for (let i = 0; i < companyNamesArr.length; i++) {
		for (let j = i + 1; j < companyNamesArr.length; j++) {
			if (companyNamesArr[i] === companyNamesArr[j]) {companyNamesArr.splice(j, 1)};
		}
	}

	console.log(companyNamesArr);
}

getCompanyNames(candidatesArr);


// task 7 

const candidatesSimilarYear = [];

function sortCandidatesSimilarYear (year) {
	let registeredDate

	candidatesArr.forEach(elem => {
		registeredDate = new Date(elem.registered)

		if (registeredDate.getFullYear() === year) {
			candidatesSimilarYear.push(elem._id);
		}
	})

	console.log(candidatesSimilarYear);
}

sortCandidatesSimilarYear(2017);


// task 8

const candidatesByUnreadMsg = [];

function getCandidatesByUnreadMsg (num) {
	candidatesArr.forEach(elem => {
		if (+elem.greeting.split(' ')[5] === num) {
			candidatesByUnreadMsg.push(new Candidate(elem));
		}
	})

	console.log(candidatesByUnreadMsg);
}

getCandidatesByUnreadMsg(8);


// task 9

const candidatesByGender = [];

function getCandidatesByGender (gender) {
	candidatesArr.forEach(elem => {
		if (elem.gender === gender) {
			candidatesByGender.push(new Candidate(elem));
		}
	})

	console.log(candidatesByGender);
}

getCandidatesByGender('male');


// task 10

const arrTask10 = [7, 'sdad', 48, 455, 878];

Array.prototype.john = function (separator) {
	let str = '',
		separ;

		switch (separator) {

			case undefined:
				separ = ',';
				break;
			
			case '':
				separ = '';
				break;

			default: 
				separ = separator;
				break;

		}

		for (let i = 0; i < this.length; i++) {
			i < this.length - 1 ? str += this[i] + separ : str += this[i];
		}

		 console.log(str);
}	

arrTask10.john('-');