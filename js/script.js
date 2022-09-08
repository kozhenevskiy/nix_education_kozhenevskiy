window.addEventListener('load', (event) => {
    let eventsWrapper1 = document.querySelector('.first-part .event-wrapper'),
        eventsWrapper2 = document.querySelector('.second-part .event-wrapper');
    let eventsArr = [
        {start: 0, duration: 15, title: "Exercise"},
        {start: 25, duration: 30, title: "Travel to work"},
        {start: 30, duration: 30, title: "Plan day"},
        {start: 60, duration: 15, title: "Review yesterday's commits"},
        {start: 100, duration: 15, title: "Code review"},
        {start: 180, duration: 90, title: "Have lunch with John"},
        {start: 280, duration: 50, title: "Test continue event"},
        {start: 360, duration: 30, title: "Skype call"},
        {start: 370, duration: 45, title: "Follow up with designer"},
        {start: 405, duration: 30, title: "Push up branch"},
    ]

    let eventsArrSort = eventsArr.sort((a, b) => {return a.start - b.start});

    let noCrossEvents = [];
    
    function sortNoCrossEvents(arr) {
        console.log(arr);
        let startArr = [],
            durationArr = [];

        arr.map((elem) => {
            startArr.push(elem.start);
            durationArr.push(elem.duration);
        })

        arr.map((elem, index) => {
            if (index === 0 && elem.start + elem.duration < startArr[index + 1]) {
                noCrossEvents.push(elem);
            } else if (elem.start + elem.duration < startArr[index + 1]
                && startArr[index - 1] + durationArr[index - 1] <= elem.start && index !== 0) {
                noCrossEvents.push(elem);
            }
        });
    }
    sortNoCrossEvents(eventsArrSort);

    function createNoCrossEvents (arr) {
        arr.forEach(elem => {
            let newEvent = document.createElement('div');
            newEvent.classList.add('event');
            newEvent.innerHTML = `
                <h2>${elem.title}</h2>
            `;

            if (elem.start >= 300) {
                newEvent.style.cssText = `
                    top: ${elem.start * 2 - 600}px;
                    height: ${elem.duration * 2}px;
                `;
                eventsWrapper2.appendChild(newEvent);
            } else {
                newEvent.style.cssText = `
                    top: ${elem.start * 2}px;
                    height: ${elem.duration * 2}px;
                `;
                eventsWrapper1.appendChild(newEvent)
            }

            if(elem.start < 300 && elem.start + elem.duration >= 300) {
                let eventContinue = document.createElement('div');
                    eventContinue.classList.add('event');
                    eventContinue.innerHTML = `
                    <h2>${elem.title}</h2>
                `;

                eventContinue.style.cssText = `
                    top: 0;
                    height: ${(elem.duration - (300 - elem.start)) * 2}px;
                `;

                eventsWrapper2.appendChild(eventContinue);
            }
        })
    }
    createNoCrossEvents(noCrossEvents);

    let crossEvents = [];

    function sortCrossEvents(arr) {
        let crossArrItem = [],
            startArr = [],
            durationArr = [];
            
        arr.map((elem) => {
            startArr.push(elem.start);
            durationArr.push(elem.duration);
        })

        arr.map((elem, index, array) => {
                if (index + 1 !== array.length && elem.start + elem.duration > startArr[index + 1]) {
                    crossArrItem.push(elem);
                } else if (elem.start + elem.duration <= startArr[index + 1] && index !== 0
                            && startArr[index - 1] + durationArr[index - 1] > elem.start) {
                    crossArrItem.push(elem);
                    crossEvents.push(crossArrItem);
                    crossArrItem = [];
                } else if (index + 1 === arr.length && startArr[index - 1] + durationArr[index - 1] > elem.start) {
                    crossArrItem.push(elem);
                    crossEvents.push(crossArrItem);
                    crossArrItem = [];
                }
        });

        console.log(crossEvents);
    }

    sortCrossEvents(eventsArrSort);

    function createCrossEvents (arr) {
        arr.forEach(elem => {
            elem.forEach((el, index) => {
                let newEvent = document.createElement('div');
                newEvent.classList.add('event');
                newEvent.innerHTML = `
                <h2>${el.title}</h2>
            `;

            if (el.start >= 300) {
                newEvent.style.cssText = `
                    left: ${index * (200 / elem.length)}px;
                    top: ${el.start * 2 - 600}px;
                    height: ${el.duration * 2}px;
                    width: ${200 / elem.length}px;
                `;

                eventsWrapper2.appendChild(newEvent);
            } else {
                newEvent.style.cssText = `
                    left: ${index * (200 / elem.length)}px;
                    top: ${el.start * 2}px;
                    height: ${el.duration * 2}px;
                    width: ${200 / elem.length}px;
                `;
                eventsWrapper1.appendChild(newEvent)
            }

            if(el.start < 300 && el.start + el.duration >= 300) {
                let eventContinue = document.createElement('div');
                    eventContinue.classList.add('event');
                    eventContinue.innerHTML = `
                    <h2>${el.title}</h2>
                `;

                eventContinue.style.cssText = `
                    left: ${index * (200 / elem.length)}px;
                    top: 0;
                    height: ${(el.duration - (300 - el.start)) * 2}px;
                    width: ${200 / elem.length}px;
                `;

                eventsWrapper2.appendChild(eventContinue);
            }
            })
        })
            
    }

    if(crossEvents.length !== 0) {createCrossEvents(crossEvents)};

})