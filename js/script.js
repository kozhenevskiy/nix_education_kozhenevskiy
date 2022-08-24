
window.addEventListener('load', (event) => {
    let productWrap = document.querySelector('.product-cards .items-wrapper');

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