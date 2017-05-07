jQuery(document).ready(function($) {

	// header fade
	$(function() {
	    var header = $('#header');
	    setTimeout(function(){
	        header.addClass('show');
        },800);
	});

	//header background on scroll
	var header = $('#header');
	$(window).on('scroll', function() {
        var st2 = $(this).scrollTop();

        if (st2 > 0) {
            header.addClass('scrolling');
        } else {
            header.removeClass('scrolling');
        }
	});

    // for smooth scroll
    smoothScroll.init({
        selector: '.smooth-scroll, a', // Selector for links (must be a class, ID, data attribute, or element tag)
        speed: 500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInQuad', // Easing pattern to use
        offset: 130 // Integer. How far to offset the scrolling anchor location in pixels
    });


    // for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function(){
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-wrap').toggleClass('showing');
        $(document.body).toggleClass('overflow');
    });

    //for banner link
    $('.banner-list li').on('click', function () {
        var tab = $(this).data('tabId'),
            tabName = $(this).data('tabName'),
            tabBlock = $("[data-tab="+tab+"]"),
            nameList = tabBlock.find('.tab-name-list li'),
            currentName = tabBlock.find("[data-tab-name="+tabName+"]"),
            contentList = tabBlock.find('.tab-content-list li'),
            currentContent = tabBlock.find("[data-tab-content="+tabName+"]");

        nameList.removeClass('active');
        contentList.removeClass('show');
        currentName.addClass('active');
        currentContent.addClass('show');
    });

    //for tabs
    $('.tab-name-list li, .banner-list a').on('click', function () {
        var parent = $(this).parents('ul');

        if (parent.hasClass('tab-name-list')) {
            var tabId = $(this).attr('id'),
                tabActive = $(this),
                tabList = tabActive.parent().find('li'),
                tabContentBox = tabActive.parent().next(),
                tabContentList = tabContentBox.find('li'),
                tabContentActive = tabContentBox.find("[data-tab-id="+tabId+"]");

            tabList.removeClass('active');
            tabActive.addClass('active');
            tabContentList.removeClass('show');
            tabContentActive.addClass('show');
        } else if (parent.hasClass('banner-list')) {
            setTimeout(function () {
                var tabId = window.location.hash.substr(1),
                    tabActive = $('#'+tabId+''),
                    tabList = tabActive.parent().find('li'),
                    tabContentBox = tabActive.parent().next(),
                    tabContentList = tabContentBox.find('li'),
                    tabContentActive = tabContentBox.find("[data-tab-id="+tabId+"]");

                tabList.removeClass('active');
                tabActive.addClass('active');
                tabContentList.removeClass('show');
                tabContentActive.addClass('show');
            }, 200);
        }
    });

    // for modal
    if ( $('a').is('.popup-vimeo')) {
        $('.popup-vimeo').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    function stopVideo() {
        var  slideList = $('.gallery-thumbs').find('.swiper-slide');
        // swiper-slide-active
        slideList.each(function (index) {
            $('video')[index].pause();
            console.log( index + " - STOP");
        });
    }

    if ( $('div').is('.gallery-top') ) {
        var galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 2,
            autoplay: 7000,
            effect: 'fade',
            onInit: function (swiper) {
                console.log("initialized");
                $('.gallery-top').addClass('started');

                var slideList = $('.gallery-top').find('.swiper-slide');

                slideList.each(function (index) {
                    if ($(this).hasClass('swiper-slide-active')) {
                        var color = $(this).data('slideColor');

                        if (color == '#ffffff') {
                            header.addClass('white-header');
                            console.log(color);
                        } else {
                            header.removeClass('white-header');
                            console.log(color);
                        }
                    }
                });
            },

            onSlideChangeEnd: function (swiper) {
                var slideList = $('.gallery-top').find('.swiper-slide');

                stopVideo();

                slideList.each(function (index) {
                    if ($(this).hasClass('swiper-slide-active')) {
                        var color = $(this).data('slideColor');

                        $('video')[index].play();
                        console.log(index + " - PLAY");
                        console.log('------------------');

                        if (color == '#ffffff') {
                            header.addClass('white-header');
                            console.log(color);
                        } else {
                            header.removeClass('white-header');
                            console.log(color);
                        }
                    }
                });
            }
        });
    }

    if ( $('div').is('.news-slider') ) {
        var swiper = new Swiper('.news-slider', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: true,
            loop: true,
            spaceBetween: 30
        });
    }

    // for vimeo video
    $('.play-vimeo').on('click', function (event) {
        var infoBox = $(this).parent(),
            infoBoxContainer = infoBox.parents('.container'),
            videoBox = infoBox.parents('.swiper-slide').find('.vimeo-block'),
            videoId = videoBox.attr('id');

        event.preventDefault();

        console.log('------------------');
        console.log('Watch Vimeo');
        infoBoxContainer.addClass('vimeo-show');
        galleryTop.stopAutoplay();
        stopVideo();
        videoBox.addClass('show');

        var player = new Vimeo.Player(videoId);
        player.play().then(function() {
            console.log('played the the ' + videoId + ' video!');
        });

        //close Vimeo
        $('.gallery-thumbs').on('click', function () {
            var slideList = $('.gallery-top').find('.swiper-slide');

            infoBoxContainer.removeClass('vimeo-show');
            galleryTop.startAutoplay();
            videoBox.removeClass('show');

            player.pause().then(function() {
                console.log('pause the ' + videoId + ' video!');
            });

            slideList.each(function (index) {
                if ($(this).hasClass('swiper-slide-active')) {
                    $('video')[index].play();
                    console.log('------------------');
                    console.log('PLAY - ' + index);
                }
            });
        });
    });

    /*viewportchecker to trigger animations throughout*/
    $(".news-box").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated slideInRight',
        offset: 100
    });

    $(".section-title, .btn, .banner-title, .history-img-wrap, .history-desc, .technology-list li, .tab-name-list li, .tab-content-list li:first-child .specifications-list > li, .tab-content-list li:first-child p, .tab-content-list li:first-child .tab-block-title, .section-structure img").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeInUpSmall',
        offset: 100
    });

    $(".tab-content-list li:first-child .tab-right-block").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeInUpSmall',
        offset: 20
    });



    $(".watch-block-list li, footer").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeInUpSmall',
        offset: 20
    });
    $(".video-slider, .section-page-banner, .history-year-wrap, .directors-list, h2, h3:not(.tab-block-title), h4, .section-movable-systems p, .section-movable-systems img, .structure-box, .structure-list").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 100
    });


    /*fixed some tab elements that were being hidden, and adding animation classes for transition*/
    $(".tab-content-list li .tab-right-block").addClass("animated bounceInSmall");
    $(".btn-download, .specifications-list li, .tab-content-list p,  .tab-content-list h3").removeClass("invisible").addClass("animated fadeInUpSmall");
    // end fixes


    /*end viewportchecker*/


});