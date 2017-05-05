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
            docHeight = document.body.offsetHeight; // Высота отрендеренного документа

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
        function show() {
            var ul = this.children[1],
                newPos;
            if (event.target.className !== 'disabled') { // Отсеиваем клики по неактивным полям
                // ul.classList.toggle('dropdownList-visible');
                if (event.target.tagName === 'LI') selectedOption.classList.remove('dropdown-disabledTxt');
                for (var i = 0; i < ul.children.length; i++) {
                    select.getElementsByTagName('option')[i].removeAttribute('selected');
                    optionsBlock.children[1].children[i].classList.remove('selected');
                    if (ul.children[i] === event.target) {
                        select.getElementsByTagName('option')[i].setAttribute('selected', 'selected');
                        optionsBlock.children[1].children[i].classList.add('selected');
                        selectedOption.innerHTML = ul.children[i].innerHTML;
                    }
                }

                ul.classList.toggle('dropdownList-visible');

                if (getCoords(ul) + ul.offsetHeight > docHeight) {
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

        optionsBlock.addEventListener('click', show);
        optionsBlock.addEventListener('blur', hide);
    }

    for (var i = 0; i < selectList.length; i++) {
        optionsRender(selectList[i].id);
    }
}
selectRender();