function openGame(gameName, gameCode, machineId, denominations, hands) {
    alert("Game '"+gameName+"' opened with machine id: "+machineId+" code: "+gameCode+" denominations: "+denominations+" hands: "+hands);
}

var moveToCategory = (function() {
    var currentCategoryNumber = 2,
        maximumCategoryNumber = $('.games').length,
        minimumCategoryNumber = 1;

    function normalizeCategoryNumber(categoryNumber) {
        if(typeof(categoryNumber) === 'object') {
            if('delta' in categoryNumber) {
                return categoryNumber.delta+currentCategoryNumber;
            }
        } else if(parseInt(categoryNumber) !== NaN) {
            return parseInt(categoryNumber);
        }

        throw new Error("The argument categoryNumber in this format is not supported");
    }

    function normalizeAnimated(animated) {
        if(typeof(animated) == 'undefined') {
            return true;
        } else if(typeof(animated) === 'boolean') {
            return animated;
        }

        throw new Error("The argument animated in this format is not supported");
    }

    return function(categoryNumber, animated) {
        var normalizedCategoryNumber = normalizeCategoryNumber(categoryNumber),
            normalizedAnimated = normalizeAnimated(animated),
            marginLeft = (((-(100+gamesPadding*2)*(normalizedCategoryNumber-1))-gamesPadding)+'%'),
            time = Math.abs(normalizedCategoryNumber-currentCategoryNumber)*1000;

        // don't move if category number is: the same, bigger than max, lower than min
        if(currentCategoryNumber === normalizedCategoryNumber ||
            normalizedCategoryNumber > maximumCategoryNumber ||
            normalizedCategoryNumber < minimumCategoryNumber) {

            return;
        }

        if(normalizedAnimated) {
            $('.games-container').animate({marginLeft: marginLeft}, time);
        } else {
            $('.games-container').css('margin-left', marginLeft);
        }

        $('table.game-type td').removeClass('selected');
        $('table.game-type td:nth-child('+normalizedCategoryNumber+')').addClass('selected');

        currentCategoryNumber = normalizedCategoryNumber;
    };
})();

$(function() {
    function resize() {
        $('.game').height($('.game').width()+40);
    }

    $(window).resize(resize);
    resize();

    $(".game-type td").click(function() {
        // when you click the same category return
        if($(this).hasClass('selected')) {
            return;
        }

        moveToCategory(parseInt($(this).data('category-number')));
    });

    $('table.game').click(function() {
        var gameBodyEl = $(this).find('.game-body');

        openGame(gameBodyEl.data('game-name'), gameBodyEl.data('game-code'), gameBodyEl.data('machine-id'),
                    gameBodyEl.data('denominations'), gameBodyEl.data('hands'));
    });

    $('table.game > tbody td').each(function(idx, el) {
        $(el).css('background-image',  "url('"+$(el).find('.game-body').data('background-image')+"')");
    });

    $('table.game').hover(function() {
        $(this).find('.play-now').css('display', 'table');
    }, function() {
        $(this).find('.play-now').css('display', 'none');
    });

    $('.overflow-games-container').swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction) {
            if(direction == 'left') {
                moveToCategory({delta: 1});
            } else {
                moveToCategory({delta: -1});
            }
        }
    });

    (function() {
        var gamesWidth = (100/numberOfCategories);

        $('.games').width(gamesWidth+"%");
        $('.games').css({
            paddingLeft: (gamesWidth*gamesPadding/100)+"%",
            paddingRight: (gamesWidth*gamesPadding/100)+"%"
        });
        $('.games-container').width((numberOfCategories*(100+2*gamesPadding))+'%');
    })();

    moveToCategory(categoryNumberFromRoute, false);
});