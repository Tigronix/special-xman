const animationDuration = 'cubic-bezier(.43,0,.03,1)';
const controller = new ScrollMagic.Controller();
const fromDesktop = window.matchMedia("(min-width: 1440px)");
const fromVerticalTablet = window.matchMedia("(min-width: 768px)");
const fromHorizontalTablet = window.matchMedia("(min-width: 1024px)");
const atHorizontalTablet = window.matchMedia("(max-width: 1439px) and (min-width: 1024px)");
const atVerticalTablet = window.matchMedia("(max-width: 1023px) and (min-width: 768px)");
const atMobile = window.matchMedia("(max-width: 767px)");
const $globalWrapper = $('.global-wrapper');
const pageStatic = 'global-wrapper--static';
const pagePeople = 'global-wrapper--people';
const isIe11 = !!window.MSInputMethodContext && !!document.documentMode;
const isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
    return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
const isEdge = navigator.appVersion.indexOf("Edge") != -1;
const SX = {};

SX.legacyOnLoadAnimation = function() {
    const pageStatic = document.querySelector('.global-wrapper--static');
    const tlOnLoadScrollAnimation = new TimelineMax();

    if (pageStatic) {

    } else {
        tlOnLoadScrollAnimation
            .fromTo('.logo', 0.5, {
                y: '-30',
                opacity: '0'
            }, {
                y: '0',
                opacity: '1',
                ease: animationDuration
            })
            .staggerFromTo('.social__link', 1, {
                y: '-30',
                opacity: '0'
            }, {
                y: '0',
                opacity: '1',
                ease: animationDuration
            }, 0.1)
            .fromTo('.legacy__x', 0.5, {
                x: '-50%',
                y: '-52%',
                opacity: '0'
            }, {
                y: '-50%',
                x: '-50%',
                opacity: '1',
                ease: animationDuration
            }, '-=0.1')
            .fromTo('.legacy__nav', 0.5, {
                y: '-30',
                opacity: '0'
            }, {
                y: '0',
                opacity: '1',
                ease: animationDuration
            }, '-=0.1')
            .staggerFromTo('.menu__link--animated', 0.5, {
                y: '-30',
                opacity: '0'
            }, {
                y: '0',
                opacity: '1',
                ease: animationDuration
            }, 0.3)
            .fromTo('.scroll-me', 0.5, {
                y: '-30',
                opacity: '0'
            }, {
                y: '0',
                opacity: '1',
                ease: animationDuration
            }, '-=0.1');
    }

};

SX.scrollToMainContent = function() {
    const legacyHeight = $('.legacy').innerHeight();
    const menu = '.menu';
    const header = '.page-header';
    const $scrollBtnMain = $('.scroll-me--main');
    const $scrollBtnStatic = $('.scroll-me--static');
    let xColorIn = '#1c1b1b';
    let xColorLeave = '#00bcd4';
    let logoPosition = '-100';
    let menuPosition = '53';
    let xScale = '10';
    let h1Position = '-2000';
    const fakeBlock = document.querySelector('#fakeBlock');
    const tlOnEnterScrollAnimation = new TimelineMax();
    const tlOnLeaveScrollAnimation = new TimelineMax();
    let humanError = -350;

    let els = document.querySelectorAll(".js-splitme");
    [].forEach.call(els, function(el) {
        el.outerHTML = Splitter(el.outerHTML, '<span class="letter">$</span>');
    });

    const tweenIn = function() {
        return tlOnEnterScrollAnimation
            .to('.scroll-section', 0.1, {
                zIndex: '200'
            })
            .to('.menu--legacy', 0.1, {
                display: 'none'
            }, '-=2')
            .to('.menu--header', 0.1, {
                display: 'flex'
            }, '-=2')
            .staggerFromTo('.menu--header .menu__link', 0.3, {
                y: '-30',
                opacity: '0'
            }, {
                y: '0',
                opacity: '1',
                ease: animationDuration
            }, '0.15')
            .to('.legacy__x', 3, {
                scale: 10,
                ease: animationDuration
            }, '-=0.6')
            .to('.legacy__x', 2, {
                fill: '#212121',
                ease: animationDuration
            }, '-=5.6')
            .to('.global-wrapper--main', 2, {
                backgroundColor: '#212121',
                ease: animationDuration
            }, '-=5.6')
            .to('.legacy__h1', 2, {
                x: h1Position,
                ease: animationDuration
            }, '-=2.6');
    };
    const tweenOut = function() {
        return tlOnLeaveScrollAnimation
            .to('.scroll-section', 0.1, {
                zIndex: '0'
            })
            .to('.menu--header', 0.1, {
                display: 'none'
            }, '-=2')
            .to('.legacy__x', 2, {
                x: '-50%',
                y: '-50%',
                scale: '1',
                ease: animationDuration
            })
            .to('.legacy__x', 2, {
                fill: xColorLeave,
                ease: animationDuration
            }, '-=2.5')
            .to('.global-wrapper--main', 2, {
                backgroundColor: '#ff5722',
                ease: animationDuration
            }, '-=2')
            .to('.legacy__h1', 0.1, {
                x: '0'
            }, '-=2')
            .staggerFromTo('.legacy__h1 .letter', 0.70, {
                y: '100',
                opacity: '0'
            }, {
                y: '0',
                opacity: '1',
                ease: Back.easeOut.config(3)
            }, 0.05)
            .to('.menu--legacy', 0.1, {
                display: 'flex'
            }, '-=2')
            .staggerFromTo('.menu--legacy .menu__link', 0.3, {
                y: '-30',
                opacity: '0'
            }, {
                y: '0',
                opacity: '1',
                ease: animationDuration
            }, '0.15')
    };

    if (atMobile.matches) {
        logoPosition = 0;
        menuPosition = 30;
        xScale = 1;
    }

    if ($globalWrapper.hasClass(pagePeople)) {
        xColorLeave = '#ff5722';
        if (atMobile.matches) {
            xColorIn = '#ff5722';
        }
    }

    if ($globalWrapper.hasClass(pageStatic)) {
        xScale = '1';
        logoPosition = 0;
        h1Position = 0;
    }

    if (atHorizontalTablet.matches) {
        humanError = -0;
    } else if (atVerticalTablet.matches) {
        humanError = -400;
    } else if (atMobile.matches) {
        humanError = +450;
    }

    if (!isIe11 && !isEdge) {
        if (fakeBlock) {
            const fakeBlockOffset = $('#fakeBlock').offset().top;
            const firstFakeItemHeight = $('.scroll-section__fake-item:first-child').offset().top;

            let scrollToFirstTitleNumber = fakeBlockOffset + firstFakeItemHeight + humanError;

            const scrollToFirstTitle = function() {
                if (atMobile.matches) {
                    scrollToFirstTitleNumber = $('.scroll-section__wrap').offset().top;
                }

                $([document.documentElement, document.body]).animate({
                    scrollTop: scrollToFirstTitleNumber
                }, 1500);
            };

            const scrollToTop = function() {
                $([document.documentElement, document.body]).animate({
                    scrollTop: 1
                }, 1500);
            };

            $scrollBtnMain.on('click', function() {
                scrollToFirstTitle();
            });

            if (fromDesktop.matches && !isIe11 && !isEdge) {
                const sceneIn = new ScrollMagic.Scene({})
                    .on('enter', function() {
                        tweenIn();
                        scrollToFirstTitle();
                    })
                    .offset(60)
                    .addTo(controller);

                const sceneOut = new ScrollMagic.Scene({
                        triggerElement: '#fakeBlock'
                    })
                    .on('leave', function() {
                        scrollToTop();
                        tweenOut();
                    })
                    .offset(390)
                    .addTo(controller);
            } else {
                if(atHorizontalTablet.matches){
                    let menuLegacyTopPosition = 'calc(100% - 40px)';
                }else if(atVerticalTablet.matches || atMobile.matches){
                    menuLegacyTopPosition = '100%';
                }
                const tweenMobile =
                    new TimelineMax()
                    .stop()
                    .fromTo('.menu--legacy', 0.4, {
                        position: 'absolute',
                        transform: '',
                        left: '50%',
                        top: menuLegacyTopPosition,
                        transform: 'translate(-50%, 0)'
                    }, {
                        position: 'fixed',
                        top: '56px',
                        left: '50%',
                        transform: 'translate(-50%, 0)'
                    });
                const tweenOut = function() {
                    return tlOnLeaveScrollAnimation
                        .to('.scroll-section', 0.1, {
                            zIndex: '0'
                        })
                        .to('.menu--header', 0.1, {
                            display: 'none'
                        }, '-=2')
                        .to('.legacy__x', 2, {
                            x: '-50%',
                            y: '-50%',
                            scale: '1',
                            ease: animationDuration
                        })
                        .to('.legacy__x', 2, {
                            fill: xColorLeave,
                            ease: animationDuration
                        }, '-=2.5')
                        .to('.global-wrapper--main', 2, {
                            backgroundColor: '#ff5722',
                            ease: animationDuration
                        }, '-=2')
                        .to('.legacy__h1', 0.1, {
                            x: '0'
                        }, '-=2')
                        .staggerFromTo('.legacy__h1 .letter', 0.70, {
                            y: '100',
                            opacity: '0'
                        }, {
                            y: '0',
                            opacity: '1',
                            ease: Back.easeOut.config(3)
                        }, 0.05)
                        .to('.menu--legacy', 0.1, {
                            display: 'flex'
                        }, '-=2')
                        .staggerFromTo('.menu--legacy .menu__link', 0.3, {
                            y: '-30',
                            opacity: '0'
                        }, {
                            y: '0',
                            opacity: '1',
                            ease: animationDuration
                        }, '0.15')
                };

                let firstScreenTrigger = 60;
                let secondScreenTrigger = 380;

                if (atVerticalTablet.matches) {
                    firstScreenTrigger = 200;
                    secondScreenTrigger = 500;
                }

                if (atMobile.matches) {
                    firstScreenTrigger = 30;
                    secondScreenTrigger = 0;
                }

                const sceneOut = new ScrollMagic.Scene({
                        triggerElement: '.scroll-section__wrap'
                    })
                    .setClassToggle(".menu--legacy", "hide")
                    .on('enter', function() {
                        tweenMobile.play();
                    })
                    .on('leave', function() {
                        tweenMobile.reverse();
                    })
                    .offset(secondScreenTrigger)
                    .addTo(controller);
            }
        }
    }

    $scrollBtnStatic.on('click', function() {
        const nextBlockOffsetTop = $(this).closest('.legacy').next().offset().top;

        $([document.documentElement, document.body]).animate({
            scrollTop: nextBlockOffsetTop
        }, 1500);
    });
};

SX.mainScrollAnimation = function() {
    const fakeItems = $('.scroll-section__fake-item');
    const titles = $('.scroll-section__title');
    const contents = $('.scroll-section__content');
    const title = 'title';
    const fakeItem = 'fakeItem';
    const content = 'content';
    let durationTime = 1200;
    let titleAway = $(window).width();

    if (atMobile.matches) {
        titleAway = 767;
    }

    titles.each(function(i, it, array) {
        it.id = title + i;
    });

    contents.each(function(i, it, array) {
        it.id = content + i;
    });

    fakeItems.each(function(i, it, array) {
        it.id = fakeItem + i;
        it.style.height = durationTime + 'px';

        const tweenIn = function(index) {
            return new TimelineMax()
                .fromTo($('#' + title + index), 0.1, {
                    left: 0,
                    x: titleAway
                }, {
                    x: '0',
                    left: 0,
                    ease: animationDuration
                })
                .fromTo($('#' + content + index), 0.1, {
                    opacity: 0
                }, {
                    zIndex: '2500',
                    opacity: '1',
                    ease: animationDuration
                }, '-=0.1');
        };
        const tweenOut = function(index) {
            $('#' + title + index).css('left', '-' + titleAway + 'px');
            $('#' + content + index).css({
                'opacity': '0',
                'z-index': ''
            });
        };

        if (fromDesktop.matches && !isIe11 && !isEdge) {
            new ScrollMagic.Scene({
                    triggerElement: '#' + fakeItem + i,
                    duration: durationTime
                })
                .setClassToggle('.menu__link', 'menu__link--scrolled')
                .setTween(tweenIn(i))
                .on('end', function() {
                    tweenOut(i);
                })
                .addTo(controller);
        }
    });
};

SX.cursorAddClassToActiveElems = function() {
    const allLinks = $('a:not(".js-no-cursor")');
    const allBtns = $('button');
    const allInputs = $('input');
    const allLabels = $('label:not(".checkbox")');
    const allCheckbox = $('.js-checkbox-text');
    const allTextareas = $('textarea');
    const otherElems = $('.js-cursor-hover');

    if (fromDesktop.matches) {
        allLinks.each(function() {
            $(this).addClass('hover mouseDown')
        });

        allBtns.each(function() {
            $(this).addClass('hover mouseDown')
        });

        allInputs.each(function() {
            $(this).addClass('hover mouseDown')
        });

        allTextareas.each(function() {
            $(this).addClass('hover mouseDown')
        });

        allTextareas.each(function() {
            $(this).addClass('hover mouseDown')
        });

        allLabels.each(function() {
            $(this).addClass('hover mouseDown')
        });

        allCheckbox.each(function() {
            $(this).addClass('hover mouseDown')
        });

        otherElems.each(function() {
            $(this).addClass('hover mouseDown')
        });
    }
};

SX.customCursor = function() {
    const $cursor = $('.cursor');
    const $xray = $('.xray');
    const mouseDown = document.querySelector('body');
    if (fromDesktop.matches) {
        $(window).on('mousemove', function(event) {
            const cursorHalfWidth = 24;
            const cursorPosLeft = event.clientX;
            const cursorPosTop = event.clientY;
            const target = event.target;

            $cursor.css({
                'left': cursorPosLeft,
                'top': cursorPosTop,
                'transform': 'translate(' + '-' + cursorHalfWidth + 'px, ' + '-' + cursorHalfWidth + 'px)'
            });
        });

        $('.hover').on('mouseenter', function() {
            $cursor.addClass('cursor--hover');
        });

        $('.hover').on('mouseleave', function() {
            $cursor.removeClass('cursor--hover');
        });

        $('.mouseDown').mousedown(function() {
            $cursor.addClass('cursor--mousedown');
        });

        $('.mouseDown').mouseup(function() {
            $cursor.removeClass('cursor--mousedown');
        });

        $('.mouseDown').mouseleave(function() {
            $cursor.removeClass('cursor--mousedown');
        });
    }
};

SX.parallaxInit = function() {
    const $parallaxItem = document.querySelector('.js-parallax');

    if (fromDesktop.matches) {
        if ($parallaxItem) {
            const parallax = new Rellax('.js-parallax', {
                speed: -7
            });
        }
    }
};

SX.parallaxHover = function() {
    const svgFront = '.main-svg__item--front';
    const svgSide = '.main-svg__item--side';
    const svgDown = '.main-svg__item--down';
    const $titles = $('.scroll-section__title-link');
    const $links = $('.link-more');
    const front = '#292929';
    const frontHover = '#00b2c9';
    const side = '#121212';
    const sideHover = '#006a78';
    const down = '#161616';
    const downHover = '#00545e';
    const animationTime = 1;

    const parallaxFrontTweenIn = function() {
        return new TimelineMax()
            .to(svgFront, animationTime, {
                fill: frontHover,
                ease: animationDuration
            });
    };
    const parallaxFrontTweenOut = function() {
        return new TimelineMax()
            .to(svgFront, animationTime, {
                fill: front,
                ease: animationDuration
            });
    };

    const parallaxSideTweenIn = function() {
        return new TimelineMax()
            .to(svgSide, animationTime, {
                fill: sideHover,
                ease: animationDuration
            });
    };
    const parallaxSideTweenOut = function() {
        return new TimelineMax()
            .to(svgSide, animationTime, {
                fill: side,
                ease: animationDuration
            });
    };

    const parallaxDownTweenIn = function() {
        return new TimelineMax()
            .to(svgDown, animationTime, {
                fill: downHover,
                ease: animationDuration
            });
    };
    const parallaxDownTweenOut = function() {
        return new TimelineMax()
            .to(svgDown, animationTime, {
                fill: down,
                ease: animationDuration
            });
    };

    const parallaxSafariIn = function() {

        $(svgFront).addClass('tests')
        $(svgSide).css('fill', sideHover).addClass('tests');
        $(svgDown).css('fill', downHover).addClass('tests');
    };

    const parallaxSafariOut = function() {
        $(svgFront).removeClass('tests');
        $(svgSide).css('fill', side).removeClass('tests');
        $(svgDown).css('fill', down).removeClass('tests');
    };

    if (isSafari) {
        $titles.on('mouseenter', function() {
            parallaxSafariIn();
        });

        $titles.on('mouseleave', function() {
            parallaxSafariOut();
        });

        $links.on('mouseenter', function() {
            parallaxSafariIn();
        });

        $links.on('mouseleave', function() {
            parallaxSafariOut();
        });
    } else {
        $titles.on('mouseenter', function() {
            parallaxFrontTweenIn();
            parallaxSideTweenIn();
            parallaxDownTweenIn();
        });
        $titles.on('mouseleave', function() {
            parallaxFrontTweenOut();
            parallaxSideTweenOut();
            parallaxDownTweenOut();
        });

        $links.on('mouseenter', function() {
            parallaxFrontTweenIn();
            parallaxSideTweenIn();
            parallaxDownTweenIn();
        });
        $links.on('mouseleave', function() {
            parallaxFrontTweenOut();
            parallaxSideTweenOut();
            parallaxDownTweenOut();
        });
    }
};

SX.legacyStaticHover = function() {
    const $globalWrapper = $('.global-wrapper');
    const $legacyContent = $('.legacy__content');
    const $legacyX = $('.legacy__x');
    const $legacyTitle = $('.legacy__h1');
    const $legacyDesc = $('.legacy__desc');
    const $header = $('.page-header');

    if ($globalWrapper.hasClass('global-wrapper--static')) {
        $legacyContent.on('mouseenter', function() {
            $legacyX.addClass('legacy__x--hover');
        });
        $legacyContent.on('mouseleave', function() {
            $legacyX.removeClass('legacy__x--hover');
        });
    }
};

SX.peopleSlider = function() {
    let elem = '.people-slider__slider';
    if (elem) {
        $(elem).owlCarousel({
            nav: true,
            dots: true,
            dotsEach: true,
            dotsData: true,
            dotsContainer: '.people-slider__dots',
            navContainer: '.people-slider__nav',
            navText: ['<svg class="hover mouseDown icon icon-arrow"><use xlink:href="#icon-arrow"></use></svg>', '<svg class="hover mouseDown icon icon-arrow"><use xlink:href="#icon-arrow"></use></svg>'],
            items: 1,
            loop: true,
            navElement: 'button',
            smartSpeed: 1000,
            responsive: {
                0: {
                    dots: false,
                    navText: ['<svg class="hover mouseDown icon icon-download-arrow"><use xlink:href="#icon-download-arrow"></use></svg>', '<svg class="hover mouseDown icon icon-download-arrow"><use xlink:href="#icon-download-arrow"></use></svg>']
                },
                768: {
                    dots: true
                }
            }
        });
    }
    const owlDotsNumbers = function() {
        const dots = $('.people-slider__dots .owl-dot');

        dots.each(function(index, item) {
            if (index < 9) {
                index = '0' + (index + 1);
            } else {
                index = index + 1;
            }
            $(this).html(index).addClass('hover mouseDown');
        });
    };
    owlDotsNumbers();
}

SX.historySlider = function() {
    const historyTypeSlider = '.history__type-slider';
    const historySlider = '.history__slider';

    const slickDotsNumbers = function() {
        const dots = $('.history__nav button');
        const historyYear = $(historySlider).find('.history__year');

        dots.each(function(index, item) {
            if (index <= 2008) {
                index = 2008 + index;
            }

            $(this).html(index).addClass('hover mouseDown');
        });

        historyYear.each(function(index, item) {
            if (index <= 2008) {
                index = 2008 + index;
            }

            $(this).html(index);
        });
    };

    const historyTypeSliderSettings = function(index) {
        return {
            dots: false,
            // arrows: true,
            infinite: false,
            slidesToShow: 1,
            draggable: false,
            cssEase: false,
            prevArrow: '<svg class="hover mouseDown icon icon-arrow history__type-slider-arrow history__type-slider-arrow--prev"><use xlink:href="#icon-arrow"></use></svg>',
            nextArrow: '<svg class="hover mouseDown icon icon-arrow history__type-slider-arrow history__type-slider-arrow--next"><use xlink:href="#icon-arrow"></use></svg>',
            appendArrows: '.history-type-slider-' + index + ' .history__type-slider-item-wrap'
        }
    };

    const historyTypeSliderInit = function() {
        return $(historyTypeSlider).each(function(i) {
            $(this).addClass('history-type-slider-' + i);
            $('.history-type-slider-' + i).slick(historyTypeSliderSettings(i));
        });
    };

    const syncSliders = function() {
        $(historyTypeSlider).on('afterChange', function(event, slick, currentSlide, nextSlide) {
            const slides = slick.$slides;
            const lastSlide = slides.length - 1;

            if (currentSlide === lastSlide) {
                $(historySlider).slick('slickNext');
            } else if (currentSlide === 0) {
                $(historySlider).slick('slickPrev');
            }
        });
    };

    const historyTabs = function() {
        const $btn = $('.history__btn');

        $btn.each(function() {
            $(this).on('click', function() {
                $(this).toggleClass('activeHistory');
                const activeBtnsLength = $('.activeHistory').length;

                if (activeBtnsLength !== 0) {
                    $('.activeHistory').each(function(i, it) {
                        if (i === 0) {
                            $(it).addClass('activeHistory');
                        }
                    });

                    let slidesToKeep = [];
                    filter(slidesToKeep);
                    let slideFilter = slidesToKeep.join(', ');

                    $(historyTypeSlider).slick('slickUnfilter');
                    $(historyTypeSlider).slick('slickFilter', slideFilter);
                } else {
                    $(this).addClass('activeHistory');
                }
            });
        });

        const filter = function(array) {
            $btn.each(function() {
                if ($(this).hasClass('activeHistory')) {
                    let filterValue = $(this).data('tabitem');
                    array.push("[data-tabitem='" + filterValue + "']");
                }
            });
        };
    };

    const nav = function() {
        const $btns = $('.history__circle-line');
        const $btnPrev = $('.history__circle-line--prev');
        const $btnNext = $('.history__circle-line--next');
        const $arrPrev = $('.history__type-slider-arrow--prev');
        const $arrNext = $('.history__type-slider-arrow--next');

        $arrPrev.on('click', function() {
            $(this).closest('.history').find('.history__slide.active .history__type-slider').slick('slickPrev');
        });

        $arrNext.on('click', function() {
            $(this).closest('.history').find('.history__slide.active .history__type-slider').slick('slickNext');
        });

        $btnPrev.on('click', function() {
            let currentColor = $(this).closest('.history').find('.slick-current').prev().data('tabitem');
            if (currentColor === undefined) {
                currentColor = $(this).closest('.history').find('.slick-current').data('tabitem');
            }

            $(this).closest('.history').find('.history__slide.active .history__type-slider').slick('slickPrev');
            $btns.removeClass('event award people');
            $btns.addClass(currentColor);
        });

        $btnNext.on('click', function() {
            let currentColor = $(this).closest('.history').find('.slick-current').next().data('tabitem');
            if (currentColor === undefined) {
                currentColor = $(this).closest('.history').find('.slick-current').data('tabitem');
            }

            $(this).closest('.history').find('.history__slide.active .history__type-slider').slick('slickNext');
            $btns.removeClass('event award people');
            $btns.addClass(currentColor);
        });

        $('.history__nav-btn').on('click', function() {
            const dataName = $(this).data('tabnumber');
            let currentColor = $(this).closest('.history').find('.history__slider .history__slide[data-tabnumber="' + dataName + '"] .slick-current').data('tabitem');

            $btns.removeClass('event award people');
            $btns.addClass(currentColor);
        });

        if (fromDesktop.matches) {
            $('.history').on('mousewheel DOMMouseScroll', function(e) {

                if (typeof e.originalEvent.detail == 'number') {
                    $('.history').find('.history__slide.active .history__type-slider').slick('slickNext');
                }
            });
        }

        $(historyTypeSlider)
            .on('afterChange', function(event, slick, currentSlide, nextSlide) {
                const currentColor = $(this).find('.slick-current').data('tabitem');

                $btns.addClass(currentColor);
            })
            .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                slick.$slides.each(function() {
                    $(this).find('.history__type-slider-item-wrap').removeClass('animated-1s fadeInUpBig');

                    if ($(this).hasClass('slick-current')) {
                        let $currentSlideNext = $(this).next();
                        let $currentSlidePrev = $(this).prev();

                        setTimeout(function() {
                            $currentSlidePrev.find('.history__type-slider-item-wrap').addClass('animated-1s fadeInUpBig');
                            $currentSlideNext.find('.history__type-slider-item-wrap').addClass('animated-1s fadeInUpBig');
                        }, 100);
                    }
                });
            });
    };

    slickDotsNumbers();
    historyTypeSliderInit();
    // syncSliders();
    historyTabs();
    nav();
}

SX.gallerySlider = function() {
    const gallery = '.gallery__slider';
    const galleryElem = document.querySelector('.gallery__slider');
    const $galleryCurrentSlide = $('.gallery__current-slide');
    const $galleryLastSlide = $('.gallery__last-slide');

    if (galleryElem) {
        $(gallery).slick({
            dots: false,
            arrows: true,
            infinite: false,
            slidesToShow: 3,
            appendArrows: '.gallery__nav',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        variableWidth: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        variableWidth: false
                    }
                },
            ]
        });
    }

    const galleryHelpers = function() {
        if (galleryElem) {
            const slick = $(gallery).slick('getSlick');
            const slides = slick.$slides;
            const lastSlide = slides.length;

            $galleryLastSlide.html(lastSlide);
            $galleryCurrentSlide.html(1);

            $(gallery).on('afterChange', function(event, slick, currentSlide, nextSlide) {
                $galleryCurrentSlide.html(currentSlide + 1);
            });
        }
    };

    galleryHelpers();
};

SX.filterMenu = function() {
    const menuLinks = ('.menu__link');
    const filterMenuLinks = ('.history__btn');
    const history = ('.history');
    const historyElem = document.querySelector('.history');
    const header = ('.page-header');

    if (historyElem && fromHorizontalTablet.matches) {
        const historyOffsetTop = $(history).offset().top;

        const tweenIn =
            new TimelineMax()
            .stop()
            .staggerFromTo(menuLinks, 0.5, {
                y: '0',
                opacity: '1'
            }, {
                y: '-80',
                opacity: '0',
                ease: animationDuration
            }, 0.1)
            .staggerFromTo(filterMenuLinks, 0.5, {
                y: '-80',
                opacity: '0'
            }, {
                y: '0',
                opacity: '1',
                ease: animationDuration
            }, 0.1);;
        if (fromHorizontalTablet.matches) {
            const scene = new ScrollMagic.Scene({
                    triggerElement: '#history',
                })
                .on('enter', function() {
                    tweenIn.play();
                })
                .on('leave', function() {
                    tweenIn.reverse();
                })
                .addTo(controller);
        }

    }
};

SX.historyCircle = function() {
    const circleIs = document.querySelector('.history__circle-line');
    if (circleIs) {
        const moveCircle = function() {
            const $circle = $('.history__circle-line');
            const $img = $('.history__img');
            const $history = $('.history');
            const $historySlider = $('.history__type-slider-slide-wrapper')
            const imgWidthHalf = $img.innerWidth() / 2;
            const imgHeightHalf = $img.innerHeight();
            const imgOffsetLeft = $img.offset().left;
            const imgOffsetTop = $('.history__slider ').position().top + $('.history__img').position().top + ($img.height() / 2);
            let circlePosition = imgOffsetLeft + imgWidthHalf;
            $circle.css({
                'left': circlePosition + 'px',
                'top': ''
            });

            if (atVerticalTablet.matches | atMobile.matches) {
                circlePosition = imgOffsetTop;

                $circle.css({
                    'top': circlePosition + 'px',
                    'left': ''
                });
            }
        };

        moveCircle();
        $(window).on('resize', function() {
            moveCircle();
        });
    }
};

SX.socialMenu = function() {
    const $btnFilter = $('.social__link-all--filter');
    const $btnSocial = $('.social__link-all--social');
    const $btnClose = $('.social__close');
    const $globalWrapper = $('.global-wrapper');

    $btnSocial.on('click', function(){
        $globalWrapper.addClass('openSocialMenu');
    });

    $btnFilter.on('click', function(){
        $globalWrapper.addClass('openFilterMenu');
    });

    $btnClose.on('click', function(){
        $globalWrapper.removeClass('openSocialMenu openFilterMenu');
    });

    if(atMobile.matches){
        const sceneSocialMenu = new ScrollMagic.Scene({
                triggerElement: '.history'
            })
            .on('enter', function() {
                $('.global-wrapper--history .menu').hide();
                $('.legacy--history').css('z-index', '3500');
                $('.history').css('background', 'none');
            })
            .on('leave', function() {
                $('.global-wrapper--history .menu').css('display', 'flex');
                $('.legacy--history').css('z-index', '3500');
                $('.history').css('background', 'none');
            })
            .offset(0)
            .addTo(controller);
    }
};

SX.browserDetect = function() {
    if (isIe11) {
        $('body').addClass('ie11');
    } else if (isSafari) {
        $('body').addClass('safari');
    } else if (isEdge) {
        $('body').addClass('edge');
    }
}

SX.projector = function() {
    const $mask = $('.xray');
    var currentMousePos = {
        x: -1,
        y: -1
    };

    $('.legacy, .gallery').on('mousemove', function(e) {
        currentMousePos.x = e.pageX;
        currentMousePos.y = e.pageY;

        $mask.css({
            'mask-position-x': currentMousePos.x - 200,
            'mask-position-y': currentMousePos.y - 200,
        });
    });
    $('.page-header').on('mousemove', function(e) {
        currentMousePos.x = e.pageX;
        currentMousePos.y = e.pageY;

        $mask.css({
            'mask-position-x': currentMousePos.x - 200,
            'mask-position-y': currentMousePos.y - 200,
        });
    });
}

SX.scrollToMainStatic = function() {
    const controllerStatic = new ScrollMagic.Controller();
    const $headerTop = $('.page-header--top');
    const $headerBot = $('.page-header--bot');

    if (fromDesktop.matches) {
        const halfHistoryHeight = ($('.history').innerHeight() / 100) * 47;

        const scrollToHistory = function() {
            $headerTop.removeClass('show').addClass('hide');
            $headerBot.removeClass('hide').addClass('show');

            new TimelineMax()
                .to(window, 1.5, {
                    scrollTo: '.history'
                });
        };

        const scrollToLegacy = function() {
            $headerBot.removeClass('show').addClass('hide');
            $headerTop.removeClass('hide').addClass('show');

            new TimelineMax()
                .to(window, 1.5, {
                    scrollTo: '.legacy'
                });
        };

        $('.global-wrapper--history').each(function() {
            const sceneIn = new ScrollMagic.Scene({
                    offset: 50
                })
                .on('enter', function() {
                    scrollToHistory();
                })
                .addTo(controllerStatic);

            const sceneOut = new ScrollMagic.Scene({
                    triggerElement: '.history',
                    offset: halfHistoryHeight,
                })
                .on('leave', function() {
                    scrollToLegacy();
                })
                .addTo(controllerStatic);
        });
        $('.global-wrapper--people').each(function() {
            const scrollToPeople = function() {
                return new TimelineMax()
                    .to(window, 1.5, {
                        scrollTo: '.people-slider'
                    });
            };

            const scrollToLegacy = function() {
                return new TimelineMax()
                    .to(window, 1.5, {
                        scrollTo: '.legacy'
                    });
            };

            const sceneIn = new ScrollMagic.Scene({
                    offset: 50
                })
                .on('enter', function() {
                    scrollToPeople();
                })
                .addTo(controllerStatic);

            const sceneOut = new ScrollMagic.Scene({
                    triggerElement: '.people-slider',
                    offset: 10,
                })
                .on('leave', function() {
                    scrollToLegacy();
                })
                .addTo(controllerStatic);
        });
    }
};

SX.universalTabs = function() {
    $(document).on('click', '[data-tabclass]', function onClick() {
        const $this = $(this);
        const content = $this.data('tabclass');
        const number = $this.data('tabnumber');

        $('[data-tabclass="' + content + '"]').each(function each() {
            const $element = $(this);

            if ($element.data('tabnumber') === number) {
                $element.addClass('active animated').siblings().removeClass('active animated');
            }
        });

        $('.' + content + ' > [data-tabnumber="' + number + '"]').css({
            'height': 'auto',
            'visibility': 'visible',
            'overflow': 'visible'
        }).addClass('active animated').siblings().css({
            'height': '0',
            'visibility': 'hidden',
            'overflow': 'hidden'
        }).removeClass('active animated');
    });
};

SX.parsley = function() {
    const formInputs = $('.form__input ');
    $('.js-validate-form').parsley();

    $('.form__input').each(function() {
        $(this).on('change', function() {
            const value = $(this).val();
            const $label = $(this).siblings('.form__label-text');
            if (value !== "") {
                $label.addClass('hide');
            } else {
                $label.removeClass('hide');
            }
        });
    });
};

SX.heightTransition = function() {
    const $button = $('.js-height-transition-button');
    const $elem = $('.js-height-transition');
    const elemHeight = $elem.innerHeight();

    $elem.addClass('hide');

    $button.on('click', function() {
        $elem.removeClass('hide');
        $(this).hide();
        const elemOffsetTop = $elem.offset().top;

        $([document.documentElement, document.body]).animate({
            scrollTop: elemOffsetTop
        }, 1000);

        new TimelineMax()
            .fromTo('.form', 1, {
                minHeight: 'none',
            }, {
                minHeight: '100vh',
                ease: animationDuration
            }, '');
    });
};

SX.wowInit = function() {
    new WOW().init({
        boxClass: 'wow',
        animateClass: '',
        offset: 50,
        mobile: true,
        live: true,
        scrollContainer: null,
        resetAnimation: true

    });
};

SX.phoneMask = function() {
    const $formTel = $('.js-form-tel');

    if ($formTel.length) {
        $formTel.mask('+7(999)999-99-99', {
            placeholder: '+7(___)___-__-__',
        });
    }
};

SX.fancybox = function() {
    $('.js-fancybox').fancybox({
        clickContent: false,
        infobar: false,
        buttons: [
            "close"
        ],
        closeExisting: false,
        preventCaptionOverlap: false,
        transitionEffect: 'slide',
        btnTpl: {
            close: '<button data-fancybox-close class="fancybox-button fancybox-button--close">' +
                '<svg class="icon icon-close"><use xlink:href="#icon-close"></use></svg>' +
                "</button>",
            arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left">' +
                '<div><svg class="icon icon-arrow-right"><use xlink:href="#icon-arrow-right"></use></svg></div>' +
                "</button>",
            arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right">' +
                '<div><svg class="icon icon-arrow-right"><use xlink:href="#icon-arrow-right"></use></svg></div>' +
                "</button>",
        },
        afterLoad: function(instance, current) {
            const $fancyboxBtns = $('.fancybox-button');

            if (fromDesktop.matches) {
                $fancyboxBtns.each(function() {
                    $(this).addClass('hover mouseDown')
                });

                SX.customCursor();
            }
        },
        afterClose: function(){
            $('.history__type-slider').slick('setPosition');
            SX.historySlider();
      }
    });
};

$(function onPageReady() {
    SX.wowInit();
    SX.phoneMask();
    SX.fancybox();
    SX.browserDetect();
    SX.parsley();
    SX.legacyOnLoadAnimation();
    SX.legacyStaticHover();
    SX.mainScrollAnimation();
    SX.scrollToMainContent();
    SX.parallaxInit();
    SX.parallaxHover();
    SX.peopleSlider();
    SX.historySlider();
    SX.gallerySlider();
    SX.filterMenu();
    SX.historyCircle();
    SX.socialMenu();
    SX.scrollToMainStatic();
    SX.projector();
    SX.universalTabs();
    SX.heightTransition();

    // custom cursor необходимо запускать последним
    SX.cursorAddClassToActiveElems();
    SX.customCursor();
})

new Vue({
    el: '#global-svg',
    template: '<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs> <symbol id="icon-paperclip" viewBox="0 0 15 32"><path stroke="currentColor" d="M4.364 23.389v-12.121c0-1.607 1.302-2.909 2.909-2.909v0c1.607 0 2.909 1.302 2.909 2.909v0 14.497c0 3.055-2.065 5.75-4.848 5.75s-4.848-2.007-4.848-5.818v-18.424c0-3.749 3.039-6.788 6.788-6.788v0c3.749 0 6.788 3.039 6.788 6.788v0 16.116z"></path></symbol> <symbol id="icon-filter" viewBox="0 0 32 32"> <path fill="none" stroke="currentColor" stroke-width="1.764" stroke-miterlimit="10" stroke-linecap="butt" stroke-linejoin="miter" d="M12.261 15.12c0.306 0.331 0.494 0.776 0.495 1.264v13.856c0.001 0.515 0.419 0.932 0.935 0.932 0.258 0 0.491-0.104 0.66-0.273l-0 0 3.835-4.385c0.509-0.619 0.797-0.921 0.797-1.54v-8.481c-0-0.005-0-0.012-0-0.018 0-0.481 0.183-0.919 0.483-1.248l-0.001 0.002 10.997-11.945c0.289-0.253 0.471-0.623 0.471-1.036 0-0.759-0.615-1.375-1.375-1.375-0.040 0-0.079 0.002-0.118 0.005l0.005-0h-27.162c-0.019-0.001-0.042-0.001-0.064-0.001-0.759 0-1.375 0.615-1.375 1.375 0 0.382 0.156 0.728 0.408 0.977l0 0z"></path> </symbol> <symbol id="icon-cap" viewBox="0 0 34 32"> <path d="M25.169 26.625h-1.959v-1.731c0-0.527-0.427-0.953-0.953-0.953h-10.41c-0.002 0-0.004-0-0.007-0-0.527 0-0.953 0.427-0.953 0.953 0 0 0 0 0 0v0 1.731h-1.959c-0.527 0.004-0.953 0.432-0.953 0.96 0 0 0 0 0 0v0 3.455c0 0 0 0 0 0 0 0.521 0.415 0.945 0.933 0.96l0.001 0h16.261c0.527-0.004 0.953-0.432 0.953-0.96 0 0 0-0 0-0v0-3.455c0-0.53-0.43-0.96-0.96-0.96v0z"></path> <path d="M29.936 0h-25.796c-2.287 0-4.14 1.854-4.14 4.14v0c0 4.18 3.389 7.569 7.569 7.569v0h0.078c1.507 2.228 3.679 3.906 6.229 4.762l0.086 0.025v6.289h6.152v-6.282c2.631-0.886 4.8-2.563 6.281-4.744l0.027-0.043h0.078c4.18 0 7.569-3.389 7.569-7.569v0c0-0.006 0-0.013 0-0.020 0-2.279-1.848-4.127-4.127-4.127-0.002 0-0.005 0-0.007 0h0zM3.814 7.869c-0.937-0.95-1.515-2.255-1.515-3.695 0-0.012 0-0.024 0-0.035v0.002c0.004-1.016 0.826-1.838 1.841-1.842h0.745c0 0.091 0 0.183 0 0.274-0 0.022-0 0.048-0 0.075 0 2.39 0.51 4.661 1.426 6.71l-0.042-0.104c-0.955-0.253-1.776-0.735-2.43-1.385l0 0zM30.211 7.869c-0.65 0.651-1.469 1.133-2.386 1.376l-0.037 0.008c0.89-1.966 1.41-4.263 1.411-6.68v-0.275h0.738c0 0 0 0 0 0 1.018 0 1.844 0.824 1.848 1.841v0c0 0.005 0 0.011 0 0.017 0 1.451-0.592 2.765-1.547 3.711l-0 0z"></path> </symbol> <symbol id="icon-event" viewBox="0 0 32 32"> <path d="M6.003 0h4v4h-4v-4z"></path> <path d="M22.003 0h4v4h-4v-4z"></path> <path d="M30.003 1.997h-2.003v2.003c0 1.106-0.897 2.003-2.003 2.003h-3.994c-1.106 0-2.003-0.897-2.003-2.003v0-2.003h-8v2.003c0 1.106-0.897 2.003-2.003 2.003v0h-3.994c-1.106 0-2.003-0.897-2.003-2.003v0-2.003h-2.003c-1.104 0.004-1.997 0.899-1.997 2.003 0 0 0 0 0 0v0 26.003c0 1.103 0.894 1.997 1.997 1.997v0h28.006c1.103 0 1.997-0.894 1.997-1.997v0-26.003c0 0 0 0 0 0 0-1.104-0.893-2-1.996-2.003h-0zM14.003 24l-6.003-6.003 3.002-2.995 3.002 2.995 6.995-6.995 3.002 3.002z"></path> </symbol> <symbol id="icon-people" viewBox="0 0 32 32"> <path d="M16.15 16.98c4.003 0 7.242-3.794 7.242-8.49 0-6.491-3.265-8.49-7.242-8.49s-7.242 1.959-7.242 8.49c0 4.669 3.246 8.49 7.242 8.49z"></path> <path d="M32.144 29.433l-3.651-8.235c-0.176-0.379-0.463-0.681-0.819-0.87l-0.010-0.005-5.669-2.952c-0.056-0.035-0.123-0.056-0.196-0.056s-0.14 0.021-0.197 0.057l0.002-0.001c-1.492 1.156-3.391 1.854-5.453 1.854s-3.961-0.697-5.474-1.869l0.021 0.015c-0.055-0.035-0.121-0.056-0.193-0.056s-0.138 0.021-0.194 0.057l0.001-0.001-5.675 2.952c-0.366 0.193-0.652 0.495-0.818 0.864l-0.005 0.011-3.657 8.235c-0.1 0.219-0.159 0.475-0.159 0.744 0 1.006 0.816 1.822 1.822 1.822 0.003 0 0.006 0 0.009-0h28.643c0.637-0.001 1.197-0.328 1.524-0.823l0.004-0.007c0.189-0.281 0.301-0.627 0.301-0.999 0-0.267-0.058-0.521-0.162-0.749l0.005 0.011z"></path> </symbol> <symbol id="icon-close" viewBox="0 0 32 32"> <path stroke-width="2.9243" stroke-miterlimit="10" stroke-linecap="butt" stroke-linejoin="miter" d="M1.379 1.379l29.243 29.243"></path> <path stroke-width="2.9243" stroke-miterlimit="10" stroke-linecap="butt" stroke-linejoin="miter" d="M30.622 1.379l-29.243 29.243"></path> </symbol> <symbol id="icon-download-arrow" viewBox="0 0 32 32"> <path d="M24.619 19.433c0.651-0.651 1.676-0.651 2.327 0 0.629 0.651 0.629 1.676 0 2.327l-9.75 9.752c-0.302 0.302-0.721 0.488-1.186 0.488s-0.884-0.186-1.188-0.488l-9.75-9.752c-0.651-0.651-0.651-1.676 0-2.327s1.676-0.651 2.327 0l6.959 6.982v-24.786c-0.001-0.908 0.743-1.629 1.651-1.629s1.629 0.721 1.629 1.629v24.785l6.982-6.981z"></path> </symbol> <symbol id="icon-arrow" viewBox="0 0 32 32"> <path d="M24.464 17.584l-13.759 13.759c-0.875 0.876-2.294 0.876-3.169 0s-0.875-2.294 0-3.169l12.175-12.175-12.175-12.174c-0.875-0.875-0.875-2.294 0-3.169s2.294-0.875 3.169 0l13.759 13.759c0.437 0.438 0.656 1.011 0.656 1.584s-0.219 1.147-0.656 1.584z"></path> </symbol> <symbol id="icon-n10" viewBox="0 0 47 32"> <path d="M30.68 24.32c-4.595 0-8.32-3.725-8.32-8.32s3.725-8.32 8.32-8.32c4.595 0 8.32 3.725 8.32 8.32s-3.725 8.32-8.32 8.32zM30.68-0c-8.837 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16z"></path> <path d="M0 30.678h7.994v-29.131h-7.994z"></path> </symbol> <symbol id="icon-facebook" viewBox="0 0 15 32"> <path d="M3.308 32v-16.63h-3.308v-4.788h3.308v-3.215c0-1.417 0.036-3.603 1.065-4.958 1.086-1.434 2.574-2.408 5.136-2.408 4.173 0 5.93 0.595 5.93 0.595l-0.828 4.901c0 0-1.379-0.399-2.664-0.399-1.287 0-2.438 0.461-2.438 1.748v3.737h5.276l-0.369 4.788h-4.907v16.63z"></path> </symbol> <symbol id="icon-instagram" viewBox="0 0 32 32"> <path d="M16.001-0.001c-4.348 0-4.89 0.018-6.598 0.098v0c-1.702 0.075-2.867 0.348-3.882 0.743v0c-1.054 0.408-1.947 0.955-2.835 1.845v0c-0.889 0.889-1.435 1.783-1.847 2.833v0c-0.394 1.019-0.666 2.18-0.743 3.884v0c-0.077 1.707-0.096 2.252-0.096 6.596v0c0 4.346 0.018 4.892 0.096 6.6v0c0.077 1.702 0.35 2.865 0.743 3.882v0c0.412 1.052 0.959 1.947 1.847 2.833v0c0.889 0.889 1.781 1.437 2.835 1.847v0c1.016 0.396 2.18 0.666 3.882 0.743v0c1.707 0.077 2.25 0.096 6.598 0.096v0c4.344 0 4.889-0.018 6.596-0.096v0c1.704-0.077 2.866-0.348 3.884-0.743v0c1.052-0.41 1.945-0.959 2.835-1.847v0c0.889-0.887 1.437-1.781 1.844-2.833v0c0.396-1.017 0.666-2.18 0.745-3.882v0c0.077-1.707 0.096-2.254 0.096-6.6v0c0-4.344-0.018-4.889-0.096-6.596v0c-0.079-1.704-0.35-2.865-0.745-3.884v0c-0.407-1.051-0.955-1.945-1.844-2.833v0c-0.89-0.89-1.783-1.437-2.835-1.845v0c-1.017-0.396-2.18-0.668-3.884-0.743v0c-1.707-0.079-2.252-0.098-6.596-0.098zM9.534 29.025c-1.56-0.072-2.407-0.333-2.97-0.552v0c-0.747-0.289-1.281-0.638-1.84-1.198v0c-0.559-0.559-0.907-1.093-1.198-1.838v0c-0.219-0.565-0.478-1.411-0.552-2.971v0c-0.075-1.687-0.092-2.195-0.092-6.467v0c0-4.272 0.017-4.776 0.092-6.463v0c0.074-1.56 0.333-2.408 0.552-2.973v0c0.291-0.745 0.638-1.279 1.198-1.838v0c0.559-0.561 1.093-0.907 1.84-1.196v0c0.563-0.221 1.409-0.48 2.97-0.552v0c1.687-0.077 2.195-0.094 6.467-0.094v0c4.272 0 4.776 0.017 6.465 0.094v0c1.56 0.072 2.407 0.331 2.971 0.552v0c0.747 0.289 1.279 0.635 1.838 1.196v0c0.561 0.559 0.907 1.093 1.198 1.838v0c0.217 0.565 0.478 1.413 0.55 2.973v0c0.079 1.687 0.096 2.191 0.096 6.463v0c0 4.272-0.017 4.78-0.096 6.467v0c-0.072 1.56-0.333 2.407-0.55 2.971v0c-0.291 0.745-0.637 1.279-1.198 1.838v0c-0.559 0.559-1.091 0.909-1.838 1.198v0c-0.565 0.219-1.411 0.48-2.971 0.552v0c-1.689 0.075-2.193 0.092-6.465 0.092v0c-4.274 0-4.78-0.017-6.467-0.092zM22.621 7.458c0 1.062 0.859 1.921 1.921 1.921v0c1.060 0 1.919-0.859 1.919-1.921v0c0-1.060-0.859-1.919-1.919-1.919v0c-1.062 0-1.921 0.859-1.921 1.919zM7.784 15.999c0 4.539 3.678 8.217 8.217 8.217v0c4.537 0 8.217-3.678 8.217-8.217v0c0-4.537-3.68-8.217-8.217-8.217v0c-4.539 0-8.217 3.68-8.217 8.217zM10.667 15.999c0-2.946 2.388-5.334 5.334-5.334v0c2.946 0 5.334 2.388 5.334 5.334v0c0 2.946-2.388 5.334-5.334 5.334v0c-2.946 0-5.334-2.388-5.334-5.334z"></path> </symbol> <symbol id="icon-logo" viewBox="0 0 101 32"> <path d="M95.896 17.804c-0.317 1.555-1.172 3.109-2.647 3.879-0.615 0.343-1.331 0.425-2.031 0.411-1.516 0.001-3.039-0.022-4.558 0.007-0.010-3.922 0.034-7.844-0.027-11.76 1.527 0.042 3.054-0.006 4.581 0.020 1.449 0.037 2.82 0.831 3.648 1.985 1.156 1.551 1.377 3.603 1.034 5.458zM92.935 6.487c-2.134-0.412-4.323 0.144-6.299 0.946 0.069-2.474-0.020-4.957 0.049-7.433-1.198 0.213-2.335 0.787-3.095 1.735-1.15 1.44-1.509 3.334-1.522 5.125-0.003 6.268 0 12.532-0.003 18.804 3.109 0 6.211 0.004 9.313-0.010 2.025-0.014 4.090-0.547 5.72-1.755 1.64-1.195 2.706-3.049 3.128-4.997 0.559-2.593 0.373-5.405-0.921-7.763-1.252-2.401-3.652-4.193-6.37-4.651z"></path> <path d="M48.136 4.026c-0.513 1.192-0.366 2.499-0.366 3.772v18.014h4.391c0 0 0.103-16.839 0.122-25.221-1.907 0.379-3.467 1.639-4.147 3.435z"></path> <path d="M12.451 7.131c0.010 5.749-0.004 10.038 0 15.155-1.060-0.023-2.121-0.078-3.175-0.118-1.313-0.059-2.563-0.803-3.32-1.845-0.844-1.155-1.129-2.434-1.129-3.831 0-3.177-0.009-5.049 0-9.36h-4.824c0 0-0.011 6.472 0.013 9.797 0.042 2.359 0.63 4.772 2.368 6.504 1.702 1.692 4.212 2.23 6.563 2.269 2.779 0.019 5.555 0.168 8.329 0.178 0.006-6.307 0-18.748 0-18.748z"></path> <path d="M37.434 17.216c-0.178 1.564-0.969 3.105-2.285 4.025-0.761 0.553-1.706 0.84-2.65 0.844-1.46 0.014-2.924-0.014-4.386 0.014-0.014-3.922 0.036-7.844-0.024-11.76 1.729 0.042 3.454-0.010 5.184 0.022 1.213 0.057 2.298 0.803 2.99 1.753 1.076 1.456 1.376 3.343 1.17 5.101zM36.472 7.591c-1.313-0.507-2.724-0.46-4.129-0.46h-8.832c0.020 7.185 0 12.209 0.012 18.413 0.029 1.626 0.215 3.243 1.119 4.647 0.735 1.155 2.108 1.769 3.474 1.809-0.020-2.306 0.045-4.638-0.030-6.945 1.31 0.514 2.681 0.887 4.096 1.040 2.306 0.161 4.679-0.607 6.425-2.107 1.861-1.561 2.993-3.864 3.277-6.237 0.241-2.056 0.011-4.098-0.836-6.004-0.859-1.94-2.54-3.435-4.575-4.157z"></path> <path d="M71.197 22.095c-1.69-0.020-3.38 0.006-5.069-0.014-1.485-0.023-2.743-1.080-3.432-2.309-0.859-1.537-1.067-3.38-0.722-5.089 0.313-1.544 1.241-3.021 2.678-3.777 0.638-0.353 1.363-0.536 2.091-0.549 1.492-0.017 2.981 0.020 4.466-0.017-0.029 3.913-0.004 7.838-0.011 11.755zM66.971 6.758c-2.309 0.046-4.697 0.615-6.512 2.081-1.791 1.412-2.802 3.602-3.029 5.816-0.276 2.519 0.079 5.227 1.538 7.377 1.123 1.67 2.937 2.915 4.91 3.383 0.997 0.243 2.025 0.396 3.050 0.396h8.88c0 0-0.049-12.699 0-19.005-2.947 0.046-5.888-0.089-8.837-0.049z"></path> </symbol> <symbol id="icon-twitter" viewBox="0 0 39 32"> <path d="M39.375 3.788c-1.447 0.642-3.005 1.077-4.639 1.271 1.669-0.998 2.951-2.582 3.55-4.468-1.56 0.927-3.286 1.597-5.131 1.958-1.47-1.569-3.571-2.549-5.896-2.549-4.458 0-8.075 3.617-8.075 8.078 0 0.633 0.069 1.248 0.208 1.84-6.714-0.337-12.663-3.55-16.652-8.44-0.693 1.197-1.093 2.584-1.093 4.063 0 2.801 1.426 5.274 3.594 6.723-1.324-0.039-2.57-0.407-3.661-1.008v0.099c0 3.915 2.785 7.181 6.483 7.92-0.679 0.19-1.391 0.284-2.129 0.284-0.52 0-1.028-0.049-1.518-0.143 1.024 3.208 4.008 5.547 7.544 5.607-2.764 2.168-6.249 3.46-10.033 3.46-0.652 0-1.297-0.037-1.928-0.111 3.575 2.288 7.823 3.629 12.383 3.629 14.861 0 22.985-12.309 22.985-22.985 0-0.351-0.007-0.703-0.021-1.045 1.579-1.142 2.949-2.563 4.028-4.183z"></path> </symbol> <symbol id="icon-vk" viewBox="0 0 56 32"> <path d="M50.023 22.098c4.487 4.166 5.416 6.192 5.569 6.444 1.858 3.082-2.059 3.322-2.059 3.322l-7.491 0.107c0 0-1.609 0.316-3.729-1.138-2.8-1.922-5.443-6.923-7.502-6.27-2.088 0.661-2.021 5.162-2.021 5.162s0.013 0.961-0.461 1.47c-0.519 0.557-1.531 0.669-1.531 0.669h-3.355c0 0-7.395 0.444-13.911-6.337-7.105-7.397-13.378-22.077-13.378-22.077s-0.364-0.964 0.029-1.43c0.442-0.522 1.647-0.557 1.647-0.557l8.013-0.054c0 0 0.755 0.129 1.296 0.525 0.447 0.327 0.696 0.94 0.696 0.94s1.296 3.274 3.009 6.238c3.349 5.788 4.91 7.052 6.045 6.433 1.657-0.905 1.159-8.179 1.159-8.179s0.029-2.64-0.833-3.818c-0.669-0.91-1.93-1.175-2.49-1.25-0.45-0.059 0.289-1.108 1.248-1.577 1.443-0.707 3.992-0.747 7.001-0.715 2.345 0.021 3.020 0.169 3.936 0.391 2.763 0.667 1.826 3.242 1.826 9.424 0 1.979-0.356 4.763 1.071 5.687 0.613 0.396 2.115 0.059 5.871-6.318 1.78-3.023 3.116-6.578 3.116-6.578s0.289-0.632 0.744-0.905c0.461-0.276 1.087-0.19 1.087-0.19l8.436-0.054c0 0 2.533-0.303 2.942 0.841 0.434 1.202-0.945 4.005-4.391 8.599-5.66 7.539-6.289 6.835-1.59 11.194z"></path> </symbol> <symbol id="icon-x" viewBox="0 0 33 32"> <path d="M24.712 0.25l-8.385 8.217-8.385-8.217-7.687 7.533 8.385 8.217-8.385 8.217 7.686 7.533 8.385-8.217 8.385 8.217 7.686-7.533-8.385-8.217 8.385-8.217z"></path> </symbol> <symbol id="icon-arrow-right" viewBox="0 0 54 32"> <path fill="none" stroke="currentColor" stroke-width="3.0855" stroke-miterlimit="10" stroke-linecap="butt" stroke-linejoin="miter" d="M0 16.001h51.429M36.882 30.547l14.547-14.547-14.547-14.546"></path> </symbol> </defs></svg>'
})
new Vue({
    el: '#main-parallax-svg',
    template: '<svg class="main-svg" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><symbol id="icon-number_0" viewBox="0 0 32 32"><path class="main-svg__item main-svg__item--down" fill="#161616" d="M25.363 3.892c0.001 0.001 0.002 0.001 0.004 0.002 0.004 0.002 0.008 0.004 0.012 0.006-0.005-0.003-0.010-0.006-0.016-0.008zM25.144 3.782c0.007 0.003 0.014 0.006 0.020 0.010 0.004 0.002 0.008 0.004 0.012 0.006-0.011-0.005-0.022-0.011-0.032-0.016zM24.118 3.342c0.004 0.001 0.008 0.003 0.011 0.004s0.006 0.002 0.009 0.003c-0.007-0.002-0.013-0.005-0.020-0.008zM23.581 21.593c0.034-0.046 0.068-0.093 0.101-0.14 0-0 0-0 0-0-0.033 0.047-0.067 0.094-0.102 0.141zM23.296 3.074c0 0 0 0 0 0s0 0 0 0zM22.908 22.404c0.052-0.055 0.103-0.112 0.153-0.168v-0c-0.050 0.057-0.101 0.113-0.153 0.168zM22.369 22.934c0-0 0-0 0-0 0.056-0.050 0.111-0.101 0.165-0.153-0.055 0.052-0.11 0.103-0.166 0.153zM22.182 23.098c0.051-0.044 0.102-0.088 0.152-0.132 0-0 0-0 0-0-0.050 0.045-0.101 0.089-0.152 0.133zM22.187 2.818c0.001 0 0.003 0.001 0.004 0.001-0.004-0.001-0.008-0.001-0.012-0.002 0.003 0 0.006 0.001 0.008 0.001zM21.929 2.775c0 0 0 0 0 0s0 0 0.001 0-0.001-0-0.001-0zM21.034 2.672c0.003 0 0.005 0 0.007 0s0.003 0 0.005 0c-0.004-0-0.008-0.001-0.012-0.001zM20.773 2.655c0 0 0.001 0 0.001 0s0.002 0 0.002 0c-0.001-0-0.002-0-0.003-0zM20.498 13.889c-0.001 0.022-0.002 0.043-0.002 0.065-0.001 0.043-0.003 0.086-0.005 0.129-0.001 0.026-0.003 0.052-0.005 0.077-0.002 0.039-0.004 0.077-0.007 0.116-0.002 0.027-0.004 0.055-0.007 0.082-0.003 0.037-0.006 0.074-0.009 0.11-0.003 0.028-0.006 0.056-0.009 0.084-0.004 0.036-0.007 0.072-0.011 0.107-0.003 0.029-0.007 0.057-0.011 0.086-0.004 0.035-0.009 0.070-0.014 0.105-0.004 0.029-0.009 0.058-0.013 0.087-0.005 0.034-0.010 0.069-0.016 0.103-0.005 0.029-0.010 0.059-0.015 0.088-0.006 0.034-0.012 0.067-0.018 0.101-0.005 0.030-0.012 0.059-0.017 0.088-0.006 0.033-0.013 0.066-0.020 0.099-0.006 0.030-0.013 0.059-0.019 0.089-0.007 0.033-0.014 0.065-0.022 0.098-0.007 0.030-0.014 0.059-0.021 0.088-0.008 0.032-0.016 0.065-0.024 0.097-0.007 0.029-0.015 0.059-0.023 0.088-0.008 0.032-0.017 0.064-0.026 0.096-0.008 0.029-0.017 0.058-0.025 0.088-0.009 0.032-0.018 0.064-0.028 0.095-0.009 0.029-0.018 0.058-0.027 0.087-0.010 0.031-0.020 0.063-0.030 0.094-0.009 0.029-0.019 0.058-0.029 0.087-0.010 0.031-0.021 0.062-0.031 0.093-0.010 0.029-0.020 0.058-0.031 0.087-0.011 0.032-0.023 0.063-0.034 0.095-0.008 0.020-0.015 0.041-0.023 0.061-0.014 0.036-0.027 0.071-0.041 0.107-0.008 0.021-0.017 0.043-0.025 0.064-0.014 0.035-0.028 0.070-0.043 0.104-0.009 0.021-0.017 0.041-0.026 0.062-0.016 0.037-0.032 0.074-0.048 0.111-0.008 0.017-0.015 0.035-0.023 0.052-0.024 0.054-0.049 0.107-0.074 0.161-0 0-0 0-0 0.001-0.025 0.054-0.051 0.107-0.077 0.16-0.009 0.017-0.017 0.034-0.026 0.051-0.018 0.036-0.036 0.072-0.055 0.107-0.010 0.020-0.021 0.040-0.031 0.059-0.014 0.027-0.029 0.055-0.044 0.082-0.038 0.069-0.076 0.139-0.115 0.207-0.001 0.002-0.002 0.004-0.003 0.006-0.040 0.070-0.082 0.139-0.124 0.208-0.011 0.018-0.023 0.037-0.034 0.055-0.036 0.058-0.073 0.116-0.11 0.173-0.008 0.012-0.015 0.024-0.023 0.035-0.044 0.067-0.089 0.133-0.135 0.198-0.012 0.017-0.024 0.034-0.036 0.051-0.034 0.047-0.067 0.094-0.102 0.141-0.013 0.018-0.026 0.036-0.039 0.053-0.046 0.061-0.092 0.122-0.139 0.182-0.002 0.002-0.003 0.004-0.005 0.006-0.046 0.058-0.092 0.115-0.139 0.172-0.014 0.017-0.029 0.034-0.043 0.051-0.037 0.044-0.075 0.088-0.113 0.131-0.014 0.016-0.027 0.031-0.041 0.047-0.050 0.057-0.101 0.113-0.153 0.169-0.008 0.009-0.016 0.017-0.024 0.025-0.044 0.047-0.090 0.094-0.135 0.14-0.016 0.016-0.032 0.032-0.048 0.048-0.042 0.042-0.085 0.084-0.128 0.126-0.012 0.012-0.025 0.024-0.037 0.036-0.055 0.052-0.11 0.103-0.166 0.154-0.012 0.011-0.024 0.021-0.035 0.031-0.050 0.045-0.101 0.089-0.152 0.133-0.015 0.013-0.031 0.026-0.046 0.039-0.061 0.051-0.123 0.102-0.185 0.151-0.009 0.007-0.018 0.014-0.027 0.021-0.055 0.043-0.111 0.086-0.167 0.128-0.017 0.012-0.033 0.025-0.050 0.037-0.064 0.047-0.129 0.094-0.194 0.139-0.048 0.033-0.096 0.066-0.144 0.098-0.014 0.009-0.028 0.018-0.042 0.027-0.035 0.023-0.070 0.045-0.105 0.067-0.019 0.012-0.038 0.023-0.056 0.035-0.031 0.019-0.062 0.038-0.093 0.057-0.020 0.012-0.041 0.024-0.062 0.036-0.030 0.017-0.060 0.035-0.089 0.052-0.021 0.012-0.043 0.024-0.064 0.036-0.030 0.017-0.059 0.033-0.089 0.049-0.022 0.012-0.043 0.023-0.065 0.035-0.030 0.016-0.060 0.032-0.091 0.047-0.021 0.011-0.043 0.022-0.064 0.033-0.031 0.016-0.063 0.031-0.095 0.047-0.021 0.010-0.041 0.020-0.062 0.030-0.048 0.023-0.097 0.045-0.146 0.067-0.006 0.003-0.012 0.005-0.018 0.008-0.044 0.020-0.088 0.039-0.133 0.057-0.015 0.006-0.030 0.013-0.045 0.019-0.039 0.016-0.078 0.032-0.117 0.047-0.013 0.005-0.025 0.010-0.038 0.015-0.050 0.020-0.101 0.039-0.152 0.057-0.010 0.004-0.020 0.007-0.031 0.011-0.042 0.015-0.083 0.029-0.125 0.043-0.016 0.005-0.031 0.010-0.047 0.016-0.042 0.014-0.083 0.027-0.125 0.040-0.011 0.003-0.022 0.007-0.033 0.010-0.052 0.016-0.104 0.031-0.156 0.045-0.013 0.004-0.026 0.007-0.039 0.011-0.041 0.011-0.081 0.022-0.122 0.032-0.016 0.004-0.032 0.008-0.048 0.012-0.046 0.011-0.092 0.022-0.139 0.033-0.007 0.002-0.014 0.003-0.022 0.005-0.053 0.012-0.106 0.023-0.16 0.033-0.015 0.003-0.029 0.006-0.044 0.008-0.041 0.008-0.081 0.015-0.122 0.022-0.016 0.003-0.031 0.005-0.047 0.008-0.054 0.009-0.108 0.017-0.162 0.025-0.049 0.007-0.098 0.013-0.146 0.019-0.015 0.002-0.031 0.003-0.046 0.005-0.034 0.004-0.067 0.007-0.101 0.011-0.017 0.002-0.035 0.003-0.052 0.005-0.033 0.003-0.066 0.006-0.098 0.008-0.016 0.001-0.032 0.002-0.048 0.003-0.041 0.003-0.082 0.005-0.122 0.007-0.007 0-0.014 0.001-0.022 0.001-0.048 0.002-0.095 0.004-0.143 0.005-0.014 0-0.027 0-0.041 0.001-0.034 0-0.068 0.001-0.102 0.001-0.017 0-0.033-0-0.050-0-0.009-0-0.017-0-0.026-0-0.732-1.093-1.157-2.468-1.154-4.010 0.008-4.18 3.154-8.011 7.027-8.555 0.338-0.048 0.671-0.068 0.997-0.064 0.732 1.093 1.157 2.467 1.155 4.010-0 0.065-0.001 0.13-0.003 0.194zM15.905 24.766c0.007 0.002 0.015 0.004 0.022 0.005s0.015 0.004 0.022 0.005c-0.015-0.004-0.029-0.007-0.044-0.011zM11.377 5.843c0.083-0.066 0.166-0.131 0.25-0.194 0 0 0-0 0-0-0.084 0.064-0.168 0.129-0.25 0.195 0 0 0-0 0-0zM11.888 5.454c0-0 0-0 0-0-0.036 0.026-0.071 0.053-0.107 0.079 0.035-0.026 0.071-0.053 0.107-0.079zM11.964 5.399c0.079-0.057 0.157-0.113 0.237-0.168 0-0 0-0 0-0-0.080 0.055-0.159 0.112-0.238 0.168 0-0 0-0 0-0zM14.383 3.965c0.030-0.014 0.061-0.028 0.092-0.042-0.031 0.014-0.062 0.028-0.092 0.042 0 0 0-0 0-0zM14.697 3.821c0.002-0.001 0.005-0.002 0.007-0.003-0.002 0.001-0.005 0.002-0.007 0.003zM15.039 3.674c0.054-0.022 0.108-0.044 0.162-0.065-0.054 0.022-0.108 0.043-0.162 0.065 0-0 0-0 0-0zM15.338 3.554c0.097-0.038 0.195-0.074 0.293-0.11 0 0 0 0 0 0-0.098 0.036-0.196 0.072-0.293 0.11zM16.261 3.233c0-0 0-0 0-0-0.015 0.005-0.029 0.009-0.043 0.014 0.014-0.005 0.029-0.009 0.043-0.014zM16.697 3.106c0.078-0.021 0.157-0.042 0.236-0.062h0c-0.079 0.020-0.158 0.041-0.236 0.062 0 0 0-0 0-0zM17.332 2.948c0.090-0.020 0.181-0.039 0.272-0.057-0.091 0.018-0.182 0.037-0.272 0.057 0-0 0-0 0-0zM17.724 2.868c0.034-0.006 0.068-0.012 0.102-0.018-0.034 0.006-0.068 0.012-0.102 0.019 0-0 0-0 0-0zM18.362 2.762c-0.104 0.015-0.208 0.031-0.312 0.048 0.104-0.017 0.208-0.033 0.312-0.048zM19.584 2.649c0.001-0 0.002-0 0.003-0-0.001 0-0.003 0-0.004 0 0 0 0.001-0 0.001-0zM19.858 2.64c0.001-0 0.002-0 0.002-0-0.002 0-0.004 0-0.006 0 0.001-0 0.002-0 0.003-0zM10.568 6.528c0 0 0-0 0-0 0.079-0.072 0.159-0.142 0.239-0.212 0-0 0-0 0-0-0.081 0.070-0.16 0.141-0.24 0.213zM10.154 6.917c0.039-0.037 0.077-0.075 0.116-0.112 0-0 0-0 0-0-0.039 0.037-0.078 0.075-0.117 0.113zM9.538 7.543c0-0 0-0 0-0 0.072-0.077 0.145-0.153 0.218-0.229 0-0 0-0 0-0-0.073 0.076-0.146 0.152-0.218 0.23zM8.846 8.332c0-0 0-0 0-0 0.051-0.062 0.103-0.123 0.155-0.184-0.052 0.061-0.104 0.123-0.155 0.185zM8.593 8.646c0-0 0-0 0-0 0.066-0.084 0.133-0.167 0.201-0.25 0-0 0-0 0-0-0.068 0.083-0.135 0.166-0.201 0.25zM8.163 9.214c0-0 0-0.001 0.001-0.001 0.060-0.082 0.12-0.164 0.181-0.245 0-0 0-0.001 0.001-0.001-0.061 0.082-0.122 0.164-0.183 0.247zM7.969 9.488l0-0c0.022-0.032 0.045-0.063 0.067-0.095-0.022 0.032-0.045 0.063-0.067 0.095zM7.772 9.778c0-0 0-0 0-0 0.008-0.012 0.016-0.024 0.025-0.036-0.008 0.012-0.017 0.024-0.025 0.037zM7.556 10.11c0-0 0-0 0-0 0.017-0.026 0.034-0.052 0.050-0.078-0.017 0.026-0.034 0.052-0.051 0.078zM7.172 10.743c0-0 0-0.001 0-0.001 0.052-0.091 0.106-0.181 0.16-0.27 0-0 0-0 0-0-0.054 0.090-0.108 0.18-0.16 0.271zM7.006 11.037c0-0 0-0 0-0 0.031-0.056 0.063-0.112 0.095-0.168-0.032 0.056-0.064 0.112-0.095 0.168zM6.853 11.321c0-0 0-0 0-0 0.036-0.068 0.073-0.137 0.11-0.205 0-0 0-0 0-0.001-0.037 0.068-0.074 0.137-0.11 0.205zM6.347 12.357c0-0 0-0 0-0 0.046-0.104 0.094-0.207 0.142-0.309 0-0 0-0 0-0.001-0.049 0.103-0.096 0.206-0.142 0.31zM6.081 12.982c0.026-0.064 0.052-0.128 0.079-0.192 0-0 0-0 0-0.001-0.027 0.064-0.053 0.128-0.079 0.192zM5.84 13.618c0-0 0-0.001 0-0.001 0.008-0.023 0.017-0.046 0.025-0.069-0.009 0.024-0.017 0.047-0.026 0.071zM5.738 13.91c0.014-0.042 0.028-0.084 0.042-0.125 0-0 0-0 0-0.001-0.014 0.042-0.028 0.084-0.042 0.126zM5.607 14.313c0-0.001 0-0.001 0.001-0.002 0.010-0.033 0.021-0.066 0.031-0.098-0.010 0.033-0.021 0.067-0.031 0.1zM5.517 14.613c0.013-0.044 0.025-0.089 0.038-0.133 0-0 0-0 0-0.001-0.013 0.044-0.026 0.089-0.039 0.133zM5.438 14.895c0.006-0.021 0.011-0.042 0.017-0.062 0-0 0-0 0-0-0.006 0.021-0.011 0.042-0.017 0.062zM5.156 16.098l0.001-0.005c0.012-0.063 0.024-0.127 0.038-0.19 0-0 0-0.001 0-0.001-0.014 0.065-0.026 0.131-0.039 0.196zM5.043 16.745c0.006-0.039 0.012-0.079 0.018-0.118 0-0 0-0 0-0-0.006 0.039-0.012 0.079-0.018 0.118zM4.937 17.565c0-0.001 0-0.001 0-0.002 0.007-0.068 0.014-0.136 0.022-0.204 0-0 0-0 0-0-0.008 0.069-0.015 0.138-0.022 0.206zM4.905 17.902c0.005-0.058 0.009-0.117 0.015-0.175 0-0 0-0 0-0-0.005 0.058-0.010 0.117-0.015 0.176zM4.858 18.727c0-0.004 0-0.009 0-0.013 0.002-0.066 0.005-0.132 0.007-0.198-0.003 0.070-0.005 0.14-0.008 0.211zM25.542 3.987c0.002 0.001 0.005 0.003 0.007 0.004 0.006 0.003 0.012 0.006 0.017 0.009l-4.848-2.638c-0.004-0.002-0.009-0.005-0.013-0.007-0.062-0.034-0.125-0.067-0.187-0.099-0.024-0.012-0.048-0.024-0.071-0.036-0.044-0.022-0.087-0.045-0.131-0.066-0.003-0.001-0.005-0.003-0.008-0.004-0.012-0.006-0.024-0.011-0.036-0.017-0.063-0.031-0.126-0.061-0.19-0.090-0.026-0.012-0.052-0.024-0.078-0.035-0.054-0.025-0.109-0.049-0.163-0.073-0.027-0.012-0.053-0.023-0.080-0.034-0.062-0.026-0.123-0.052-0.185-0.077-0.018-0.007-0.036-0.015-0.054-0.022-0.080-0.032-0.16-0.063-0.241-0.093-0.020-0.008-0.041-0.015-0.061-0.022-0.061-0.022-0.123-0.044-0.185-0.066-0.028-0.010-0.055-0.019-0.083-0.028-0.057-0.019-0.115-0.038-0.172-0.056-0.027-0.008-0.054-0.017-0.080-0.025-0.072-0.022-0.144-0.044-0.217-0.065-0.011-0.003-0.023-0.007-0.034-0.010-0.084-0.024-0.168-0.046-0.252-0.068-0.007-0.002-0.013-0.004-0.020-0.005-0.019-0.005-0.037-0.009-0.056-0.014-0.059-0.015-0.118-0.029-0.177-0.043-0.030-0.007-0.060-0.014-0.090-0.021-0.057-0.013-0.115-0.025-0.172-0.037-0.029-0.006-0.057-0.012-0.086-0.018-0.069-0.014-0.139-0.027-0.208-0.040-0.016-0.003-0.032-0.006-0.048-0.009-0.086-0.015-0.172-0.029-0.258-0.043-0.024-0.004-0.048-0.007-0.071-0.010-0.063-0.009-0.127-0.018-0.19-0.027-0.031-0.004-0.061-0.008-0.092-0.012-0.059-0.007-0.118-0.014-0.177-0.021-0.030-0.003-0.061-0.007-0.091-0.010-0.066-0.007-0.133-0.013-0.2-0.018-0.022-0.002-0.044-0.004-0.067-0.006-0.089-0.007-0.177-0.013-0.267-0.018-0.020-0.001-0.041-0.002-0.061-0.003-0.069-0.003-0.139-0.006-0.209-0.009-0.031-0.001-0.062-0.002-0.093-0.002-0.061-0.002-0.122-0.003-0.183-0.003-0.032-0-0.064-0.001-0.096-0.001-0.065-0-0.131 0.001-0.196 0.002-0.026 0-0.052 0-0.079 0.001-0.091 0.002-0.183 0.005-0.274 0.009-0.014 0.001-0.028 0.002-0.041 0.002-0.078 0.004-0.157 0.008-0.235 0.013-0.031 0.002-0.061 0.004-0.092 0.007-0.063 0.005-0.126 0.010-0.19 0.015-0.033 0.003-0.066 0.006-0.099 0.009-0.065 0.006-0.13 0.013-0.194 0.020-0.029 0.003-0.059 0.006-0.088 0.010-0.094 0.011-0.187 0.023-0.281 0.036-0.104 0.015-0.209 0.031-0.312 0.048-0.030 0.005-0.060 0.010-0.091 0.015-0.079 0.014-0.157 0.028-0.236 0.043-0.028 0.005-0.056 0.011-0.085 0.016-0.103 0.020-0.205 0.042-0.307 0.064-0.014 0.003-0.028 0.007-0.042 0.010-0.089 0.020-0.178 0.041-0.266 0.063-0.031 0.008-0.061 0.015-0.092 0.023-0.079 0.020-0.157 0.041-0.235 0.062-0.025 0.007-0.050 0.013-0.075 0.020-0.1 0.028-0.2 0.057-0.3 0.087-0.021 0.006-0.042 0.013-0.063 0.020-0.080 0.025-0.16 0.050-0.24 0.077-0.030 0.010-0.060 0.020-0.091 0.030-0.080 0.027-0.16 0.055-0.24 0.083-0.020 0.007-0.040 0.014-0.060 0.021-0.098 0.035-0.195 0.072-0.292 0.11-0.025 0.010-0.049 0.019-0.074 0.029-0.075 0.030-0.15 0.060-0.224 0.090-0.029 0.012-0.058 0.024-0.087 0.036-0.085 0.036-0.169 0.072-0.253 0.11-0.012 0.005-0.024 0.010-0.037 0.016-0.081 0.036-0.162 0.073-0.243 0.111-0.012 0.006-0.024 0.012-0.037 0.018-0.040 0.019-0.080 0.039-0.12 0.058-0.061 0.029-0.121 0.059-0.181 0.089-0.042 0.021-0.083 0.042-0.125 0.064-0.058 0.030-0.116 0.060-0.174 0.091-0.042 0.022-0.084 0.045-0.125 0.067-0.057 0.031-0.115 0.063-0.172 0.095-0.041 0.023-0.082 0.046-0.123 0.069-0.058 0.033-0.115 0.067-0.173 0.1-0.039 0.023-0.079 0.046-0.118 0.070-0.060 0.036-0.12 0.073-0.179 0.11-0.036 0.022-0.072 0.044-0.108 0.067-0.068 0.043-0.136 0.087-0.203 0.131-0.026 0.017-0.053 0.034-0.080 0.052-0.092 0.061-0.184 0.123-0.274 0.185-0.002 0.001-0.004 0.003-0.005 0.004-0.008 0.005-0.015 0.011-0.023 0.016-0.079 0.055-0.158 0.111-0.237 0.168-0.025 0.018-0.050 0.037-0.075 0.055-0.066 0.049-0.132 0.098-0.198 0.147-0.021 0.016-0.042 0.031-0.063 0.047-0.084 0.064-0.167 0.129-0.25 0.194-0.017 0.013-0.033 0.027-0.050 0.040-0.067 0.054-0.134 0.108-0.201 0.163-0.024 0.020-0.049 0.041-0.073 0.061-0.067 0.056-0.134 0.113-0.201 0.171-0.015 0.013-0.030 0.026-0.045 0.039-0.070 0.061-0.14 0.123-0.209 0.185-0.010 0.009-0.019 0.018-0.029 0.027-0.018 0.017-0.037 0.033-0.055 0.050-0.064 0.058-0.128 0.117-0.191 0.177-0.018 0.017-0.036 0.033-0.054 0.050-0.076 0.072-0.151 0.145-0.226 0.218-0.015 0.015-0.030 0.030-0.045 0.045-0.063 0.062-0.125 0.125-0.187 0.189-0.018 0.019-0.036 0.037-0.055 0.056-0.073 0.076-0.146 0.152-0.218 0.229-0.012 0.012-0.023 0.025-0.034 0.037-0.063 0.067-0.125 0.135-0.186 0.204-0.018 0.020-0.036 0.040-0.054 0.060-0.014 0.016-0.028 0.031-0.042 0.047-0.056 0.064-0.112 0.128-0.168 0.193-0.007 0.008-0.014 0.016-0.021 0.025-0.063 0.074-0.125 0.148-0.187 0.223-0.018 0.021-0.035 0.042-0.052 0.064-0.068 0.083-0.135 0.166-0.201 0.25-0.002 0.003-0.005 0.006-0.007 0.010-0.064 0.081-0.127 0.163-0.189 0.246-0.017 0.022-0.034 0.045-0.051 0.067-0.061 0.081-0.122 0.163-0.181 0.245-0.004 0.005-0.007 0.010-0.011 0.015-0.049 0.068-0.097 0.136-0.145 0.204-0.013 0.019-0.026 0.037-0.038 0.056-0.018 0.026-0.036 0.051-0.053 0.077-0.049 0.071-0.097 0.142-0.144 0.213-0.014 0.021-0.028 0.041-0.041 0.062-0.059 0.089-0.117 0.179-0.175 0.27-0.013 0.021-0.026 0.042-0.040 0.063-0.046 0.073-0.091 0.146-0.136 0.219-0.016 0.026-0.032 0.053-0.048 0.079-0.054 0.090-0.107 0.18-0.16 0.27-0.002 0.004-0.004 0.007-0.006 0.011-0.054 0.094-0.107 0.189-0.16 0.284-0.015 0.026-0.029 0.053-0.043 0.079-0.018 0.033-0.036 0.065-0.053 0.098-0.019 0.036-0.038 0.071-0.056 0.107-0.020 0.038-0.040 0.075-0.060 0.113-0.036 0.069-0.071 0.138-0.106 0.208-0.016 0.032-0.033 0.065-0.049 0.097-0.051 0.102-0.1 0.204-0.149 0.307-0 0-0 0.001-0 0.001-0.048 0.103-0.096 0.206-0.142 0.309-0.015 0.034-0.030 0.068-0.045 0.101-0.031 0.071-0.062 0.142-0.093 0.213-0.017 0.040-0.033 0.080-0.050 0.12-0.028 0.066-0.055 0.133-0.082 0.2-0.017 0.041-0.033 0.083-0.049 0.124-0.027 0.068-0.053 0.136-0.078 0.204-0.015 0.040-0.030 0.079-0.045 0.119-0.006 0.015-0.012 0.031-0.017 0.046-0.016 0.044-0.031 0.089-0.047 0.133-0.020 0.056-0.040 0.112-0.060 0.168-0.020 0.059-0.040 0.118-0.060 0.177-0.019 0.056-0.038 0.113-0.056 0.169-0.019 0.060-0.038 0.12-0.056 0.179-0.018 0.057-0.035 0.113-0.053 0.17-0.018 0.060-0.035 0.121-0.053 0.182-0.016 0.057-0.033 0.113-0.049 0.17-0.017 0.061-0.033 0.122-0.049 0.184-0.015 0.057-0.030 0.114-0.045 0.171-0.016 0.062-0.030 0.124-0.045 0.186-0.014 0.057-0.028 0.114-0.041 0.171-0.014 0.062-0.028 0.125-0.041 0.188-0.013 0.057-0.025 0.114-0.037 0.171-0.013 0.063-0.025 0.127-0.038 0.19-0.011 0.057-0.023 0.114-0.033 0.171-0.012 0.064-0.023 0.128-0.034 0.193-0.010 0.057-0.020 0.114-0.029 0.171-0.011 0.065-0.020 0.13-0.030 0.196-0.008 0.056-0.017 0.113-0.025 0.169-0.009 0.066-0.017 0.133-0.026 0.199-0.007 0.056-0.015 0.111-0.021 0.167-0.008 0.068-0.015 0.136-0.022 0.204-0.006 0.055-0.012 0.109-0.017 0.164-0.007 0.070-0.012 0.141-0.018 0.211-0.004 0.053-0.009 0.106-0.013 0.159-0.005 0.074-0.009 0.148-0.013 0.222-0.003 0.050-0.006 0.099-0.009 0.149-0.004 0.082-0.006 0.164-0.009 0.246-0.001 0.042-0.004 0.084-0.005 0.127-0.003 0.124-0.005 0.249-0.005 0.373-0.010 5.178 2.487 9.373 6.256 11.423l4.848 2.638c-0.008-0.005-0.016-0.009-0.025-0.014 2.088 1.142 4.567 1.626 7.229 1.252 7.449-1.047 13.499-8.413 13.514-16.453 0.010-5.189-2.498-9.391-6.28-11.436z"></path><path class="main-svg__item main-svg__item--down" fill="#161616" d="M20.501 13.695c-0 0.065-0.001 0.13-0.003 0.194v0c-0 0.021-0.002 0.043-0.002 0.065v0c-0.001 0.043-0.003 0.086-0.005 0.129v0c-0.001 0.026-0.003 0.052-0.005 0.078v0c-0.002 0.039-0.004 0.077-0.007 0.115v0c-0.002 0.027-0.004 0.055-0.007 0.082v0c-0.003 0.037-0.006 0.074-0.009 0.11v0c-0.003 0.028-0.006 0.056-0.009 0.084v0c-0.004 0.036-0.007 0.072-0.011 0.107v0c-0.003 0.029-0.007 0.057-0.011 0.086v0c-0.004 0.035-0.009 0.070-0.014 0.105v0c-0.004 0.029-0.009 0.058-0.013 0.087v0c-0.005 0.034-0.010 0.069-0.016 0.103v0c-0.005 0.029-0.010 0.059-0.015 0.088v0c-0.006 0.034-0.012 0.067-0.018 0.101v0c-0.005 0.030-0.011 0.059-0.017 0.088v0c-0.006 0.033-0.013 0.066-0.020 0.099v0c-0.006 0.030-0.013 0.059-0.019 0.089v0c-0.007 0.033-0.014 0.065-0.022 0.098v0c-0.007 0.030-0.014 0.059-0.021 0.088v0c-0.008 0.032-0.016 0.065-0.024 0.097v0c-0.007 0.029-0.015 0.059-0.023 0.088v0c-0.008 0.032-0.017 0.064-0.026 0.096v0c-0.008 0.029-0.017 0.058-0.025 0.088v0c-0.009 0.032-0.018 0.064-0.028 0.095v0c-0.009 0.029-0.018 0.058-0.027 0.087v0c-0.010 0.031-0.020 0.063-0.030 0.094v0c-0.009 0.029-0.019 0.058-0.029 0.087v0c-0.010 0.031-0.021 0.062-0.031 0.093v0c-0.010 0.029-0.020 0.058-0.031 0.087v0c-0.011 0.032-0.023 0.063-0.034 0.095v0c-0.008 0.020-0.015 0.041-0.023 0.061v0c-0.014 0.036-0.027 0.071-0.041 0.107v0c-0.008 0.021-0.017 0.043-0.025 0.064v0c-0.014 0.035-0.028 0.070-0.043 0.104v0c-0.009 0.021-0.017 0.041-0.026 0.062v0c-0.016 0.037-0.032 0.074-0.048 0.111v0c-0.008 0.017-0.015 0.035-0.023 0.052v0c-0.024 0.054-0.049 0.107-0.074 0.161v0c-0 0-0 0-0 0.001v0c-0.025 0.054-0.051 0.107-0.077 0.16v0c-0.009 0.017-0.017 0.034-0.026 0.051v0c-0.018 0.036-0.036 0.072-0.055 0.107v0c-0.010 0.020-0.021 0.040-0.031 0.059v0c-0.014 0.027-0.029 0.055-0.044 0.082v0c-0.038 0.070-0.076 0.139-0.115 0.207v0c-0.001 0.002-0.002 0.004-0.003 0.006v0c-0.040 0.070-0.082 0.139-0.124 0.208v0c-0.011 0.018-0.023 0.037-0.034 0.055v0c-0.036 0.058-0.073 0.116-0.11 0.173v0c-0.008 0.012-0.015 0.024-0.023 0.035v0c-0.044 0.067-0.089 0.133-0.135 0.198v0c-0.012 0.017-0.024 0.034-0.036 0.051v0c-0.034 0.047-0.067 0.094-0.102 0.141v0c-0.013 0.018-0.026 0.036-0.039 0.053v0c-0.046 0.061-0.092 0.122-0.139 0.182v0c-0.002 0.002-0.003 0.004-0.005 0.006v0c-0.046 0.058-0.092 0.115-0.139 0.172v0c-0.014 0.017-0.029 0.034-0.043 0.051v0c-0.037 0.044-0.075 0.088-0.113 0.131v0c-0.014 0.016-0.027 0.031-0.041 0.047v0c-0.050 0.057-0.101 0.113-0.153 0.168v0c-0.008 0.009-0.016 0.017-0.024 0.025v0c-0.044 0.047-0.089 0.094-0.135 0.14v0c-0.016 0.016-0.032 0.032-0.048 0.048v0c-0.042 0.042-0.085 0.084-0.128 0.126v0c-0.013 0.012-0.025 0.024-0.037 0.036v0c-0.055 0.052-0.11 0.103-0.166 0.154v0c-0.012 0.011-0.024 0.021-0.035 0.031v0c-0.050 0.045-0.101 0.089-0.152 0.133v0c-0.015 0.013-0.031 0.026-0.046 0.039v0c-0.061 0.051-0.123 0.102-0.185 0.151v0c-0.009 0.007-0.018 0.014-0.027 0.021v0c-0.055 0.043-0.111 0.086-0.167 0.128v0c-0.017 0.012-0.033 0.025-0.050 0.037v0c-0.064 0.047-0.129 0.094-0.194 0.139v0c-0.048 0.033-0.096 0.066-0.144 0.098v0c-0.014 0.009-0.028 0.018-0.042 0.027v0c-0.035 0.023-0.070 0.045-0.105 0.067v0c-0.019 0.012-0.038 0.023-0.056 0.035v0c-0.031 0.019-0.062 0.038-0.093 0.057v0c-0.020 0.012-0.041 0.024-0.061 0.036v0c-0.030 0.017-0.060 0.035-0.089 0.052v0c-0.021 0.012-0.043 0.024-0.064 0.036v0c-0.030 0.017-0.059 0.033-0.089 0.049v0c-0.022 0.012-0.043 0.023-0.065 0.035v0c-0.030 0.016-0.060 0.032-0.091 0.047v0c-0.021 0.011-0.043 0.022-0.064 0.033v0c-0.031 0.016-0.063 0.031-0.095 0.047v0c-0.021 0.010-0.041 0.020-0.062 0.030v0c-0.048 0.023-0.097 0.045-0.146 0.067v0c-0.006 0.003-0.012 0.005-0.018 0.008v0c-0.044 0.020-0.088 0.039-0.133 0.057v0c-0.015 0.006-0.030 0.013-0.045 0.019v0c-0.039 0.016-0.078 0.032-0.117 0.047v0c-0.013 0.005-0.025 0.010-0.038 0.015v0c-0.050 0.020-0.101 0.039-0.152 0.057v0c-0.010 0.004-0.020 0.007-0.031 0.011v0c-0.042 0.015-0.083 0.029-0.125 0.043v0c-0.016 0.005-0.031 0.010-0.047 0.016v0c-0.042 0.014-0.083 0.027-0.125 0.040v0c-0.011 0.003-0.022 0.007-0.033 0.010v0c-0.052 0.016-0.104 0.031-0.156 0.045v0c-0.013 0.004-0.026 0.007-0.039 0.011v0c-0.041 0.011-0.081 0.022-0.122 0.032v0c-0.016 0.004-0.032 0.008-0.048 0.012v0c-0.046 0.011-0.092 0.022-0.139 0.033v0c-0.007 0.002-0.014 0.003-0.022 0.005v0c-0.053 0.012-0.106 0.023-0.16 0.033v0c-0.015 0.003-0.029 0.006-0.044 0.008v0c-0.041 0.008-0.081 0.015-0.122 0.022v0c-0.016 0.003-0.031 0.005-0.047 0.008v0c-0.054 0.009-0.108 0.017-0.162 0.025v0c-0.049 0.007-0.098 0.013-0.146 0.019v0c-0.015 0.002-0.031 0.003-0.046 0.005v0c-0.034 0.004-0.067 0.007-0.101 0.011v0c-0.017 0.002-0.034 0.003-0.052 0.005v0c-0.033 0.003-0.066 0.006-0.098 0.008v0c-0.016 0.001-0.032 0.002-0.048 0.003v0c-0.041 0.003-0.082 0.005-0.122 0.007v0c-0.007 0-0.014 0.001-0.022 0.001v0c-0.048 0.002-0.095 0.004-0.143 0.005v0c-0.014 0-0.027 0-0.041 0.001v0c-0.034 0-0.068 0.001-0.102 0.001v0c-0.017-0-0.033-0-0.050-0v0c-0.032-0-0.064-0.001-0.095-0.002v0c-0.016-0-0.032-0.001-0.048-0.001v0c-0.036-0.001-0.072-0.003-0.109-0.004v0c-0.011-0-0.021-0.001-0.032-0.001v0c-0.046-0.003-0.093-0.006-0.139-0.009v0c-0.011-0.001-0.023-0.002-0.034-0.003v0c-0.035-0.003-0.069-0.006-0.104-0.009v0c-0.016-0.002-0.032-0.003-0.048-0.005v0c-0.031-0.003-0.062-0.007-0.092-0.011v0c-0.016-0.002-0.032-0.004-0.048-0.006v0c-0.033-0.004-0.066-0.009-0.099-0.014v0c-0.012-0.002-0.024-0.003-0.037-0.005v0c-0.045-0.007-0.090-0.014-0.134-0.022v0c-0.008-0.002-0.017-0.003-0.025-0.005v0c-0.036-0.007-0.072-0.014-0.108-0.021v0c-0.015-0.003-0.030-0.006-0.045-0.009v0c-0.030-0.006-0.060-0.013-0.089-0.019v0c-0.016-0.004-0.031-0.007-0.047-0.011v0c-0.031-0.007-0.061-0.015-0.092-0.022v0c-0.013-0.003-0.026-0.006-0.039-0.010v0c-0.044-0.011-0.088-0.023-0.131-0.036v0c-0.006-0.002-0.012-0.003-0.017-0.005v0c-0.038-0.011-0.075-0.022-0.113-0.034v0c-0.014-0.004-0.028-0.009-0.042-0.013v0c-0.030-0.010-0.060-0.019-0.090-0.029v0c-0.014-0.005-0.029-0.010-0.043-0.015v0c-0.032-0.011-0.065-0.023-0.097-0.034v0c-0.010-0.004-0.021-0.007-0.031-0.011v0c-0.042-0.016-0.084-0.032-0.125-0.048v0c-0.009-0.004-0.018-0.008-0.028-0.011v0c-0.032-0.013-0.065-0.026-0.097-0.040v0c-0.014-0.006-0.027-0.012-0.041-0.018v0c-0.029-0.012-0.057-0.025-0.085-0.038v0c-0.013-0.006-0.027-0.012-0.040-0.018v0c-0.033-0.015-0.067-0.031-0.1-0.047v0c-0.007-0.003-0.014-0.007-0.020-0.010v0c-0.071-0.035-0.142-0.071-0.211-0.109v0l4.848 2.637c0.070 0.038 0.14 0.074 0.211 0.109v0c0.001 0 0.002 0.001 0.003 0.001v0c0.006 0.003 0.012 0.006 0.018 0.009v0c0.033 0.016 0.066 0.032 0.099 0.047v0c0.013 0.006 0.027 0.012 0.040 0.018v0c0.028 0.013 0.057 0.025 0.085 0.038v0c0.014 0.006 0.027 0.012 0.041 0.018v0c0.032 0.014 0.064 0.027 0.097 0.040v0c0.009 0.004 0.019 0.008 0.028 0.012v0c0.041 0.017 0.083 0.033 0.125 0.048v0c0.011 0.004 0.021 0.008 0.032 0.012v0c0.032 0.012 0.064 0.023 0.096 0.034v0c0.014 0.005 0.029 0.010 0.043 0.015v0c0.030 0.010 0.060 0.020 0.090 0.029v0c0.014 0.004 0.028 0.009 0.042 0.013v0c0.037 0.012 0.075 0.023 0.113 0.034v0c0.006 0.002 0.012 0.003 0.018 0.005v0c0.044 0.012 0.087 0.024 0.131 0.036v0c0.004 0.001 0.007 0.002 0.010 0.003v0c0.010 0.002 0.019 0.005 0.029 0.007v0c0.031 0.008 0.061 0.015 0.092 0.022v0c0.015 0.004 0.031 0.007 0.046 0.011v0c0.030 0.007 0.060 0.013 0.090 0.020v0c0.015 0.003 0.030 0.006 0.045 0.009v0c0.036 0.007 0.072 0.014 0.108 0.021v0c0.008 0.002 0.017 0.003 0.025 0.005v0c0.044 0.008 0.089 0.015 0.134 0.022v0c0.012 0.002 0.025 0.004 0.037 0.006v0c0.033 0.005 0.066 0.010 0.099 0.014v0c0.016 0.002 0.032 0.004 0.048 0.006v0c0.031 0.004 0.061 0.007 0.092 0.011v0c0.016 0.002 0.032 0.003 0.048 0.005v0c0.035 0.003 0.069 0.006 0.104 0.009v0c0.012 0.001 0.023 0.002 0.035 0.003v0c0.046 0.004 0.092 0.007 0.139 0.009v0c0.011 0.001 0.021 0.001 0.032 0.001v0c0.036 0.002 0.072 0.003 0.108 0.004v0c0.016 0 0.032 0.001 0.048 0.001v0c0.032 0.001 0.064 0.001 0.095 0.002v0c0.017 0 0.033 0 0.050 0v0c0.034 0 0.068-0 0.102-0.001v0c0.014-0 0.027-0 0.041-0v0c0.047-0.001 0.095-0.003 0.143-0.005v0c0.007-0 0.015-0.001 0.022-0.001v0c0.041-0.002 0.081-0.004 0.122-0.007v0c0.016-0.001 0.032-0.002 0.048-0.003v0c0.033-0.002 0.066-0.005 0.099-0.008v0c0.017-0.002 0.034-0.003 0.052-0.005v0c0.034-0.003 0.067-0.007 0.101-0.011v0c0.015-0.002 0.031-0.003 0.046-0.005v0c0.049-0.006 0.097-0.012 0.146-0.019v0c0.054-0.008 0.108-0.016 0.163-0.025v0c0.016-0.003 0.031-0.005 0.047-0.008v0c0.041-0.007 0.082-0.015 0.123-0.022v0c0.015-0.003 0.029-0.006 0.044-0.008v0c0.053-0.011 0.107-0.022 0.16-0.033v0c0.007-0.002 0.015-0.003 0.022-0.005v0c0.046-0.010 0.092-0.021 0.138-0.033v0c0.016-0.004 0.032-0.008 0.048-0.012v0c0.041-0.010 0.082-0.021 0.123-0.032v0c0.013-0.003 0.026-0.007 0.038-0.010v0c0.052-0.015 0.104-0.030 0.156-0.045v0c0.011-0.003 0.022-0.007 0.033-0.010v0c0.042-0.013 0.084-0.026 0.125-0.040v0c0.016-0.005 0.031-0.010 0.047-0.016v0c0.042-0.014 0.084-0.029 0.125-0.043v0c0.010-0.004 0.021-0.007 0.031-0.011v0c0.051-0.018 0.102-0.038 0.152-0.057v0c0.013-0.005 0.025-0.010 0.038-0.015v0c0.039-0.015 0.078-0.031 0.117-0.047v0c0.015-0.006 0.030-0.012 0.045-0.019v0c0.044-0.019 0.089-0.038 0.133-0.057v0c0.006-0.003 0.012-0.005 0.018-0.008v0c0.042-0.019 0.085-0.038 0.127-0.058v0c0.006-0.003 0.013-0.006 0.019-0.009v0c0.021-0.010 0.041-0.020 0.062-0.030v0c0.032-0.015 0.063-0.031 0.095-0.047v0c0.022-0.011 0.043-0.022 0.064-0.033v0c0.030-0.016 0.061-0.031 0.091-0.047v0c0.022-0.012 0.043-0.023 0.065-0.035v0c0.030-0.016 0.060-0.033 0.090-0.049v0c0.021-0.012 0.043-0.024 0.064-0.036v0c0.030-0.017 0.060-0.035 0.090-0.052v0c0.020-0.012 0.041-0.024 0.061-0.036v0c0.031-0.019 0.062-0.038 0.093-0.057v0c0.019-0.012 0.038-0.023 0.056-0.035v0c0.035-0.022 0.070-0.045 0.105-0.067v0c0.014-0.009 0.029-0.018 0.043-0.028v0c0.048-0.032 0.095-0.064 0.143-0.096v0c0.001-0 0.001-0.001 0.002-0.001v0c0.065-0.045 0.13-0.092 0.194-0.139v0c0.017-0.012 0.034-0.025 0.050-0.037v0c0.056-0.042 0.111-0.084 0.166-0.128v0c0.009-0.007 0.018-0.014 0.027-0.021v0c0.062-0.049 0.124-0.1 0.185-0.151v0c0.015-0.013 0.031-0.026 0.046-0.039v0c0.051-0.044 0.102-0.088 0.152-0.133v0c0.008-0.007 0.017-0.014 0.025-0.022v0c0.003-0.003 0.007-0.006 0.010-0.009v0c0.056-0.050 0.111-0.102 0.166-0.154v0c0.013-0.012 0.025-0.024 0.037-0.036v0c0.043-0.042 0.086-0.083 0.128-0.126v0c0.016-0.016 0.032-0.032 0.048-0.048v0c0.045-0.046 0.090-0.093 0.135-0.14v0c0.008-0.009 0.016-0.017 0.024-0.026v0c0.052-0.055 0.103-0.112 0.153-0.169v0c0.005-0.005 0.009-0.010 0.014-0.015v0c0.009-0.010 0.018-0.021 0.027-0.031v0c0.038-0.043 0.076-0.087 0.113-0.132v0c0.014-0.017 0.029-0.034 0.043-0.051v0c0.047-0.057 0.094-0.114 0.14-0.172v0c0.002-0.002 0.003-0.004 0.005-0.006v0c0.047-0.060 0.093-0.121 0.139-0.182v0c0.013-0.018 0.026-0.036 0.039-0.053v0c0.034-0.047 0.068-0.093 0.102-0.141v0c0.008-0.011 0.016-0.022 0.024-0.034v0c0.004-0.006 0.008-0.012 0.012-0.018v0c0.046-0.065 0.091-0.131 0.135-0.198v0c0.008-0.012 0.015-0.024 0.023-0.035v0c0.037-0.057 0.074-0.115 0.11-0.172v0c0.011-0.018 0.023-0.037 0.034-0.055v0c0.042-0.069 0.084-0.138 0.124-0.208v0c0.001-0.002 0.002-0.004 0.003-0.006v0c0.039-0.068 0.078-0.137 0.115-0.207v0c0.005-0.009 0.010-0.018 0.015-0.027v0c0.010-0.018 0.019-0.037 0.029-0.056v0c0.010-0.020 0.021-0.039 0.031-0.059v0c0.019-0.036 0.037-0.072 0.055-0.108v0c0.009-0.017 0.017-0.034 0.026-0.051v0c0.026-0.053 0.052-0.106 0.077-0.16v0c0-0 0-0 0-0.001v0c0.025-0.053 0.050-0.107 0.074-0.161v0c0.008-0.017 0.015-0.035 0.023-0.052v0c0.016-0.037 0.032-0.074 0.048-0.111v0c0.009-0.021 0.017-0.041 0.026-0.062v0c0.015-0.035 0.029-0.069 0.043-0.104v0c0.009-0.021 0.017-0.043 0.025-0.064v0c0.014-0.035 0.028-0.071 0.041-0.107v0c0.008-0.020 0.015-0.040 0.023-0.061v0c0.003-0.008 0.006-0.016 0.009-0.024v0c0.009-0.023 0.017-0.047 0.025-0.070v0c0.010-0.029 0.021-0.057 0.031-0.086v0c0.011-0.031 0.021-0.062 0.031-0.093v0c0.010-0.029 0.019-0.058 0.029-0.087v0c0.010-0.031 0.020-0.063 0.030-0.094v0c0.009-0.029 0.018-0.058 0.027-0.087v0c0.010-0.032 0.019-0.064 0.028-0.095v0c0.008-0.029 0.017-0.058 0.025-0.088v0c0.009-0.032 0.017-0.064 0.026-0.096v0c0.008-0.029 0.016-0.059 0.023-0.088v0c0.008-0.032 0.016-0.065 0.024-0.097v0c0.007-0.029 0.014-0.059 0.021-0.088v0c0.008-0.033 0.015-0.065 0.022-0.098v0c0.006-0.030 0.013-0.059 0.019-0.089v0c0.007-0.033 0.013-0.066 0.020-0.1v0c0.006-0.029 0.012-0.059 0.017-0.088v0c0.006-0.034 0.012-0.067 0.018-0.101v0c0.005-0.029 0.010-0.059 0.015-0.088v0c0.006-0.034 0.010-0.068 0.016-0.103v0c0.004-0.029 0.009-0.058 0.013-0.087v0c0.005-0.035 0.009-0.070 0.014-0.105v0c0.004-0.029 0.008-0.057 0.011-0.086v0c0.004-0.036 0.008-0.072 0.011-0.107v0c0.003-0.028 0.006-0.056 0.009-0.084v0c0.003-0.037 0.006-0.074 0.009-0.11v0c0.002-0.027 0.005-0.055 0.007-0.082v0c0.003-0.038 0.005-0.077 0.007-0.115v0c0.002-0.026 0.003-0.052 0.005-0.078v0c0.002-0.043 0.003-0.086 0.005-0.129v0c0.001-0.022 0.002-0.043 0.002-0.065v0c0.002-0.065 0.003-0.129 0.003-0.194v0c0.005-2.693-1.293-4.874-3.253-5.94v0l-4.848-2.637c1.96 1.066 3.258 3.247 3.253 5.94z"></path><path class="main-svg__item main-svg__item--down" fill="#161616" d="M15.263 0c-0.058 0-0.116 0.001-0.175 0.002v0c-0.026 0-0.052 0.001-0.079 0.001v0c-0.091 0.002-0.183 0.005-0.274 0.009v0c-0.014 0.001-0.028 0.002-0.042 0.002v0c-0.078 0.004-0.157 0.008-0.235 0.013v0c-0.030 0.002-0.061 0.004-0.092 0.007v0c-0.063 0.005-0.126 0.010-0.19 0.015v0c-0.033 0.003-0.066 0.006-0.099 0.009v0c-0.065 0.006-0.13 0.013-0.194 0.020v0c-0.029 0.003-0.059 0.006-0.088 0.010v0c-0.093 0.011-0.187 0.023-0.281 0.036v0c-0.104 0.015-0.209 0.031-0.312 0.048v0c-0.030 0.005-0.060 0.010-0.091 0.015v0c-0.079 0.014-0.157 0.028-0.236 0.043v0c-0.028 0.005-0.056 0.011-0.084 0.016v0c-0.103 0.020-0.205 0.042-0.307 0.064v0c-0.014 0.003-0.028 0.007-0.042 0.010v0c-0.089 0.020-0.178 0.041-0.266 0.063v0c-0.031 0.008-0.061 0.015-0.092 0.023v0c-0.079 0.020-0.157 0.041-0.235 0.062v0c-0.025 0.007-0.050 0.013-0.075 0.020v0c-0.1 0.028-0.2 0.057-0.3 0.087v0c-0.021 0.006-0.042 0.013-0.063 0.020v0c-0.080 0.025-0.16 0.050-0.24 0.077v0c-0.030 0.010-0.060 0.020-0.091 0.030v0c-0.080 0.027-0.16 0.055-0.24 0.083v0c-0.020 0.007-0.040 0.014-0.060 0.021v0c-0.098 0.035-0.195 0.072-0.292 0.11v0c-0.025 0.010-0.049 0.019-0.074 0.029v0c-0.075 0.030-0.15 0.060-0.224 0.090v0c-0.029 0.012-0.058 0.024-0.087 0.036v0c-0.085 0.036-0.169 0.072-0.253 0.109v0c-0.012 0.005-0.024 0.010-0.037 0.016v0c-0.081 0.036-0.162 0.073-0.243 0.111v0c-0.012 0.006-0.024 0.012-0.036 0.018v0c-0.040 0.019-0.080 0.039-0.12 0.058v0c-0.061 0.029-0.121 0.059-0.181 0.089v0c-0.042 0.021-0.083 0.042-0.125 0.063v0c-0.058 0.030-0.116 0.060-0.174 0.091v0c-0.042 0.022-0.084 0.045-0.125 0.067v0c-0.057 0.031-0.115 0.063-0.172 0.095v0c-0.041 0.023-0.082 0.046-0.123 0.069v0c-0.058 0.033-0.115 0.067-0.173 0.1v0c-0.039 0.023-0.079 0.046-0.118 0.070v0c-0.060 0.036-0.119 0.073-0.179 0.11v0c-0.036 0.022-0.072 0.044-0.108 0.067v0c-0.068 0.043-0.136 0.087-0.203 0.131v0c-0.026 0.017-0.053 0.034-0.080 0.052v0c-0.092 0.061-0.184 0.123-0.274 0.185v0c-0.002 0.001-0.004 0.003-0.005 0.004v0c-0.008 0.005-0.015 0.011-0.023 0.016v0c-0.079 0.055-0.158 0.111-0.237 0.168v0c-0.025 0.018-0.050 0.037-0.075 0.055v0c-0.066 0.049-0.132 0.098-0.198 0.147v0c-0.021 0.016-0.042 0.031-0.063 0.047v0c-0.084 0.064-0.167 0.129-0.25 0.194v0c-0.017 0.013-0.033 0.027-0.050 0.040v0c-0.067 0.054-0.134 0.108-0.201 0.163v0c-0.024 0.020-0.049 0.041-0.073 0.061v0c-0.067 0.056-0.134 0.113-0.201 0.171v0c-0.015 0.013-0.030 0.026-0.045 0.039v0c-0.070 0.061-0.14 0.123-0.209 0.185v0c-0.010 0.009-0.019 0.018-0.029 0.027v0c-0.018 0.017-0.037 0.033-0.055 0.050v0c-0.064 0.058-0.128 0.117-0.191 0.177v0c-0.018 0.017-0.036 0.033-0.053 0.050v0c-0.076 0.072-0.151 0.145-0.226 0.218v0c-0.015 0.015-0.030 0.030-0.045 0.045v0c-0.063 0.062-0.125 0.125-0.187 0.189v0c-0.018 0.019-0.036 0.037-0.055 0.056v0c-0.073 0.076-0.146 0.152-0.218 0.229v0c-0.012 0.012-0.023 0.025-0.034 0.037v0c-0.063 0.067-0.125 0.135-0.186 0.204v0c-0.018 0.020-0.036 0.040-0.054 0.060v0c-0.014 0.016-0.028 0.031-0.042 0.047v0c-0.056 0.064-0.112 0.128-0.168 0.193v0c-0.007 0.008-0.014 0.016-0.021 0.025v0c-0.063 0.074-0.125 0.148-0.187 0.223v0c-0.018 0.021-0.035 0.043-0.053 0.064v0c-0.068 0.083-0.135 0.166-0.201 0.25v0c-0.002 0.003-0.005 0.006-0.007 0.009v0c-0.064 0.081-0.127 0.163-0.189 0.246v0c-0.017 0.022-0.034 0.045-0.051 0.067v0c-0.061 0.081-0.122 0.163-0.181 0.245v0c-0.004 0.005-0.007 0.010-0.011 0.015v0c-0.049 0.068-0.097 0.136-0.145 0.204v0c-0.013 0.018-0.026 0.037-0.038 0.056v0c-0.018 0.026-0.036 0.051-0.053 0.077v0c-0.049 0.071-0.097 0.142-0.144 0.213v0c-0.014 0.021-0.028 0.041-0.041 0.062v0c-0.059 0.089-0.117 0.18-0.175 0.27v0c-0.013 0.021-0.026 0.042-0.040 0.063v0c-0.046 0.073-0.091 0.146-0.136 0.219v0c-0.016 0.026-0.032 0.053-0.048 0.079v0c-0.054 0.090-0.107 0.18-0.16 0.27v0c-0.002 0.004-0.004 0.007-0.006 0.011v0c-0.054 0.094-0.107 0.189-0.16 0.284v0c-0.015 0.026-0.029 0.053-0.043 0.079v0c-0.018 0.033-0.036 0.065-0.053 0.098v0c-0.019 0.035-0.038 0.071-0.056 0.107v0c-0.020 0.038-0.040 0.075-0.059 0.113v0c-0.036 0.069-0.071 0.138-0.106 0.208v0c-0.016 0.032-0.033 0.065-0.049 0.097v0c-0.051 0.102-0.1 0.204-0.149 0.307v0c-0 0-0 0.001-0 0.001v0c-0.048 0.103-0.096 0.206-0.142 0.309v0c-0.015 0.034-0.030 0.068-0.045 0.101v0c-0.031 0.071-0.062 0.142-0.093 0.213v0c-0.017 0.040-0.033 0.080-0.050 0.12v0c-0.028 0.066-0.055 0.133-0.082 0.2v0c-0.017 0.041-0.033 0.083-0.049 0.124v0c-0.027 0.068-0.053 0.136-0.078 0.204v0c-0.015 0.040-0.030 0.079-0.045 0.119v0c-0.006 0.015-0.012 0.031-0.017 0.046v0c-0.016 0.044-0.032 0.089-0.047 0.133v0c-0.020 0.056-0.040 0.112-0.060 0.168v0c-0.020 0.059-0.040 0.118-0.060 0.177v0c-0.019 0.056-0.038 0.113-0.056 0.169v0c-0.019 0.060-0.038 0.12-0.056 0.179v0c-0.018 0.057-0.035 0.113-0.053 0.17v0c-0.018 0.060-0.035 0.121-0.053 0.182v0c-0.016 0.057-0.033 0.113-0.049 0.17v0c-0.017 0.061-0.033 0.122-0.049 0.184v0c-0.015 0.057-0.030 0.114-0.045 0.171v0c-0.016 0.062-0.030 0.124-0.045 0.186v0c-0.014 0.057-0.028 0.114-0.041 0.171v0c-0.014 0.062-0.028 0.125-0.041 0.188v0c-0.013 0.057-0.025 0.114-0.037 0.171v0c-0.013 0.063-0.025 0.127-0.038 0.19v0c-0.011 0.057-0.023 0.114-0.033 0.171v0c-0.012 0.064-0.023 0.128-0.034 0.193v0c-0.010 0.057-0.020 0.114-0.029 0.171v0c-0.011 0.065-0.020 0.13-0.030 0.196v0c-0.008 0.056-0.017 0.113-0.025 0.169v0c-0.009 0.066-0.017 0.133-0.026 0.199v0c-0.007 0.056-0.015 0.111-0.021 0.167v0c-0.008 0.068-0.015 0.136-0.022 0.204v0c-0.006 0.055-0.012 0.109-0.017 0.164v0c-0.007 0.070-0.012 0.141-0.018 0.211v0c-0.004 0.053-0.009 0.106-0.013 0.159v0c-0.005 0.074-0.009 0.148-0.013 0.222v0c-0.003 0.050-0.006 0.099-0.009 0.149v0c-0.004 0.082-0.006 0.164-0.009 0.246v0c-0.001 0.042-0.004 0.084-0.005 0.127v0c-0.003 0.124-0.005 0.249-0.005 0.373v0 0.059c0.009 5.151 2.501 9.322 6.256 11.364v0l4.848 2.637c-3.769-2.050-6.266-6.245-6.256-11.423v0c0-0.125 0.002-0.249 0.005-0.373v0c0.001-0.042 0.003-0.084 0.005-0.127v0c0.003-0.082 0.005-0.164 0.009-0.246v0c0.002-0.050 0.006-0.099 0.009-0.149v0c0.004-0.074 0.008-0.148 0.013-0.222v0c0.004-0.053 0.009-0.106 0.013-0.159v0c0.006-0.070 0.011-0.141 0.018-0.211v0c0.005-0.055 0.011-0.109 0.017-0.164v0c0.007-0.068 0.014-0.136 0.022-0.204v0c0.006-0.056 0.014-0.112 0.021-0.168v0c0.008-0.066 0.016-0.133 0.026-0.199v0c0.008-0.056 0.017-0.113 0.025-0.169v0c0.010-0.065 0.019-0.131 0.030-0.196v0c0.009-0.057 0.020-0.114 0.029-0.17v0c0.011-0.064 0.022-0.129 0.034-0.193v0c0.011-0.057 0.022-0.114 0.033-0.171v0c0.013-0.063 0.025-0.127 0.038-0.19v0c0.012-0.057 0.025-0.114 0.037-0.171v0c0.014-0.063 0.027-0.125 0.041-0.188v0c0.013-0.057 0.027-0.114 0.041-0.171v0c0.015-0.062 0.030-0.124 0.045-0.186v0c0.014-0.057 0.030-0.114 0.045-0.17v0c0.016-0.061 0.032-0.123 0.049-0.184v0c0.016-0.057 0.032-0.113 0.049-0.17v0c0.017-0.061 0.035-0.122 0.053-0.182v0c0.017-0.057 0.035-0.113 0.052-0.169v0c0.019-0.060 0.037-0.12 0.056-0.18v0c0.018-0.056 0.037-0.112 0.056-0.169v0c0.020-0.059 0.040-0.119 0.060-0.178v0c0.019-0.056 0.040-0.112 0.060-0.168v0c0.022-0.060 0.043-0.12 0.065-0.18v0c0.015-0.040 0.030-0.079 0.045-0.118v0c0.026-0.068 0.052-0.136 0.079-0.204v0c0.016-0.041 0.033-0.083 0.049-0.124v0c0.027-0.067 0.054-0.134 0.082-0.2v0c0.017-0.040 0.033-0.080 0.050-0.119v0c0.030-0.071 0.061-0.142 0.093-0.213v0c0.015-0.034 0.029-0.068 0.045-0.101v0c0.046-0.104 0.094-0.207 0.142-0.309v0c0-0 0-0.001 0-0.001v0c0.049-0.103 0.098-0.205 0.149-0.307v0c0.016-0.032 0.033-0.065 0.049-0.097v0c0.035-0.069 0.070-0.139 0.106-0.208v0c0.020-0.038 0.040-0.075 0.059-0.113v0c0.036-0.069 0.073-0.137 0.11-0.205v0c0.014-0.026 0.029-0.053 0.043-0.079v0c0.053-0.095 0.106-0.19 0.16-0.284v0c0.002-0.004 0.004-0.007 0.006-0.011v0c0.052-0.091 0.106-0.181 0.16-0.27v0c0.016-0.027 0.032-0.053 0.048-0.079v0c0.045-0.073 0.090-0.147 0.136-0.219v0c0.013-0.021 0.026-0.042 0.040-0.063v0c0.057-0.091 0.116-0.181 0.175-0.27v0c0.014-0.021 0.027-0.041 0.041-0.061v0c0.048-0.071 0.096-0.143 0.144-0.213v0c0.018-0.026 0.035-0.052 0.053-0.077v0c0.061-0.087 0.122-0.174 0.184-0.26v0c0.004-0.005 0.007-0.010 0.011-0.015v0c0.060-0.082 0.12-0.164 0.181-0.245v0c0.017-0.022 0.034-0.045 0.051-0.067v0c0.063-0.082 0.126-0.165 0.189-0.246v0c0.003-0.003 0.005-0.006 0.007-0.010v0c0.066-0.084 0.133-0.167 0.201-0.25v0c0.018-0.021 0.035-0.043 0.053-0.064v0c0.061-0.074 0.123-0.148 0.186-0.222v0c0.008-0.009 0.015-0.018 0.023-0.027v0c0.069-0.080 0.139-0.16 0.209-0.239v0c0.018-0.021 0.037-0.041 0.055-0.062v0c0.061-0.068 0.122-0.135 0.184-0.202v0c0.012-0.013 0.024-0.026 0.036-0.039v0c0.072-0.077 0.145-0.153 0.218-0.229v0c0.018-0.019 0.037-0.037 0.055-0.056v0c0.062-0.063 0.124-0.126 0.187-0.189v0c0.015-0.015 0.030-0.030 0.045-0.045v0c0.075-0.074 0.15-0.147 0.226-0.219v0c0.017-0.016 0.035-0.033 0.052-0.049v0c0.064-0.060 0.128-0.12 0.193-0.179v0c0.018-0.016 0.035-0.032 0.053-0.048v0c0.079-0.072 0.159-0.142 0.239-0.212v0c0.014-0.013 0.029-0.025 0.043-0.037v0c0.067-0.058 0.135-0.115 0.202-0.172v0c0.024-0.020 0.048-0.040 0.073-0.060v0c0.067-0.055 0.134-0.11 0.201-0.164v0c0.017-0.013 0.033-0.027 0.050-0.040v0c0.083-0.066 0.166-0.13 0.25-0.194v0c0.021-0.016 0.042-0.031 0.063-0.047v0c0.066-0.050 0.132-0.099 0.198-0.147v0c0.025-0.018 0.050-0.037 0.076-0.055v0c0.079-0.057 0.157-0.113 0.237-0.168v0c0.008-0.005 0.015-0.011 0.023-0.016v0c0.093-0.064 0.186-0.127 0.28-0.189v0c0.026-0.017 0.053-0.034 0.080-0.052v0c0.068-0.044 0.135-0.088 0.203-0.131v0c0.036-0.022 0.072-0.044 0.107-0.067v0c0.060-0.037 0.119-0.074 0.179-0.11v0c0.039-0.023 0.078-0.046 0.118-0.069v0c0.058-0.034 0.115-0.067 0.173-0.101v0c0.041-0.023 0.082-0.046 0.123-0.069v0c0.057-0.032 0.115-0.064 0.172-0.095v0c0.041-0.022 0.083-0.045 0.125-0.067v0c0.058-0.031 0.116-0.061 0.175-0.091v0c0.041-0.021 0.083-0.042 0.124-0.063v0c0.061-0.030 0.121-0.060 0.182-0.089v0c0.040-0.019 0.079-0.039 0.119-0.057v0c0.093-0.044 0.187-0.087 0.281-0.129v0c0.011-0.005 0.023-0.010 0.034-0.015v0c0.085-0.038 0.17-0.075 0.256-0.111v0c0.029-0.012 0.058-0.024 0.086-0.036v0c0.075-0.031 0.15-0.061 0.225-0.091v0c0.024-0.010 0.049-0.019 0.073-0.029v0c0.097-0.038 0.195-0.074 0.293-0.11v0c0.020-0.007 0.039-0.014 0.059-0.021v0c0.080-0.029 0.16-0.056 0.241-0.084v0c0.030-0.010 0.060-0.020 0.090-0.030v0c0.080-0.026 0.16-0.052 0.241-0.077v0c0.021-0.006 0.041-0.013 0.062-0.019v0c0.1-0.030 0.2-0.059 0.3-0.087v0c0.025-0.007 0.049-0.013 0.074-0.020v0c0.078-0.021 0.157-0.042 0.236-0.062v0c0.030-0.008 0.061-0.015 0.091-0.023v0c0.089-0.022 0.177-0.043 0.266-0.063v0c0.014-0.003 0.028-0.006 0.042-0.010v0c0.102-0.023 0.204-0.044 0.307-0.064v0c0.028-0.006 0.056-0.011 0.084-0.016v0c0.078-0.015 0.157-0.029 0.236-0.043v0c0.030-0.005 0.060-0.010 0.091-0.015v0c0.104-0.017 0.208-0.034 0.312-0.048v0c0.094-0.013 0.188-0.025 0.281-0.036v0c0.030-0.003 0.059-0.007 0.088-0.010v0c0.065-0.007 0.13-0.014 0.194-0.020v0c0.033-0.003 0.066-0.006 0.099-0.009v0c0.063-0.006 0.127-0.011 0.19-0.015v0c0.031-0.002 0.061-0.005 0.092-0.007v0c0.079-0.005 0.157-0.010 0.235-0.013v0c0.014-0.001 0.028-0.002 0.042-0.002v0c0.092-0.004 0.183-0.007 0.274-0.009v0c0.026-0.001 0.052-0.001 0.079-0.001v0c0.066-0.001 0.131-0.002 0.196-0.002v0c0.032 0 0.064 0 0.096 0.001v0c0.061 0.001 0.122 0.002 0.183 0.003v0c0.031 0.001 0.062 0.001 0.093 0.002v0c0.070 0.002 0.139 0.005 0.209 0.009v0c0.020 0.001 0.041 0.002 0.061 0.003v0c0.089 0.005 0.178 0.011 0.267 0.018v0c0.022 0.002 0.044 0.004 0.066 0.006v0c0.067 0.006 0.133 0.011 0.2 0.018v0c0.030 0.003 0.061 0.006 0.091 0.010v0c0.059 0.006 0.118 0.013 0.177 0.021v0c0.031 0.004 0.061 0.008 0.092 0.012v0c0.064 0.008 0.127 0.017 0.19 0.027v0c0.024 0.004 0.048 0.007 0.072 0.010v0c0.086 0.013 0.172 0.028 0.258 0.043v0c0.016 0.003 0.032 0.006 0.048 0.009v0c0.070 0.013 0.139 0.026 0.208 0.040v0c0.029 0.006 0.057 0.012 0.086 0.018v0c0.057 0.012 0.115 0.025 0.172 0.037v0c0.030 0.007 0.060 0.014 0.090 0.021v0c0.059 0.014 0.118 0.028 0.176 0.043v0c0.026 0.006 0.051 0.013 0.076 0.019v0c0.084 0.022 0.168 0.045 0.252 0.068v0c0.012 0.003 0.023 0.007 0.035 0.010v0c0.072 0.021 0.144 0.042 0.216 0.064v0c0.027 0.008 0.054 0.017 0.081 0.026v0c0.058 0.018 0.115 0.037 0.172 0.056v0c0.028 0.009 0.056 0.019 0.083 0.028v0c0.062 0.021 0.123 0.043 0.184 0.066v0c0.020 0.007 0.041 0.015 0.061 0.022v0c0.081 0.030 0.161 0.061 0.24 0.092v0c0.018 0.007 0.037 0.015 0.055 0.022v0c0.062 0.025 0.124 0.050 0.185 0.077v0c0.027 0.011 0.053 0.023 0.080 0.035v0c0.055 0.024 0.109 0.048 0.163 0.072v0c0.026 0.012 0.052 0.023 0.078 0.035v0c0.064 0.029 0.127 0.059 0.189 0.090v0c0.015 0.007 0.030 0.014 0.044 0.021v0c0.044 0.022 0.088 0.044 0.131 0.066v0c0.024 0.012 0.048 0.024 0.071 0.036v0c0.061 0.032 0.122 0.064 0.183 0.097v0c0.006 0.003 0.012 0.006 0.017 0.009v0l-4.848-2.637c-0.004-0.002-0.009-0.004-0.013-0.007v0c-0.062-0.034-0.125-0.067-0.187-0.099v0c-0.024-0.012-0.048-0.024-0.071-0.036v0c-0.044-0.022-0.087-0.045-0.132-0.066v0c-0.003-0.001-0.005-0.003-0.008-0.004v0c-0.012-0.006-0.024-0.011-0.036-0.017v0c-0.063-0.031-0.126-0.061-0.19-0.090v0c-0.026-0.012-0.052-0.024-0.078-0.035v0c-0.054-0.025-0.109-0.049-0.163-0.073v0c-0.027-0.012-0.053-0.023-0.080-0.034v0c-0.062-0.026-0.123-0.052-0.185-0.077v0c-0.018-0.007-0.036-0.015-0.054-0.022v0c-0.080-0.032-0.16-0.063-0.241-0.093v0c-0.020-0.008-0.041-0.015-0.061-0.022v0c-0.061-0.022-0.123-0.044-0.185-0.066v0c-0.028-0.010-0.055-0.019-0.083-0.028v0c-0.057-0.019-0.115-0.038-0.172-0.056v0c-0.027-0.009-0.053-0.017-0.080-0.025v0c-0.072-0.022-0.144-0.044-0.217-0.065v0c-0.011-0.003-0.023-0.007-0.034-0.010v0c-0.084-0.024-0.168-0.046-0.252-0.068v0c-0.007-0.002-0.013-0.004-0.020-0.006v0c-0.019-0.005-0.037-0.009-0.056-0.014v0c-0.059-0.015-0.118-0.029-0.177-0.043v0c-0.030-0.007-0.060-0.014-0.090-0.021v0c-0.057-0.013-0.115-0.025-0.172-0.037v0c-0.029-0.006-0.057-0.012-0.086-0.018v0c-0.069-0.014-0.139-0.027-0.208-0.040v0c-0.016-0.003-0.032-0.006-0.048-0.009v0c-0.086-0.015-0.172-0.029-0.258-0.043v0c-0.024-0.004-0.048-0.007-0.071-0.010v0c-0.063-0.009-0.127-0.018-0.19-0.027v0c-0.031-0.004-0.061-0.008-0.092-0.012v0c-0.059-0.007-0.118-0.014-0.177-0.021v0c-0.030-0.003-0.061-0.007-0.091-0.010v0c-0.066-0.007-0.133-0.013-0.2-0.018v0c-0.022-0.002-0.044-0.004-0.066-0.006v0c-0.089-0.007-0.177-0.013-0.267-0.018v0c-0.020-0.001-0.041-0.002-0.061-0.003v0c-0.069-0.003-0.139-0.006-0.209-0.009v0c-0.031-0.001-0.062-0.002-0.093-0.002v0c-0.061-0.001-0.122-0.003-0.183-0.003v0c-0.032-0-0.064-0.001-0.096-0.001v0zM25.567 4l-0.001-0c0 0 0 0 0.001 0z"></path><path class="main-svg__item main-svg__item--front" fill="#292929" d="M18.321 24.888c3.873-0.544 7.020-4.375 7.028-8.555s-3.126-7.128-7-6.584c-3.873 0.544-7.019 4.375-7.027 8.555s3.126 7.129 6.999 6.584zM18.362 2.762c7.449-1.047 13.475 4.622 13.46 12.661s-6.065 15.406-13.514 16.453c-7.448 1.047-13.475-4.622-13.46-12.662s6.065-15.405 13.514-16.452z"></path></symbol><symbol id="icon-number_1" viewBox="0 0 18 32"><path class="main-svg__item main-svg__item--down" fill="#161616" d="M10.725 0l-5.302 2.968-5.423 26.318 6.895 2.713 5.302-2.968 5.423-26.318z"></path><path class="main-svg__item main-svg__item--front" fill="#292929" d="M10.725 0l-5.423 26.318 6.895 2.713 5.423-26.319-6.895-2.713z"></path><path class="main-svg__item main-svg__item--side" class="main-svg__item main-svg__item--side" fill="#161616" d="M0 29.287l6.895 2.713 5.302-2.968-6.895-2.713z"></path><path class="main-svg__item main-svg__item--side" fill="#121212" d="M10.725 0l-5.302 2.968-5.423 26.318 5.302-2.968 5.423-26.318z"></path></symbol><symbol id="icon-number_2" viewBox="0 0 45 32"><path class="main-svg__item main-svg__item--side" fill="#121212" d="M5.67 0l-5.67 9.821 4.235 5.951 35.139 16.228 5.67-9.821-4.235-5.951z"></path><path class="main-svg__item main-svg__item--front" fill="#292929" d="M5.67 0l-5.67 9.821 35.139 16.228 5.67-9.821z"></path><path class="main-svg__item main-svg__item--down" fill="#161616" d="M35.139 26.049l4.235 5.951 5.67-9.821-4.235-5.951z"></path><path class="main-svg__item main-svg__item--side" fill="#121212" d="M4.236 15.772l35.139 16.228-4.235-5.951-35.139-16.228z"></path></symbol><symbol id="icon-number_3" viewBox="0 0 36 32"><path class="main-svg__item main-svg__item--side" fill="#121212" d="M34.483 10.535c0 0.001-0 0.001-0 0.002 0-0.002 0-0.004 0-0.006-0 0.001-0 0.003-0 0.004zM34.474 10.735c0 0.001-0 0.001-0 0.001s0-0.001 0-0.002zM34.46 10.934c-0.001 0.007-0.001 0.014-0.002 0.020 0.001-0.013 0.002-0.027 0.003-0.040-0.001 0.007-0.001 0.013-0.001 0.020zM34.458 9.655c0.001 0.005 0.001 0.010 0.001 0.015-0.001-0.007-0.001-0.013-0.002-0.020 0 0.002 0 0.004 0.001 0.006zM34.294 12.013c-0.001 0.003-0.001 0.006-0.002 0.009 0.001-0.005 0.002-0.011 0.004-0.016-0.001 0.002-0.001 0.005-0.002 0.007zM34.248 12.211c-0.001 0.003-0.001 0.005-0.002 0.008 0.003-0.011 0.005-0.022 0.008-0.033-0.002 0.008-0.004 0.017-0.006 0.025zM34.196 12.407c-0.001 0.002-0.002 0.005-0.002 0.007 0.001-0.004 0.002-0.008 0.003-0.012-0 0.002-0.001 0.003-0.001 0.005zM33.747 13.655c-0.001 0.003-0.003 0.005-0.004 0.008 0.002-0.005 0.005-0.011 0.007-0.016-0.001 0.003-0.002 0.005-0.004 0.008zM33.642 13.883c-0 0.001-0.001 0.002-0.001 0.002 0.001-0.001 0.001-0.002 0.001-0.003-0 0-0 0-0 0.001zM29.977 18.291c-0.001 0.001-0.003 0.002-0.004 0.003 0.003-0.002 0.005-0.004 0.008-0.006-0.001 0.001-0.002 0.002-0.004 0.003zM29.536 18.628c-0.002 0.002-0.005 0.003-0.007 0.005 0.005-0.003 0.009-0.007 0.014-0.010-0.003 0.002-0.005 0.004-0.007 0.006zM27.598 19.874c-0.006 0.003-0.011 0.006-0.017 0.009 0.014-0.008 0.029-0.016 0.043-0.024-0.009 0.005-0.018 0.010-0.027 0.015zM27.313 20.030c-0.005 0.003-0.010 0.006-0.016 0.008 0.008-0.004 0.015-0.008 0.023-0.012-0.002 0.001-0.005 0.003-0.007 0.004zM26.753 20.321c-0.002 0.001-0.004 0.002-0.006 0.003l0.010-0.005c-0.001 0.001-0.003 0.002-0.004 0.002zM26.197 20.59c-0.005 0.002-0.010 0.004-0.014 0.007 0.009-0.004 0.018-0.008 0.027-0.012-0.004 0.002-0.008 0.004-0.012 0.006zM25.622 20.848c-0.007 0.003-0.015 0.006-0.022 0.009 0.014-0.006 0.029-0.012 0.043-0.019-0.007 0.003-0.014 0.006-0.021 0.009zM25.031 21.094c-0.010 0.004-0.020 0.008-0.029 0.012 0.020-0.008 0.039-0.016 0.059-0.023-0.010 0.004-0.019 0.008-0.029 0.012zM24.661 7.633v0c0 0 0 0 0 0s-0-0-0-0zM23.866 21.524c-0.095 0.032-0.19 0.064-0.285 0.095-0 0-0 0-0 0 0.095-0.031 0.191-0.063 0.285-0.095-0 0-0 0-0 0zM23.493 21.649c-0.062 0.020-0.124 0.039-0.185 0.058 0.062-0.019 0.124-0.038 0.185-0.058 0 0-0 0-0 0zM21.136 16.524c-3.009 1.155-6.427 1.127-8.992 0.125 0.003-0.002 0.006-0.004 0.009-0.006 0.017-0.012 0.035-0.024 0.053-0.036 0.027-0.018 0.054-0.037 0.081-0.055 0.018-0.012 0.037-0.024 0.056-0.037 0.027-0.018 0.054-0.035 0.082-0.053 0.019-0.012 0.038-0.024 0.057-0.036 0.028-0.018 0.056-0.035 0.085-0.053 0.018-0.011 0.037-0.023 0.056-0.034 0.031-0.019 0.062-0.037 0.093-0.055 0.017-0.010 0.033-0.020 0.050-0.030 0.040-0.023 0.080-0.046 0.12-0.069 0.008-0.005 0.017-0.010 0.025-0.014 0.049-0.027 0.099-0.055 0.149-0.082 0.014-0.008 0.029-0.015 0.044-0.023 0.036-0.019 0.071-0.038 0.108-0.057 0.011-0.006 0.022-0.011 0.033-0.017 0.084-0.043 0.169-0.086 0.255-0.127 0.008-0.004 0.016-0.008 0.024-0.011 0.088-0.042 0.177-0.084 0.268-0.124 0.006-0.003 0.013-0.006 0.019-0.008 0.093-0.041 0.187-0.082 0.282-0.122 0.004-0.002 0.007-0.003 0.011-0.004 0.098-0.041 0.198-0.081 0.299-0.12 0.097-0.037 0.194-0.072 0.291-0.107 0.022-0.008 0.045-0.016 0.067-0.024 0.096-0.034 0.192-0.066 0.289-0.098 0.012-0.004 0.024-0.007 0.036-0.011 0.089-0.028 0.178-0.056 0.267-0.082 0.021-0.006 0.042-0.013 0.063-0.019 0.097-0.028 0.194-0.055 0.292-0.081 0.044-0.012 0.088-0.023 0.132-0.034 0.021-0.005 0.043-0.011 0.064-0.016 0.068-0.017 0.136-0.033 0.204-0.049 0.006-0.002 0.013-0.003 0.020-0.004 0.062-0.014 0.123-0.028 0.185-0.041 0.023-0.005 0.047-0.010 0.071-0.015 0.045-0.009 0.090-0.019 0.135-0.028 0.027-0.005 0.054-0.011 0.081-0.016 0.042-0.008 0.084-0.016 0.126-0.024 0.028-0.005 0.056-0.010 0.084-0.015 0.041-0.007 0.083-0.014 0.124-0.021 0.028-0.005 0.056-0.009 0.084-0.014 0.042-0.007 0.084-0.013 0.126-0.020 0.027-0.004 0.054-0.008 0.081-0.012 0.023-0.003 0.046-0.006 0.070-0.010 0.094-0.013 0.188-0.025 0.281-0.036 0.013-0.002 0.027-0.003 0.041-0.005 0.102-0.012 0.203-0.022 0.305-0.032 0.023-0.002 0.045-0.004 0.068-0.006 0.102-0.009 0.205-0.017 0.307-0.024 0.007-0 0.015-0.001 0.022-0.001 0.097-0.006 0.195-0.011 0.292-0.015 0.021-0.001 0.043-0.002 0.064-0.003 0.1-0.004 0.2-0.006 0.3-0.008 0.019-0 0.038-0 0.057-0.001 0.092-0.001 0.184-0.001 0.276-0 0.014 0 0.029 0 0.043 0 0.1 0.001 0.199 0.004 0.299 0.008 0.022 0.001 0.044 0.002 0.066 0.003 0.1 0.004 0.2 0.009 0.3 0.015 0.067 0.004 0.134 0.009 0.2 0.014 0.016 0.001 0.033 0.003 0.049 0.004 0.050 0.004 0.101 0.009 0.151 0.013 0.025 0.002 0.049 0.005 0.074 0.008 0.042 0.004 0.084 0.008 0.126 0.013 0.027 0.003 0.054 0.006 0.081 0.009 0.039 0.005 0.078 0.009 0.117 0.014 0.028 0.004 0.056 0.007 0.084 0.011 0.038 0.005 0.076 0.010 0.114 0.016 0.028 0.004 0.056 0.008 0.084 0.012 0.038 0.006 0.075 0.012 0.113 0.018 0.028 0.004 0.055 0.009 0.083 0.014 0.038 0.006 0.076 0.013 0.114 0.020 0.027 0.005 0.053 0.009 0.080 0.014 0.023 0.004 0.045 0.009 0.067 0.013 0.081 0.016 0.162 0.032 0.242 0.049 0.014 0.003 0.029 0.006 0.043 0.009 0.090 0.019 0.178 0.040 0.266 0.062 0.020 0.005 0.041 0.010 0.061 0.015 0.084 0.021 0.167 0.043 0.25 0.065 0.007 0.002 0.013 0.004 0.020 0.005 0.087 0.024 0.174 0.050 0.26 0.076 0.021 0.006 0.041 0.013 0.062 0.019 0.078 0.024 0.155 0.049 0.232 0.075 0.004 0.001 0.009 0.003 0.013 0.004 0.080 0.027 0.159 0.056 0.238 0.085 0.020 0.008 0.041 0.015 0.061 0.023 0.033 0.013 0.066 0.026 0.099 0.039-0.652 0.449-1.408 0.846-2.258 1.172zM23.034 21.792c-0.080 0.024-0.16 0.047-0.239 0.071 0.080-0.023 0.16-0.047 0.24-0.071-0 0-0 0-0 0zM22.622 21.912c-0.017 0.005-0.034 0.009-0.051 0.014 0.017-0.005 0.035-0.009 0.052-0.014-0 0-0 0-0 0zM22.239 22.018c-0.091 0.024-0.181 0.047-0.272 0.070-0 0-0 0-0 0 0.091-0.023 0.182-0.046 0.273-0.071-0 0-0 0-0 0zM21.451 22.214c-0 0-0 0-0 0 0.073-0.017 0.145-0.035 0.217-0.052-0.072 0.018-0.145 0.035-0.217 0.052zM21.405 22.225c-0.116 0.027-0.232 0.053-0.348 0.078-0 0-0 0-0 0 0.118-0.025 0.235-0.052 0.352-0.079-0.001 0-0.002 0.001-0.004 0.001zM20.662 22.384c-0 0-0 0-0 0 0.078-0.016 0.157-0.032 0.235-0.049-0.078 0.016-0.157 0.033-0.235 0.049zM20.265 22.46c-0 0-0 0-0 0 0.004-0.001 0.008-0.001 0.012-0.002-0.004 0.001-0.008 0.001-0.011 0.002zM19.865 22.53c-0 0-0 0-0 0 0.062-0.010 0.124-0.021 0.186-0.032-0.062 0.011-0.124 0.022-0.186 0.032zM19.461 22.595c-0 0-0 0-0 0 0.033-0.005 0.065-0.010 0.098-0.015-0.032 0.005-0.065 0.010-0.097 0.015zM19.304 22.618c-0.103 0.015-0.205 0.029-0.308 0.043-0.001 0-0.001 0-0.002 0 0.103-0.014 0.206-0.028 0.31-0.043-0 0-0 0-0 0zM18.924 22.671c-0.127 0.017-0.255 0.032-0.382 0.047-0 0-0 0-0 0 0.128-0.015 0.255-0.030 0.383-0.047-0 0-0 0-0 0zM18.435 22.729c-0.008 0.001-0.016 0.002-0.025 0.003 0.008-0.001 0.017-0.002 0.025-0.003-0 0-0 0-0.001 0zM18.022 22.772c-0.088 0.008-0.175 0.016-0.263 0.024-0 0-0 0-0 0 0.088-0.007 0.176-0.015 0.264-0.024-0 0-0 0-0 0zM17.248 22.834c-0.127 0.008-0.254 0.015-0.381 0.022h-0c0.127-0.006 0.254-0.014 0.381-0.022-0 0-0 0-0 0zM16.76 22.861c-0.092 0.004-0.185 0.008-0.277 0.011h-0c0.093-0.003 0.185-0.007 0.278-0.011-0 0-0 0-0.001 0zM16.35 22.877c-0.087 0.003-0.174 0.005-0.261 0.007h-0c0.087-0.002 0.174-0.004 0.261-0.007zM15.584 22.889c-0.006 0-0.012-0-0.019-0 0.006 0 0.013 0 0.019 0zM15.099 22.884c-0.090-0.002-0.181-0.004-0.271-0.006-0 0-0-0-0-0 0.090 0.003 0.181 0.005 0.272 0.006zM14.696 22.874c-0.085-0.003-0.171-0.006-0.256-0.010-0 0-0 0-0.001-0 0.086 0.004 0.171 0.007 0.257 0.010zM14.315 22.859c-0.069-0.003-0.137-0.007-0.205-0.011 0.068 0.004 0.137 0.008 0.205 0.011zM13.942 22.838c-0.087-0.006-0.173-0.012-0.26-0.019 0.087 0.006 0.173 0.013 0.26 0.019-0 0-0 0-0-0zM13.452 22.801c-0.043-0.004-0.086-0.008-0.129-0.011 0.043 0.004 0.086 0.008 0.129 0.011zM12.63 22.718c-0.075-0.009-0.15-0.018-0.224-0.027-0-0-0-0-0-0 0.075 0.010 0.15 0.019 0.225 0.027-0 0-0 0-0-0zM12.244 22.669c-0.044-0.006-0.087-0.012-0.131-0.018 0.044 0.006 0.088 0.012 0.132 0.018-0 0-0-0-0-0zM20.499 5.715c-0.001-0-0.001-0-0.002-0s-0-0-0-0 0.002 0 0.002 0zM11.271 22.517c-0 0-0 0-0 0 0.072 0.013 0.145 0.026 0.217 0.038-0.073-0.012-0.145-0.025-0.217-0.038zM11.116 22.489c-0.021-0.004-0.043-0.008-0.064-0.012 0.021 0.004 0.043 0.008 0.064 0.012zM10.771 22.422c-0.115-0.023-0.23-0.048-0.345-0.073l-0-0c0.115 0.025 0.23 0.049 0.345 0.073-0 0-0-0-0-0zM9.965 22.243c-0.083-0.020-0.166-0.041-0.249-0.062-0-0-0-0-0-0 0.083 0.021 0.166 0.042 0.249 0.062zM9.387 9.107c-0.004 0.005-0.007 0.010-0.011 0.014 0.008-0.011 0.017-0.021 0.025-0.032-0.005 0.006-0.009 0.012-0.014 0.018zM8.863 9.891c-0.004 0.007-0.008 0.014-0.012 0.021 0.005-0.009 0.010-0.018 0.015-0.027-0.001 0.002-0.002 0.004-0.004 0.006zM35.538 19.367c-0-0.041-0.001-0.082-0.002-0.122-0.001-0.026-0.001-0.053-0.002-0.079-0.001-0.041-0.003-0.083-0.005-0.124-0.001-0.025-0.002-0.051-0.004-0.076-0.003-0.045-0.006-0.090-0.010-0.135-0.002-0.022-0.003-0.043-0.005-0.065-0.006-0.066-0.012-0.132-0.020-0.198l-1.052-9.111c0 0.003 0.001 0.006 0.001 0.008-0.157-1.371-0.7-2.721-1.666-3.982-4.134-5.394-14.439-7.099-23.015-3.807-6.585 2.528-10.236 7.265-9.707 11.771-0.001-0.005-0.001-0.010-0.002-0.015l1.052 9.111c0.158 1.368 0.701 2.716 1.665 3.973 0.057 0.075 0.117 0.149 0.176 0.223 0.016 0.019 0.031 0.038 0.047 0.058 0.054 0.066 0.11 0.131 0.166 0.196 0.007 0.008 0.014 0.016 0.020 0.024 0.062 0.071 0.126 0.142 0.191 0.211 0.017 0.018 0.034 0.036 0.050 0.054 0.055 0.059 0.112 0.118 0.169 0.176 0.012 0.012 0.024 0.024 0.036 0.037 0.067 0.068 0.135 0.134 0.204 0.2 0.017 0.016 0.035 0.033 0.052 0.049 0.026 0.025 0.053 0.050 0.079 0.075 0.024 0.022 0.049 0.044 0.074 0.066 0.032 0.029 0.063 0.057 0.095 0.086 0.048 0.042 0.096 0.084 0.144 0.126 0.031 0.027 0.062 0.053 0.093 0.080 0.053 0.045 0.107 0.089 0.162 0.133 0.027 0.022 0.054 0.045 0.082 0.067 0.078 0.063 0.158 0.125 0.238 0.186 0.004 0.003 0.008 0.006 0.012 0.009 0.084 0.064 0.17 0.127 0.256 0.189 0.028 0.020 0.057 0.040 0.086 0.061 0.059 0.042 0.118 0.083 0.178 0.124 0.035 0.024 0.070 0.047 0.104 0.070 0.055 0.037 0.11 0.073 0.166 0.11 0.037 0.024 0.075 0.048 0.113 0.072 0.030 0.019 0.059 0.038 0.089 0.057 0.029 0.018 0.059 0.036 0.088 0.054 0.028 0.017 0.056 0.034 0.084 0.051 0.076 0.046 0.152 0.091 0.23 0.136 0.014 0.008 0.028 0.016 0.041 0.024 0.091 0.052 0.182 0.103 0.275 0.154 0.026 0.014 0.053 0.028 0.079 0.043 0.069 0.037 0.138 0.074 0.208 0.11 0.030 0.016 0.060 0.031 0.091 0.047 0.076 0.039 0.153 0.078 0.23 0.116 0.020 0.010 0.039 0.020 0.059 0.029 0.096 0.047 0.193 0.093 0.291 0.138 0.026 0.012 0.051 0.023 0.077 0.035 0.048 0.022 0.095 0.044 0.143 0.065 0.028 0.012 0.056 0.024 0.083 0.036 0.030 0.013 0.060 0.026 0.090 0.039 0.083 0.036 0.166 0.071 0.249 0.105 0.018 0.008 0.036 0.015 0.055 0.023 0.101 0.041 0.202 0.082 0.304 0.121 0.027 0.011 0.054 0.021 0.081 0.031 0.078 0.030 0.157 0.060 0.237 0.089 0.031 0.011 0.062 0.023 0.094 0.034 0.095 0.034 0.19 0.068 0.287 0.101 0.010 0.003 0.020 0.007 0.030 0.010 0.105 0.036 0.212 0.071 0.318 0.105 0.031 0.010 0.061 0.019 0.092 0.029 0.041 0.013 0.082 0.026 0.123 0.039 0.038 0.012 0.077 0.023 0.115 0.035 0.036 0.011 0.071 0.022 0.107 0.032 0.092 0.027 0.184 0.054 0.276 0.079 0.019 0.005 0.038 0.011 0.057 0.016 0.111 0.031 0.222 0.060 0.333 0.089 0.032 0.008 0.064 0.016 0.096 0.024 0.082 0.021 0.164 0.041 0.247 0.061 0.038 0.009 0.076 0.018 0.114 0.027 0.083 0.020 0.167 0.039 0.251 0.058 0.032 0.007 0.064 0.015 0.096 0.022 0.115 0.025 0.23 0.049 0.345 0.073 0.019 0.004 0.039 0.008 0.059 0.011 0.075 0.015 0.151 0.030 0.227 0.044 0.020 0.004 0.040 0.007 0.059 0.011 0.051 0.009 0.102 0.018 0.153 0.028 0.073 0.013 0.146 0.026 0.219 0.038 0.053 0.009 0.106 0.017 0.158 0.026 0.072 0.012 0.145 0.023 0.217 0.034 0.054 0.008 0.107 0.016 0.161 0.024 0.073 0.011 0.146 0.021 0.22 0.031 0.053 0.007 0.106 0.014 0.16 0.021 0.075 0.010 0.151 0.019 0.227 0.028 0.052 0.006 0.103 0.012 0.155 0.018 0.080 0.009 0.161 0.017 0.242 0.025 0.047 0.005 0.095 0.010 0.142 0.014 0.095 0.009 0.191 0.017 0.286 0.025 0.033 0.003 0.066 0.006 0.099 0.009 0.126 0.010 0.252 0.019 0.378 0.027 0.003 0 0.006 0 0.010 0.001 0.018 0.001 0.037 0.002 0.056 0.003 0.106 0.006 0.212 0.012 0.318 0.018 0.041 0.002 0.082 0.004 0.123 0.006 0.086 0.004 0.172 0.007 0.258 0.010 0.043 0.001 0.087 0.003 0.13 0.004 0.091 0.003 0.181 0.005 0.272 0.006 0.036 0.001 0.071 0.002 0.107 0.002 0.125 0.002 0.251 0.003 0.377 0.003 0.020 0 0.041-0 0.061-0 0.106-0 0.212-0.001 0.318-0.003 0.042-0.001 0.083-0.002 0.125-0.002 0.087-0.002 0.175-0.004 0.262-0.007 0.044-0.001 0.088-0.003 0.132-0.004 0.093-0.003 0.185-0.007 0.278-0.012 0.035-0.002 0.071-0.003 0.106-0.005 0.127-0.006 0.254-0.014 0.382-0.022 0.022-0.001 0.044-0.003 0.066-0.005 0.106-0.007 0.212-0.015 0.318-0.023 0.042-0.003 0.085-0.007 0.127-0.011 0.088-0.007 0.176-0.015 0.263-0.024 0.044-0.004 0.089-0.008 0.133-0.013 0.094-0.009 0.187-0.019 0.281-0.030 0.035-0.004 0.070-0.007 0.105-0.012 0.128-0.015 0.255-0.030 0.383-0.047 0.024-0.003 0.048-0.007 0.072-0.010 0.083-0.011 0.165-0.022 0.248-0.034 0.020-0.003 0.040-0.006 0.060-0.009 0.052-0.008 0.105-0.016 0.157-0.023 0.081-0.012 0.161-0.025 0.242-0.038 0.054-0.009 0.108-0.018 0.162-0.027 0.080-0.013 0.159-0.027 0.239-0.041 0.054-0.009 0.107-0.019 0.161-0.029 0.081-0.015 0.163-0.030 0.244-0.046 0.051-0.010 0.102-0.020 0.153-0.030 0.088-0.018 0.176-0.036 0.263-0.054 0.044-0.009 0.088-0.018 0.132-0.028 0.12-0.026 0.239-0.053 0.358-0.080 0.012-0.003 0.024-0.005 0.036-0.008 0.131-0.030 0.263-0.062 0.394-0.095 0.040-0.010 0.079-0.020 0.119-0.030 0.074-0.019 0.149-0.037 0.223-0.057 0.018-0.005 0.036-0.010 0.054-0.015 0.038-0.010 0.076-0.020 0.114-0.031 0.090-0.024 0.179-0.049 0.269-0.075 0.041-0.012 0.082-0.023 0.123-0.035 0.096-0.028 0.193-0.056 0.289-0.085 0.029-0.009 0.058-0.017 0.088-0.026 0.124-0.038 0.247-0.077 0.371-0.117 0.029-0.010 0.059-0.019 0.088-0.029 0.095-0.031 0.19-0.063 0.285-0.095 0.041-0.014 0.081-0.028 0.122-0.042 0.088-0.030 0.175-0.061 0.263-0.093 0.038-0.014 0.075-0.027 0.113-0.041 0.122-0.045 0.244-0.090 0.366-0.137 0.101-0.039 0.202-0.078 0.302-0.118 0.034-0.014 0.067-0.027 0.101-0.041 0.066-0.027 0.132-0.053 0.197-0.080 0.039-0.016 0.078-0.033 0.117-0.049 0.059-0.025 0.118-0.050 0.176-0.075 0.042-0.018 0.083-0.036 0.124-0.054 0.055-0.024 0.111-0.048 0.165-0.073 0.042-0.019 0.084-0.038 0.126-0.058 0.053-0.024 0.106-0.048 0.159-0.073 0.043-0.020 0.085-0.040 0.127-0.060 0.051-0.024 0.103-0.049 0.154-0.073 0.043-0.021 0.085-0.041 0.127-0.062 0.050-0.025 0.1-0.049 0.15-0.074 0.042-0.021 0.084-0.043 0.126-0.064 0.038-0.019 0.076-0.038 0.113-0.058 0.010-0.005 0.019-0.010 0.029-0.015 0.069-0.036 0.138-0.072 0.206-0.109 0.028-0.015 0.057-0.030 0.085-0.045 0.096-0.052 0.191-0.104 0.285-0.157 0.017-0.009 0.033-0.019 0.049-0.028 0.078-0.044 0.155-0.088 0.231-0.132 0.033-0.019 0.065-0.038 0.097-0.057 0.060-0.035 0.119-0.071 0.178-0.106 0.036-0.022 0.071-0.044 0.107-0.065 0.055-0.034 0.109-0.067 0.164-0.101 0.037-0.023 0.073-0.046 0.109-0.069 0.053-0.034 0.105-0.067 0.157-0.101 0.036-0.023 0.072-0.047 0.107-0.070 0.053-0.035 0.105-0.070 0.157-0.105 0.034-0.023 0.067-0.045 0.101-0.068 0.055-0.038 0.11-0.077 0.165-0.115 0.023-0.016 0.046-0.032 0.069-0.048 0.006-0.005 0.013-0.009 0.019-0.014 0.037-0.026 0.073-0.053 0.109-0.079 0.040-0.029 0.079-0.057 0.118-0.086 0.036-0.027 0.072-0.053 0.107-0.080 0.039-0.029 0.077-0.058 0.116-0.087 0.035-0.027 0.070-0.054 0.105-0.081 0.038-0.029 0.076-0.058 0.113-0.088 0.035-0.027 0.069-0.055 0.103-0.082 0.037-0.030 0.074-0.059 0.111-0.089 0.034-0.028 0.067-0.056 0.101-0.083 0.036-0.030 0.072-0.060 0.108-0.090 0.033-0.028 0.066-0.057 0.099-0.085 0.035-0.030 0.070-0.060 0.104-0.090 0.033-0.029 0.065-0.057 0.097-0.086 0.034-0.030 0.068-0.061 0.102-0.091 0.032-0.029 0.063-0.058 0.095-0.087 0.024-0.022 0.048-0.044 0.071-0.066 0.009-0.009 0.019-0.018 0.028-0.027 0.030-0.028 0.059-0.056 0.088-0.084 0.033-0.032 0.066-0.063 0.099-0.095 0.029-0.028 0.058-0.057 0.086-0.085 0.032-0.032 0.064-0.064 0.096-0.096 0.028-0.029 0.056-0.057 0.084-0.086 0.031-0.032 0.062-0.064 0.093-0.096 0.028-0.029 0.055-0.058 0.082-0.087 0.030-0.032 0.060-0.065 0.090-0.097 0.027-0.029 0.054-0.059 0.080-0.088 0.029-0.033 0.059-0.065 0.087-0.098 0.026-0.029 0.052-0.059 0.078-0.088 0.029-0.033 0.057-0.066 0.085-0.099 0.025-0.030 0.050-0.059 0.075-0.089 0.028-0.033 0.055-0.066 0.083-0.1 0.024-0.030 0.049-0.060 0.073-0.090 0.011-0.013 0.022-0.027 0.032-0.040 0.015-0.019 0.029-0.038 0.044-0.056 0.027-0.034 0.053-0.068 0.079-0.102 0.024-0.032 0.049-0.063 0.073-0.095 0.026-0.034 0.051-0.068 0.076-0.102 0.023-0.032 0.047-0.064 0.070-0.096 0.025-0.034 0.049-0.069 0.074-0.103 0.023-0.032 0.045-0.064 0.067-0.096 0.024-0.035 0.048-0.069 0.071-0.104 0.022-0.032 0.043-0.065 0.065-0.097 0.023-0.035 0.046-0.069 0.068-0.104 0.021-0.033 0.042-0.065 0.062-0.098 0.022-0.035 0.044-0.070 0.065-0.105 0.020-0.033 0.040-0.066 0.060-0.099 0.021-0.035 0.042-0.070 0.062-0.105 0.019-0.033 0.038-0.066 0.057-0.099 0.020-0.035 0.040-0.070 0.059-0.105 0.010-0.018 0.020-0.036 0.030-0.054 0.007-0.013 0.014-0.026 0.021-0.039 0.027-0.050 0.053-0.1 0.079-0.15 0.013-0.026 0.027-0.052 0.040-0.078 0.031-0.061 0.061-0.122 0.090-0.183 0.007-0.015 0.015-0.030 0.022-0.045 0.036-0.076 0.071-0.152 0.105-0.228 0.009-0.021 0.018-0.042 0.027-0.063 0.024-0.056 0.048-0.111 0.071-0.167 0.011-0.028 0.022-0.055 0.034-0.083 0.020-0.050 0.039-0.1 0.059-0.149 0.011-0.029 0.022-0.058 0.033-0.087 0.019-0.050 0.037-0.101 0.054-0.151 0.010-0.027 0.019-0.055 0.029-0.082 0.020-0.058 0.039-0.117 0.057-0.176 0.006-0.019 0.012-0.038 0.018-0.057 0.024-0.077 0.046-0.155 0.068-0.232 0.001-0.003 0.002-0.006 0.003-0.009 0.017-0.062 0.033-0.125 0.049-0.187 0.003-0.011 0.005-0.021 0.008-0.032 0.014-0.055 0.027-0.111 0.039-0.166 0.005-0.023 0.010-0.046 0.015-0.069 0.009-0.043 0.019-0.087 0.027-0.13 0.005-0.026 0.010-0.052 0.015-0.077 0.008-0.041 0.015-0.082 0.022-0.123 0.005-0.027 0.009-0.053 0.013-0.080 0.007-0.041 0.013-0.082 0.019-0.123 0.004-0.026 0.008-0.052 0.011-0.078 0.006-0.043 0.011-0.086 0.016-0.129 0.003-0.023 0.006-0.047 0.008-0.071 0.006-0.053 0.011-0.106 0.015-0.159 0.001-0.014 0.003-0.027 0.004-0.041 0.006-0.066 0.010-0.133 0.014-0.199 0.001-0.018 0.002-0.036 0.002-0.055 0.002-0.048 0.005-0.097 0.006-0.145 0.001-0.024 0.001-0.049 0.002-0.073 0.001-0.042 0.002-0.084 0.002-0.127 0-0.026-0-0.052-0-0.079z"></path><path class="main-svg__item main-svg__item--down" fill="#161616" d="M17.978 5.495c-0.019 0-0.038 0-0.057 0.001v0c-0.1 0.001-0.2 0.004-0.3 0.008v0c-0.021 0.001-0.043 0.002-0.064 0.003v0c-0.097 0.004-0.194 0.009-0.292 0.015v0c-0.007 0-0.014 0.001-0.022 0.001v0c-0.102 0.007-0.205 0.015-0.307 0.024v0c-0.023 0.002-0.045 0.004-0.068 0.006v0c-0.102 0.009-0.203 0.020-0.305 0.032v0c-0.014 0.002-0.027 0.003-0.041 0.005v0c-0.094 0.011-0.188 0.023-0.281 0.036v0c-0.013 0.002-0.025 0.003-0.038 0.005v0c-0.011 0.002-0.021 0.003-0.032 0.005v0c-0.027 0.004-0.054 0.008-0.081 0.012v0c-0.042 0.006-0.084 0.013-0.126 0.020v0c-0.028 0.005-0.056 0.009-0.084 0.014v0c-0.041 0.007-0.083 0.014-0.124 0.021v0c-0.028 0.005-0.056 0.010-0.084 0.015v0c-0.042 0.008-0.084 0.016-0.126 0.024v0c-0.027 0.005-0.054 0.010-0.081 0.016v0c-0.045 0.009-0.090 0.018-0.135 0.028v0c-0.024 0.005-0.047 0.010-0.071 0.015v0c-0.062 0.013-0.123 0.027-0.185 0.041v0c-0.007 0.002-0.013 0.003-0.020 0.004v0c-0.068 0.016-0.136 0.032-0.204 0.049v0c-0.021 0.005-0.043 0.011-0.064 0.016v0c-0.038 0.010-0.076 0.019-0.114 0.029v0c-0.006 0.002-0.012 0.003-0.018 0.005v0c-0.097 0.026-0.195 0.053-0.291 0.081v0c-0.021 0.006-0.042 0.013-0.064 0.019v0c-0.089 0.026-0.178 0.054-0.267 0.082v0c-0.012 0.004-0.024 0.007-0.036 0.011v0c-0.097 0.031-0.193 0.064-0.289 0.098v0c-0.022 0.008-0.045 0.016-0.067 0.024v0c-0.097 0.035-0.195 0.070-0.291 0.107v0c-0.101 0.039-0.201 0.079-0.299 0.12v0c-0.004 0.002-0.007 0.003-0.011 0.004v0c-0.095 0.040-0.189 0.080-0.282 0.122v0c-0.006 0.003-0.013 0.006-0.019 0.008v0c-0.091 0.041-0.18 0.082-0.268 0.124v0c-0.008 0.004-0.016 0.008-0.025 0.012v0c-0.086 0.042-0.171 0.084-0.255 0.127v0c-0.006 0.003-0.012 0.006-0.018 0.009v0c-0.005 0.003-0.010 0.005-0.015 0.008v0c-0.036 0.019-0.072 0.038-0.108 0.057v0c-0.014 0.008-0.029 0.015-0.043 0.023v0c-0.050 0.027-0.099 0.054-0.148 0.082v0c-0.009 0.005-0.017 0.010-0.025 0.014v0c-0.040 0.023-0.081 0.046-0.12 0.069v0c-0.017 0.010-0.034 0.020-0.050 0.030v0c-0.031 0.018-0.062 0.037-0.093 0.055v0c-0.019 0.011-0.037 0.023-0.055 0.034v0c-0.029 0.018-0.057 0.035-0.085 0.053v0c-0.019 0.012-0.038 0.024-0.057 0.036v0c-0.027 0.017-0.055 0.035-0.082 0.053v0c-0.019 0.012-0.037 0.024-0.056 0.037v0c-0.027 0.018-0.054 0.036-0.081 0.054v0c-0.018 0.012-0.035 0.024-0.053 0.036v0c-0.029 0.020-0.057 0.039-0.085 0.059v0c-0.012 0.009-0.025 0.017-0.037 0.026v0c-0.002 0.002-0.004 0.003-0.006 0.005v0c-0.072 0.051-0.143 0.104-0.213 0.157v0c-0.007 0.005-0.014 0.010-0.021 0.015v0c-0.069 0.052-0.136 0.106-0.202 0.159v0c-0.007 0.006-0.014 0.011-0.021 0.017v0c-0.065 0.053-0.129 0.107-0.192 0.162v0c-0.007 0.006-0.015 0.013-0.022 0.019v0c-0.062 0.054-0.122 0.109-0.182 0.164v0c-0.004 0.004-0.009 0.008-0.014 0.012v0c-0.003 0.003-0.006 0.006-0.008 0.008v0c-0.057 0.053-0.112 0.107-0.167 0.161v0c-0.008 0.008-0.016 0.016-0.024 0.024v0c-0.053 0.054-0.106 0.108-0.157 0.163v0c-0.008 0.008-0.016 0.017-0.023 0.025v0c-0.050 0.055-0.1 0.11-0.148 0.165v0c-0.007 0.009-0.015 0.017-0.022 0.026v0c-0.048 0.056-0.094 0.111-0.139 0.168v0c-0.003 0.004-0.006 0.008-0.009 0.011v0c-0.008 0.010-0.015 0.020-0.023 0.029v0c-0.014 0.018-0.028 0.035-0.041 0.053v0c-0.013 0.016-0.025 0.033-0.038 0.050v0c-0.013 0.018-0.027 0.035-0.040 0.053v0c-0.012 0.017-0.025 0.033-0.037 0.050v0c-0.013 0.018-0.025 0.035-0.038 0.053v0c-0.012 0.017-0.024 0.034-0.035 0.051v0c-0.012 0.018-0.025 0.036-0.037 0.054v0c-0.011 0.017-0.023 0.034-0.034 0.051v0c-0.012 0.018-0.023 0.036-0.035 0.054v0c-0.011 0.017-0.022 0.034-0.033 0.051v0c-0.011 0.018-0.023 0.036-0.034 0.054v0c-0.011 0.017-0.021 0.034-0.031 0.052v0c-0.011 0.018-0.022 0.036-0.032 0.054v0c-0.010 0.017-0.020 0.034-0.030 0.052v0c-0.010 0.018-0.021 0.037-0.031 0.055v0c-0.005 0.009-0.011 0.019-0.016 0.028v0c-0.004 0.007-0.007 0.014-0.011 0.021v0c-0.014 0.026-0.028 0.052-0.041 0.078v0c-0.007 0.014-0.014 0.027-0.021 0.041v0c-0.016 0.032-0.032 0.063-0.047 0.095v0c-0.004 0.008-0.008 0.015-0.011 0.023v0c-0.019 0.039-0.037 0.079-0.055 0.119v0c-0.005 0.011-0.010 0.022-0.014 0.033v0c-0.012 0.029-0.025 0.057-0.037 0.086v0c-0.006 0.014-0.012 0.029-0.018 0.044v0c-0.010 0.026-0.021 0.052-0.030 0.078v0c-0.006 0.015-0.011 0.030-0.017 0.045v0c-0.010 0.026-0.019 0.053-0.028 0.079v0c-0.005 0.014-0.010 0.028-0.015 0.043v0c-0.010 0.031-0.020 0.061-0.030 0.092v0c-0.003 0.010-0.006 0.019-0.009 0.029v0c-0.012 0.040-0.024 0.081-0.035 0.121v0c-0 0.002-0.001 0.003-0.001 0.005v0c-0.001 0.003-0.002 0.007-0.003 0.010v0c-0.015 0.055-0.029 0.111-0.042 0.166v0c-0.002 0.007-0.003 0.013-0.005 0.020v0c-0.013 0.056-0.024 0.112-0.034 0.168v0c-0.002 0.010-0.004 0.021-0.006 0.031v0c-0.010 0.055-0.018 0.11-0.026 0.166v0c-0.001 0.009-0.002 0.019-0.004 0.029v0c-0.007 0.057-0.014 0.115-0.018 0.172v0c-0 0.003-0 0.005-0.001 0.008v0c-0.005 0.056-0.008 0.113-0.010 0.17v0c-0 0.008-0.001 0.016-0.001 0.024v0c-0.002 0.056-0.002 0.111-0.002 0.167v0c0 0.011 0 0.021 0 0.032v0c0.001 0.055 0.003 0.111 0.007 0.166v0c0.001 0.009 0.001 0.018 0.002 0.026v0c0.004 0.058 0.009 0.116 0.016 0.174v0l1.052 9.111c-0.007-0.058-0.012-0.116-0.016-0.174v0c-0.001-0.009-0.001-0.018-0.002-0.026v0c-0.003-0.055-0.006-0.111-0.007-0.166v0c-0-0.011-0-0.021-0.001-0.032v0c-0.001-0.056-0-0.111 0.002-0.167v0c0-0.008 0.001-0.016 0.001-0.024v0c0.002-0.056 0.005-0.113 0.010-0.169v0c0-0.003 0-0.005 0.001-0.008v0c0.005-0.057 0.011-0.115 0.018-0.172v0c0.001-0.010 0.002-0.019 0.004-0.029v0c0.007-0.055 0.016-0.111 0.026-0.166v0c0.002-0.010 0.004-0.021 0.006-0.031v0c0.010-0.056 0.021-0.112 0.034-0.168v0c0.002-0.007 0.003-0.014 0.005-0.020v0c0.013-0.055 0.027-0.111 0.042-0.166v0c0.001-0.005 0.003-0.010 0.004-0.015v0c0.011-0.040 0.023-0.081 0.035-0.121v0c0.003-0.010 0.006-0.020 0.010-0.030v0c0.010-0.030 0.019-0.061 0.030-0.091v0c0.005-0.014 0.010-0.029 0.015-0.043v0c0.009-0.026 0.018-0.052 0.028-0.078v0c0.006-0.015 0.011-0.030 0.017-0.045v0c0.010-0.026 0.020-0.052 0.030-0.078v0c0.006-0.014 0.012-0.029 0.018-0.043v0c0.012-0.029 0.024-0.058 0.037-0.086v0c0.005-0.011 0.009-0.022 0.014-0.033v0c0.018-0.040 0.036-0.079 0.054-0.119v0c0.004-0.008 0.008-0.016 0.012-0.024v0c0.015-0.032 0.031-0.063 0.047-0.095v0c0.007-0.014 0.014-0.027 0.021-0.041v0c0.013-0.026 0.027-0.052 0.041-0.078v0c0.009-0.016 0.018-0.033 0.027-0.049v0c0.010-0.018 0.020-0.036 0.031-0.054v0c0.010-0.017 0.020-0.035 0.030-0.052v0c0.011-0.018 0.021-0.036 0.032-0.054v0c0.010-0.017 0.021-0.034 0.031-0.052v0c0.011-0.018 0.022-0.036 0.033-0.054v0c0.011-0.017 0.022-0.034 0.033-0.051v0c0.012-0.018 0.023-0.036 0.035-0.054v0c0.011-0.017 0.022-0.034 0.034-0.051v0c0.012-0.018 0.024-0.036 0.037-0.054v0c0.012-0.017 0.023-0.034 0.035-0.050v0c0.013-0.018 0.025-0.035 0.038-0.053v0c0.012-0.017 0.024-0.034 0.037-0.050v0c0.013-0.018 0.026-0.035 0.039-0.053v0c0.013-0.017 0.025-0.033 0.038-0.050v0c0.014-0.018 0.027-0.035 0.041-0.053v0c0.011-0.014 0.021-0.027 0.032-0.041v0c0.045-0.056 0.091-0.112 0.139-0.168v0c0.007-0.009 0.015-0.017 0.022-0.026v0c0.048-0.055 0.097-0.11 0.147-0.165v0c0.008-0.008 0.016-0.017 0.023-0.025v0c0.051-0.055 0.103-0.109 0.157-0.163v0c0.008-0.008 0.016-0.016 0.023-0.023v0c0.054-0.054 0.11-0.108 0.167-0.161v0c0.007-0.007 0.015-0.014 0.022-0.021v0c0.059-0.055 0.12-0.11 0.182-0.164v0c0.007-0.006 0.015-0.013 0.022-0.019v0c0.063-0.054 0.127-0.108 0.192-0.162v0c0.007-0.006 0.014-0.012 0.021-0.017v0c0.066-0.054 0.134-0.107 0.202-0.159v0c0.007-0.005 0.014-0.010 0.020-0.015v0c0.070-0.053 0.141-0.105 0.213-0.157v0c0.014-0.010 0.028-0.020 0.042-0.030v0c0.028-0.020 0.057-0.040 0.085-0.060v0c0.017-0.012 0.035-0.024 0.053-0.036v0c0.027-0.018 0.054-0.036 0.081-0.055v0c0.019-0.012 0.037-0.024 0.056-0.037v0c0.027-0.018 0.054-0.035 0.082-0.053v0c0.019-0.012 0.038-0.024 0.057-0.036v0c0.028-0.018 0.056-0.035 0.085-0.053v0c0.018-0.011 0.037-0.023 0.056-0.034v0c0.031-0.019 0.062-0.037 0.093-0.055v0c0.017-0.010 0.033-0.020 0.050-0.030v0c0.040-0.023 0.080-0.046 0.12-0.069v0c0.008-0.005 0.017-0.010 0.025-0.014v0c0.049-0.027 0.099-0.055 0.149-0.082v0c0.014-0.008 0.029-0.015 0.044-0.023v0c0.036-0.019 0.071-0.038 0.107-0.057v0c0.011-0.006 0.022-0.011 0.033-0.017v0c0.084-0.043 0.169-0.086 0.255-0.127v0c0.008-0.004 0.016-0.008 0.024-0.011v0c0.088-0.042 0.177-0.084 0.268-0.124v0c0.006-0.003 0.013-0.006 0.019-0.008v0c0.093-0.041 0.187-0.082 0.282-0.122v0c0.004-0.002 0.007-0.003 0.011-0.004v0c0.098-0.041 0.198-0.081 0.299-0.12v0c0.097-0.037 0.194-0.072 0.291-0.107v0c0.022-0.008 0.045-0.016 0.067-0.024v0c0.096-0.034 0.192-0.066 0.289-0.098v0c0.012-0.004 0.024-0.007 0.036-0.011v0c0.089-0.028 0.178-0.056 0.267-0.082v0c0.021-0.006 0.042-0.013 0.063-0.019v0c0.097-0.028 0.194-0.055 0.292-0.081v0c0.044-0.012 0.088-0.023 0.132-0.034v0c0.021-0.005 0.043-0.011 0.064-0.016v0c0.068-0.017 0.136-0.033 0.204-0.049v0c0.006-0.001 0.013-0.003 0.020-0.004v0c0.062-0.014 0.123-0.028 0.185-0.041v0c0.024-0.005 0.047-0.010 0.071-0.015v0c0.045-0.009 0.090-0.019 0.135-0.028v0c0.027-0.005 0.054-0.011 0.081-0.016v0c0.042-0.008 0.084-0.016 0.126-0.024v0c0.028-0.005 0.056-0.010 0.084-0.015v0c0.041-0.007 0.083-0.014 0.124-0.021v0c0.028-0.005 0.056-0.009 0.084-0.014v0c0.042-0.007 0.084-0.013 0.126-0.020v0c0.027-0.004 0.054-0.008 0.081-0.012v0c0.023-0.003 0.046-0.006 0.070-0.010v0c0.094-0.013 0.188-0.025 0.281-0.036v0c0.014-0.002 0.027-0.003 0.041-0.005v0c0.102-0.012 0.203-0.022 0.305-0.032v0c0.023-0.002 0.045-0.004 0.068-0.006v0c0.103-0.009 0.205-0.017 0.307-0.024v0c0.007-0 0.015-0.001 0.022-0.001v0c0.097-0.006 0.195-0.011 0.292-0.015v0c0.021-0.001 0.043-0.002 0.064-0.003v0c0.1-0.004 0.2-0.006 0.3-0.008v0c0.019-0 0.038-0 0.057-0.001v0c0.092-0.001 0.184-0.001 0.276-0v0c0.014 0 0.029 0 0.043 0v0c0.1 0.001 0.199 0.004 0.299 0.008v0c0.022 0.001 0.044 0.002 0.067 0.003v0c0.1 0.004 0.2 0.009 0.3 0.015v0c0.067 0.004 0.134 0.009 0.2 0.014v0c0.016 0.001 0.033 0.003 0.049 0.004v0c0.050 0.004 0.101 0.009 0.151 0.013v0c0.025 0.002 0.049 0.005 0.074 0.007v0c0.042 0.004 0.084 0.009 0.126 0.013v0c0.027 0.003 0.054 0.006 0.081 0.009v0c0.039 0.005 0.078 0.009 0.117 0.014v0c0.028 0.004 0.056 0.007 0.084 0.011v0c0.038 0.005 0.076 0.010 0.114 0.016v0c0.028 0.004 0.056 0.008 0.084 0.012v0c0.038 0.006 0.075 0.012 0.113 0.018v0c0.028 0.004 0.055 0.009 0.083 0.014v0c0.038 0.006 0.076 0.013 0.114 0.020v0c0.027 0.005 0.053 0.009 0.080 0.014v0c0.023 0.004 0.045 0.009 0.067 0.013v0c0.081 0.016 0.162 0.032 0.242 0.049v0c0.014 0.003 0.029 0.006 0.043 0.009v0c0.090 0.020 0.178 0.040 0.266 0.062v0c0.020 0.005 0.041 0.010 0.061 0.015v0c0.084 0.021 0.167 0.043 0.25 0.065v0c0.007 0.002 0.013 0.004 0.020 0.005v0c0.087 0.024 0.174 0.050 0.26 0.076v0c0.021 0.006 0.041 0.013 0.062 0.019v0c0.078 0.024 0.155 0.049 0.232 0.075v0c0.004 0.001 0.009 0.003 0.013 0.004v0c0.080 0.027 0.159 0.056 0.238 0.085v0c0.020 0.008 0.041 0.015 0.061 0.023v0c0.070 0.027 0.14 0.054 0.21 0.082v0c0.009 0.004 0.018 0.007 0.026 0.011v0c0.076 0.031 0.152 0.064 0.227 0.097v0c0.019 0.008 0.037 0.016 0.056 0.025v0c0.070 0.031 0.139 0.063 0.207 0.096v0c0.008 0.004 0.017 0.008 0.026 0.012v0c0.074 0.036 0.148 0.073 0.22 0.111v0c0.018 0.009 0.035 0.019 0.053 0.028v0c0.068 0.036 0.135 0.073 0.201 0.111v0c0.005 0.003 0.011 0.006 0.016 0.009v0c0.070 0.040 0.139 0.082 0.208 0.124v0c0.024 0.015 0.047 0.029 0.071 0.044v0c0.019 0.012 0.039 0.025 0.058 0.037v0c0.029 0.019 0.058 0.038 0.087 0.057v0c0.018 0.012 0.036 0.024 0.054 0.036v0c0.031 0.021 0.062 0.043 0.093 0.065v0c0.015 0.010 0.030 0.021 0.044 0.031v0c0.045 0.032 0.090 0.065 0.134 0.099v0c0.001 0.001 0.003 0.002 0.004 0.003v0c0.042 0.032 0.084 0.065 0.126 0.098v0c0.014 0.011 0.028 0.023 0.042 0.034v0c0.028 0.023 0.057 0.046 0.084 0.070v0c0.016 0.014 0.032 0.027 0.048 0.041v0c0.025 0.022 0.050 0.044 0.075 0.066v0c0.017 0.015 0.033 0.030 0.049 0.044v0c0.020 0.018 0.040 0.037 0.060 0.055v0c0.043 0.040 0.085 0.081 0.126 0.122v0c0.008 0.008 0.017 0.016 0.025 0.024v0c0.048 0.049 0.095 0.098 0.142 0.148v0c0.012 0.013 0.024 0.027 0.036 0.040v0c0.035 0.039 0.070 0.078 0.104 0.118v0c0.013 0.015 0.026 0.030 0.038 0.045v0c0.043 0.052 0.086 0.105 0.127 0.159v0c0.501 0.654 0.784 1.355 0.866 2.066v0l-1.052-9.111c-0.082-0.712-0.365-1.412-0.866-2.066v0c-0.041-0.054-0.084-0.107-0.127-0.159v0c-0.013-0.015-0.025-0.030-0.038-0.045v0c-0.034-0.040-0.068-0.079-0.104-0.118v0c-0.012-0.013-0.024-0.027-0.036-0.040v0c-0.046-0.050-0.093-0.1-0.142-0.149v0c-0.008-0.008-0.016-0.016-0.024-0.024v0c-0.041-0.041-0.083-0.082-0.126-0.122v0c-0.007-0.007-0.014-0.014-0.021-0.020v0c-0.013-0.012-0.026-0.023-0.038-0.035v0c-0.016-0.015-0.033-0.030-0.049-0.044v0c-0.025-0.022-0.050-0.044-0.075-0.066v0c-0.016-0.014-0.032-0.028-0.048-0.041v0c-0.028-0.023-0.056-0.047-0.084-0.070v0c-0.014-0.011-0.028-0.023-0.042-0.034v0c-0.041-0.033-0.083-0.066-0.126-0.098v0c-0.001-0.001-0.003-0.002-0.004-0.003v0c-0.044-0.033-0.089-0.066-0.134-0.098v0c-0.015-0.011-0.030-0.021-0.045-0.031v0c-0.031-0.022-0.061-0.043-0.093-0.065v0c-0.018-0.012-0.036-0.024-0.054-0.036v0c-0.029-0.019-0.058-0.038-0.087-0.057v0c-0.019-0.013-0.039-0.025-0.058-0.037v0c-0.015-0.010-0.031-0.020-0.046-0.030v0c-0.008-0.005-0.016-0.010-0.024-0.014v0c-0.068-0.042-0.137-0.084-0.208-0.124v0c-0.006-0.003-0.011-0.006-0.017-0.009v0c-0.066-0.038-0.133-0.075-0.201-0.111v0c-0.018-0.009-0.035-0.019-0.053-0.028v0c-0.073-0.038-0.146-0.075-0.22-0.111v0c-0.009-0.004-0.017-0.008-0.026-0.012v0c-0.068-0.033-0.137-0.065-0.207-0.096v0c-0.010-0.005-0.020-0.010-0.031-0.014v0c-0.008-0.004-0.016-0.007-0.025-0.011v0c-0.075-0.033-0.15-0.065-0.227-0.096v0c-0.009-0.004-0.018-0.007-0.027-0.011v0c-0.069-0.028-0.139-0.055-0.21-0.082v0c-0.020-0.008-0.040-0.015-0.061-0.023v0c-0.079-0.029-0.158-0.058-0.238-0.085v0c-0.004-0.001-0.009-0.003-0.013-0.004v0c-0.077-0.026-0.154-0.051-0.232-0.075v0c-0.011-0.003-0.021-0.007-0.032-0.010v0c-0.010-0.003-0.020-0.006-0.030-0.009v0c-0.086-0.026-0.172-0.052-0.26-0.076v0c-0.007-0.002-0.013-0.003-0.020-0.005v0c-0.083-0.023-0.166-0.044-0.25-0.065v0c-0.020-0.005-0.041-0.010-0.061-0.015v0c-0.088-0.021-0.177-0.042-0.266-0.062v0c-0.014-0.003-0.029-0.006-0.043-0.009v0c-0.080-0.017-0.161-0.033-0.242-0.049v0c-0.012-0.002-0.024-0.005-0.036-0.007v0c-0.010-0.002-0.021-0.004-0.031-0.006v0c-0.027-0.005-0.053-0.010-0.080-0.014v0c-0.038-0.007-0.076-0.013-0.114-0.020v0c-0.027-0.005-0.055-0.009-0.083-0.014v0c-0.037-0.006-0.075-0.012-0.113-0.018v0c-0.028-0.004-0.056-0.008-0.084-0.012v0c-0.038-0.005-0.076-0.011-0.114-0.016v0c-0.028-0.004-0.056-0.007-0.084-0.011v0c-0.039-0.005-0.078-0.010-0.117-0.014v0c-0.027-0.003-0.054-0.006-0.081-0.009v0c-0.042-0.005-0.084-0.009-0.126-0.013v0c-0.025-0.003-0.049-0.005-0.074-0.007v0c-0.050-0.005-0.101-0.009-0.151-0.013v0c-0.016-0.001-0.033-0.003-0.049-0.004v0c-0.065-0.005-0.131-0.010-0.197-0.014v0c-0.001-0-0.002-0-0.004-0v0c-0.1-0.006-0.2-0.011-0.3-0.015v0c-0.022-0.001-0.044-0.002-0.066-0.003v0c-0.099-0.004-0.199-0.006-0.299-0.008v0c-0.014-0-0.029-0-0.043-0v0c-0.043-0-0.085-0.001-0.128-0.001v0c-0.049 0-0.098 0-0.147 0.001z"></path><path class="main-svg__item main-svg__item--front" fill="#292929" d="M21.136 16.524c4.46-1.712 6.332-5.374 4.183-8.179s-7.508-3.691-11.968-1.979c-4.46 1.712-6.332 5.374-4.183 8.179s7.508 3.691 11.968 1.979zM9.758 1.677c8.576-3.292 18.881-1.588 23.015 3.807s0.533 12.437-8.043 15.729c-8.577 3.292-18.881 1.588-23.015-3.807s-0.533-12.436 8.043-15.729z"></path><path class="main-svg__item main-svg__item--down" fill="#161616" d="M34.199 12.398c-0.184 0.669-0.455 1.332-0.809 1.98v0c-0.301 0.552-0.663 1.094-1.082 1.62v0c-0.396 0.497-0.843 0.98-1.34 1.444v0c-0.509 0.476-1.069 0.932-1.678 1.365v0c-0.701 0.498-1.468 0.965-2.297 1.393v0c-0.71 0.367-1.465 0.706-2.264 1.012v0c-0.834 0.32-1.684 0.593-2.544 0.82v0c-0.973 0.257-1.957 0.454-2.942 0.595v0c-1.788 0.255-3.579 0.322-5.311 0.21v0c-0.981-0.063-1.944-0.183-2.876-0.359v0c-0.799-0.151-1.576-0.342-2.324-0.572v0c-0.71-0.219-1.393-0.474-2.043-0.763v0c-0.669-0.298-1.303-0.632-1.896-1.001v0c-0.69-0.43-1.324-0.909-1.89-1.434v0c-0.439-0.406-0.837-0.841-1.191-1.302v0c-0.964-1.258-1.507-2.605-1.665-3.973v0l1.052 9.111c0.158 1.368 0.701 2.716 1.665 3.973v0c0.353 0.461 0.752 0.895 1.191 1.302v0c0.567 0.525 1.2 1.004 1.89 1.434v0c0.593 0.37 1.227 0.704 1.896 1.002v0c0.65 0.289 1.333 0.544 2.043 0.763v0c0.747 0.231 1.524 0.422 2.323 0.572v0c0.932 0.176 1.894 0.296 2.876 0.359v0c1.732 0.111 3.523 0.045 5.311-0.21v0c0.985-0.141 1.969-0.338 2.942-0.595v0c0.859-0.227 1.71-0.5 2.544-0.82v0c0.798-0.306 1.554-0.645 2.264-1.012v0c0.828-0.428 1.595-0.895 2.297-1.393v0c0.609-0.433 1.169-0.889 1.678-1.365v0c0.497-0.465 0.944-0.947 1.34-1.444v0c0.419-0.526 0.781-1.067 1.082-1.62v0c0.354-0.648 0.625-1.311 0.809-1.98v0c0.268-0.974 0.352-1.963 0.239-2.941v0l-1.052-9.111c0.113 0.978 0.029 1.966-0.239 2.941z"></path></symbol><symbol id="icon-number_4" viewBox="0 0 32 32"><path class="main-svg__item main-svg__item--side" fill="#121212" d="M26.662 7.942c0.016 0.047 0.032 0.094 0.048 0.141 0.007 0.020 0.014 0.040 0.021 0.060 0.006 0.018 0.012 0.037 0.018 0.055-0.028-0.086-0.057-0.171-0.087-0.256zM26.553 7.646c0.007 0.018 0.014 0.037 0.021 0.055 0.017 0.045 0.034 0.091 0.050 0.137 0.007 0.019 0.014 0.038 0.021 0.057-0.030-0.084-0.060-0.167-0.092-0.25zM26.437 7.35c0.005 0.013 0.011 0.027 0.016 0.040 0.012 0.031 0.025 0.062 0.037 0.093 0.010 0.025 0.020 0.051 0.029 0.076-0.027-0.070-0.055-0.14-0.083-0.209zM26.304 7.034c0.003 0.006 0.006 0.013 0.008 0.019 0.017 0.040 0.035 0.080 0.052 0.121 0.013 0.031 0.026 0.062 0.039 0.093 0.001 0.002 0.002 0.004 0.003 0.007-0.033-0.080-0.067-0.16-0.102-0.239zM26.168 6.736c0.002 0.004 0.004 0.008 0.006 0.013 0.014 0.031 0.029 0.062 0.043 0.093 0.018 0.039 0.036 0.079 0.054 0.118 0.001 0.002 0.002 0.004 0.003 0.006-0.034-0.077-0.069-0.154-0.105-0.23zM26.054 6.5c0.008 0.017 0.017 0.034 0.026 0.051 0.013 0.027 0.026 0.054 0.039 0.081 0.004 0.009 0.008 0.018 0.013 0.027-0.025-0.053-0.052-0.106-0.078-0.159zM25.899 6.198c0.006 0.011 0.012 0.022 0.018 0.033 0.008 0.016 0.017 0.031 0.025 0.047 0.009 0.017 0.018 0.035 0.027 0.053-0.023-0.045-0.046-0.089-0.070-0.133zM25.737 5.902c0.008 0.014 0.016 0.027 0.024 0.041s0.016 0.029 0.024 0.043c0.008 0.015 0.016 0.031 0.025 0.046-0.024-0.044-0.048-0.087-0.072-0.13zM25.567 5.611c0.002 0.004 0.005 0.008 0.007 0.012 0.011 0.019 0.023 0.038 0.034 0.057s0.022 0.038 0.033 0.058c-0.025-0.042-0.049-0.085-0.075-0.126zM25.391 5.327c0.007 0.011 0.014 0.022 0.021 0.033 0 0 0 0 0 0 0.018 0.029 0.036 0.059 0.054 0.088-0.025-0.040-0.050-0.081-0.076-0.121zM25.209 5.052c0.011 0.016 0.022 0.033 0.033 0.050 0.013 0.020 0.026 0.040 0.039 0.059-0.024-0.036-0.048-0.073-0.072-0.109zM25.022 4.784c0.004 0.006 0.008 0.011 0.012 0.017 0.017 0.024 0.034 0.049 0.051 0.073-0.021-0.030-0.042-0.060-0.063-0.090zM24.839 4.538c0.001 0.001 0.002 0.002 0.003 0.004 0.004 0.006 0.009 0.012 0.013 0.017-0.005-0.007-0.010-0.014-0.016-0.021zM24.553 4.177c0.011 0.013 0.021 0.025 0.032 0.038 0.003 0.003 0.005 0.007 0.008 0.010-0.013-0.016-0.027-0.032-0.040-0.048zM24.32 3.903c0.023 0.026 0.046 0.051 0.068 0.077 0.003 0.004 0.006 0.007 0.009 0.011 0.002 0.002 0.004 0.005 0.006 0.007-0.027-0.032-0.055-0.063-0.083-0.095zM24.092 3.651c0.017 0.018 0.034 0.036 0.051 0.054 0.013 0.014 0.025 0.028 0.038 0.042-0.029-0.032-0.059-0.064-0.089-0.096zM23.861 3.409c0.016 0.016 0.033 0.032 0.049 0.049 0.010 0.010 0.019 0.020 0.029 0.030 0.007 0.008 0.014 0.015 0.022 0.023-0.033-0.034-0.066-0.068-0.099-0.101zM23.625 3.177c0.017 0.016 0.034 0.032 0.051 0.049 0.013 0.013 0.026 0.026 0.040 0.039 0.004 0.004 0.009 0.009 0.013 0.013-0.034-0.034-0.069-0.067-0.104-0.1zM23.383 2.952c0.011 0.010 0.022 0.019 0.032 0.029 0.015 0.014 0.030 0.028 0.046 0.041 0.010 0.009 0.020 0.019 0.030 0.028-0.036-0.033-0.072-0.066-0.108-0.098zM23.136 2.735c0.016 0.014 0.033 0.027 0.049 0.041 0.006 0.005 0.012 0.010 0.018 0.016 0.015 0.013 0.029 0.026 0.043 0.038-0.037-0.032-0.073-0.064-0.11-0.095zM22.883 2.525c0.007 0.006 0.014 0.011 0.021 0.017 0.017 0.014 0.034 0.028 0.051 0.042 0.014 0.011 0.027 0.022 0.040 0.034-0.037-0.031-0.075-0.061-0.112-0.092zM22.613 2.314c0.019 0.014 0.038 0.028 0.056 0.042 0.023 0.018 0.045 0.036 0.068 0.054-0.041-0.032-0.082-0.064-0.124-0.096zM22.332 2.108c0.001 0.001 0.001 0.001 0.002 0.002 0.024 0.017 0.047 0.034 0.070 0.051 0.033 0.024 0.067 0.048 0.1 0.072 0.017 0.012 0.033 0.025 0.050 0.038-0.073-0.055-0.147-0.109-0.222-0.162zM22.099 1.947c0.021 0.014 0.042 0.028 0.063 0.042 0.020 0.013 0.039 0.027 0.058 0.040 0.030 0.021 0.061 0.042 0.091 0.063-0.070-0.049-0.14-0.098-0.211-0.145zM20.785 14.537c-0.525 4.175-4.115 7.559-8.018 7.559-0.262 0-0.519-0.016-0.77-0.046-0.014-0.025-0.029-0.049-0.043-0.074-0.008-0.014-0.016-0.028-0.024-0.042-0.034-0.060-0.067-0.121-0.099-0.183-0.008-0.015-0.015-0.031-0.023-0.046-0.026-0.050-0.051-0.101-0.076-0.153-0.005-0.010-0.009-0.020-0.014-0.030-0.028-0.060-0.056-0.121-0.082-0.182-0.004-0.010-0.009-0.020-0.013-0.031-0.027-0.062-0.052-0.125-0.077-0.188-0.004-0.009-0.007-0.018-0.010-0.027-0.025-0.065-0.050-0.131-0.073-0.197-0.002-0.006-0.004-0.011-0.006-0.017-0.024-0.069-0.047-0.138-0.069-0.207-0.001-0.002-0.001-0.003-0.002-0.005-0.022-0.070-0.042-0.14-0.062-0.21-0.002-0.008-0.004-0.015-0.006-0.023-0.019-0.068-0.036-0.136-0.053-0.205-0.003-0.010-0.005-0.021-0.008-0.031-0.016-0.068-0.031-0.136-0.045-0.204-0.002-0.012-0.005-0.023-0.007-0.035-0.014-0.069-0.027-0.137-0.039-0.207-0.002-0.011-0.004-0.022-0.006-0.033-0.012-0.071-0.023-0.142-0.032-0.213-0.001-0.009-0.002-0.018-0.003-0.026-0.010-0.074-0.019-0.149-0.027-0.225-0-0.004-0.001-0.007-0.001-0.011-0.008-0.076-0.014-0.152-0.020-0.229-0-0.005-0.001-0.010-0.001-0.015-0.005-0.076-0.009-0.152-0.012-0.228-0-0.010-0.001-0.020-0.001-0.029-0.002-0.074-0.004-0.148-0.004-0.223-0-0.012-0-0.024-0-0.036-0-0.074 0.001-0.148 0.003-0.223 0-0.012 0.001-0.025 0.001-0.037 0.002-0.075 0.006-0.15 0.010-0.226 0.001-0.011 0.002-0.023 0.002-0.034 0.005-0.078 0.011-0.156 0.018-0.234 0.001-0.008 0.002-0.015 0.002-0.023 0.008-0.082 0.017-0.165 0.027-0.248 0.525-4.175 4.115-7.559 8.018-7.559 0.263 0 0.52 0.016 0.771 0.046 0.75 1.272 1.091 2.862 0.874 4.587zM7.797 11.192c0.072-0.123 0.147-0.243 0.224-0.362-0.077 0.119-0.152 0.239-0.224 0.362zM7.301 18.716c0.011 0.022 0.022 0.043 0.033 0.065 0.004 0.008 0.008 0.015 0.012 0.023-0.015-0.029-0.030-0.058-0.044-0.088zM26.803 8.368c0.005 0.016 0.010 0.033 0.015 0.049 0.009 0.029 0.018 0.059 0.027 0.088-0.023-0.075-0.046-0.149-0.069-0.223 0.009 0.029 0.019 0.057 0.028 0.086zM26.872 8.594c0.008 0.027 0.016 0.055 0.024 0.083 0.014 0.049 0.028 0.097 0.041 0.146 0.002 0.009 0.005 0.018 0.007 0.027-0.025-0.092-0.051-0.184-0.078-0.275 0.002 0.006 0.004 0.013 0.006 0.019zM26.998 9.054c0.008 0.033 0.017 0.066 0.025 0.099l0.002 0.009c-0.020-0.080-0.040-0.159-0.061-0.238 0.012 0.043 0.023 0.086 0.034 0.13zM27.055 9.287c0.008 0.034 0.016 0.068 0.024 0.102 0.008 0.036 0.016 0.071 0.024 0.107-0.018-0.082-0.037-0.164-0.056-0.246 0.003 0.012 0.006 0.024 0.009 0.037zM27.131 9.626c0.009 0.044 0.018 0.089 0.027 0.133 0.005 0.024 0.009 0.049 0.014 0.073-0.016-0.084-0.033-0.167-0.051-0.249 0.003 0.014 0.006 0.029 0.009 0.043zM27.204 9.999c0.006 0.035 0.013 0.070 0.019 0.105 0.003 0.019 0.006 0.039 0.010 0.058-0.013-0.078-0.027-0.156-0.042-0.234 0.004 0.024 0.009 0.047 0.013 0.071zM27.262 10.346c0.007 0.047 0.014 0.094 0.021 0.142 0.001 0.008 0.002 0.017 0.004 0.025-0.012-0.085-0.025-0.17-0.039-0.254 0.005 0.029 0.009 0.058 0.014 0.087zM27.298 10.589c0.007 0.050 0.013 0.1 0.019 0.149 0.004 0.032 0.008 0.063 0.012 0.095 0.001 0.012 0.003 0.024 0.004 0.036-0.011-0.097-0.024-0.194-0.037-0.29 0 0.003 0.001 0.006 0.001 0.009zM27.347 14.203c-0.002 0.023-0.005 0.046-0.007 0.069-0.002 0.019-0.005 0.038-0.007 0.056 0.005-0.042 0.009-0.083 0.014-0.125zM27.349 11.004c0.003 0.025 0.006 0.050 0.008 0.075 0.004 0.039 0.007 0.079 0.011 0.119-0.008-0.080-0.016-0.16-0.025-0.239 0.002 0.015 0.003 0.030 0.005 0.046zM27.38 11.327c0.001 0.012 0.002 0.025 0.003 0.037 0.006 0.071 0.011 0.142 0.016 0.213 0 0.005 0.001 0.009 0.001 0.014-0.007-0.103-0.015-0.205-0.024-0.307 0.001 0.015 0.003 0.029 0.004 0.044zM27.404 11.665c0.003 0.054 0.007 0.109 0.009 0.163 0.002 0.030 0.003 0.059 0.004 0.089-0.004-0.089-0.009-0.178-0.014-0.267 0 0.005 0.001 0.010 0.001 0.015zM27.424 12.081c0.001 0.036 0.002 0.072 0.003 0.108 0.001 0.027 0.001 0.053 0.002 0.080-0.002-0.084-0.004-0.169-0.007-0.253 0.001 0.022 0.002 0.043 0.003 0.065zM27.432 12.446c0 0.048 0.001 0.096 0.001 0.145 0 0.016-0 0.032-0 0.048 0-0.093 0-0.185-0.001-0.278 0 0.028 0.001 0.057 0.001 0.085zM27.43 12.849c-0.001 0.038-0.002 0.076-0.002 0.114-0 0.012-0.001 0.024-0.001 0.036 0.002-0.087 0.004-0.174 0.005-0.26-0 0.037-0.001 0.073-0.001 0.11zM27.423 13.108c-0.001 0.038-0.003 0.076-0.004 0.114-0.002 0.049-0.005 0.098-0.007 0.147-0 0.001-0 0.002-0 0.003 0.005-0.092 0.009-0.184 0.012-0.276-0 0.004-0 0.008-0 0.011zM27.406 13.483c-0.003 0.050-0.006 0.101-0.010 0.151-0.003 0.037-0.005 0.074-0.008 0.11-0 0.005-0.001 0.010-0.001 0.014 0.008-0.101 0.014-0.202 0.020-0.303-0 0.009-0.001 0.018-0.002 0.027zM27.375 13.904c-0.003 0.034-0.006 0.069-0.009 0.104-0.003 0.032-0.006 0.064-0.010 0.096 0.008-0.085 0.016-0.17 0.023-0.255-0.002 0.019-0.003 0.037-0.005 0.056zM31.782 17.463c0.011-0.089 0.021-0.177 0.031-0.265 0.003-0.029 0.006-0.059 0.009-0.088 0.006-0.059 0.012-0.117 0.018-0.176 0.003-0.035 0.006-0.069 0.009-0.104 0.005-0.053 0.009-0.106 0.013-0.159 0.003-0.037 0.005-0.074 0.008-0.111 0.003-0.050 0.007-0.101 0.010-0.151 0.002-0.038 0.004-0.076 0.006-0.114 0.002-0.049 0.005-0.098 0.007-0.147 0.002-0.038 0.003-0.077 0.004-0.115 0.002-0.048 0.003-0.097 0.004-0.145 0.001-0.038 0.002-0.077 0.002-0.115 0.001-0.048 0.002-0.096 0.002-0.144 0-0.038 0.001-0.076 0.001-0.114 0-0.048-0-0.096-0.001-0.144-0-0.037-0.001-0.075-0.001-0.112-0.001-0.049-0.002-0.097-0.003-0.146-0.001-0.036-0.002-0.073-0.003-0.109-0.002-0.050-0.004-0.1-0.006-0.15-0.002-0.034-0.003-0.069-0.005-0.103-0.003-0.054-0.006-0.108-0.009-0.162-0.002-0.030-0.003-0.059-0.005-0.089-0.005-0.071-0.010-0.142-0.016-0.213-0.001-0.012-0.002-0.024-0.003-0.037-0.007-0.083-0.015-0.165-0.023-0.248-0.003-0.026-0.006-0.051-0.008-0.077-0.006-0.057-0.012-0.113-0.019-0.169-0.004-0.032-0.008-0.063-0.012-0.095-0.006-0.050-0.013-0.1-0.019-0.149-0.005-0.034-0.010-0.068-0.015-0.102-0.007-0.047-0.014-0.094-0.021-0.141-0.005-0.035-0.011-0.070-0.017-0.105-0.007-0.046-0.015-0.091-0.023-0.136-0.006-0.035-0.013-0.071-0.019-0.106-0.008-0.045-0.016-0.089-0.025-0.134-0.007-0.035-0.014-0.071-0.021-0.106-0.009-0.044-0.018-0.089-0.027-0.133-0.007-0.035-0.015-0.070-0.022-0.104-0.010-0.044-0.020-0.089-0.030-0.133-0.008-0.034-0.016-0.068-0.024-0.102-0.011-0.045-0.021-0.089-0.032-0.134-0.008-0.033-0.016-0.066-0.025-0.1-0.012-0.046-0.024-0.091-0.036-0.137-0.008-0.031-0.017-0.063-0.025-0.094-0.013-0.049-0.027-0.097-0.041-0.146-0.008-0.028-0.016-0.055-0.024-0.083-0.017-0.059-0.035-0.119-0.054-0.178-0.005-0.016-0.010-0.033-0.015-0.049-0.024-0.075-0.048-0.15-0.073-0.224-0.007-0.020-0.014-0.040-0.021-0.060-0.018-0.054-0.037-0.108-0.056-0.162-0.010-0.028-0.020-0.055-0.030-0.083-0.017-0.046-0.033-0.091-0.050-0.137-0.011-0.030-0.023-0.060-0.034-0.090-0.016-0.043-0.033-0.085-0.049-0.128-0.012-0.031-0.025-0.062-0.037-0.093-0.017-0.041-0.033-0.082-0.050-0.123-0.013-0.031-0.026-0.063-0.040-0.094-0.017-0.040-0.034-0.080-0.052-0.12-0.014-0.031-0.027-0.062-0.041-0.094-0.018-0.040-0.035-0.079-0.053-0.118-0.014-0.031-0.029-0.062-0.043-0.093-0.018-0.039-0.037-0.078-0.056-0.117-0.009-0.019-0.018-0.037-0.027-0.056-0.004-0.008-0.009-0.017-0.013-0.025-0.045-0.091-0.091-0.182-0.137-0.272-0.008-0.016-0.017-0.032-0.025-0.047-0.043-0.082-0.087-0.164-0.132-0.245-0.008-0.014-0.016-0.029-0.024-0.043-0.049-0.088-0.1-0.176-0.152-0.262-0.011-0.019-0.023-0.038-0.034-0.057-0.053-0.088-0.106-0.175-0.161-0.262-0-0-0.001-0.001-0.001-0.001-0.055-0.087-0.112-0.172-0.169-0.257-0.012-0.018-0.025-0.037-0.037-0.055-0.056-0.083-0.114-0.165-0.172-0.246-0.009-0.013-0.019-0.026-0.028-0.039-0.054-0.074-0.108-0.147-0.163-0.22-0.011-0.014-0.021-0.028-0.032-0.043-0.061-0.079-0.122-0.157-0.184-0.234-0.014-0.017-0.027-0.034-0.041-0.050-0.062-0.076-0.124-0.15-0.188-0.224-0.003-0.004-0.006-0.007-0.009-0.011-0.066-0.076-0.133-0.152-0.201-0.226-0.015-0.016-0.030-0.033-0.045-0.049-0.067-0.073-0.135-0.145-0.204-0.217-0.010-0.010-0.020-0.020-0.030-0.030-0.063-0.065-0.128-0.129-0.192-0.193-0.014-0.013-0.027-0.026-0.040-0.040-0.071-0.069-0.142-0.136-0.215-0.203-0.015-0.014-0.031-0.028-0.046-0.042-0.070-0.063-0.14-0.126-0.211-0.188-0.006-0.005-0.012-0.011-0.019-0.016-0.076-0.065-0.152-0.129-0.229-0.192-0.017-0.014-0.035-0.028-0.052-0.042-0.077-0.062-0.155-0.124-0.234-0.184-0.002-0.002-0.005-0.004-0.007-0.006-0.028-0.022-0.057-0.043-0.086-0.064-0.024-0.018-0.048-0.036-0.072-0.054-0.034-0.025-0.068-0.049-0.102-0.074-0.023-0.017-0.046-0.033-0.069-0.050-0.038-0.027-0.076-0.053-0.114-0.080-0.020-0.013-0.039-0.027-0.058-0.041-0.058-0.039-0.116-0.078-0.175-0.117l-4.473-2.926c0.018 0.012 0.035 0.024 0.053 0.035-1.833-1.214-4.045-1.908-6.496-1.908-7.507 0-14.411 6.509-15.42 14.537-0.694 5.518 1.577 10.317 5.502 12.78-0.060-0.038-0.12-0.076-0.179-0.115l4.473 2.926c1.822 1.192 4.016 1.872 6.443 1.872 7.507 0 14.411-6.508 15.42-14.537z"></path><path class="main-svg__item main-svg__item--side" fill="#121212" d="M6.648 14.537c-0.011 0.083-0.019 0.166-0.027 0.248v0c-0.001 0.008-0.002 0.015-0.002 0.023v0c-0.007 0.078-0.013 0.156-0.018 0.234v0c-0.001 0.011-0.002 0.022-0.002 0.034v0c-0.005 0.076-0.008 0.151-0.010 0.226v0c-0 0.012-0.001 0.025-0.001 0.037v0c-0.002 0.075-0.003 0.149-0.003 0.223v0c0 0.012 0 0.024 0 0.036v0c0 0.075 0.002 0.149 0.004 0.223v0c0 0.010 0.001 0.020 0.001 0.029v0c0.003 0.076 0.007 0.152 0.012 0.228v0c0 0.005 0.001 0.010 0.001 0.015v0c0.005 0.077 0.012 0.153 0.020 0.229v0c0 0.004 0.001 0.007 0.001 0.011v0c0.008 0.075 0.017 0.15 0.027 0.225v0c0.001 0.009 0.002 0.018 0.003 0.026v0c0.010 0.072 0.021 0.143 0.033 0.213v0c0.002 0.011 0.004 0.022 0.006 0.033v0c0.012 0.069 0.025 0.138 0.039 0.207v0c0.002 0.012 0.005 0.023 0.007 0.035v0c0.014 0.069 0.029 0.137 0.045 0.204v0c0.003 0.010 0.005 0.021 0.008 0.031v0c0.017 0.069 0.034 0.137 0.053 0.205v0c0.002 0.008 0.004 0.015 0.006 0.022v0c0.020 0.071 0.040 0.141 0.062 0.211v0c0 0.002 0.001 0.003 0.002 0.005v0c0.022 0.070 0.045 0.139 0.069 0.207v0c0.002 0.006 0.004 0.011 0.006 0.017v0c0.023 0.066 0.048 0.132 0.073 0.197v0c0.003 0.009 0.007 0.018 0.010 0.027v0c0.025 0.063 0.051 0.126 0.077 0.188v0c0.004 0.010 0.009 0.020 0.013 0.031v0c0.027 0.061 0.054 0.122 0.082 0.182v0c0.005 0.010 0.009 0.020 0.014 0.030v0c0.008 0.016 0.015 0.032 0.023 0.049v0c0.017 0.035 0.035 0.070 0.053 0.104v0c0.008 0.015 0.015 0.031 0.023 0.046v0c0.032 0.062 0.065 0.122 0.099 0.183v0c0.008 0.014 0.016 0.028 0.024 0.041v0c0.027 0.046 0.054 0.093 0.081 0.138v0c0.012 0.020 0.024 0.040 0.037 0.060v0c0.025 0.040 0.050 0.080 0.076 0.119v0c0.013 0.019 0.025 0.039 0.038 0.058v0c0.030 0.044 0.060 0.088 0.091 0.131v0c0.009 0.013 0.018 0.026 0.027 0.038v0c0.040 0.055 0.080 0.11 0.122 0.164v0c0.010 0.013 0.021 0.027 0.032 0.040v0c0.032 0.041 0.064 0.081 0.097 0.12v0c0.015 0.018 0.030 0.036 0.044 0.053v0c0.030 0.036 0.061 0.071 0.091 0.106v0c0.015 0.017 0.030 0.034 0.045 0.051v0c0.036 0.040 0.073 0.080 0.11 0.119v0c0.010 0.010 0.019 0.020 0.028 0.030v0c0.047 0.049 0.095 0.096 0.143 0.143v0c0.013 0.012 0.026 0.024 0.039 0.037v0c0.036 0.035 0.073 0.069 0.11 0.102v0c0.017 0.015 0.035 0.031 0.052 0.046v0c0.035 0.031 0.070 0.061 0.106 0.091v0c0.017 0.014 0.034 0.029 0.051 0.043v0c0.043 0.035 0.087 0.070 0.131 0.105v0c0.009 0.007 0.018 0.015 0.028 0.022v0c0.002 0.001 0.004 0.003 0.006 0.004v0c0.037 0.028 0.075 0.055 0.112 0.082v0c0.020 0.014 0.039 0.029 0.059 0.043v0c0.059 0.042 0.12 0.083 0.181 0.123v0l4.473 2.926c-0.061-0.040-0.121-0.081-0.181-0.123v0c-0.020-0.014-0.040-0.029-0.060-0.044v0c-0.039-0.029-0.079-0.057-0.117-0.086v0c-0.009-0.007-0.019-0.015-0.028-0.022v0c-0.044-0.034-0.088-0.069-0.131-0.105v0c-0.017-0.014-0.034-0.029-0.051-0.043v0c-0.036-0.030-0.071-0.060-0.106-0.091v0c-0.017-0.015-0.035-0.031-0.052-0.046v0c-0.037-0.034-0.074-0.068-0.11-0.102v0c-0.013-0.012-0.026-0.024-0.039-0.037v0c-0.048-0.047-0.096-0.095-0.143-0.143v0c-0.010-0.010-0.019-0.020-0.028-0.030v0c-0.037-0.039-0.074-0.079-0.11-0.119v0c-0.015-0.017-0.030-0.034-0.045-0.051v0c-0.031-0.035-0.061-0.070-0.091-0.106v0c-0.015-0.018-0.030-0.035-0.045-0.053v0c-0.033-0.040-0.065-0.080-0.097-0.121v0c-0.010-0.013-0.021-0.026-0.031-0.040v0c-0.041-0.054-0.082-0.109-0.122-0.164v0c-0.009-0.013-0.018-0.026-0.027-0.038v0c-0.031-0.043-0.061-0.087-0.090-0.131v0c-0.013-0.019-0.026-0.039-0.038-0.058v0c-0.026-0.040-0.051-0.079-0.076-0.12v0c-0.012-0.020-0.025-0.040-0.037-0.060v0c-0.028-0.046-0.055-0.092-0.081-0.138v0c-0.008-0.014-0.016-0.028-0.024-0.042v0c-0.034-0.060-0.067-0.121-0.099-0.183v0c-0.008-0.015-0.015-0.031-0.023-0.046v0c-0.026-0.050-0.051-0.101-0.076-0.153v0c-0.005-0.010-0.009-0.020-0.014-0.030v0c-0.028-0.060-0.056-0.121-0.082-0.182v0c-0.004-0.010-0.009-0.020-0.013-0.031v0c-0.027-0.062-0.052-0.125-0.077-0.188v0c-0.004-0.009-0.007-0.018-0.010-0.027v0c-0.025-0.065-0.050-0.131-0.073-0.197v0c-0.002-0.006-0.004-0.011-0.006-0.017v0c-0.024-0.068-0.047-0.137-0.069-0.207v0c-0.001-0.002-0.001-0.003-0.002-0.005v0c-0.022-0.070-0.042-0.14-0.062-0.21v0c-0.002-0.008-0.004-0.015-0.006-0.023v0c-0.019-0.068-0.036-0.136-0.053-0.205v0c-0.003-0.010-0.005-0.021-0.008-0.031v0c-0.016-0.068-0.031-0.136-0.045-0.204v0c-0.002-0.012-0.005-0.023-0.007-0.035v0c-0.014-0.069-0.027-0.137-0.039-0.207v0c-0.002-0.011-0.004-0.022-0.006-0.033v0c-0.012-0.071-0.023-0.142-0.033-0.213v0c-0.001-0.009-0.002-0.018-0.003-0.026v0c-0.010-0.074-0.019-0.149-0.027-0.225v0c-0-0.004-0.001-0.007-0.001-0.011v0c-0.008-0.076-0.014-0.152-0.020-0.229v0c-0-0.005-0.001-0.010-0.001-0.015v0c-0.005-0.076-0.009-0.152-0.012-0.228v0c-0-0.010-0.001-0.020-0.001-0.029v0c-0.002-0.074-0.004-0.148-0.004-0.223v0c-0-0.012-0-0.024-0-0.036v0c-0-0.074 0.001-0.148 0.003-0.223v0c0-0.012 0.001-0.025 0.001-0.037v0c0.002-0.075 0.006-0.15 0.010-0.226v0c0.001-0.011 0.002-0.023 0.002-0.034v0c0.005-0.078 0.011-0.156 0.018-0.234v0c0.001-0.008 0.002-0.015 0.002-0.023v0c0.008-0.082 0.017-0.165 0.027-0.248v0c0.525-4.175 4.115-7.559 8.018-7.559v0c1.262 0 2.402 0.354 3.35 0.974v0l-4.473-2.926c-0.948-0.62-2.088-0.974-3.35-0.974v0c-3.904 0-7.494 3.385-8.018 7.559z"></path><path class="main-svg__item main-svg__item--front" fill="#292929" d="M12.766 22.096c3.904 0 7.494-3.384 8.018-7.559s-2.214-7.559-6.118-7.559c-3.904 0-7.494 3.385-8.018 7.559s2.214 7.559 6.118 7.559zM15.544 0c7.507 0 12.774 6.509 11.765 14.537s-7.913 14.537-15.42 14.537c-7.507 0-12.775-6.508-11.765-14.537s7.913-14.537 15.42-14.537z"></path><path class="main-svg__item main-svg__item--side" fill="#121212" d="M22.663 2.351c1.439 1.1 2.608 2.541 3.429 4.224v0c1.115 2.287 1.587 5.022 1.217 7.961v0c-1.009 8.029-7.913 14.537-15.42 14.537v0c-2.427 0-4.62-0.68-6.443-1.872v0l4.473 2.926c1.822 1.192 4.016 1.872 6.443 1.872v0c7.507 0 14.411-6.508 15.42-14.537v0c0.082-0.654 0.123-1.298 0.124-1.929v0-0.051c-0.004-2.186-0.481-4.216-1.341-5.981v0c-0.821-1.684-1.99-3.124-3.429-4.224v0c-0.219-0.168-0.445-0.327-0.676-0.479v0l-4.473-2.926c0.231 0.151 0.457 0.311 0.676 0.479z"></path></symbol><symbol id="icon-number_5" viewBox="0 0 23 32"><path class="main-svg__item main-svg__item--side" fill="#121212" d="M6.643 0l-6.643 3.532 9.973 27.56 6.040 0.908 6.643-3.532-9.973-27.56z"></path><path class="main-svg__item main-svg__item--front" fill="#292929" d="M6.040 4.44l9.973 27.56 6.643-3.532-9.973-27.56z"></path><path class="main-svg__item main-svg__item--down" fill="#161616" d="M9.973 31.092l6.040 0.908-9.973-27.56-6.040-0.908z"></path><path class="main-svg__item main-svg__item--down" fill="#161616" d="M6.643 0l-6.643 3.532 6.040 0.908 6.643-3.532z"></path></symbol><symbol id="icon-number_6" viewBox="0 0 18 32"><path class="main-svg__item main-svg__item--down active" fill="#161616" d="M10.725 0l-5.302 2.968-5.423 26.318 6.895 2.713 5.302-2.968 5.423-26.319z"></path><path class="main-svg__item main-svg__item--front active" fill="#292929" d="M10.725 0l-5.423 26.318 6.895 2.713 5.423-26.319z"></path><path class="main-svg__item main-svg__item--side active" fill="#121212" d="M10.725 0l-5.302 2.968-5.423 26.318 5.302-2.968z"></path></symbol></defs></svg>'
})
