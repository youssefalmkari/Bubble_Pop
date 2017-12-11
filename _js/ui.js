var BubblePop = window.BubblePop || {};
BubblePop.ui = function($) {
    var ui = {
        BUBBLE_DIMS : 44,
        init : function() {

        },
        hideDialog : function() {
            $(".dialog").fadeOut(300);
        },
        getMouseCoordinates : function(e) {
            var coords = {x : e.pageX, y : e.pageY};
            return coords;
        },
        getBubbleCoordinates : function(bubble) {
            var bubbleCoordinates = bubble.position();
            bubbleCoordinates.left += ui.BUBBLE_DIMS / 2;
            bubbleCoordinates.top += ui.BUBBLE_DIMS / 2;
            return bubbleCoordinates;
        },
        getBubbleAngle : function(bubble, e) {
            var mouseCoordinates = ui.getMouseCoordinates(e);
            var bubbleCoordinates = ui.getBubbleCoordinates(bubble);
            var gameCoordinates = $("#game").position();
            var boardLeft = 120;
            var angle = Math.atan((mouseCoordinates.x - bubbleCoordinates.left - boardLeft) 
                / (bubbleCoordinates.top + gameCoordinates.top - mouseCoordinates.y));
            if (mouseCoordinates.y > bubbleCoordinates.top + gameCoordinates.top) {
                angle += Math.PI;
            }
            return angle;
        },
        fireBubble : function(bubble, coordinates, duration) {
            bubble.getSprite().animate({
                left: coordinates.x - ui.BUBBLE_DIMS/2,
                top: coordinates.y - ui.BUBBLE_DIMS/2
            },
            {
                duration : duration,
                easing : "linear"
            })
        }
    };
    return ui;
}(jQuery);