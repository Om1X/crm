$(document).ready(function(){
    var $menu = $('#header'),
        $rContent = $('#rContent');
    $(window).scroll(function(){
        if ( $(this).scrollTop() > 100 ){
            $menu.addClass('header-fixed');
            $rContent.css('padding-top', '148px');
            $menu.css('width', $('.content').css('width'));
        } else if($(this).scrollTop() <= 88) {
            $menu.removeClass('header-fixed');
            $rContent.css('padding-top', "0")
        }
    });
    $(window).resize(function () {
        $menu.css('width', $('.content').css('width'));
    })
});

// Клик по кнопке Скрыть