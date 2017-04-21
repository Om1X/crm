window.onload = function () {

    var a = 'testing var';
    function Map(options) {
        // var options = options;
        // alert(a);
        this.draw = function () {

            // Отрисовка карты по умолчанию (центр определяется на основе текущей геопозиции пользователя)
            ymaps.ready(function () {
                var map;
                qq = ymaps.geolocation.get();
                ww = qq.then(function (res) {
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
                    return createMap(mapState);
                }, function () {
                    // Если местоположение невозможно получить, то просто создаем карту.
                    createMap({
                        center: [55.751574, 37.573856],
                        zoom: 2
                    });
                });

                function createMap(state) {
                    map = new ymaps.Map('map', state);
                    return map;
                }

                console.log(ww);
            });
        };
        this.getInfo = function (options) {
            var map;

            ymaps.ready(function () {
                var adress, myPlacemark;
                ymaps.geocode(options).then(function (res) { // Ковертация адреса в координаты

                    adress = res.geoObjects.get(0).geometry.getCoordinates();
                    map = new ymaps.Map('map', { // создание новой карты с искомым адресом
                        center: adress,
                        zoom: 14,
                        controls: ['zoomControl']
                    });
                    // поиск ближайших станций
                    ymaps.geocode(adress, {
                        kind: 'metro',
                        results: 1
                    }).then(function (met) {
                        met.geoObjects.options.set('preset', 'islands#redCircleIcon');

                        var res = '';
                        met.geoObjects.each(function (obj) {
                            // console.log(obj.properties);
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
                    map.geoObjects.add(myPlacemark);
                }, function (err) {
                });
            })
        };
    }

var map = new Map(),
    toSearch = 'Варшавское 118к1';

map.draw();
map.getInfo(toSearch);
// map.full(prompt('Введите адрес:'));
};