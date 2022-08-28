
window.addEventListener('load', (event) => {
    let productWrap = document.querySelector('.product-cards .items-wrapper');

    items.forEach(elem => {
        let productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.setAttribute('data-items', `${elem.id}`);

        productItem.innerHTML = `
            <div class="heart"></div>
            <div class="card-main">
                <div>
                    <img src="img/${elem.imgUrl}" alt="${elem.name}">
                </div>
                <div>
                    <h3>${elem.name}</h3>
                    <p><span class="product-left">${elem.orderInfo.inStock}</span> left in stock</p>
                    <p>Price: <span class="product-price">${elem.price}</span> $</p>
                    <button class="add-to-cart">Add to cart</button>
                </div>
            </div>
            <div class="card-footer">
                <div class="heart"></div>
                <div class="product-reviews">
                    <p><span class="reviews-percent">${elem.orderInfo.reviews}%</span> Positive reviews</p>
                    <p>Above avarage</p>
                </div>
                <div class="product-orders">
                    <p class="orders-number">${Math.floor(Math.random() * (1000 - 300) + 300)}</p>
                    <p>orders</p>
                </div>
            </div>
    `;

    productWrap.appendChild(productItem);
    });

    let modalImg = document.querySelector('.modal-img img'),
        modalTitle = document.querySelector('.modal-description h3'), 
        modalReviews = document.querySelector('.modal-reviews .reviews-percent'),
        modalOrders = document.querySelector('.modal-reviews .orders-number'),
        modalColor = document.querySelector('.modal-color dd'),
        modalOperating = document.querySelector('.modal-operating-system dd'),
        modalChip = document.querySelector('.modal-chip dd'),
        modalHeight = document.querySelector('.modal-height dd'),
        modalWidth = document.querySelector('.modal-width dd'),
        modalDepth = document.querySelector('.modal-depth dd'),
        modalWeight = document.querySelector('.modal-weight dd'),
        modalPrice = document.querySelector('.modal-price'),
        modalAmount = document.querySelector('.modal-amount'),
        modalWindow = document.querySelector('.modal-card-wrapper');



    productWrap.addEventListener('click', (event) => {
        let tg = event.target.closest('.product-item'),
            ordersInCard = tg.querySelector('.orders-number').textContent,
            id ;
            items.forEach((elem, index) => { if (+tg.getAttribute('data-items') === elem.id) id = index})


        modalImg.setAttribute('src', `img/${items[id].imgUrl}`);
        modalImg.setAttribute('alt', items[id].name);
        modalTitle.textContent = items[id].name;
        modalOrders.textContent = ordersInCard;
        modalReviews.textContent = items[id].orderInfo.reviews + '%';
        modalColor.textContent = items[id].color.join(', ');
        modalChip.textContent = items[id].chip.name;
        modalHeight.textContent = items[id].size.height;
        modalWidth.textContent = items[id].size.width;
        modalDepth.textContent = items[id].size.depth;
        modalWeight.textContent = items[id].size.weight;
        modalPrice.textContent = items[id].price;
        modalAmount.textContent = items[id].orderInfo.inStock;
        items[id].os === null ? modalOperating.textContent = '---' 
            : modalOperating.textContent = items[id].os 




        modalWindow.classList.add('active');

    })

    modalWindow.addEventListener('click', (event) => {
        event.target.classList.remove('active');
    })




    let filterVariants = document.querySelectorAll('.filter-variants'),
        filterTitles = document.querySelectorAll('.filter-title'),
        filterArrow = document.querySelectorAll('.filter-title .arrow'),
        filterBtn = document.querySelector('.filter-icon-wrap'),
        filterBody = document.querySelector('.filter-wrapper');

        filterTitles.forEach((elem, index) => {
            elem.addEventListener('click', (event) => {
                filterVariants[index].classList.toggle('filter-variants-active');
                filterArrow[index].classList.toggle('arrow-active');
            });
        });

        filterBtn.addEventListener('click', (event) => {
            filterBody.classList.toggle('filter-wrapper-active');
            event.currentTarget.classList.toggle('active');
        });





        let colorWrapper = document.querySelector('.color-variants'),
            memoryWrapper = document.querySelector('.memory-variants'),
            osWrapper = document.querySelector('.os-variants');

            let colorsCollection = [],
                memoryCollection = [],
                osCollection = [];
            
            items.forEach(elem => {
                colorsCollection.push(...elem.color);
                memoryCollection.push(elem.storage);
                osCollection.push(elem.os);
            });

            colorsCollection = [... new Set(colorsCollection)];
            memoryCollection = [... new Set(memoryCollection)].sort((a, b) => {return a - b});
            osCollection = [... new Set(osCollection)];

            colorsCollection.map(elem => {
                let variant = document.createElement('div');
                    variant.classList.add('variant');
                    variant.innerHTML = `
                        <input type="checkbox" id="${elem}">
                        <label for="${elem}">${elem}</label>
                    `

                    colorWrapper.appendChild(variant);
            });

            memoryCollection.map(elem => {
                if (!isNaN(parseFloat(elem))) {
                let variant = document.createElement('div');
                    variant.classList.add('variant');
                    variant.innerHTML = `
                        <input type="checkbox" id="${elem}">
                        <label for="${elem}">${elem}</label>
                    `

                    memoryWrapper.appendChild(variant);
                }
            });

            osCollection.map(elem => {
                if (elem !== null) {
                let variant = document.createElement('div');
                    variant.classList.add('variant');
                    variant.innerHTML = `
                        <input type="checkbox" id="${elem}">
                        <label for="${elem}">${elem}</label>
                    `

                    osWrapper.appendChild(variant);
                }
            });


            function filter() {
            
                let filterPriceFrom = document.querySelector('#priceFrom'),
                    filterPriceTo = document.querySelector('#priceTo'),
                    filterColors = document.querySelectorAll('.color-variants .variant'),
                    filterMemory = document.querySelectorAll('.memory-variants .variant'),
                    filterOS = document.querySelectorAll('.os-variants .variant'),
                    filterDisplay2_5 = document.querySelector('#inch2_5'),
                    filterDisplay5_7 = document.querySelector('#inch5_7'),
                    filterDisplay7_12 = document.querySelector('#inch7_12'),
                    filterDisplay12_16 = document.querySelector('#inch12_16'),
                    filterDisplay16 = document.querySelector('#more16'),
                    displayVariants = document.querySelectorAll('.display-variant');

                let productCards = document.querySelectorAll('.product-item');
                    productCards.forEach(elem => {elem.remove()})

                let cardsArr = [],
                    colorsActive = [],
                    memoryActive = [],
                    osActive = [],
                    priceArr = [];

                items.forEach(elem => {priceArr.push(elem.price)});
                priceArr = priceArr.sort((a, b) => {return a - b});

                if(filterPriceFrom.value.length !== 0 || filterPriceTo.value.length !== 0) {
                    if(+filterPriceFrom.value < priceArr[0] || filterPriceFrom.value.length === 0) {filterPriceFrom.value = priceArr[0]};
                    if(+filterPriceTo.value > priceArr[priceArr.length - 1] || filterPriceTo.value.length === 0) {filterPriceTo.value = priceArr[priceArr.length - 1]};
                    items.forEach(elem => {
                        if(elem.price >= filterPriceFrom.value && elem.price <= filterPriceTo.value) {
                            cardsArr.push(elem);
                        }
                    })
                } else {
                    items.forEach(elem => {cardsArr.push(elem)});
                }    

                items.forEach(elem => {
                    if(elem.price >= filterPriceFrom.value && elem.price <= filterPriceTo.value) {
                        cardsArr.push(elem);
                    }
                })

                filterColors.forEach(elem => {
                    if(elem.querySelector('input').checked === true) {
                        colorsActive.push(elem.querySelector('label').textContent);
                    }
                })

                filterMemory.forEach(elem => {
                    if(elem.querySelector('input').checked === true) {
                        memoryActive.push(elem.querySelector('label').textContent);
                    }
                })

                filterOS.forEach(elem => {
                    if(elem.querySelector('input').checked === true) {
                        osActive.push(elem.querySelector('label').textContent);
                    }
                })

                function colorsFilter() {
                    let filteredByColors = [];
                        cardsArr.forEach(elem1 => {
                            colorsActive.forEach(elem2 => {
                                if(elem1.color.indexOf(elem2) !== -1) {
                                    filteredByColors.push(elem1);
                                }
                            })
                        })
                    cardsArr = filteredByColors;
                }

                if(colorsActive.length >= 1) {colorsFilter();};

                function memoryFilter() {
                    let filteredByMemory = [];
                        cardsArr.forEach(elem1 => {
                            memoryActive.forEach(elem2 => {
                                if(elem1.storage === +elem2) {
                                    filteredByMemory.push(elem1);
                                }
                            })
                        })
                    cardsArr = filteredByMemory;
                }

                if(memoryActive.length >= 1) {memoryFilter();};

                function osFilter() {
                    let filteredByOS = [];
                        cardsArr.forEach(elem1 => {
                            osActive.forEach(elem2 => {
                                if(elem1.os === elem2) {
                                    filteredByOS.push(elem1);
                                }
                            })
                        })
                    cardsArr = filteredByOS;
                }

                if(osActive.length >= 1) {osFilter();};

                function displayFilter() {
                    let filteredByDisplay = [];
                        cardsArr.forEach(elem => {
                            if(filterDisplay2_5.checked === true && elem.display >= 2 && elem.display < 5) {
                                filteredByDisplay.push(elem);
                            }

                            if(filterDisplay5_7.checked === true && elem.display >= 5 && elem.display < 7) {
                                filteredByDisplay.push(elem);
                            }

                            if(filterDisplay7_12.checked === true && elem.display >= 7 && elem.display < 12) {
                                filteredByDisplay.push(elem);
                            }

                            if(filterDisplay12_16.checked === true && elem.display >= 12 && elem.display < 16) {
                                filteredByDisplay.push(elem);
                            }

                            if(filterDisplay16.checked === true && elem.display >= 16) {
                                filteredByDisplay.push(elem);
                            }
                        })

                        cardsArr = filteredByDisplay;
                }

                displayVariants.forEach(elem => {if(elem.querySelector('input').checked === true) {displayFilter()}});

                cardsArr.forEach(elem => {
                    let productItem = document.createElement('div');
                        productItem.classList.add('product-item');
                        productItem.setAttribute('data-items', `${elem.id}`);
            
                    productItem.innerHTML = `
                        <div class="heart"></div>
                        <div class="card-main">
                            <div>
                                <img src="img/${elem.imgUrl}" alt="${elem.name}">
                            </div>
                            <div>
                                <h3>${elem.name}</h3>
                                <p><span class="product-left">${elem.orderInfo.inStock}</span> left in stock</p>
                                <p>Price: <span class="product-price">${elem.price}</span> $</p>
                                <button class="add-to-cart">Add to cart</button>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="heart"></div>
                            <div class="product-reviews">
                                <p><span class="reviews-percent">${elem.orderInfo.reviews}%</span> Positive reviews</p>
                                <p>Above avarage</p>
                            </div>
                            <div class="product-orders">
                                <p class="orders-number">${Math.floor(Math.random() * (1000 - 300) + 300)}</p>
                                <p>orders</p>
                            </div>
                        </div>
                `;
            
                productWrap.appendChild(productItem);
                });

                cardsArr = [];

            }

            let goFilter = document.querySelector('.go-filter');

            goFilter.addEventListener('click', (event) => {
                filter();
            })


    
})