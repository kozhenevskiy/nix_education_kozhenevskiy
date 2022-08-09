// task 3

function getTime () {
    let countOfTimeout = 0;
    const timeOfCall = new Date() / 1000;

    console.log('enabled');

    function returnDifferenceOfTime () {

        if (countOfTimeout === 5) {
            return console.log('Finish');
        }

        console.log(Math.floor(new Date() / 1000 - timeOfCall));
        countOfTimeout += 1;

        setTimeout(returnDifferenceOfTime, 1000);
    };

    setTimeout(returnDifferenceOfTime, 1000);
}

getTime ();


// task 4

function showTime (sec) {
    let secTime = sec;
    timer(secTime);

    function timer (time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        if (minutes === 0 && seconds === 0) {
            return console.log('Time end');
        }

        if (minutes < 1) {
            seconds < 10 ? console.log(`00:0${seconds}`) : console.log(`00:${seconds}`)
        } else {
            if (minutes < 10) {
                seconds < 10 ? console.log(`0${minutes}:0${seconds}`) : console.log(`0${minutes}:${seconds}`);
            } else {
                seconds < 10 ? console.log(`${minutes}:0${seconds}`) : console.log(`${minutes}:${seconds}`);
            }
        }

        secTime -= 1;

        setTimeout(timer, 1000, secTime);
    };
}

setTimeout(showTime, 7000, 5);
