import { candidateArr } from './candidates.js'

// task 1

function searchCandidatesByPhoneNumber (num) {
    let numberFilterBy = num.replace(/[,$+)(-\s]/g, ''),
        candidatesFiltered = [];

        candidateArr.forEach((elem => {
            if (elem.phone.replace(/[,$+)(-\s]/g, '').indexOf(numberFilterBy) > -1) {
                candidatesFiltered.push(elem);
            }
        }))

        console.log(candidatesFiltered);
}

searchCandidatesByPhoneNumber(candidateArr[8].phone);


// task 2

function getCandidateById (id) {
    let candidate,
        regDate,
        day,
        month,
        year;
    
    candidateArr.forEach(elem => {
        if (elem._id === id) {
            candidate = elem;
            regDate = new Date(elem.registered);
        }     
    })

    regDate.getDate() < 10 ? day = `0${regDate.getDate()}` : day = `${regDate.getDate()}`
    regDate.getMonth() < 10 ? month = `0${regDate.getMonth()}` : month = `${regDate.getMonth()}`
    year = regDate.getFullYear();
    candidate.registered = `${day}/${month}/${year}`

    console.log(candidate);
}

getCandidateById(candidateArr[6]._id);


// task 3

function sortCandidatesArr (sortType) {
	if (sortType === 'asc') {;
		candidateArr.sort((a, b) => {
			return +a.balance.replace(/[,$]/g, '') - +b.balance.replace(/[,$]/g, '');
		})
	} else if (sortType === 'desc') {
		candidateArr.sort((a, b) => {
			return +b.balance.replace(/[,$]/g, '') - +a.balance.replace(/[,$]/g, '');
		})
	}

	console.log(candidateArr);

}	

sortCandidatesArr('asc');