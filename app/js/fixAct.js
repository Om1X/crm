function fixAct() {
    var actsObj = {
            1: {
                cities: ['Санкт-Петербург'],
                exCities: [],
                cats: ['Красота/Уход за лицом'],
                place: 3,
                startDate: '01.06.2017',
                endDate: '15.06.2017',
                deleted: 'no'
            },

            2: {
                cities: [],
                exCities: ['Москва'],
                cats: ['Красота/Уход за лицом'],
                place: 2,
                startDate: '25.04.2017',
                endDate: '31.04.2017',
                deleted: 'no'
            },

            3: {
                cities: ['Новосибирск'],
                exCities: [],
                cats: ['Красота/Уход за лицом'],
                place: 1,
                startDate: '01.05.2017',
                endDate: '20.05.2017',
                deleted: 'no'
            },

            4: {
                cities: ['Омск'],
                exCities: [],
                cats: ['Красота/Уход за лицом', 'Красота/Маникюр, педикюр'],
                place: 5,
                startDate: '01.06.2017',
                endDate: '20.06.2017',
                deleted: 'no'
            }
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
    // actsObj.reverse();

    function cancelButton() {
        if (fixedActs.children.length === 0) {
            fixCancelButton.classList.add('hidden');
            fixActButton.classList.remove('innerButton-add');
        } else {
            fixCancelButton.classList.remove('hidden');
            fixActButton.classList.add('innerButton-add');
        }
    }

    function renderList() {
        var newAct, newContent, newDateRow, nelem, elem, cities = '', exCities = '', keys;
        if (actsObj.length === 0) return;
        fixedActs.innerHTML = '';
        fixActForm.classList.add('hidden');
        fixShowForm.classList.remove('hidden');
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
                } else {
                    actsObj[keys[key]].exCities.forEach(function (item, i, arr) {
                        exCities += i === arr.length - 1 ? item : item + ', ';
                    });
                    nelem.innerText = 'Все города кроме: ' + exCities;
                }

                newContent.appendChild(nelem);

                // Категории
                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__head');
                nelem.innerText = 'Категория и подкатегория';
                newContent.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__cats');
                actsObj[keys[key]].cats.forEach(function (item, i, arr) {
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
            } else if (actsObj[keys[key]].deleted === 'yes') {
                
                function cancelActDel(event) {
                    console.log(event.target);
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
                nelem.innerText = 'Отмена';
                
                nelem.addEventListener('click', cancelActDel);
                newContent.appendChild(nelem);

                newAct.appendChild(newContent);

                fixedActs.appendChild(newAct);
            }
        }
    }

    renderList();

    function removeAct(event) {

        actsObj[event.target.id].deleted = 'yes';

        cancelButton();
        if (fixedActs.children.length === 0 && fixActForm.classList.contains('hidden')) {
            fixActForm.classList.remove('hidden');
            fixShowForm.classList.add('hidden');
        }
        renderList();
    }

    function curActsCheck() {
        var trash = document.getElementsByClassName('trash trash-fixCats');

        for (i = 0; i < trash.length; i++) {
            trash[i].addEventListener('click', removeAct);
        }
    }

    curActsCheck();

    function fixClick() {
        if (fixActForm.classList.contains('hidden')) {
            fixActForm.classList.remove('hidden')
        } else {
            if (
                fixExCities.innerHTML ||
                fixCities.innerHTML &&
                fixedCats.innerHTML &&
                !isNaN(position.value) &&
                startDate.value &&
                endDate.value
            ) {
                var newFixAct = {
                    cities: ['Санкт-Петербург'],
                    exCities: [],
                    cats: ['Красота/Уход за лицом'],
                    place: 3,
                    startDate: '01.06.2017',
                    endDate: '15.06.2017'
                };

                actsObj.push(newFixAct);
                renderList();
            } else {
                // alert('ne zbs =(')
            }
        }
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