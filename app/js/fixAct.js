function fixAct() {
    var fixActForm = document.getElementById('fixActForm'),
        fixCities = document.getElementById('fixCities'),
        fixExCities = document.getElementById('fixExCities'),
        fixedCats = document.getElementById('fixCats'),
        startDate = document.getElementById('fixEventStart'),
        endDate = document.getElementById('fixEventEnd'),
        fixPosition = document.getElementById('fixPosition'),
        fixedActs = document.getElementById('fixedActs'),
        fixActButton = document.getElementById('fixActButton'),
        position = document.getElementById('position');

    if (!fixedActs.innerHTML) fixActForm.classList.remove('hidden');

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
                var newAct, newContent, newDateRow, nelem, elem,
                    count = document.getElementsByClassName('fixedActs__num').length + 1;

                newAct = document.createElement('div');
                newAct.classList.add('fixedActs__act');
                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__num');
                nelem.innerText = count;
                newAct.appendChild(nelem);

                newContent = document.createElement('div');
                newContent.classList.add('fixedActs__content');

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__head');
                nelem.innerText = 'Города размещения';
                newContent.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__text');
                nelem.innerText = 'тут будут города';
                newContent.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__head');
                nelem.innerText = 'Категория и подкатегория';
                newContent.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__cats');
                nelem.innerHTML = fixedCats.innerHTML;
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
                nelem.innerText = position.value;
                elem.appendChild(nelem);

                newDateRow.appendChild(elem);

                elem = document.createElement('div');

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__head');
                nelem.innerText = 'Период закрепления';
                elem.appendChild(nelem);

                nelem = document.createElement('div');
                nelem.classList.add('fixedActs__text');
                nelem.innerText = startDate.value + ' - ' + endDate.value;
                elem.appendChild(nelem);

                newDateRow.appendChild(elem);
                newContent.appendChild(newDateRow);

                newAct.appendChild(newContent);

                nelem = document.createElement('div');
                nelem.classList.add('trash');
                nelem.classList.add('trash-fixCats');
                newAct.appendChild(nelem);

                fixedActs.appendChild(newAct);

                fixActForm.classList.add('hidden');

                function removeAct(event) {
                    fixedActs.removeChild(event.currentTarget);
                    if (fixedActs.childNodes.length === 0) fixActForm.classList.remove('hidden');
                }

                newAct.addEventListener('click', removeAct);
            }else{
                // alert('ne zbs =(')
            }
        }
    }

    fixActButton.addEventListener('click', fixClick);
    // delCatButton.addEventListener('click', removeAct);
}

fixAct();