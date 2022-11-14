export function addToLikely() {
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