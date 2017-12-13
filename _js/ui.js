var BubblePop = window.BubblePop || {};
BubblePop.ui = (function($) {
    var ui = {
        BUBBLE_DIMS : 44,
        ROW_HEIGHT : 66,
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
        },

        drawBoard : function(board) {
            var rows = board.getRows();
            var gameArea = $("#board");
            for (var i = 0; i < rows.length;i++) {
                var row = rows[i];
                for (var j = 0; j < row.length; j++) {
                    var bubble = row[j];
                    if (bubble) {
                        var sprite = bubble.getSprite();
                        gameArea.append(sprite);
                        var left = j * ui.BUBBLE_DIMS/2;
                        var top = i * ui.ROW_HEIGHT/2;
                        sprite.css({
                            left : left,
                            top : top
                        });
                    };
                };
            };
        },

        drawBubblesRemaining : function(numBubbles) {
            $("#bubbles_remaining").text(numBubbles);
        }
    };

    return ui;
})(jQuery);