
window.addEventListener('load', (event) => {
    let productWrap = document.querySelector('.product-cards .items-wrapper');

    items.forEach(elem => {
        let productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.setAttribute('data-items', `${elem.id}`);

        productItem.innerHTML = `
            <div class="heart"><img src="img/icons/like_empty.svg" alt="like"></div>
            <div class="card-main">
                <div class="card-img-wrapper">
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
                <div class="heart"><img src="img/icons/like_filled.svg" alt="like"></div>
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

    let countOfUseFunctStorage = 0;

    function createCartList() {
        let cartItem = document.querySelector('.cart-item'),
            cartsWrapp = document.querySelector('.cart-items'),
            productButtons = document.querySelectorAll('.product-item .add-to-cart');
            
        function addToCart(url, name, price, amount = 1) {
            let newCartItem = document.createElement('div');

                newCartItem.classList.add('cart-item');
                newCartItem.innerHTML = cartItem.innerHTML;

            newCartItem.querySelector('.cart-img-wrapper img').setAttribute('src', url);
            newCartItem.querySelector('.cart-img-wrapper img').setAttribute('alt', name);
            newCartItem.querySelector('.cart-item-info h3').textContent = name;
            newCartItem.querySelector('.cart-item-price>p span').textContent = +price;
            newCartItem.querySelector('.item-amount').textContent = amount;

            cartsWrapp.appendChild(newCartItem);
            countTotal();
            delFromCart();
            changeAmount();

            window.localStorage.setItem(`cartElem:${name}${price}`,`${url},${name},${price},${amount}`);
            
        }

        function addFromStorage() {
            let localCartElements = Object.keys(localStorage);
            if (countOfUseFunctStorage === 0) {
                localCartElements.forEach(elem => {
                    if(elem.startsWith('cartElem')) {
                        addToCart(...window.localStorage.getItem(elem).split(","));
                    }
                })
                countOfUseFunctStorage += 1;
            }
        }

        function delFromCart() {
            let delBtn = document.querySelectorAll('.cart-item-container .cart-item-del');

            delBtn.forEach(elem => {
                elem.addEventListener('click', (event) => {
                    let cartItem = event.currentTarget.closest('.cart-item'),
                        cartTitle = cartItem.querySelector('.cart-item-info h3').textContent,
                        cartPrice = cartItem.querySelector('.cart-item-price>p span').textContent;
                        
                    window.localStorage.removeItem(`cartElem:${cartTitle}${cartPrice}`);
                    cartItem.remove();
                    countTotal();
                })
            })
        }

        function countTotal() {
            let cartItems = cartsWrapp.querySelectorAll('.cart-item'),
                cartTotalBits = document.querySelector('.cart-total-bits'),
                cartTotalCash = document.querySelector('.cart-total-cash'),
                cartItemsCounter = document.querySelector('.cart-items-counter'),
                totalBits = 0,
                totalCash = 0;

            cartItems.forEach(elem => {
                let elemAmount = +elem.querySelector('.item-amount').textContent,
                    elemPrice = +elem.querySelector('.cart-item-price>p span').textContent;


                totalBits += elemAmount;
                totalCash += elemAmount * elemPrice;

            })

            cartTotalBits.textContent = totalBits;
            cartTotalCash.textContent = totalCash;
            cartItemsCounter.textContent = totalBits;
        }

        function changeAmount() {
            let cartItems = cartsWrapp.querySelectorAll('.cart-item');

            cartItems.forEach(elem => {
                let increaseAmount = elem.querySelector('.item-count-up'),
                    reduceAmount = elem.querySelector('.item-count-down'),
                    elemAmount = elem.querySelector('.item-amount'),
                    cartTitle = elem.querySelector('.cart-item-info h3').textContent,
                    cartPrice = elem.querySelector('.cart-item-price>p span').textContent,
                    cartImg = elem.querySelector('.cart-img-wrapper img').getAttribute('src');

                increaseAmount.addEventListener('click', (event) => {
                    if(+elemAmount.textContent < 4) {
                        elemAmount.textContent = +elemAmount.textContent + 1;
                        countTotal();
                        makeBlocked();
                        window.localStorage.setItem(`cartElem:${cartTitle}${cartPrice}`,`${cartImg},${cartTitle},${cartPrice},${elemAmount.textContent}`);
                        event.stopImmediatePropagation();
                    }
                })

                reduceAmount.addEventListener('click', (event) => {
                    if(+elemAmount.textContent > 1) {
                        elemAmount.textContent = +elemAmount.textContent - 1;
                        countTotal();
                        makeBlocked();
                        window.localStorage.setItem(`cartElem:${cartTitle}${cartPrice}`,`${cartImg},${cartTitle},${cartPrice},${elemAmount.textContent}`);
                        event.stopImmediatePropagation();
                    }
                })


                function makeBlocked() {
                    if(+elemAmount.textContent === 1) {
                        reduceAmount.classList.add('blocked');
                    } else if(reduceAmount.classList.contains('blocked')) {
                        reduceAmount.classList.remove('blocked');
                    }

                    if(+elemAmount.textContent === 4) {
                        increaseAmount.classList.add('blocked');
                    } else if(increaseAmount.classList.contains('blocked')) {
                        increaseAmount.classList.remove('blocked');
                    }
                }
                makeBlocked();

            })
                 
        }

        productButtons.forEach(elem => {
            elem.addEventListener('click', (event) => {
                    let cartBtn = event.target.closest('.add-to-cart'),
                        url = cartBtn.closest('.card-main').querySelector('img').getAttribute('src'),
                        name = cartBtn.closest('.card-main').querySelector('h3').textContent,
                        price = cartBtn.closest('.card-main').querySelector('.product-price').textContent;

                addToCart(url, name, price);
                event.stopImmediatePropagation();
            })
        });

        let modalCartBtn = document.querySelector('.modal-card .add-to-cart'),
            modalCard = document.querySelector('.modal-card');

        modalCartBtn.addEventListener('click', (event) => {
            let url = modalCard.querySelector('.modal-img img').getAttribute('src'),
                name = modalCard.querySelector('.modal-description h3').textContent,
                price = modalCard.querySelector('.modal-price').textContent;

            addToCart(url, name, price);
            event.stopImmediatePropagation();
        })
        addFromStorage();
    }
    createCartList();

    let cartBody = document.querySelector('.cart-body'),
        cartBtn = document.querySelector('.cart-btn-wrapper');

        cartBtn.addEventListener('click', (event) => {
            cartBody.classList.toggle('active');
        })


    function createModalOfProduct() {
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
            modalWindow = document.querySelector('.modal-card-wrapper'),
            productCard = document.querySelectorAll('.items-wrapper .product-item');

        productCard.forEach(elem => {
            elem.addEventListener('click', (event) => {
                let tg = event.target.closest('.product-item'),
                    ordersInCard = tg.querySelector('.orders-number').textContent,
                    id;
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
        })

        modalWindow.addEventListener('click', (event) => {
            event.target.classList.remove('active');
        })
    }
    createModalOfProduct();


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
                        <div class="heart"><img src="img/icons/like_empty.svg" alt="like"></div>
                        <div class="card-main">
                            <div class="card-img-wrapper">
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
                            <div class="heart"><img src="img/icons/like_filled.svg" alt="like"></div>
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

                createModalOfProduct();
                createCartList();
                addToLikely();
                buttonClickEffect();
            }

    let goFilter = document.querySelector('.go-filter');

    goFilter.addEventListener('click', (event) => {
        filter();
    })

    function addToLikely() {
        let heart = document.querySelectorAll('.product-item > .heart > img');

        heart.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if(!elem.classList.contains('filled')) {
                    elem.classList.add('filled');
                } else {
                    elem.classList.remove('filled');
                }
                event.stopImmediatePropagation();
            })
        })
    }
    addToLikely();

    function buttonClickEffect() {
        let button = document.querySelectorAll('.add-to-cart');

        button.forEach(elem => {
            elem.addEventListener('mousedown', (event) => {
                if (!elem.classList.contains('clicked')) elem.classList.add('clicked');
                event.stopImmediatePropagation();
            })
            elem.addEventListener('mouseup', (event) => {
                if (elem.classList.contains('clicked')) elem.classList.remove('clicked');
                event.stopImmediatePropagation();
            })
        })
    }
    buttonClickEffect();


})