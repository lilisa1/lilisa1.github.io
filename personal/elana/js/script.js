
window.onload = function() {
    countUpFromTime("August 4, 2018 1:00:00", 'countup1');
  };
  function countUpFromTime(countFrom, id) {
    countFrom = new Date(countFrom).getTime();
    var now = new Date(),
        countFrom = new Date(countFrom),
        timeDifference = (now - countFrom);
      
    var secondsInADay = 60 * 60 * 1000 * 24,
        secondsInAHour = 60 * 60 * 1000;
      
    days = Math.floor(timeDifference / (secondsInADay) * 1);
    months = Math.floor(timeDifference / (secondsInADay) * 1 / 30);
    hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
    mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
    secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);
  
    var idEl = document.getElementById(id);
    idEl.getElementsByClassName('days')[0].innerHTML = days;
    idEl.getElementsByClassName('months')[0].innerHTML = months;
    idEl.getElementsByClassName('hours')[0].innerHTML = hours;
    idEl.getElementsByClassName('minutes')[0].innerHTML = mins;
    idEl.getElementsByClassName('seconds')[0].innerHTML = secs;
  
    clearTimeout(countUpFromTime.interval);
    countUpFromTime.interval = setTimeout(function(){ countUpFromTime(countFrom, id); }, 1000);
  }

(function($) {
    "use strict";
    $(window).on("load", function() {
        $(".loader-inner").fadeOut();
        $(".loader").delay(500).fadeOut("slow");
    });

    $('a.scroll').smoothScroll({
        speed: 800,
        offset: -57
    });

    var header = $('.header'),
        pos = header.offset();

    $(window).scroll(function() {
        if ($(this).scrollTop() > pos.top + 500 && header.hasClass('default')) {
            header.fadeOut('fast', function() {
                $(this).removeClass('default').addClass('switched-header').fadeIn(200);
            });
        } else if ($(this).scrollTop() <= pos.top + 500 && header.hasClass('switched-header')) {
            header.fadeOut('fast', function() {
                $(this).removeClass('switched-header').addClass('default').fadeIn(100);
            });
        }
    });

    function mainHeroResize() {
        $(".main-slider .slides li").css('height', $(window).height());
    }

    $(function() {
            mainHeroResize()
        }),
        $(window).resize(function() {
            mainHeroResize()
        });

    $('.main-slider').flexslider({
        animation: "fade",
        slideshow: true,
        directionNav: true,
        controlNav: false,
        pauseOnAction: false,
        animationSpeed: 500
    });

    $('.review-slider').flexslider({
        animation: "slide",
        slideshow: true,
        directionNav: false,
        controlNav: true,
        pauseOnAction: false,
        animationSpeed: 500
    });

    var mobileBtn = $('.mobile-but');
    var nav = $('.main-nav ul');
    var navHeight = nav.height();

    $(mobileBtn).on("click", function() {
        $(".toggle-mobile-but").toggleClass("active");
        nav.slideToggle();
        $('.main-nav li a').addClass('mobile');
        return false;
    });

    $(window).resize(function() {
        var w = $(window).width();
        if (w > 320 && nav.is(':hidden')) {
            nav.removeAttr('style');
            $('.main-nav li a').removeClass('mobile');
        }
    });

    $('.main-nav li a').on("click", function() {
        if ($(this).hasClass('mobile')) {
            nav.slideToggle();
            $(".toggle-mobile-but").toggleClass("active");
        }
    });

    $('.background-img').each(function() {
        var path = $(this).children('img').attr('src');
        $(this).css('background-image', 'url("' + path + '")').css('background-position', 'initial');
    });

	var filterNav = $('.block-filter li a'); 
    filterNav.on("click", function() {

        $(this).addClass('active');
        $(this).parent().siblings().find('a').removeClass('active');

        var filters = $(this).attr('data-filter');
        $(this).closest('.gallery').find('.block-gallery').removeClass('disable');

        if (filters !== 'all') {

            var selected = $(this).closest('.gallery').find('.block-gallery');

            for (var i = 0; i < selected.length; i++) {

                if (!selected.eq(i).hasClass(filters)) {
                    selected.eq(i).addClass('disable');
                }

            }

        }
        
        return false;

    });

    var instaFeed = new Instafeed({
        get: 'user',
        userId: '8325695316',
        accessToken: '8325695316.f2b58fa.c666ac03ac2242518d86ce58bcfc285c',
        limit: 30,
        resolution: 'standard_resolution',
        template: '<li><a href="{{link}}" target="_blank"><img src="{{image}}"/></a></li>',
        after: function() {
            $('#block-stream').gridrotator({
                rows: 2,
                columns: 9,
                interval: 3000,
                preventClick: false,
                w1024: {
                    rows: 2,
                    columns: 4
                },
                w768: {
                    rows: 2,
                    columns: 4
                },
                w480: {
                    rows: 2,
                    columns: 2
                },
                w320: {
                    rows: 2,
                    columns: 4
                },
                w240: {
                    rows: 2,
                    columns: 4
                },
            });
        }
    });

    instaFeed.run();

})(jQuery);