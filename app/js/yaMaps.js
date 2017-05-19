ymaps.ready(function () {
    var myMap,
        addressInput = document.getElementById('address');
    if (!addressInput) return;
    function crMap() {
        var state = {
            center: [55.751574, 37.573856],
            zoom: 14,
            controls: ['zoomControl']
        };
        myMap = new ymaps.Map('map', state);

    }


    // сделать общий блок для прослушки и навешать обработчики для перехвата событий


    function addressSuggest(id) {
        var sInput = document.getElementById(id);
        if (!sInput) return;
        var parentBlock = sInput.parentNode,
            ul = document.createElement('ul');
        parentBlock.appendChild(ul);
        ul.classList.add('suggest');

        function getInfo() {
            if (addressInput.value.length < 5) return;
            ul.style.display = 'none';
            console.log(event.target);
            var addrInputVal = addressInput.value,
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
                        if (obj.properties.get('name').split('метро ')[1]) {
                            metroList += obj.properties.get('name').split('метро ')[1] + '|';
                        } else {
                            metroList += obj.properties.get('name').split('станция ')[1] + '|';
                        }
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
                    // ставим балун который обозначает точку нашего адреса на карте
                    myGeoObject = new ymaps.GeoObject({
                        // Описание геометрии.
                        geometry: {
                            type: "Point",
                            coordinates: coordinates
                        },
                        // Свойства.
                        properties: {
                            // Контент метки.
                            // iconContent: adr.geoObjects.get(0).properties.get('name')
                            // hintContent: 'Ну давай уже тащи'
                        }
                    }, {
                        // Опции.
                        // Иконка метки будет растягиваться под размер ее содержимого.
                        preset: 'islands#blueStretchyIcon',
                        // Метку можно перемещать.
                        draggable: true
                    });

                    myMap.geoObjects.remove(myMap.geoObjects.get(0));
                    myMap.geoObjects.add(myGeoObject);
                    myMap.setCenter(coordinates);
                    myGeoObject.events.add('dragend', function () {
                        coorInput.value = myGeoObject.geometry.getCoordinates();
                    })

                });

            }, function (err) {
                console.log(err);
            });
        }


        function searchAddress() {
            if (addressInput.value.length < 5) {
                ul.innerHTML = '';
                ul.style.display = 'none';
                return;
            }

            var xhr = new XMLHttpRequest(),
                search = addressInput.value,
                url = 'https://geocode-maps.yandex.ru/1.x/?format=json&results=5&geocode=' + search,
                res;

            console.log(url);
            xhr.open('GET', url, true);


            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    console.log(xhr.status + ': ' + xhr.statusText);
                } else {
                    res = JSON.parse(xhr.responseText).response.GeoObjectCollection.featureMember;
                    if (res.length === 0 || !sInput) {
                        ul.innerHTML = '';
                        ul.style.display = 'none';
                    } else {
                        ul.style.display = 'block';
                        ul.innerHTML = '';
                        res.forEach(function (item, i, res) {
                            var li = document.createElement('li');
                            ul.appendChild(li);
                            li.innerText = res[i].GeoObject.description + ', ' + res[i].GeoObject.name;
                        });
                    }
                }
            };
        }

        function hide() {
            setTimeout(function () {
                ul.innerHTML = '';
                ul.style.display = 'none';
            }, 150);
        }

        function suggestClick() {
            ul.style.display = 'none';
            console.log(event.target.innerText);
            addressInput.value = event.target.innerText;
            getInfo();
        }


        ul.addEventListener('click', suggestClick);
        addressInput.addEventListener('blur', hide);
        addressInput.addEventListener('keyup', searchAddress);


    }

    crMap();
    addressSuggest('address');
});