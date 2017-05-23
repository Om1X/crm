// Зарефакторить
function cityCheck() {
    var input = document.getElementById('allCities'),
        fixInput = document.getElementById('fixAllCities'),
        city = document.getElementById('city'),
        exCity = document.getElementById('exCity'),
        fixCity = document.getElementById('fixCity'),
        fixExCity = document.getElementById('fixExCity'),
        cities = document.getElementById('cities'),
        exCities = document.getElementById('exCities'),
        fixCities = document.getElementById('fixCities'),
        fixExCities = document.getElementById('fixExCities');

    function checkSwitch() {
        if (city.getAttribute('disabled') === null) {
            city.value = '';
            city.setAttribute('disabled', '');
            exCity.removeAttribute('disabled');
            cities.innerHTML = '';
        } else {
            exCity.value = '';
            exCity.setAttribute('disabled', '');
            city.removeAttribute('disabled');
            exCities.innerHTML = '';
        }
    }

    function fixCheckSwitch() {
        if (fixCity.getAttribute('disabled') === null) {
            fixCity.value = '';
            fixCity.setAttribute('disabled', '');
            fixExCity.removeAttribute('disabled');
            fixCities.innerHTML = '';
        } else {
            fixExCity.value = '';
            fixExCity.setAttribute('disabled', '');
            fixCity.removeAttribute('disabled');
            fixExCities.innerHTML = '';
        }
    }

    if (input) input.addEventListener('change', checkSwitch);
    if (fixInput) fixInput.addEventListener('change', fixCheckSwitch);
}

cityCheck();