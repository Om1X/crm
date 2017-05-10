function menuScroll() {
    var topMenu = document.getElementById('topMenu');

    function getCoords(elem) { // определение Y координаты генерируемого селекта
        var box = elem.getBoundingClientRect();
        return box.top + pageYOffset;
    }

    function mScrollTo() {
        if (event.target.tagName !== 'A') return;
        var href = event.target.href,
            id = document.getElementById(href.substr(href.indexOf('#') + 1));
        if (id) window.scrollTo(0, getCoords(id) - 60);
        event.preventDefault();
    }

    topMenu.addEventListener('click', mScrollTo);
}

menuScroll();