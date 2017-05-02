function optionsRender(id) {
    var select = document.getElementById(id), // Ищем селект
        selectStyles = select.classList, // Получаем стили селекта
        options = select.children, // Получаем список селектов
        parentBlock = select.parentNode, // Вычисляем родителя
        optionsBlock = document.createElement('div'), // Блок селектов
        selectedOption = document.createElement('div'), // Блок для вывода "selected"
        ul = document.createElement('ul'); // Список для селектов
    select.style.display = 'none'; // Скрываем стандартный селект
    parentBlock.insertBefore(optionsBlock, select);
    optionsBlock.classList = selectStyles;
    optionsBlock.classList.add('dropdown');
    optionsBlock.tabIndex = 0; // Добавляем возможность фокуса
    optionsBlock.appendChild(selectedOption);
    selectedOption.style.height = getComputedStyle(select).height;
    optionsBlock.appendChild(ul);
    ul.className = 'dropdownList';

    for (var key in options) {
        if (key < options.length) {
            var newOption = document.createElement('li');
            newOption.innerHTML = options[key].innerHTML.replace(/\n/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            ul.appendChild(newOption);
        }
    }

    // Click on dropdown
    function show() {
        var ul = this.children[1];
        ul.classList.toggle('dropdownList-visible');
        if (event.target !== selectedOption && optionsBlock) {
            for (var i = 0; i < ul.children.length; i++) {
                select.getElementsByTagName('option')[i].removeAttribute('selected');
                optionsBlock.children[1].children[i].classList.remove('selected');
                if (ul.children[i] === event.target) {
                    select.getElementsByTagName('option')[i].setAttribute('selected', 'selected');
                    optionsBlock.children[1].children[i].classList.add('selected');
                    selectedOption.innerHTML = ul.children[i].innerHTML;
                }
            }
        } else {
            console.log('click outer!');
        }
    }

    function hide() {
        var ul = this.children[1];
        ul.classList.remove('dropdownList-visible');
    }

    optionsBlock.addEventListener('click', show);
    optionsBlock.addEventListener('blur', hide);
}

optionsRender('contract');
optionsRender('legalEntity');
optionsRender('direction');