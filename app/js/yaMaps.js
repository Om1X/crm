window.onload = function () {
    // Отрисовка карты по умолчанию (центр определяется на основе текущей геопозиции пользователя)
    ymaps.ready(function () {
        var myMap;

        function createMap(state) {
            map = new ymaps.Map('map', state);
            return map;
        }

        ymaps.geolocation.get().then(function (res) {
            var mapContainer = document.getElementById('map'),
                bounds = res.geoObjects.get(0).properties.get('boundedBy'),
                width = getComputedStyle(mapContainer).width.replace(/\D/g, ''),
                height = getComputedStyle(mapContainer).height.replace(/\D/g, '');
            // Рассчитываем видимую область для текущей положения пользователя.
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [width, height]
            );
            mapState.zoom = 14;
            mapState.controls = ['zoomControl'];
            myMap = createMap(mapState);
        }, function () {
            // Если местоположение невозможно получить, то просто создаем карту.
            myMap = createMap({
                center: [55.751574, 37.573856],
                zoom: 2
            });
        });

        function Map() {
            this.getInfo = function (options) {
                ymaps.ready(function () {
                    var adress, myPlacemark;
                    ymaps.geocode(options).then(function (res) { // Ковертация адреса в координаты

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
                            console.log(adr.geoObjects.get(0).properties.get('description'));
                            console.log(adr.geoObjects.get(0).properties.get('name'));
                        });

                        // ставим балун который обозначает точку нашего адреса на карте
                        myPlacemark = new ymaps.Placemark(adress);
                        console.log(myMap);
                        myMap.geoObjects.add(myPlacemark);
                        myMap.setCenter(adress);
                    }, function (err) {
                    });
                })
            };
        }

        var map = new Map(),
            toSearch = 'Новомарьинская 13';

        function setMark(addres) {
            map.getInfo(addres);
        }
        setMark(toSearch);
    });
};