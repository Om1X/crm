(function ($) {
    var regExp = /(\d+)\S(\d+)\S(\d+)/,
        start = document.getElementById('startEvent'),
        end = document.getElementById('endEvent'),
        allDays = document.getElementById('days');

    // Создание и описание русской локали
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
            'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    // Применение настроек
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $('#startEvent').datepicker();
    $('#endEvent').datepicker();
    $('#fixStart').datepicker();
    $('#fixEnd').datepicker();
    $('#startCoupon').datepicker();
    $('#endCoupon').datepicker();


    function datesChange() {
        setTimeout(function () {
            var startDate = Date.parse(start.value.replace(regExp, '$2.$1.$3')),
                endDate = Date.parse(end.value.replace(regExp, '$2.$1.$3')),
                startTime,
                endTime,
                day,
                month;

            if (!isNaN(startDate) && !isNaN(endDate) && endDate > startDate) {
                allDays.value = (endDate - startDate) / 86400000;
            } else if (!isNaN(startDate) && !isNaN(endDate)){
                startTime = Math.min(startDate, endDate);
                endTime = Math.max(startDate, endDate);
                var nStartDate = new Date(startTime),
                    nEndDate = new Date(endTime);
                day = nStartDate.getDate() < 10 ? '0' + nStartDate.getDate() : nStartDate.getDate();
                month = nStartDate.getMonth() + 1 < 10 ? '0' + (nStartDate.getMonth() + 1) : nStartDate.getMonth() + 1;
                start.value = day + '.' + month + '.' + nStartDate.getFullYear();
                day = nEndDate.getDate() < 10 ? '0' + nEndDate.getDate() : nEndDate.getDate();
                month = nEndDate.getMonth() + 1 < 10 ? '0' + (nEndDate.getMonth() + 1) : nEndDate.getMonth() + 1;
                end.value = day + '.' + month + '.' + nEndDate.getFullYear();
                startDate = Date.parse(start.value.replace(regExp, '$2.$1.$3'));
                endDate = Date.parse(end.value.replace(regExp, '$2.$1.$3'));
                allDays.value = (endDate - startDate) / 86400000;
            }
        }, 200);
    }

    function daysChange() {
        var startDate = Date.parse(start.value.replace(regExp, '$2.$1.$3')),
            endTime,
            day,
            month;

        if (!isNaN(startDate) && !isNaN(allDays.value) && allDays.value > 0) {
            endTime = (startDate + allDays.value * 24 * 60 * 60 * 1000);
            var endDate = new Date(endTime);
            day = endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate();
            month = endDate.getMonth() + 1 < 10 ? '0' + (endDate.getMonth() + 1) : endDate.getMonth() + 1;
            end.value = day + '.' + month + '.' + endDate.getFullYear();
        } else if(!isNaN(startDate) && !isNaN(allDays.value) && allDays.value && allDays.value <= 0) {
            allDays.value = 1;
            daysChange()
        } else {
            end.value = '';
        }
    }

    start.addEventListener('blur', datesChange);
    end.addEventListener('blur', datesChange);
    allDays.addEventListener('keyup', daysChange);
})(jQuery);