export function buttonClickEffect() {
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