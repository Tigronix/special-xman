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
