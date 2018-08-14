(function(){
    const animationDuration = 'cubic-bezier(.43,0,.03,1)';
    const tl = new TimelineMax();
    const header = '.page-header';
    const menu = '.menu';

    const legacyOnLoadAnimation = function() {
        tl
        .fromTo('.logo', 1, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration})
        .staggerFromTo('.social__link', 1, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, 0.3)
        .fromTo('.legacy__x', 1, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, '-=0.3')
        .fromTo('.legacy__nav', 1, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, '-=0.3')
        .staggerFromTo('.menu__link', 1, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, 0.3)
        .fromTo('.scroll-me', 1, {y:'-30', opacity:'0'}, {y:'0', opacity:'1', ease: animationDuration}, '-=0.3')
        ;
    };

    const legacyOnScrollAnimation = function() {
        const windowWidth = $('window').width();

        $(window).on('scroll', function(){
            const windowOffsetTop = $(header).offset().top;
            const tl = new TimelineMax();
            const tweenIn = function(){
                return tl.
                to(menu, 1, {top:'53', zIndex: '10', position:'fixed', ease: animationDuration})
                ;
            };
            const tweenOut = function(){
                return tl
                .fromTo(menu, 1, {top: '-20'}, {top:'0', zIndex: '', position:'relative', ease: animationDuration})
                // .fromTo()
                ;
            };


            if(windowOffsetTop >= 65){
                $(menu).addClass('menu--fixed');
                $(header).addClass('header--fixed');
                tweenIn();
            }else{
                $(menu).removeClass('menu--fixed');
                $(header).removeClass('header--fixed');
                tweenOut();
            }
        });
    };

    const renderTemplate = function (index, titleHeight, contentHeight, parent, title, content) {
    	title.style.height = titleHeight+'px';
    	content.style.height = contentHeight+'px';

        parent.setAttribute('data-number', index);

    	let templateElement = parent.cloneNode(true);

    	return templateElement;
	}

    const mainScrollAnimation = function(){
        let controller = new ScrollMagic.Controller();
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
                .fromTo($('#'+title+index), 0.1, {left:0, x: 2000}, {x:'0', left:0, ease: animationDuration})
                .fromTo($('#'+content+index), 0.1, {opacity:0 }, {opacity: 1, ease: animationDuration}, '-=0.1')
                ;
            };
            const tweenOut = function(index){
                $('#'+title+index).css('left', '-2000px');
                $('#'+content+index).css('opacity', '0', 'z-index', '');
            };

            new ScrollMagic.Scene({
                triggerElement: '#'+fakeItem+i,
                duration: durationTime
            })
            // .addIndicators()
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
