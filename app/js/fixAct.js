function fixAct() {
    if (!document.getElementById('fixedActs')) return;
    var actsObj = {
            // 1: {
            //     cities: ['Санкт-Петербург'],
            //     exCities: [],
            //     cats: ['Красота/Уход за лицом'],
            //     place: 3,
            //     startDate: '01.06.2017',
            //     endDate: '15.06.2017',
            //     deleted: 'no'
            // },
            //
            // 2: {
            //     cities: [],
            //     exCities: ['Москва'],
            //     cats: ['Красота/Уход за лицом'],
            //     place: 2,
            //     startDate: '25.04.2017',
            //     endDate: '31.04.2017',
            //     deleted: 'no'
            // },
            //
            3: {
                cities: ['Новосибирск'],
                exCities: [],
                cats: ['Красота/Уход за лицом'],
                place: 1,
                startDate: '01.05.2017',
                endDate: '20.05.2017',
                deleted: 'no'
            }
            //
            // 4: {
            //     cities: ['Омск'],
            //     exCities: [],
            //     cats: ['Красота/Уход за лицом', 'Красота/Маникюр, педикюр'],
            //     place: 5,
            //     startDate: '01.06.2017',
            //     endDate: '20.06.2017',
            //     deleted: 'no'
            // }
        },
        fixActForm = document.getElementById('fixActForm'),
        fixCities = document.getElementById('fixCities'),
        fixExCities = document.getElementById('fixExCities'),
        fixedCats = document.getElementById('fixCats'),
        startDate = document.getElementById('fixEventStart'),
        endDate = document.getElementById('fixEventEnd'),
        fixPosition = document.getElementById('fixPosition'),
        fixedActs = document.getElementById('fixedActs'),
        fixCancelButton = document.getElementById('fixCancelButton'),
        fixActButton = document.getElementById('fixActButton'),
        fixShowForm = document.getElementById('fixShowForm'),
        position = document.getElementById('position'),
        dateNow = Date.now();

    function cancelButton() {
        if (fixedActs.children.length === 0) {
            fixActForm.classList.remove('hidden');
            fixShowForm.classList.add('hidden');
            fixCancelButton.classList.add('hidden');
            fixActButton.classList.remove('innerButton-add');
        } else {

            fixCancelButton.classList.remove('hidden');
            fixActButton.classList.add('innerButton-add');
        }
    }

    function removeAct(event) {

        actsObj[event.target.id].deleted = 'yes';

        cancelButton();
        if (fixedActs.children.length === 0 && fixActForm.classList.contains('hidden')) {
            fixActForm.classList.remove('hidden');
            fixShowForm.classList.add('hidden');
        }
        renderList();
    }

    function placeCheck() {
        var i, keys = Object.keys(actsObj), errorBlock = document.createElement('div');

        errorBlock.classList.add('errorMsg');
        errorBlock.innerText = 'Это место занято. Измените место, даты или категорию закрепления.';

        for(i = 0; i < keys.length; i++) {
            if (actsObj[keys[i]].place === +position.value) {
                position.classList.add('input-error');
                position.parentNode.appendChild(errorBlock);
                return true;
            } else {
                if (position.classList.contains('input-error')) {
                    position.classList.remove('input-error');
                    errorBlock = position.parentNode.getElementsByClassName('errorMsg')[0];
                    position.parentNode.removeChild(errorBlock);
                }
            }
        }
    }

    function renderList() {
        cancelButton();
        var newAct, newContent, newDateRow, nelem, elem, cities = '', exCities = '', keys;
        if (Object.keys(actsObj).length === 0) return;
        fixedActs.innerHTML = '';

        keys = Object.keys(actsObj);
        for (var key = 0; key < (keys.length > 3 ? 3 : keys.length); key++) {
            if (actsObj[keys[key]].deleted === 'no') {
                // Номер
                newAct = document.createElement('div');
                newAct.classList.add('fixedActs__act');
                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__num');
                nelem.innerText = key + 1;
                newAct.appendChild(nelem);

                // Блок контента
                newContent = document.createElement('div');
                newContent.classList.add('fixedActs__content');

                if (Date.parse(actsObj[keys[key]].endDate.replace(/(\d+)\S(\d+)\S(\d+)/, '$3-$2-$1')) < dateNow) {
                    newContent.classList.add('fixedActs-expire');
                }

                // Города размещения
                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__head');
                nelem.innerText = 'Города размещения';
                newContent.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__text');

                if (actsObj[keys[key]].cities.length !== 0 && actsObj[keys[key]].exCities.length === 0) {
                    actsObj[keys[key]].cities.forEach(function (item, i, arr) {
                        cities += i === arr.length - 1 ? item : item + ', ';
                    });
                    nelem.innerText = cities;
                    cities = '';
                } else {
                    actsObj[keys[key]].exCities.forEach(function (item, i, arr) {
                        exCities += i === arr.length - 1 ? item : item + ', ';
                    });
                    nelem.innerText = 'Все города кроме: ' + exCities;
                    exCities = '';
                }

                newContent.appendChild(nelem);

                // Категории
                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__head');
                nelem.innerText = 'Категория и подкатегория';
                newContent.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__cats');
                actsObj[keys[key]].cats.forEach(function (item, i) {
                    elem = document.createElement('span');
                    elem.classList.add('tag');
                    elem.classList.add('tag-fixed');
                    if (Date.parse(actsObj[keys[key]].endDate.replace(/(\d+)\S(\d+)\S(\d+)/, '$3-$2-$1')) < Date.now()) {
                        elem.classList.add('tag-expire');
                    }
                    nelem.appendChild(elem);
                    elem.innerText = actsObj[keys[key]].cats[i];
                });
                newContent.appendChild(nelem);

                newDateRow = document.createElement('div');
                newDateRow.classList.add('fixedActs__dateRow');

                elem = document.createElement('div');
                elem.classList.add('fixedActs__place');

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__head');
                nelem.innerText = 'Место';
                elem.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__text');
                nelem.innerText = actsObj[keys[key]].place;
                elem.appendChild(nelem);

                newDateRow.appendChild(elem);

                elem = document.createElement('div');

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__head');
                nelem.innerText = 'Период закрепления';
                elem.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__text');
                nelem.innerText = actsObj[keys[key]].startDate + ' - ' + actsObj[keys[key]].endDate;
                elem.appendChild(nelem);

                newDateRow.appendChild(elem);
                newContent.appendChild(newDateRow);

                newAct.appendChild(newContent);

                nelem = document.createElement('div');
                nelem.classList.add('trash');
                nelem.classList.add('trash-fixCats');
                nelem.setAttribute('id', keys[key]);

                nelem.addEventListener('click', removeAct);
                newAct.appendChild(nelem);

                fixedActs.appendChild(newAct);
                cancelButton();
            } else if (actsObj[keys[key]].deleted === 'yes') {

                function cancelActDel(event) {
                    actsObj[event.target.id].deleted = 'no';
                    renderList();
                }

                // Номер
                newAct = document.createElement('div');
                newAct.classList.add('fixedActs__act');
                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__num');
                newAct.appendChild(nelem);

                // Блок контента
                newContent = document.createElement('div');
                newContent.classList.add('fixedActs__content');

                nelem = document.createElement('div');
                // nelem.classList.add('')
                nelem.innerText = 'Акция удалена';
                nelem.classList.add('actDeleted');
                newContent.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('innerButton');
                nelem.classList.add('innerButton-cancel');
                nelem.classList.add('innerButton-right');
                nelem.setAttribute('id', keys[key]);
                nelem.innerText = 'Отмена';

                nelem.addEventListener('click', cancelActDel);
                newContent.appendChild(nelem);

                newAct.appendChild(newContent);

                fixedActs.appendChild(newAct);
                cancelButton();
            }
        }
    }

    renderList();

    // function curActsCheck() {
    //     var trash = document.getElementsByClassName('trash trash-fixCats');
    //
    //     for (var i = 0; i < trash.length; i++) {
    //         trash[i].addEventListener('click', removeAct);
    //     }
    // }
    //
    // curActsCheck();

    function fixClick() {
        // if (fixActForm.classList.contains('hidden')) {
            // fixActForm.classList.remove('hidden')
        // } else {
            if (
                fixExCities.innerHTML ||
                fixCities.innerHTML &&
                fixedCats.innerHTML &&
                !isNaN(position.value) &&
                startDate.value &&
                endDate.value
            ) {

                if(placeCheck()) return;

                if (fixCities.children.length > 0) {
                    cities = fixCities.innerText.split('\n');
                    cities.splice(cities.length - 1, 1);
                } else {
                    cities = [];
                }

                if (fixExCities.children.length > 0) {
                    exCities = fixExCities.innerText.split('\n');
                    exCities.splice(exCities.length - 1, 1);
                } else {
                    exCities = [];
                }

                if (fixedCats.children.length > 0) {
                    var cats = fixedCats.innerText.split('\n');
                    cats.splice(cats.length - 1, 1);
                } else {
                    cats = [];
                }

                key = Object.keys(actsObj).length - 1;
                key = +(Object.keys(actsObj)[key]) + 1;
                actsObj[key] = {
                    cities: cities,
                    exCities: exCities,
                    cats: cats,
                    place: position.value,
                    startDate: startDate.value,
                    endDate: endDate.value,
                    deleted: 'no'
                };

                fixCities.innerHTML = '';
                fixExCities.innerHTML = '';
                fixedCats.innerHTML = '';
                position.value = '';
                startDate.value = '';
                endDate.value = '';
                renderList();
                fixActForm.classList.remove('hidden');
                fixShowForm.classList.add('hidden');
            } else {
                // alert('ne zbs =(')
            }
        // }
    }

    fixShowForm.addEventListener('click', function () {
        fixActForm.classList.remove('hidden');
        fixShowForm.classList.add('hidden');
    });
    fixCancelButton.addEventListener('click', function () {
        fixActForm.classList.add('hidden');
        fixShowForm.classList.remove('hidden')
    });
    fixActButton.addEventListener('click', fixClick);
}

fixAct();