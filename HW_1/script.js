// task 1

for (let i = 1; i <= 10; i++) {
    if (i % 3 === 0) {  
        console.log('FizBuz');
        continue;
    }

    if (i % 2 !== 0) { 
        console.log('Buz');
        
    }

    if (i % 2 === 0) {
        console.log('Fiz');
        
    }
}


// task 2

function countFactorial (num) {
    let result = 1;

    for (let i = num; i > 1; i--) {
        result *= i;
    }

    console.log(result);
}

countFactorial(10);


// task 3

function countQuantityOfPaper (sheetsInReamPaper, consumptionPerWeek, weeksAmount) {
    let result = (weeksAmount * consumptionPerWeek) / sheetsInReamPaper

    if (Number.isInteger(result) === true) {
        return result;
    } else {
        result = result.toString().split('');

        result = +result.slice(0, result.indexOf('.')).join('') + 1;

        console.log(result);
    }
}

countQuantityOfPaper(500, 1200, 8);


// task 4 

function findNumberFloorAndPorch (numberOfFlat) {
    let porch = numberOfFlat / 27;
    let floor = 9;

    if (Number.isInteger(porch) !== true) {
        porch = porch.toString().split('');

        porch = +porch.slice(0, porch.indexOf('.')).join('');

        floor = (numberOfFlat - (porch * 27)) / 3;
        
        floor = floor.toString().split('');

        floor = +floor.slice(0, floor.indexOf('.')).join('') + 1;

        porch += 1;
    }

    console.log(`Number of porch: ${porch}; Number of floor: ${floor};`)
}

findNumberFloorAndPorch(110);


// task 5

function buildPyramid (num) {
    let lattice = '#',
        space = '';
    
    for (let i = 0; i < num; i++) {
        for (let q = i; q < (num - 1); q++) {
            space += ' ';
        }
        console.log(space + lattice);
        lattice += '##';
        space = '';
    }
}

buildPyramid(6);