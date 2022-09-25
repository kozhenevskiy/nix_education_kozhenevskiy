window.addEventListener('load', (event) => {
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
        {start: 530, duration: 50, title: "Test max 17:00"},
    ]

    function createCalendar() {
        let eventsWrapper1 = document.querySelector('.first-part .event-wrapper'),
            eventsWrapper2 = document.querySelector('.second-part .event-wrapper');

        function removeWrongStartEvent() {
            eventsArr.forEach((elem, index, arr) => {
                if(elem.start >= 540) {
                    arr.splice(index, 1);
                }
            })
        }
        removeWrongStartEvent();

        eventsArr.forEach((elem) => {
            if(elem.start < 540 && elem.start + elem.duration > 540) {
                elem.duration = 540 - elem.start;
            }
        })

        eventsArr.forEach((elem, index) => {
            if(!elem.id) {
                elem.id = index + 1;
            }

            if(!elem.borderColor) {
                elem.borderColor;
            }
        })

        let eventsArrSort = eventsArr.sort((a, b) => {return a.start - b.start});

        let noCrossEvents = [];
    
        function sortNoCrossEvents(arr) {
            let startArr = [],
                durationArr = [];

            arr.map((elem) => {
                startArr.push(elem.start);
                durationArr.push(elem.duration);
            })

            arr.map((elem, index) => {
                if (index === 0 && elem.start + elem.duration <= startArr[index + 1]) {
                    noCrossEvents.push(elem);
                } else if (elem.start + elem.duration <= startArr[index + 1]
                    && startArr[index - 1] + durationArr[index - 1] <= elem.start && index !== 0) {
                    noCrossEvents.push(elem);
                } else if (index + 1 === arr.length && elem.start >= startArr[index - 1] + durationArr[index - 1]) {
                    noCrossEvents.push(elem);
                } else if (arr.length === 1) {
                    noCrossEvents.push(elem);
                }
            });
        }
        sortNoCrossEvents(eventsArrSort);

        function createNoCrossEvents (arr) {
            arr.forEach(elem => {
                let newEvent = document.createElement('div');
                newEvent.classList.add('event');
                newEvent.setAttribute('data-id', elem.id),
                hours = Math.floor(elem.start / 60 + 8),
                minutes = elem.start % 60;

            if (minutes < 10) {minutes = `0${minutes}`};    
            newEvent.innerHTML = `
                <h2>${elem.title}</h2>
                <div class="title-popup"><p>${elem.title}</p></div>
                <div class="event-descr">
                    <div class="event-descr-close"><div></div></div>
                    <label><p>Title:</p> <input data-title type="text" value="${elem.title}"></label>
                    <label><p>Start:</p> <input data-start-hours type="text" maxlength="2" value="${hours}">:<input data-start-minutes type="text" maxlength="2" value="${minutes}"></label>
                    <label><p>Duration:</p> <input data-duration type="text" maxlength="3" value="${elem.duration}"></label>
                    <label><p>Color:</p> <input class="color-input" data-huebee /></label>
                    <button class="remove-btn">Remove</button>
                    <button class="add-btn">Add</button>
                </div>
            `;

            if (elem.start >= 300) {
                if (elem.start + elem.duration >= 540) {
                    newEvent.style.cssText = `
                        top: ${elem.start * 2 - 600}px;
                        height: ${(540 - elem.start) * 2}px;
                        background: ${elem.borderColor}3;
                        border-color: ${elem.borderColor};
                        width: 198px;
                    `;
                } else {
                    newEvent.style.cssText = `
                        top: ${elem.start * 2 - 600}px;
                        height: ${elem.duration * 2}px;
                        background: ${elem.borderColor}3;
                        border-color: ${elem.borderColor};
                        width: 198px;
                    `;
                }
                eventsWrapper2.appendChild(newEvent);
            } else {
                if (elem.start + elem.duration >= 300) {
                    newEvent.style.cssText = `
                        top: ${elem.start * 2}px;
                        height: ${(300 - elem.start) * 2}px;
                        background: ${elem.borderColor}3;
                        border-color: ${elem.borderColor};
                        width: 198px;
                    `;
                } else { 
                    newEvent.style.cssText = `
                        top: ${elem.start * 2}px;
                        height: ${elem.duration * 2}px;
                        background: ${elem.borderColor}3; 
                        border-color: ${elem.borderColor};
                        width: 198px;
                    `;
                }
                eventsWrapper1.appendChild(newEvent)
            }

            if(elem.start < 300 && elem.start + elem.duration >= 300) {
                let eventContinue = document.createElement('div');
                    eventContinue.classList.add('event');
                    eventContinue.setAttribute('data-id', elem.id);
                    hours = Math.floor(elem.start / 60 + 8),
                    minutes = elem.start % 60;

                if (minutes < 10) {minutes = `0${minutes}`}; 
                    eventContinue.innerHTML = `
                    <h2>${elem.title}</h2>
                    <div class="title-popup"><p>${elem.title}</p></div>
                    <div class="event-descr">
                        <div class="event-descr-close"><div></div></div>
                        <label><p>Title:</p> <input data-title type="text" value="${elem.title}"></label>
                        <label><p>Start:</p> <input data-start-hours type="text" maxlength="2" value="${hours}">:<input data-start-minutes type="text" maxlength="2" value="${minutes}"></label>
                        <label><p>Duration:</p> <input data-duration type="text" maxlength="3" value="${elem.duration}"></label>
                        <label><p>Color:</p> <input class="color-input" data-huebee /></label>
                        <button class="remove-btn">Remove</button>
                        <button class="add-btn">Add</button>
                    </div>
                `;

                eventContinue.style.cssText = `
                    top: 0;
                    height: ${(elem.duration - (300 - elem.start)) * 2}px;
                    background: ${elem.borderColor}3;
                    border-color: ${elem.borderColor};
                    width: 198px;
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
        }
        sortCrossEvents(eventsArrSort);

        function createCrossEvents (arr) {
            arr.forEach(elem => {
                elem.forEach((el, index) => {
                    let newEvent = document.createElement('div');
                    newEvent.classList.add('event');
                    newEvent.setAttribute('data-id', el.id);
                    hours = Math.floor(el.start / 60 + 8),
                    minutes = el.start % 60;

                if (minutes < 10) {minutes = `0${minutes}`}; 
                    newEvent.innerHTML = `
                    <h2>${el.title}</h2>
                    <div class="title-popup"><p>${el.title}</p></div>
                    <div class="event-descr">
                        <div class="event-descr-close"><div></div></div>
                        <label><p>Title:</p> <input data-title type="text" value="${el.title}"></label>
                        <label><p>Start:</p> <input data-start-hours type="text" maxlength="2" value="${hours}">:<input data-start-minutes type="text" maxlength="2" value="${minutes}"></label>
                        <label><p>Duration:</p> <input data-duration type="text" maxlength="3" value="${el.duration}"></label>
                        <label><p>Color:</p> <input class="color-input" data-huebee /></label>
                        <button class="remove-btn">Remove</button>
                        <button class="add-btn">Add</button>
                    </div>
                `;

                if (el.start >= 300) {
                    if (el.start + el.duration >= 540) {
                        newEvent.style.cssText = `
                            left: ${index * (200 / elem.length)}px;
                            top: ${el.start * 2 - 600}px;
                            height: ${(540 - el.start) * 2}px;
                            width: ${200 / elem.length - 2}px;
                            background: ${el.borderColor}3;
                            border-color: ${el.borderColor};
                        `;
                    } else {
                        newEvent.style.cssText = `
                            left: ${index * (200 / elem.length)}px;
                            top: ${el.start * 2 - 600}px;
                            height: ${el.duration * 2}px;
                            width: ${200 / elem.length - 2}px;
                            background: ${el.borderColor}3;
                            border-color: ${el.borderColor};
                        `;
                    }
                    eventsWrapper2.appendChild(newEvent);
                } else {
                    if (el.start + el.duration >= 300) {
                        newEvent.style.cssText = `
                            left: ${index * (200 / elem.length)}px;
                            top: ${el.start * 2}px;
                            height: ${(300 - el.start) * 2}px;
                            width: ${200 / elem.length - 2}px;
                            background: ${el.borderColor}3;
                            border-color: ${el.borderColor};
                        `;
                    } else {
                        newEvent.style.cssText = `
                            left: ${index * (200 / elem.length)}px;
                            top: ${el.start * 2}px;
                            height: ${el.duration * 2}px;
                            width: ${200 / elem.length - 2}px;
                            background: ${el.borderColor}3;
                            border-color: ${el.borderColor};
                        `;
                    }
                    eventsWrapper1.appendChild(newEvent)
                }

                if(el.start < 300 && el.start + el.duration >= 300) {
                    let eventContinue = document.createElement('div');
                        eventContinue.classList.add('event');
                        eventContinue.setAttribute('data-id', el.id);
                        hours = Math.floor(el.start / 60 + 8),
                        minutes = el.start % 60;

                    if (minutes < 10) {minutes = `0${minutes}`}; 
                        eventContinue.innerHTML = `
                        <h2>${el.title}</h2>
                        <div class="title-popup"><p>${el.title}</p></div>
                        <div class="event-descr">
                            <div class="event-descr-close"><div></div></div>
                            <label><p>Title:</p> <input data-title type="text" value="${el.title}"></label>
                            <label><p>Start:</p> <input data-start-hours type="text" maxlength="2" value="${hours}">:<input data-start-minutes type="text" maxlength="2" value="${minutes}"></label>
                            <label><p>Duration:</p> <input data-duration type="text" maxlength="3" value="${el.duration}"></label>
                            <label><p>Color:</p> <input class="color-input" data-huebee /></label>
                            <button class="remove-btn">Remove</button>
                            <button class="add-btn">Add</button>
                        </div>
                    `;

                    eventContinue.style.cssText = `
                        left: ${index * (200 / elem.length)}px;
                        top: 0;
                        height: ${(el.duration - (300 - el.start)) * 2}px;
                        width: ${200 / elem.length - 2}px;
                        background: ${el.borderColor}3;
                        border-color: ${el.borderColor};
                    `;

                    eventsWrapper2.appendChild(eventContinue);
                }
                })
            })
                
        }
        if(crossEvents.length !== 0) {createCrossEvents(crossEvents)};

        function createOtherEvents() {
            crossEvents.forEach(elemen => {
                elemen.forEach(elem => {
                    noCrossEvents.forEach(el => {
                        if(elem.start < el.start && elem.start + elem.duration > el.start) {
                            let changingEvent = document.querySelectorAll(`.event[data-id="${el.id}"]`);
                            changingEvent.forEach(element => {
                            let widthOfCross = parseFloat(document.querySelector(`.event[data-id="${elem.id}"]`).style.width) + 2,
                                leftOfCross = parseFloat(document.querySelector(`.event[data-id="${elem.id}"]`).style.left);
                                element.style.width = `${200 - widthOfCross - leftOfCross - 2}px`;
                                element.style.left = `${widthOfCross + leftOfCross}px`;
                            })
                        }
                    })
                })
            })
        }
        if(crossEvents.length !== 0) {createOtherEvents()};

        function createFinallyEvents() {
            crossEvents.map((elem, index) => {
                elem.map(el => {
                    for(let i = 1; i < crossEvents.length; i++) {
                        if(crossEvents[index + i]) {
                        if(el.start < crossEvents[index + i][0].start && el.start + el.duration > crossEvents[index + i][0].start) {
                            let changingEvents = [];
                            crossEvents[index + i].forEach(element => {
                                changingEvents.push(element);
                            })
                            changingEvents.forEach((ele, ind) => {
                                let changingEvent = document.querySelectorAll(`.event[data-id="${ele.id}"]`);
                                changingEvent.forEach(element => {
                                    let widthOfCross = parseFloat(document.querySelector(`.event[data-id="${el.id}"]`).style.width) + 2,
                                    leftOfCross = parseFloat(document.querySelector(`.event[data-id="${el.id}"]`).style.left),
                                    eventsAmount = changingEvents.length;
                                    if(changingEvents[ind - 1]) {
                                        let changingEventWidth = parseFloat(document.querySelector(`.event[data-id="${changingEvents[ind - 1].id}"]`).style.width) + 2;
                                        element.style.left = `${widthOfCross + leftOfCross + (changingEventWidth * ind)}px`;    
                                    } else {
                                        element.style.left = `${widthOfCross + leftOfCross}px`;
                                    }

                                    element.style.width = `${(200 - widthOfCross - leftOfCross) / eventsAmount - 2}px`;
                                })
                            })
                        }
                    }
                    }
                })
                
            })
            
        }
        if(crossEvents.length !== 0) {createFinallyEvents()};
        if(crossEvents.length !== 0) {createOtherEvents()};

        var colorInput = document.querySelectorAll('.color-input');
        colorInput.forEach(elem => {
            new Huebee( elem, {
                setBGColor: true,
                saturations: 2,
            });

            elem.addEventListener('click', (event) => {
                event.preventDefault();
            })
        })

        function controlTitleLength () {
            let calendarWrapper = document.querySelector('.calendar-wrapper'),
                elemTitles = calendarWrapper.querySelectorAll('.event h2');

            elemTitles.forEach(elem => {
                let eventBody = elem.closest('.event'),
                    elemTitleWidth = elem.offsetWidth,
                    eventBodyWidth = eventBody.offsetWidth;
                
                if(elemTitleWidth > eventBodyWidth - 10) {
                    elem.style.cssText = `
                        width: ${eventBodyWidth - 10}px;
                    `;
                }
            })
        }
        controlTitleLength();

        function clearBody() {
            let eventsBody = document.querySelectorAll('.event');
            eventsBody.forEach(element => {element.remove()});
        }

        function addEvent() {
            eventsWrapper1.addEventListener('click', (event) => { 
                let clickCordinats = Math.floor((event.pageY - 100) / 2),
                    newEvent = {
                        start: clickCordinats,
                        duration: 15,
                        title: "without title"
                    };
                eventsArr.push(newEvent); 
                clearBody();
                createCalendar();
                callNewEventModal();
                event.stopImmediatePropagation();
            })

            eventsWrapper2.addEventListener('click', (event) => {
                let clickCordinats = Math.floor((event.pageY - 100) / 2 + 300),
                    newEvent = {
                        start: clickCordinats,
                        duration: 15,
                        title: "without title"
                    };
                eventsArr.push(newEvent);
                clearBody();
                createCalendar();
                callNewEventModal();
                event.stopImmediatePropagation();
            })

            function callNewEventModal() {
                let addedEventModal = document.querySelector(`.event[data-id="${eventsArr.length}"] .event-descr`);
                    addedEventModal.classList.add('event-descr-block');
            }
        }
        addEvent();

        function removeAndChangeEvent() {
            let eventBody = document.querySelectorAll('.event');
            eventBody.forEach(elem => {
                let eventDescr = elem.querySelector('.event-descr'),
                    removeBtn = elem.querySelector('.remove-btn'),
                    addBtn = elem.querySelector('.add-btn'),
                    eventId = +elem.getAttribute('data-id'),
                    closeDescr = elem.querySelector('.event-descr-close div');

                elem.addEventListener('click', (event) => {
                    eventDescr.classList.toggle('event-descr-block');
                    event.stopImmediatePropagation();
                })

                closeDescr.addEventListener('click', (event) => {
                    eventDescr.classList.remove('event-descr-block');
                    event.stopImmediatePropagation();
                })

                eventDescr.addEventListener('click', (event) => {
                    event.stopImmediatePropagation();
                })

                removeBtn.addEventListener('click', (event) => {
                    eventsArr.forEach((elem, index, arr) => {
                        if (elem.id === eventId) {
                            arr.splice(index, 1);
                            clearBody();
                            createCalendar();
                        }
                        event.stopImmediatePropagation();
                    })
                })

                addBtn.addEventListener('click', (event) => {
                    let inputTitle = elem.querySelector('input[data-title]').value,
                        startHours = +elem.querySelector('input[data-start-hours]').value - 8,
                        startMinutes = +elem.querySelector('input[data-start-minutes]').value,
                        inputDuration = +elem.querySelector('input[data-duration]').value,
                        inputColor = elem.querySelector('input[data-huebee]').value,
                        eventStart = startHours * 60 + startMinutes;
                        
                    eventsArr.forEach((elem) => {
                        if (elem.id === eventId) {
                            elem.title = inputTitle;
                            elem.start = eventStart;
                            elem.duration = inputDuration;
                            elem.borderColor = inputColor;
                            clearBody();
                            createCalendar();
                        }
                        event.stopImmediatePropagation();
                    })
                })
            })
        }
        removeAndChangeEvent();

        let actualTime,
            actualHours,
            actualMinutes,
            startTime;

        function showNotification() {
            actualTime = new Date();
            actualHours = actualTime.getHours() * 60 - 480;
            actualMinutes = actualTime.getMinutes();
            startTime = actualHours + actualMinutes;

            eventsArr.forEach(elem => {
                if(elem.start === startTime) {
                    let notification = document.querySelector('.notification'),
                        notificationTitle = document.querySelector('.notification p');
                        notificationTitle.textContent = `${elem.title} is beginning!`;
                        notification.classList.add('active');

                        setTimeout(() => {
                            notification.classList.remove('active');
                        }, 15000)
                }
            })
        }
        showNotification();
        setInterval(showNotification, 60000);
    }
    createCalendar();

    

})