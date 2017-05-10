$(document).ready(function () {
    var $menu = $('#header'),
        $rContent = $('#rContent'),
        $headerH = +$menu.css('height').replace(/px/g, ''),
        $topMenuH = +$('.topMenu').css('height').replace(/px/g, ''),
        $scrollH = $headerH - $topMenuH,
        $marginTop = '-' + $scrollH + 'px';

    $(window).scroll(function () {
        if ($(this).scrollTop() > $scrollH) {
            $menu.addClass('header-fixed');
            $menu.css('position', 'fixed');
            $menu.css('top', $marginTop);
            $menu.css('z-index', '999');
            $rContent.css('padding-top', $headerH + 'px');
            $menu.css('width', $('.content').css('width'));
        } else if ($(this).scrollTop() <= $scrollH) {
            $menu.removeClass('header-fixed');
            $menu.css('position', 'relative');
            $menu.css('top', '0');
            $rContent.css('padding-top', "0")
        }
    });

    $(window).resize(function () {

        var header = document.getElementById('header');

        if (header.style.position === 'relative') {
            header.style.width = 'auto';
        } else {
            $menu.css('width', $('.content').css('width'));
        }
    })
});