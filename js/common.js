(function(){
    const animationDuration = 'cubic-bezier(.43,0,.03,1)';
    const tlOnLoadScrollAnimation = new TimelineMax();
    const header = '.page-header';
    const menu = '.menu';
    const controller = new ScrollMagic.Controller();
    SX = {};

    SX.legacyOnLoadAnimation = function() {
        tlOnLoadScrollAnimation
        .fromTo('.logo', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration})
        .staggerFromTo('.social__link', 1, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, 0.1)
        .fromTo('.legacy__x', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, '-=0.1')
        .fromTo('.legacy__nav', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, '-=0.1')
        .staggerFromTo('.menu__link', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, 0.3)
        .fromTo('.scroll-me', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, '-=0.1')
        ;
    };

    SX.legacyOnScrollAnimation = function() {
        const legacyHeight = $('.legacy').innerHeight();

        $(window).on('scroll', function(){
            const windowOffsetTop = $(header).offset().top;
            const tlOnEnterScrollAnimation = new TimelineMax();
            const tlOnLeaveScrollAnimation = new TimelineMax();

            const tweenIn = function(){
                return tlOnEnterScrollAnimation
                .to('.legacy__x', 2, {fill:'#212121', scale:'10', ease: animationDuration})
                .to('.legacy', 2, {backgroundColor:'#212121', ease: animationDuration}, '-=2')
                .to('.scroll-section__fake-block', 2, {backgroundColor:'#212121', ease: animationDuration}, '-=2')
                .to('.legacy__h1', 2, {x:'-2000', ease: animationDuration}, '-=2')
                .to(menu, 1, {top:'53', zIndex: '10', position:'fixed', ease: animationDuration}, '-=2')
                .to('.logo', 1, {y:'-100', ease: animationDuration}, '-=2')
                ;
            };
            const tweenOut = function(){
                return tlOnLeaveScrollAnimation
                .to('.legacy__x', 2, {fill:'#00bcd4', scale:'1', ease: animationDuration})
                .to('.legacy', 2, {backgroundColor:'#ff5722', ease: animationDuration}, '-=2')
                .to('.scroll-section__fake-block', 2, {backgroundColor:'#00bcd4', ease: animationDuration}, '-=2')
                .to('.legacy__h1', 2, {x:'0', ease: animationDuration}, '-=2')
                .fromTo(menu, 1, {top: '-20'}, {top:'0', zIndex: '', position:'relative', ease: animationDuration}, '-=2')
                .to('.menu__link', 0.1, {textShadow:'-1px 0 #00bcd4, 0 1px #00bcd4, 1px 0 #00bcd4, 0 -1px #00bcd4', ease: animationDuration}, '-=2')
                .to('.logo', 2, {textShadow:'-1px 0 #ff5722, 0 1px #ff5722, 1px 0 #ff5722, 0 -1px #ff5722', ease: animationDuration}, '-=2')
                .to('.logo', 1, {y:'0', ease: animationDuration}, '-=2')
                ;
            };

            if(windowOffsetTop > 100){
                $(menu).addClass('menu--fixed');
                tweenIn();
            }else if(windowOffsetTop < 99){
                $(menu).removeClass('menu--fixed');
                tweenOut();
            }

        });
    };

    SX.scrollToMainContent = function(){
        const fakeBlockOffset = $('#fakeBlock').offset().top;
        const firstFakeItemHeight = $('.scroll-section__fake-item:first-child').offset().top;
        const scrollToFirstTitleNumber = fakeBlockOffset + firstFakeItemHeight - 250;

        const scrollToFirstTitle = function(){
            return new TimelineMax()
            .to(window, 1.5, {scrollTo:scrollToFirstTitleNumber})
            .to('.menu__link', 0.1, {textShadow:''}, '-=1.5')
            .to('.logo', 0.1, {textShadow:''}, '-=1.5')
            ;
        };
        const scene = new ScrollMagic.Scene({
        })
        .setTween()
        .on('enter', function(){
            scrollToFirstTitle();
        })
        .addTo(controller);
        scene.offset(60);
    };

    SX.mainScrollAnimation = function(){
        const fakeItems = document.querySelectorAll('.scroll-section__fake-item');
        const titles = document.querySelectorAll('.scroll-section__title');
        const contents = document.querySelectorAll('.scroll-section__content');
        const title = 'title';
        const fakeItem = 'fakeItem';
        const content = 'content';
        let durationTime = 1200;

        titles.forEach(function(it, i, array){
            it.id = title+i;
        });

        contents.forEach(function(it, i, array){
            it.id = content+i;
        });

        fakeItems.forEach(function(it, i, array){
            it.id = fakeItem+i;
            it.style.height = durationTime+'px';

            const tweenIn = function(index){
                return new TimelineMax()
                .fromTo($('#'+title+index), 0.1, {left:0, x: 1800}, {x:'0', left:0, ease: animationDuration})
                .fromTo($('#'+content+index), 0.1, {opacity:0 }, {zIndex: '2500', opacity: '1', ease: animationDuration}, '-=0.1')
                ;
            };
            const tweenOut = function(index){
                $('#'+title+index).css('left', '-1800px');
                $('#'+content+index).css('opacity', '0', 'z-index', '');
            };

            new ScrollMagic.Scene({
                triggerElement: '#'+fakeItem+i,
                duration: durationTime
            })
            .setClassToggle('.menu__link', 'menu__link--scrolled')
            .setTween(tweenIn(i))
            .on('end', function(){
                tweenOut(i);
            })
            .addTo(controller);
        });
    };

    $(function onPageReady(){
        SX.legacyOnLoadAnimation();
        SX.legacyOnScrollAnimation();

        SX.mainScrollAnimation();
        SX.scrollToMainContent();

    })
})();

(function(){
    const addClassToActiveElems = function(){
        const allLinks = $('a');
        const allBtns = $('button');

        allLinks.each(function(){
            $(this).addClass('hover mouseDown')
        });

        allBtns.each(function(){
            $(this).addClass('hover mouseDown')
        });


    };

    SX.customCursor = function(){
        const $cursor = $('.cursor');
        const $xray = $('.xray');

        $(window).on('mousemove', function(event){
            const cursorHalfWidth = 0;
            const cursorPosLeft = event.clientX;
            const cursorPosTop = event.clientY;
            const target = event.target;

            $cursor.css({'left': cursorPosLeft, 'top': cursorPosTop,
            'transform': 'translate('+ '-' + cursorHalfWidth + 'px, ' + '-' + cursorHalfWidth + 'px)' });
            $xray.css({'left': cursorPosLeft, 'top': cursorPosTop});
        });

        $('.hover').on('mouseenter', function(){
            $cursor.addClass('cursor--hover');
        });

        $('.hover').on('mouseleave', function(){
            $cursor.removeClass('cursor--hover');
        });

        $('.mouseDown').mousedown(function(){
            $cursor.addClass('cursor--mouseDown');
        });

        $('.mouseDown').mouseup(function(){
            $cursor.removeClass('cursor--mouseDown');
        });
    };


    $(function onPageReady(){
        addClassToActiveElems();
        SX.customCursor();

    })
})();

(function(){
    const animationDuration = 'cubic-bezier(.43,0,.03,1)';

    const parallax = new Rellax('.js-parallax', {
        speed: -7
    });

    const parallaxHover = function(){
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

        const parallaxFrontTweenIn = function(){
            return new TimelineMax()
            .to(svgFront, animationTime, {fill: frontHover, animationDuration})
            ;
        };
        const parallaxFrontTweenOut = function(){
            return new TimelineMax()
            .to(svgFront, animationTime, {fill: front, animationDuration})
            ;
        };

        const parallaxSideTweenIn = function(){
            return new TimelineMax()
            .to(svgSide, animationTime, {fill: sideHover, animationDuration})
            ;
        };
        const parallaxSideTweenOut = function(){
            return new TimelineMax()
            .to(svgSide, animationTime, {fill: side, animationDuration})
            ;
        };

        const parallaxDownTweenIn = function(){
            return new TimelineMax()
            .to(svgDown, animationTime, {fill: downHover, animationDuration})
            ;
        };
        const parallaxDownTweenOut = function(){
            return new TimelineMax()
            .to(svgDown, animationTime, {fill: down, animationDuration})
            ;
        };



        $titles.on('mouseenter', function(){
            parallaxFrontTweenIn();
            parallaxSideTweenIn();
            parallaxDownTweenIn();
        });
        $titles.on('mouseleave', function(){
            parallaxFrontTweenOut();
            parallaxSideTweenOut();
            parallaxDownTweenOut();
        });

        $links.on('mouseenter', function(){
            parallaxFrontTweenIn();
            parallaxSideTweenIn();
            parallaxDownTweenIn();
        });
        $links.on('mouseleave', function(){
            parallaxFrontTweenOut();
            parallaxSideTweenOut();
            parallaxDownTweenOut();
        });
    };

    $(function onPageReady(){
        parallaxHover();
    })
})();

(function(){
    new Vue({
        el: '#global-svg',
        template: '<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><symbol id="icon-arr-down" viewBox="0 0 32 32"><title>arr-down</title><path d="M14.869 20.72l1.131 1.131 9.051-9.051-2.262-2.262-6.789 6.787-6.789-6.787-2.262 2.262z"></path></symbol><symbol id="icon-10" viewBox="0 0 47 32"><title>10</title><path d="M30.68 24.32c-4.595 0-8.32-3.725-8.32-8.32s3.725-8.32 8.32-8.32c4.595 0 8.32 3.725 8.32 8.32s-3.725 8.32-8.32 8.32zM30.68-0c-8.837 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16z"></path><path d="M0 30.678h7.994v-29.131h-7.994z"></path></symbol><symbol id="icon-facebook" viewBox="0 0 15 32"><title>facebook</title><path d="M3.308 32v-16.63h-3.308v-4.788h3.308v-3.215c0-1.417 0.036-3.603 1.065-4.958 1.086-1.434 2.574-2.408 5.136-2.408 4.173 0 5.93 0.595 5.93 0.595l-0.828 4.901c0 0-1.379-0.399-2.664-0.399-1.287 0-2.438 0.461-2.438 1.748v3.737h5.276l-0.369 4.788h-4.907v16.63z"></path></symbol><symbol id="icon-instagram" viewBox="0 0 32 32"><title>instagram</title><path d="M16.001-0.001c-4.348 0-4.89 0.018-6.598 0.098v0c-1.702 0.075-2.867 0.348-3.882 0.743v0c-1.054 0.408-1.947 0.955-2.835 1.845v0c-0.889 0.889-1.435 1.783-1.847 2.833v0c-0.394 1.019-0.666 2.18-0.743 3.884v0c-0.077 1.707-0.096 2.252-0.096 6.596v0c0 4.346 0.018 4.892 0.096 6.6v0c0.077 1.702 0.35 2.865 0.743 3.882v0c0.412 1.052 0.959 1.947 1.847 2.833v0c0.889 0.889 1.781 1.437 2.835 1.847v0c1.016 0.396 2.18 0.666 3.882 0.743v0c1.707 0.077 2.25 0.096 6.598 0.096v0c4.344 0 4.889-0.018 6.596-0.096v0c1.704-0.077 2.866-0.348 3.884-0.743v0c1.052-0.41 1.945-0.959 2.835-1.847v0c0.889-0.887 1.437-1.781 1.844-2.833v0c0.396-1.017 0.666-2.18 0.745-3.882v0c0.077-1.707 0.096-2.254 0.096-6.6v0c0-4.344-0.018-4.889-0.096-6.596v0c-0.079-1.704-0.35-2.865-0.745-3.884v0c-0.407-1.051-0.955-1.945-1.844-2.833v0c-0.89-0.89-1.783-1.437-2.835-1.845v0c-1.017-0.396-2.18-0.668-3.884-0.743v0c-1.707-0.079-2.252-0.098-6.596-0.098zM9.534 29.025c-1.56-0.072-2.407-0.333-2.97-0.552v0c-0.747-0.289-1.281-0.638-1.84-1.198v0c-0.559-0.559-0.907-1.093-1.198-1.838v0c-0.219-0.565-0.478-1.411-0.552-2.971v0c-0.075-1.687-0.092-2.195-0.092-6.467v0c0-4.272 0.017-4.776 0.092-6.463v0c0.074-1.56 0.333-2.408 0.552-2.973v0c0.291-0.745 0.638-1.279 1.198-1.838v0c0.559-0.561 1.093-0.907 1.84-1.196v0c0.563-0.221 1.409-0.48 2.97-0.552v0c1.687-0.077 2.195-0.094 6.467-0.094v0c4.272 0 4.776 0.017 6.465 0.094v0c1.56 0.072 2.407 0.331 2.971 0.552v0c0.747 0.289 1.279 0.635 1.838 1.196v0c0.561 0.559 0.907 1.093 1.198 1.838v0c0.217 0.565 0.478 1.413 0.55 2.973v0c0.079 1.687 0.096 2.191 0.096 6.463v0c0 4.272-0.017 4.78-0.096 6.467v0c-0.072 1.56-0.333 2.407-0.55 2.971v0c-0.291 0.745-0.637 1.279-1.198 1.838v0c-0.559 0.559-1.091 0.909-1.838 1.198v0c-0.565 0.219-1.411 0.48-2.971 0.552v0c-1.689 0.075-2.193 0.092-6.465 0.092v0c-4.274 0-4.78-0.017-6.467-0.092zM22.621 7.458c0 1.062 0.859 1.921 1.921 1.921v0c1.060 0 1.919-0.859 1.919-1.921v0c0-1.060-0.859-1.919-1.919-1.919v0c-1.062 0-1.921 0.859-1.921 1.919zM7.784 15.999c0 4.539 3.678 8.217 8.217 8.217v0c4.537 0 8.217-3.678 8.217-8.217v0c0-4.537-3.68-8.217-8.217-8.217v0c-4.539 0-8.217 3.68-8.217 8.217zM10.667 15.999c0-2.946 2.388-5.334 5.334-5.334v0c2.946 0 5.334 2.388 5.334 5.334v0c0 2.946-2.388 5.334-5.334 5.334v0c-2.946 0-5.334-2.388-5.334-5.334z"></path></symbol><symbol id="icon-logo" viewBox="0 0 101 32"><title>logo</title><path d="M95.896 17.804c-0.317 1.555-1.172 3.109-2.647 3.879-0.615 0.343-1.331 0.425-2.031 0.411-1.516 0.001-3.039-0.022-4.558 0.007-0.010-3.922 0.034-7.844-0.027-11.76 1.527 0.042 3.054-0.006 4.581 0.020 1.449 0.037 2.82 0.831 3.648 1.985 1.156 1.551 1.377 3.603 1.034 5.458zM92.935 6.487c-2.134-0.412-4.323 0.144-6.299 0.946 0.069-2.474-0.020-4.957 0.049-7.433-1.198 0.213-2.335 0.787-3.095 1.735-1.15 1.44-1.509 3.334-1.522 5.125-0.003 6.268 0 12.532-0.003 18.804 3.109 0 6.211 0.004 9.313-0.010 2.025-0.014 4.090-0.547 5.72-1.755 1.64-1.195 2.706-3.049 3.128-4.997 0.559-2.593 0.373-5.405-0.921-7.763-1.252-2.401-3.652-4.193-6.37-4.651z"></path><path d="M48.136 4.026c-0.513 1.192-0.366 2.499-0.366 3.772v18.014h4.391c0 0 0.103-16.839 0.122-25.221-1.907 0.379-3.467 1.639-4.147 3.435z"></path><path d="M12.451 7.131c0.010 5.749-0.004 10.038 0 15.155-1.060-0.023-2.121-0.078-3.175-0.118-1.313-0.059-2.563-0.803-3.32-1.845-0.844-1.155-1.129-2.434-1.129-3.831 0-3.177-0.009-5.049 0-9.36h-4.824c0 0-0.011 6.472 0.013 9.797 0.042 2.359 0.63 4.772 2.368 6.504 1.702 1.692 4.212 2.23 6.563 2.269 2.779 0.019 5.555 0.168 8.329 0.178 0.006-6.307 0-18.748 0-18.748z"></path><path d="M37.434 17.216c-0.178 1.564-0.969 3.105-2.285 4.025-0.761 0.553-1.706 0.84-2.65 0.844-1.46 0.014-2.924-0.014-4.386 0.014-0.014-3.922 0.036-7.844-0.024-11.76 1.729 0.042 3.454-0.010 5.184 0.022 1.213 0.057 2.298 0.803 2.99 1.753 1.076 1.456 1.376 3.343 1.17 5.101zM36.472 7.591c-1.313-0.507-2.724-0.46-4.129-0.46h-8.832c0.020 7.185 0 12.209 0.012 18.413 0.029 1.626 0.215 3.243 1.119 4.647 0.735 1.155 2.108 1.769 3.474 1.809-0.020-2.306 0.045-4.638-0.030-6.945 1.31 0.514 2.681 0.887 4.096 1.040 2.306 0.161 4.679-0.607 6.425-2.107 1.861-1.561 2.993-3.864 3.277-6.237 0.241-2.056 0.011-4.098-0.836-6.004-0.859-1.94-2.54-3.435-4.575-4.157z"></path><path d="M71.197 22.095c-1.69-0.020-3.38 0.006-5.069-0.014-1.485-0.023-2.743-1.080-3.432-2.309-0.859-1.537-1.067-3.38-0.722-5.089 0.313-1.544 1.241-3.021 2.678-3.777 0.638-0.353 1.363-0.536 2.091-0.549 1.492-0.017 2.981 0.020 4.466-0.017-0.029 3.913-0.004 7.838-0.011 11.755zM66.971 6.758c-2.309 0.046-4.697 0.615-6.512 2.081-1.791 1.412-2.802 3.602-3.029 5.816-0.276 2.519 0.079 5.227 1.538 7.377 1.123 1.67 2.937 2.915 4.91 3.383 0.997 0.243 2.025 0.396 3.050 0.396h8.88c0 0-0.049-12.699 0-19.005-2.947 0.046-5.888-0.089-8.837-0.049z"></path></symbol><symbol id="icon-twitter" viewBox="0 0 39 32"><title>twitter</title><path d="M39.375 3.788c-1.447 0.642-3.005 1.077-4.639 1.271 1.669-0.998 2.951-2.582 3.55-4.468-1.56 0.927-3.286 1.597-5.131 1.958-1.47-1.569-3.571-2.549-5.896-2.549-4.458 0-8.075 3.617-8.075 8.078 0 0.633 0.069 1.248 0.208 1.84-6.714-0.337-12.663-3.55-16.652-8.44-0.693 1.197-1.093 2.584-1.093 4.063 0 2.801 1.426 5.274 3.594 6.723-1.324-0.039-2.57-0.407-3.661-1.008v0.099c0 3.915 2.785 7.181 6.483 7.92-0.679 0.19-1.391 0.284-2.129 0.284-0.52 0-1.028-0.049-1.518-0.143 1.024 3.208 4.008 5.547 7.544 5.607-2.764 2.168-6.249 3.46-10.033 3.46-0.652 0-1.297-0.037-1.928-0.111 3.575 2.288 7.823 3.629 12.383 3.629 14.861 0 22.985-12.309 22.985-22.985 0-0.351-0.007-0.703-0.021-1.045 1.579-1.142 2.949-2.563 4.028-4.183z"></path></symbol><symbol id="icon-vk" viewBox="0 0 56 32"><title>vk</title><path d="M50.023 22.098c4.487 4.166 5.416 6.192 5.569 6.444 1.858 3.082-2.059 3.322-2.059 3.322l-7.491 0.107c0 0-1.609 0.316-3.729-1.138-2.8-1.922-5.443-6.923-7.502-6.27-2.088 0.661-2.021 5.162-2.021 5.162s0.013 0.961-0.461 1.47c-0.519 0.557-1.531 0.669-1.531 0.669h-3.355c0 0-7.395 0.444-13.911-6.337-7.105-7.397-13.378-22.077-13.378-22.077s-0.364-0.964 0.029-1.43c0.442-0.522 1.647-0.557 1.647-0.557l8.013-0.054c0 0 0.755 0.129 1.296 0.525 0.447 0.327 0.696 0.94 0.696 0.94s1.296 3.274 3.009 6.238c3.349 5.788 4.91 7.052 6.045 6.433 1.657-0.905 1.159-8.179 1.159-8.179s0.029-2.64-0.833-3.818c-0.669-0.91-1.93-1.175-2.49-1.25-0.45-0.059 0.289-1.108 1.248-1.577 1.443-0.707 3.992-0.747 7.001-0.715 2.345 0.021 3.020 0.169 3.936 0.391 2.763 0.667 1.826 3.242 1.826 9.424 0 1.979-0.356 4.763 1.071 5.687 0.613 0.396 2.115 0.059 5.871-6.318 1.78-3.023 3.116-6.578 3.116-6.578s0.289-0.632 0.744-0.905c0.461-0.276 1.087-0.19 1.087-0.19l8.436-0.054c0 0 2.533-0.303 2.942 0.841 0.434 1.202-0.945 4.005-4.391 8.599-5.66 7.539-6.289 6.835-1.59 11.194z"></path></symbol><symbol id="icon-x" viewBox="0 0 33 32"><title>x</title><path d="M24.712 0.25l-8.385 8.217-8.385-8.217-7.687 7.533 8.385 8.217-8.385 8.217 7.686 7.533 8.385-8.217 8.385 8.217 7.686-7.533-8.385-8.217 8.385-8.217z"></path></symbol></defs></svg>'
    })
})();
