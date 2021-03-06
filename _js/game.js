var BubblePop = window.BubblePop || {};
BubblePop.Game = (function($) {
    var Game = function() {
        var curBubble;
        var board;
        var numBubbles;
        var MAX_BUBBLES = 70;
        this.init = function() {
            $(".but_start_game").bind("click",startGame);
        };

        var startGame = function() {
            $(".but_start_game").unbind("click");
            BubblePop.ui.hideDialog();
            curBubble = getNextBubble();
            numBubbles = MAX_BUBBLES;
            board = new BubblePop.Board();
            BubblePop.ui.drawBoard(board);
            $("#game").bind("click",clickGameScreen);
        };

        var getNextBubble = function() {
            var bubble = BubblePop.Bubble.create();
            bubble.getSprite().addClass("cur_bubble");
            $("#board").append(bubble.getSprite());
            BubblePop.ui.drawBubblesRemaining(numBubbles);
            numBubbles--;
            return bubble;
        };

        var clickGameScreen = function(e) {
            var angle = BubblePop.ui.getBubbleAngle(curBubble.getSprite(),e);
            var duration = 750;
            var distance = 1000;
            var collision = BubblePop.CollisionDetector.findIntersection(curBubble, board, angle);
            if (collision) {
                var coordinates = collision.coordinates;
                duration = Math.round(duration * collision.distanceToCollision / distance);
                board.addBubble(curBubble, coordinates);
            } else {
                var distX = Math.sin(angle) * distance;
                var distY = Math.cos(angle) * distance;
                var bubbleCoordinates = BubblePop.ui.getBubbleCoordinates(curBubble.getSprite());
                var coordinates = {
                    x : bubbleCoordinates.left + distX,
                    y : bubbleCoordinates.top - distY
                };
            }
            BubblePop.ui.fireBubble(curBubble, coordinates, duration);
            curBubble = getNextBubble();
        };
    };
    
    return Game;
})(jQuery);