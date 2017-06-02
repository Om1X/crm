function selectRender() {

    var selectList = document.getElementsByTagName('select'); //Ищем все селекты в документе

    if (selectList.length === 0) return false; //

    function optionsRender(id) {
        if (!document.getElementById(id)) return;
        var select = document.getElementById(id), // Ищем селект
            selectStyles = select.classList, // Получаем стили селекта
            options = select.children, // Получаем список селектов
            parentBlock = select.parentNode, // Вычисляем родителя
            optionsBlock = document.createElement('div'), // Блок селектов
            selectedOption = document.createElement('div'), // Блок для вывода "selected"
            ul = document.createElement('ul'), // Список для селектов
            docHeight = document.body.offsetHeight, // Высота отрендеренного документа
            nKey = -1; // Контроллер фокуса

        select.style.display = 'none'; // Скрываем стандартный селект
        parentBlock.insertBefore(optionsBlock, select);
        optionsBlock.classList = selectStyles;
        optionsBlock.classList.add('dropdown');
        optionsBlock.tabIndex = 0; // Добавляем возможность фокуса
        optionsBlock.appendChild(selectedOption);
        selectedOption.style.height = getComputedStyle(select).height;
        optionsBlock.appendChild(ul);
        ul.className = 'dropdownList';

        function getCoords(elem) { // определение Y координаты генерируемого селекта
            var box = elem.getBoundingClientRect();
            return box.top + pageYOffset;
        }

        // Генерация выпадающего списка ↓↓
        for (var key in options) {
            if (key < options.length) {
                var newOption = document.createElement('li');

                if (options[key].selected) {
                    selectedOption.innerHTML = options[key].innerHTML.replace(/\n/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                }

                if (options[key].disabled) {
                    newOption.classList.add('disabled');
                    selectedOption.classList.add('dropdown-disabledTxt');
                }
                newOption.innerHTML = options[key].innerHTML.replace(/\n/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                ul.appendChild(newOption);
            }
        }

        // Обработчик клика по дропу
        function show(event) {
            var ul = this.children[1],
                newPos;
            if (!event.target.classList.contains('disabled')) { // Отсеиваем клики по неактивным полям

                if (event.target.tagName === 'DIV') {
                    ul.classList.toggle('dropdownList-visible');
                    optionsBlock.style.background = 'rgba(32, 35, 56, 0.1)';
                } else {
                    selectedOption.classList.remove('dropdown-disabledTxt');
                    ul.classList.toggle('dropdownList-visible');
                    for (var i = 0; i < ul.children.length; i++) {
                        select.getElementsByTagName('option')[i].removeAttribute('selected');
                        optionsBlock.children[1].children[i].classList.remove('selected');
                        // optionsBlock.children[1].children[i].removeAttribute('class');
                        if (ul.children[i] === event.target) {
                            select.getElementsByTagName('option')[i].setAttribute('selected', 'selected');
                            optionsBlock.children[1].children[i].classList.add('selected');
                            optionsBlock.classList.add('dropdown-ok');
                            optionsBlock.style.background = '#fff';
                            selectedOption.innerHTML = ul.children[i].innerHTML;
                        }
                    }
                }

                if (getCoords(ul) + ul.offsetHeight > docHeight) { // Проверяем, не выходит ли выпадающий список за пределы документа
                    newPos = '-' + (ul.offsetHeight + 5) + 'px';
                    ul.style.top = newPos;
                }
            }
        }

        // Обработка потери фокуса дропом
        function hide() {
            var ul = this.children[1];
            ul.classList.remove('dropdownList-visible');
        }

        function keydown(event) {
            var list = this.children[1], length;
            if (event.keyCode !== 9) event.preventDefault(); // Отменяем действия по умолчанию, если поле получило фокус
            switch (event.keyCode) {

                case 38: // Клавиша "↑"

                    if (!list.classList.contains('dropdownList-visible')) {
                        list.classList.add('dropdownList-visible');
                    } else {
                        length = list.children.length;
                        list.childNodes.forEach(function (item, key, arr) {
                            if (arr[key].classList.contains('onTab')) {
                                arr[key].classList.remove('onTab');

                                nKey = key - 1 < 0 ? length - 1 : key - 1;
                                nKey = list.childNodes[nKey].classList.contains('disabled') ? length - 1 : nKey;
                            }
                        });
                        if (nKey === -1) nKey = length - 1;
                        list.childNodes[nKey].classList.add('onTab');
                    }
                    break;

                case 40: // Клавиша "↓"
                    if (!list.classList.contains('dropdownList-visible')) {
                        list.classList.add('dropdownList-visible');
                    } else {
                        length = list.children.length;
                        list.childNodes.forEach(function (item, key, arr) {
                            if (arr[key].classList.contains('onTab')) {
                                arr[key].classList.remove('onTab');
                                nKey = key + 1 === length ? 0 : key + 1;
                            }
                        });
                        if (nKey === -1) nKey = 0;
                        if (list.childNodes[nKey].classList.contains('disabled')) nKey = 1;
                        list.childNodes[nKey].classList.add('onTab');
                    }
                    break;

                case 13: // Клавиша "Enter"
                    if (nKey !== -1 && list.classList.contains('dropdownList-visible')) {
                        length = list.children.length;
                        list.childNodes.forEach(function (item, key, arr) {
                            if (arr[key].classList.contains('onTab')) {
                                selectedOption.classList.remove('dropdown-disabledTxt');
                                ul.classList.toggle('dropdownList-visible');

                                for (var i = 0; i < ul.children.length; i++) {
                                    select.getElementsByTagName('option')[i].removeAttribute('selected');
                                    optionsBlock.children[1].children[i].classList.remove('selected');
                                    // optionsBlock.children[1].children[i].removeAttribute('class');
                                    if (ul.children[i] === arr[key]) {
                                        arr[key].classList.remove('onTab');
                                        select.getElementsByTagName('option')[i].setAttribute('selected', 'selected');
                                        optionsBlock.children[1].children[i].classList.add('selected');
                                        optionsBlock.classList.add('dropdown-ok');
                                        optionsBlock.style.background = '#fff';
                                        selectedOption.innerHTML = ul.children[i].innerHTML;
                                        nKey = -1; // Сброс текущего фокуса.
                                    }
                                }
                            }
                        });
                    }
                    break;
            }
        }

        optionsBlock.addEventListener('click', show);
        optionsBlock.addEventListener('keydown', keydown);
        optionsBlock.addEventListener('blur', hide);
    }

    for (var i = 0; i < selectList.length; i++) {
        optionsRender(selectList[i].id);
    }
}
selectRender();