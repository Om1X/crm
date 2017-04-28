function optionsRender(id) {
    var select = document.getElementById(id), // Ищем селект
        selectStyles = select.classList, // Смотрим стили
        options = select.children, // Получаем список селекта
        parentBlock = select.parentNode,
        optionsBlock = document.createElement('div'),
        ul = document.createElement('ul');

    // Click on dropdown
    function show() {
        var ul = this.children[0];
        ul.classList.toggle('dropdownList-visible');

        if (event.target !== this) {

            for (var i = 0; i < ul.children.length; i++) {
                select.getElementsByTagName('option')[i].removeAttribute('selected');
                if (ul.children[i] === event.target) {
                    select.getElementsByTagName('option')[i].setAttribute('selected', 'selected');
                    optionsBlock.innerHTML = select.children[i].innerText + defaultHTML;
                    optionsBlock.children[0].children[i].classList.add('selected');
                }
            }
        }
    }

    function hide() {
        var ul = this.children[0];
        ul.classList.remove('dropdownList-visible');
    }

    select.style.display = 'none';
    ul.className = 'dropdownList';
    parentBlock.insertBefore(optionsBlock, select);
    optionsBlock.appendChild(ul);
    optionsBlock.classList = selectStyles;
    optionsBlock.classList.add('dropdown');
    optionsBlock.tabIndex = 0;
    optionsBlock.addEventListener('click', show);
    optionsBlock.addEventListener('blur', hide);

    for (var key in options) {
        if (key < options.length) {
            var newOption = document.createElement('li');
            newOption.innerText = options[key].innerText.replace(/\n/g, '');
            ul.appendChild(newOption);
        }
    }

    var defaultHTML = optionsBlock.innerHTML; // Запоминаем дефолтное состояние списка
}

optionsRender('contract');
optionsRender('legalEntity');
optionsRender('direction');