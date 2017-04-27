window.onload = function () {
    ymaps.ready(function () {
        var myMap,
            addressInput = document.getElementById('address');

        function crMap() {
            var state = {
                center: [55.751574, 37.573856],
                zoom: 14,
                controls: ['zoomControl']
            };
            myMap = new ymaps.Map('map', state);
        }

        function getInfo() {
            var myPlacemark,
                addrInputVal = addressInput.value,
                metroList = '',
                metroCounter = 3,
                metroInput = document.getElementById('metro'),
                coorInput = document.getElementById('coordinates');
            ymaps.geocode(addrInputVal).then(function (res) { // Ковертация адреса в координаты

                coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                // поиск ближайших станций и вывод в поле "Метро"
                ymaps.geocode(coordinates, {
                    kind: 'metro',
                    results: metroCounter
                }).then(function (met) {
                    met.geoObjects.options.set('preset', 'islands#redCircleIcon');
                    met.geoObjects.each(function (obj) {
                        metroList += obj.properties.get('name').split('метро ')[1] + '|';
                    });

                    metroInput.value = metroList.split('|').splice(0, 3).join(', ');
                    coorInput.value = coordinates;
                });

                // Преобразуем координаты в адрес
                ymaps.geocode(coordinates).then(function (adr) {
                    var address;
                    address = adr.geoObjects.get(0).properties.get('description') + ", ";
                    address += adr.geoObjects.get(0).properties.get('name');
                    document.getElementById('address').value = address;
                });

                // ставим балун который обозначает точку нашего адреса на карте
                myPlacemark = new ymaps.Placemark(coordinates);
                myMap.geoObjects.add(myPlacemark);
                myMap.setCenter(coordinates);
            }, function (err) {
                console.log(err);
            });
        }

        crMap();
        addressInput.addEventListener('change', getInfo);
    });
};