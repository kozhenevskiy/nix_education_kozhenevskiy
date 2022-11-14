export function createModalOfProduct(items) {
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
        modalBody = document.querySelector('.modal-card'),
        productCard = document.querySelectorAll('.items-wrapper .product-item');

    productCard.forEach(elem => {
        elem.addEventListener('click', (event) => {
            let tg = event.target.closest('.product-item'),
                id = event.target.closest('.product-item').getAttribute('data-items'),
                ordersInCard = tg.querySelector('.orders-number').textContent,
                product;
                items.forEach((elem, index) => { if (tg.getAttribute('data-items') === elem._id) product = elem})

            modalImg.setAttribute('src', `${product.imgUrl}`);
            modalImg.setAttribute('alt', product.name);
            modalBody.setAttribute('data-item-modal', id);
            modalTitle.textContent = product.name;
            modalOrders.textContent = ordersInCard;
            modalReviews.textContent = product.orderInfo.reviews + '%';
            modalColor.textContent = product.color.join(', ');
            modalChip.textContent = product.chip.name;
            modalHeight.textContent = product.size.height;
            modalWidth.textContent = product.size.width;
            modalDepth.textContent = product.size.depth;
            modalWeight.textContent = product.size.weight;
            modalPrice.textContent = product.price;
            modalAmount.textContent = product.orderInfo.inStock;
            product.os === null ? modalOperating.textContent = '---' 
                : modalOperating.textContent = product.os 

            modalWindow.classList.add('active');
        })
    })

    modalWindow.addEventListener('click', (event) => {
        event.target.classList.remove('active');
    })
}