import {items} from './script.js';

let countOfUseFunctStorage = 0; // Use for create cart list from localstorage only when page reload
export function createCartList() {
    let cartItem = document.querySelector('.cart-item'),
        cartsWrapp = document.querySelector('.cart-items'),
        productButtons = document.querySelectorAll('.product-item .add-to-cart');
        
    function addToCart(url, name, price, elemId, amount = 1) {
        let cartItems = document.querySelectorAll('.cart-item'),
            cartElemsArr = [];

        cartItems.forEach(elem => {
            cartElemsArr.push(elem.getAttribute('data-cart-item'));
        })

        let existInCart = cartElemsArr.includes(elemId)

        if(existInCart) {
            cartItems.forEach(elem => {
                if(elem.getAttribute('data-cart-item') === elemId) {
                    let elemAmount = elem.querySelector('.item-amount'),
                        increaseAmount = elem.querySelector('.item-count-up'),
                        reduceAmount = elem.querySelector('.item-count-down');
                    if(+elemAmount.textContent < 4) {
                        let newAmount = +elemAmount.textContent + 1;
                        elemAmount.textContent = newAmount;
                        window.localStorage.setItem(`cartElem:${elemId}`,`${url},${name},${price},${elemId},${newAmount}`);
                    }

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
                    countTotal();
                }
            })
        }

        if(!existInCart) {
            let newCartItem = document.createElement('div');
            newCartItem.classList.add('cart-item');
            newCartItem.setAttribute('data-cart-item', elemId);
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

            window.localStorage.setItem(`cartElem:${elemId}`,`${url},${name},${price},${elemId},${amount}`);
        }
        
        
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
                    cartPrice = cartItem.querySelector('.cart-item-price>p span').textContent,
                    cartId = cartItem.getAttribute('data-cart-item');
                    
                window.localStorage.removeItem(`cartElem:${cartId}`);
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
                cartImg = elem.querySelector('.cart-img-wrapper img').getAttribute('src'),
                cartId = elem.getAttribute('data-cart-item');

            increaseAmount.addEventListener('click', (event) => {
                if(+elemAmount.textContent < 4) {
                    elemAmount.textContent = +elemAmount.textContent + 1;
                    countTotal();
                    makeBlocked();
                    window.localStorage.setItem(`cartElem:${cartId}`,`${cartImg},${cartTitle},${cartPrice},${cartId},${elemAmount.textContent}`);
                    event.stopImmediatePropagation();
                }
            })

            reduceAmount.addEventListener('click', (event) => {
                if(+elemAmount.textContent > 1) {
                    elemAmount.textContent = +elemAmount.textContent - 1;
                    countTotal();
                    makeBlocked();
                    window.localStorage.setItem(`cartElem:${cartId}`,`${cartImg},${cartTitle},${cartPrice},${cartId},${elemAmount.textContent}`);
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
                    price = cartBtn.closest('.card-main').querySelector('.product-price').textContent,
                    elemId = cartBtn.closest('.product-item').getAttribute('data-items');

            addToCart(url, name, price, elemId);
            event.stopImmediatePropagation();
        })
    });

    let modalCartBtn = document.querySelector('.modal-card .add-to-cart'),
        modalCard = document.querySelector('.modal-card');

    modalCartBtn.addEventListener('click', (event) => {
        let url = modalCard.querySelector('.modal-img img').getAttribute('src'),
            name = modalCard.querySelector('.modal-description h3').textContent,
            price = modalCard.querySelector('.modal-price').textContent,
            modalId = modalCard.getAttribute('data-item-modal');

        addToCart(url, name, price, modalId);
        event.stopImmediatePropagation();
    })
    addFromStorage();

    function addFromBanner(items) {
        let bannerTitle = document.querySelector('.banner h2').textContent;

        items.forEach(elem => {
            if(elem.name === bannerTitle) {
                addToCart(elem.imgUrl, elem.name, elem.price, elem._id);
            }
        })
    }

    let bannerAdd = document.querySelector('.banner .add-to-cart');
    bannerAdd.addEventListener('click', (event) => {
        addFromBanner(items);
        event.stopImmediatePropagation();
    })
}