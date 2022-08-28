
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
    
})