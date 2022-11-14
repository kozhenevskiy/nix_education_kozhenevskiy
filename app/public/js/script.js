import {createCard} from './createCard.js';
import {buttonClickEffect} from './buttonClickEffect.js';
import {addToLikely} from './addToLikely.js';
import {createCartList} from './createCartList.js';
import {createModalOfProduct} from './createModalOfProduct.js';
import {search, buttonSearchClickEffect} from './search.js';
import {filter, createFilterHTML} from './filter.js'
 
let items;

fetch('https://mac-outlet.herokuapp.com/main/products', {
    method: 'GET',
}).then(response => {
    response.json().then(data => {
        items = data;
        createProductList();
    });
}).catch(err => console.log(err));

function createProductList() {
    createCard(items);

    const searchInput = document.querySelector('#search-input');
    const filterBtn = document.querySelector('.setting-icon-wrap'); 
    searchInput.addEventListener('keydown', event => {
        if(event.keyCode === 13) {search(items, event.target.value)};
    })
    filterBtn.addEventListener('click', event => {
        search(items, searchInput.value);
    })
    buttonSearchClickEffect(filterBtn);

    createCartList();
    let cartBody = document.querySelector('.cart-body'),
        cartBtn = document.querySelector('.cart-btn-wrapper');

    cartBtn.addEventListener('click', (event) => {
        cartBody.classList.toggle('active');
    })

    createModalOfProduct(items);

    createFilterHTML(items);

    let goFilter = document.querySelector('.go-filter');
    goFilter.addEventListener('click', (event) => {
        filter(items);
    })

    addToLikely();

    buttonClickEffect();
    
}

export {items};