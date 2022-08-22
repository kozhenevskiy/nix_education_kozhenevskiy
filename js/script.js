
window.addEventListener('load', (event) => {
    // let productImg = document.querySelector('.img-card-wrap img'),
    //     productTitle = document.querySelector('.card-main h3'),
    //     productLeft = document.querySelector('.product-left'),
    //     productPrice = document.querySelector('.product-price'),
    //     productReviews = document.querySelector('.product-reviews');

    // let productItem = document.querySelector('.product-item');
    let productWrap = document.querySelector('.product-cards .container');
    // let newr = document.createElement(productItem);
    // productWrap.appendChild(newr);

    // let productItem = document.createElement('div');
    //     productItem.classList.add('product-item');

    // productWrap.appendChild(productItem);

    items.forEach(elem => {
        let productItem = document.createElement('div');
            productItem.classList.add('product-item');

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



})