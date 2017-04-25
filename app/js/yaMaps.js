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
            var adress,
                myPlacemark,
                addrInputVal = addressInput.value;
            ymaps.geocode(addrInputVal).then(function (res) { // Ковертация адреса в координаты

                adress = res.geoObjects.get(0).geometry.getCoordinates();
                // поиск ближайших станций
                ymaps.geocode(adress, {
                    kind: 'metro',
                    results: 1
                }).then(function (met) {
                    met.geoObjects.options.set('preset', 'islands#redCircleIcon');

                    var res = '';
                    met.geoObjects.each(function (obj) {
                        res += obj.properties.get('name') + '\n';
                    });

                    var metro = document.getElementById('metro'),
                        coordinates = document.getElementById('coordinates');
                    metro.value = res.split('метро')[1];
                    coordinates.value = adress;
                });

                // Преобразуем координаты в адрес
                ymaps.geocode(adress).then(function (adr) {
                    var address;
                    address = adr.geoObjects.get(0).properties.get('description') + ", ";
                    address += adr.geoObjects.get(0).properties.get('name');
                    document.getElementById('address').value = address;
                });

                // ставим балун который обозначает точку нашего адреса на карте
                myPlacemark = new ymaps.Placemark(adress);
                myMap.geoObjects.add(myPlacemark);
                myMap.setCenter(adress);
            }, function (err) {
                console.log(err);
            });
        }

        crMap();
        addressInput.addEventListener('change', getInfo);
    });
};