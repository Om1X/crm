// Написано с эмуляцией бэка
function TagsSuggest() {

    this.catSuggest = function (id) {
        if (!document.getElementById(id)) return;
        switch (id) {

            case 'category':
                inputID = 'category';
                mainBlockID = 'catsBlock';
                tagsBlockID = 'cats';
                break;

            case 'fixCat':
                inputID = 'fixCat';
                mainBlockID = 'fixCatsBlock';
                tagsBlockID = 'fixCats';
                break;
        }
        var input = document.getElementById(inputID),
            catsBlock = document.getElementById(mainBlockID),
            cats = document.getElementById(tagsBlockID),
            ul = document.createElement('ul'),
            nKey = -1;
        input.setAttribute('autocomplete', 'no');
        catsBlock.style.position = 'relative';
        catsBlock.style.display = 'inline-block';
        catsBlock.appendChild(ul);
        ul.classList.add('suggest');
        ul.classList.add('suggest-category');

        function showCats(event) {
            //Эмуляция AJAX запроса
            var tags = '["Красота/SPA, массаж, уход за телом", "Рестораны/Доставка еды", "Красота/Уход за лицом", "Красота/Маникюр, педикюр"]', /*для эмуляции AJAX*/
                inputValue = input.value,
                regExp = new RegExp(inputValue, 'ig'),
                length;
            tags = JSON.parse(tags);

            if (tags.length > 0) {
                ul.innerHTML = '';
                ul.style.width = getComputedStyle(input).width;
                tags.forEach(function (item, i, res) {
                    var result = res[i].match(regExp);
                    if (result === null || inputValue === '' || inputValue === ' ') return;
                    var li = document.createElement('li'),
                        replace = new RegExp(result[0], 'gi');
                    li.innerHTML = res[i].replace(replace, '<b>' + result[0] + '</b>');
                    ul.appendChild(li);
                    // ul.style.display = 'block';
                });
                ul.style.display = 'block';

                switch (event.keyCode) {

                    case 38: // Клавиша "↑"
                        length = ul.childNodes.length;
                        if (length > 0) {
                            nKey = nKey === 0 ? length - 1 : --nKey;
                            console.log(ul.childNodes[nKey]);
                            ul.childNodes[nKey].classList.add('onTab');
                        }
                        break;

                    case 40: // Клавиша "↓"
                        length = ul.childNodes.length;
                        if (length > 0) {
                            nKey = nKey >= length - 1 ? 0 : ++nKey;
                            console.log(ul.childNodes[nKey]);
                            ul.childNodes[nKey].classList.add('onTab');
                        }
                        break;

                    case 13: // Клавиша "Enter"
                        var tag = document.createElement('span');
                        tag.classList.add('tag');
                        tag.innerText = ul.childNodes[nKey].innerText;
                        cats.appendChild(tag);
                        ul.style.display = 'none';
                        ul.innerHTML = '';
                        input.value = '';
                        nKey = -1;
                        break;
                }
            }
        }

        function selectTag(event) {
            var tag = document.createElement('span');
            tag.classList.add('tag');
            tag.innerText = event.target.tagName === 'B' ? event.target.parentNode.innerText : event.target.innerText;
            cats.appendChild(tag);
            ul.style.display = 'none';
            ul.innerHTML = '';
            input.value = '';
        }

        function removeTag(event) {
            if (event.target.tagName !== 'SPAN') return;
            cats.removeChild(event.target);
        }

        function hide(event) {
            if (event.target !== input) {
                ul.style.display = 'none';
                ul.innerHTML = '';
            }
        }

        function setDefault (event) {
            if (event.keyCode === 13 || event.keyCode === 38 || event.keyCode === 40) event.preventDefault(); // Отменяем действия по умолчанию, если поле получило фокус
        }
        input.addEventListener('keydown', setDefault);
        input.addEventListener('keyup', showCats);
        // input.addEventListener('focus', showCats);
        document.addEventListener('click', hide);
        ul.addEventListener('click', selectTag);
        cats.addEventListener('click', removeTag);
    };

    this.citySelect = function (id) {
        if (!document.getElementById(id)) return;
        switch (id) {

            case 'city':
                inputID = 'city';
                mainBlockID = 'cityBlock';
                tagsBlockID = 'cities';
                break;

            case 'exCity':
                inputID = 'exCity';
                mainBlockID = 'exCityBlock';
                tagsBlockID = 'exCities';
                break;

            case 'fixCity':
                inputID = 'fixCity';
                mainBlockID = 'fixCityBlock';
                tagsBlockID = 'fixCities';
                break;

            case 'fixExCity':
                inputID = 'fixExCity';
                mainBlockID = 'fixExCityBlock';
                tagsBlockID = 'fixExCities';
                break;
        }
        var input = document.getElementById(inputID),
            cityBlock = document.getElementById(mainBlockID),
            cities = document.getElementById(tagsBlockID),
            ul = document.createElement('ul'),
            nKey = -1;
        input.setAttribute('autocomplete', 'no');
        cityBlock.style.position = 'relative';
        cityBlock.style.display = 'inline-block';
        cityBlock.appendChild(ul);
        ul.classList.add('suggest');
        ul.classList.add('suggest-city');


        function showCities(event) {
            //Эмуляция AJAX запроса
            var tags = '["Москва", "Санкт-Петербург", "Новосибирск", "Омск", "Екатеринбург"]', /*для эмуляции AJAX*/
                inputValue = input.value,
                regExp = new RegExp(inputValue, 'ig');
            tags = JSON.parse(tags);

            if (tags.length > 0) {
                ul.innerHTML = '';
                ul.style.width = getComputedStyle(input).width;
                tags.forEach(function (item, i, res) {
                    var result = res[i].match(regExp);
                    if (result === null || inputValue === '' || inputValue === ' ') return;
                    var li = document.createElement('li'),
                        replace = new RegExp(result[0], 'gi');
                    li.innerHTML = res[i].replace(replace, '<b>' + result[0] + '</b>');
                    ul.appendChild(li);
                    ul.style.display = 'block';
                });
            }

            switch (event.keyCode) {

                case 38: // Клавиша "↑"
                    length = ul.childNodes.length;
                    if (length > 0) {
                        nKey = nKey === 0 ? length - 1 : --nKey;
                        console.log(ul.childNodes[nKey]);
                        ul.childNodes[nKey].classList.add('onTab');
                    }
                    break;

                case 40: // Клавиша "↓"
                    length = ul.childNodes.length;
                    if (length > 0) {
                        nKey = nKey >= length - 1 ? 0 : ++nKey;
                        console.log(ul.childNodes[nKey]);
                        ul.childNodes[nKey].classList.add('onTab');
                    }
                    break;

                case 13: // Клавиша "Enter"
                    var tag = document.createElement('span');
                    tag.classList.add('tag');
                    tag.innerText = ul.childNodes[nKey].innerText;
                    cities.appendChild(tag);
                    ul.style.display = 'none';
                    ul.innerHTML = '';
                    input.value = '';
                    nKey = -1;
                    break;
            }
        }

        function selectTag(event) {
            var tag = document.createElement('span');
            tag.classList.add('tag');
            tag.innerText = event.target.tagName === 'B' ? event.target.parentNode.innerText : event.target.innerText;
            cities.appendChild(tag);
            ul.style.display = 'none';
            ul.innerHTML = '';
            input.value = '';
        }

        function removeTag(event) {
            if (event.target.tagName !== 'SPAN') return;
            cities.removeChild(event.target);
        }

        function hide(event) {
            if (event.target !== input) {
                ul.style.display = 'none';
                ul.innerHTML = '';
            }
        }

        function setDefault (event) {
            if (event.keyCode === 13 || event.keyCode === 38 || event.keyCode === 40) event.preventDefault(); // Отменяем действия по умолчанию, если поле получило фокус
        }

        input.addEventListener('keydown', setDefault);
        input.addEventListener('keyup', showCities);
        // input.addEventListener('focus', showCities);
        document.addEventListener('click', hide);
        ul.addEventListener('click', selectTag);
        cities.addEventListener('click', removeTag);
    };
}

var Tags = new TagsSuggest();

Tags.catSuggest('category');
Tags.catSuggest('fixCat');
Tags.citySelect('city');
Tags.citySelect('exCity');
Tags.citySelect('fixCity');
Tags.citySelect('fixExCity');