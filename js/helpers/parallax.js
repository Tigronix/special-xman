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
