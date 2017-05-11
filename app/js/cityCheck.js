function cityCheck() {
    var input = document.getElementById('allCities'),
        fixInput = document.getElementById('fix_allCities'),
        city = document.getElementById('city'),
        exCity = document.getElementById('exCity'),
        fixCity = document.getElementById('fix_city'),
        fixExCity = document.getElementById('fix_exCity');

    function checkSwitch() {
        if (city.getAttribute('disabled') === null) {
            city.value = '';
            city.setAttribute('disabled', '');
            exCity.removeAttribute('disabled');
        } else {
            exCity.value = '';
            exCity.setAttribute('disabled', '');
            city.removeAttribute('disabled');
        }
    }

    function fixCheckSwitch() {
        if (fixCity.getAttribute('disabled') === null) {
            fixCity.value = '';
            fixCity.setAttribute('disabled', '');
            fixExCity.removeAttribute('disabled');
        } else {
            fixExCity.value = '';
            fixExCity.setAttribute('disabled', '');
            fixCity.removeAttribute('disabled');
        }
    }

    if (input) input.addEventListener('change', checkSwitch);
    if (fixInput) fixInput.addEventListener('change', fixCheckSwitch);
}

cityCheck();