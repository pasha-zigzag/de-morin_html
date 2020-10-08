$(function () {

    var accomodationTimeout;
    $(window).bind('resize', function () {
        var $this = $(this);
        var width = $this.width();
        if (!accomodationTimeout) {
            accomodationTimeout = setTimeout(
                function () {
                    if (width > 1560) {
                        $('.accommodations__slider').width(
                            $('.accommodations__wrapper').width() - $('.accommodations__info').width() + $('.accommodations__wrapper').offset().left
                        );
                    } else {
                        $('.accommodations__slider').width(
                            $('.accommodations__wrapper').width() + $('.accommodations__wrapper').offset().left
                        );
                    }

                    accomodationTimeout = null;
                },
                100
            );
        }
    }).resize();

    var serviceTimeout;
    $(window).bind('resize', function () {
        var $this = $(this);
        var width = $this.width();
        if (!serviceTimeout) {
            serviceTimeout = setTimeout(
                function () {
                    if (width > 992) {
                        $('.services__slider').width(
                            $('.services__wrapper').width() - $('.services__info').width() + $('.services__wrapper').offset().left
                        );
                    } else {
                        $('.services__slider').width(
                            $('.services__wrapper').width() + $('.services__wrapper').offset().left
                        );
                    }

                    serviceTimeout = null;
                },
                100
            );
        }
    }).resize();

    $(".demorin-rest__video-btn").click(function () {
        $(".demorin-rest__video-btn").hide();
        var demorinVideo = document.getElementById("demorin-rest__video");
        demorinVideo.setAttribute('controls', '');
        demorinVideo.play();

    });

    $('.accommodations__slider').slick({
        infinite: true,
        variableWidth: true,
        focusOnSelect: true,
        swipeToSlide: true,
        swipe: true,
        prevArrow: '.accommodations__slider-arr .slider-nav__prev',
        nextArrow: '.accommodations__slider-arr .slider-nav__next',

    });

    $('.services__slider').slick({
        infinite: true,
        variableWidth: true,
        focusOnSelect: true,
        swipeToSlide: true,
        swipe: true,
        prevArrow: '.services__slider-arr .slider-nav__prev',
        nextArrow: '.services__slider-arr .slider-nav__next',
    });

    $('.wallpaper__slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 800,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
    });


    $('select').each(function () {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');
        $list.find('li:first-child').hide();

        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('.select.active .select-styled').not(this).each(function () {
                $(this).next('ul.select-options').hide();
            });
            $(this).parent().toggleClass('active').children('ul.select-options').toggle();
        });

        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).parent().removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();

            $listItems.show();
            $(this).hide();

        });

        $(document).click(function () {
            $styledSelect.parent().removeClass('active');
            $list.hide();
        });

    });

    ymaps.ready(mapInit);

    function mapInit() {
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [49.335399, 136.600819],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl']
        });

        myMap.geoObjects
            .add(new ymaps.Placemark([49.335399, 136.600819], {
                //balloonContent: 'Очень много информации <br/> Компания АНИТ',
                iconCaption: 'Дё Морин'
            }, {
                preset: 'islands#greenDotIconWithCaption',
                iconColor: '#FF7A00',
                //iconCaptionMaxWidth: '50'
            }))
        myMap.behaviors.disable('scrollZoom');
    }



    var throttleTimeout;
    $(window).bind('resize', function () {
        var $this = $(this);
        var width = $this.width();
        if (!throttleTimeout) {
            throttleTimeout = setTimeout(
                function () {
                    if (width < 992 && width > 576) {
                        $('.gallery__body').width($('.gallery__inner').width() + $('.gallery__inner').offset().left);
                    } else {
                        $('.gallery__body').width('auto');
                    }
                    throttleTimeout = null;
                },
                100
            );
        }
    }).resize();

    $('.navbar__burger').click(function () {
        $('.navbar__burger, .mobile__menu').toggleClass('active');
        $('html').toggleClass('lock');
    })

    $("input[type='tel']").mask("+7 (999) 999-99-99");

    $('.article__content table').wrap('<div class="content-table"></div>');

    servicesSlider();

    $(window).on('resize', function () {
        servicesSlider();
    });
});

let servicesMobileSlider = false;

function servicesSlider() {
    if ($(window).width() < 576) {
        if (!servicesMobileSlider) {
            $('.services-mobile-slider').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '.product-line .arr-l',
                nextArrow: '.product-line .arr-r',
                variableWidth: true,
                focusOnSelect: true,
                swipeToSlide: true,
                swipe: true,
            });
            servicesMobileSlider = true;
        }
    } else if ($(window).width() > 576) {
        if (servicesMobileSlider) {
            $('.services-mobile-slider').slick('unslick');
            servicesMobileSlider = false;
        }
    }
};

$(document).ready(function ($) {


    ymaps.ready(mapHeaderInit);

    function mapHeaderInit() {
        // Создание карты.
        var myMap = new ymaps.Map("map-hover", {
            center: [49.335399, 136.600819],
            zoom: 9,
            controls: ['zoomControl', 'routeButtonControl']
        });

        //var control = myMap.controls.get('routeButtonControl');

        myMap.controls.add('routeButtonControl', {
            size: "large",
            float: "left",
            floatIndex: 1000,
        });

        myMap.controls.get('routeButtonControl').routePanel.state.set({
            toEnabled: false,
            to: '49.335582, 136.600849', //49.335582, 136.600849
            type: "auto"
        });

        myMap.controls.get('routeButtonControl').routePanel.geolocate('from');
        ymaps.geolocation.get()

        // Откроем панель для построения маршрутов.
        myMap.controls.get('routeButtonControl').state.set('expanded', true);

        myMap.container.fitToViewport();
    }


});