(function(){
    const animationDuration = 'cubic-bezier(.43,0,.03,1)';
    const tlOnLoadScrollAnimation = new TimelineMax();
    const header = '.page-header';
    const menu = '.menu';
    const controller = new ScrollMagic.Controller();

    const legacyOnLoadAnimation = function() {
        tlOnLoadScrollAnimation
        .fromTo('.logo', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration})
        .staggerFromTo('.social__link', 1, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, 0.1)
        .fromTo('.legacy__x', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, '-=0.1')
        .fromTo('.legacy__nav', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, '-=0.1')
        .staggerFromTo('.menu__link', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, 0.3)
        .fromTo('.scroll-me', 0.5, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, '-=0.1')
        ;
    };

    const legacyOnScrollAnimation = function() {
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

        const fakeBlockOffset = $('#fakeBlock').offset().top;
        const firstFakeItemHeight = $('.scroll-section__fake-item:first-child').offset().top;
        const scrollToFirstTitleNumber = fakeBlockOffset + firstFakeItemHeight - 250;
        console.log(scrollToFirstTitleNumber);

        const scrollToFirstTitle = function(){
            return new TimelineMax().to(window, 1.5, {scrollTo:scrollToFirstTitleNumber});
        };
        const scene = new ScrollMagic.Scene({
        })
        .setTween()
        .on('enter', function(){
            scrollToFirstTitle();
        })
        .addTo(controller);
        scene.offset(120);
    };

    const mainScrollAnimation = function(){
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
                .fromTo($('#'+content+index), 0.1, {opacity:0 }, {opacity: 1, ease: animationDuration}, '-=0.1')
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
            .setTween(tweenIn(i))
            .on('end', function(){
                tweenOut(i);
            })
            .addTo(controller);
        });
    };

    window.onload = function(){

        // legacy animation
        legacyOnLoadAnimation();
        legacyOnScrollAnimation();

        mainScrollAnimation();
    };


})();
