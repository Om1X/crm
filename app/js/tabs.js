(function ($) {
    $('.tabs').on('click', 'label:not(.label__tab-active)', function () {
            $('.tabs > .label').removeClass('label__tab-active');
            $(this).addClass('label__tab-active');
            $('.innerTabs > div').removeClass('input-active');
            $('.innerTabs > div:eq(' + $(this).index() + ')').addClass('input-active');
        }
    );
})(jQuery);
