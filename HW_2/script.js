// task 1

const citiesAndCountries = {
	'Киев': 'Украина',
	'Нью-Йорк': 'США',
	'Амстердам': 'Нидерланды',
	'Берлин': 'Германия',
	'Париж': 'Франция',
	'Лиссабон': 'Португалия',
	'Вена': 'Австрия',
};

function objectToArray (obj) {
    let result = [];

    for (let key in obj) {
        result.push(`${key} - это ${obj[key]}`);
    }
    
    console.log(result);
}

objectToArray(citiesAndCountries);


// task 2

function getArray (num) {
    if (Number.isInteger(num / 3) === false) {
        console.log('Enter correct value');
    } else {
        let arr = [],
            insideArr = [];

        for (let i = 1; i <= num; i++) {
            insideArr.push(i);

            if (insideArr.length === 3) {
                arr.push(insideArr);
                insideArr = [];
            }
        }

        console.log(arr);
    }
}

getArray(21);


// task 3 

const namesOfDays = {
    ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
}

function returnDayOfWeek (lang, num, obj) {
    if (lang !== 'en' && lang !== 'ru' || num <= 0 || num > 7 || Number.isInteger(num) === false) {
        console.log('Enter correct data');
    } else {
        for (let key in obj) {
            if (key === lang) {
                console.log(obj[key][--num]);
            }
        }
    }
}

returnDayOfWeek ('en', 5, namesOfDays);


// task 4

function amountLeastNumbers (arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0 || Number.isInteger(arr[i]) === false) {
            return console.log('Enter correct data');
        }
    }

    arr.sort(function (a, b) {
        return a - b;
    });

    console.log(arr[0] + arr[1]);
}

amountLeastNumbers([150, 7, 435, 86, 90, 1842, 690]);


// task 5 

function fromBinaryToDecimal (binaryArr) {
    let count = 1,
        result = 0;

    const binary = binaryArr.reverse();

    for (let i = 0; i < binary.length; i++) {
        if (binary[i] !== 0 && binary[i] !== 1) {
            return console.log('Enter correct data');
        } else if (binary[i] === 1) {
            result += count;
        }

        count += count;
    }

    console.log(result);
}

fromBinaryToDecimal ([1, 1, 0, 0, 0, 1]);