export function createCard(items) {
    let productWrap = document.querySelector('.product-cards .items-wrapper');
    items.forEach(elem => {
        let productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.setAttribute('data-items', `${elem._id}`);

        productItem.innerHTML = `
            <div class="heart"><img src="img/icons/like_empty.svg" alt="like"></div>
            <div class="card-main">
                <div class="card-img-wrapper">
                    <img src="${elem.imgUrl}" alt="${elem.name}">
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
}