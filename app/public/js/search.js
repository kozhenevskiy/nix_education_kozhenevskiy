import {createCard} from './createCard.js';
import {buttonClickEffect} from './buttonClickEffect.js';
import {addToLikely} from './addToLikely.js';
import {createCartList} from './createCartList.js';
import {createModalOfProduct} from './createModalOfProduct.js';
import {items} from './script.js';

function search(products, value) {
    let sortProd = [],
        productCards = document.querySelectorAll('.product-item');
    if(value.length > 0) {
        value = value.toLowerCase();
        products.forEach(elem => {
            let name = elem.name.toLowerCase();
            if(name.includes(value)) {sortProd.push(elem)};
        })
    }
    if(value.length === 0) {sortProd = products};
    productCards.forEach(elem => {elem.remove()})
    createCard(sortProd);
    createModalOfProduct(items);
    createCartList();
    addToLikely();
    buttonClickEffect();
}

function buttonSearchClickEffect(btn) {
    btn.addEventListener('mousedown', (event) => {
        if (!btn.classList.contains('clicked')) btn.classList.add('clicked');
        event.stopImmediatePropagation();
    })
    btn.addEventListener('mouseup', (event) => {
        if (btn.classList.contains('clicked')) btn.classList.remove('clicked');
        event.stopImmediatePropagation();
    })
}

export {search, buttonSearchClickEffect};