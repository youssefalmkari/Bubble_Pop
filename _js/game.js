var BubblePop = window.BubblePop || {};
BubblePop.Game = (function($) {
    var Game = function() {
        var curBubble;
        var board;
        this.init = function() {
            $(".but_start_game").bind("click",startGame);
        };

        var startGame = function() {
            $(".but_start_game").unbind("click");
            BubblePop.ui.hideDialog();
            curBubble = getNextBubble();
            board = new BubblePop.Board();
            BubblePop.ui.drawBoard(board);
            $("#game").bind("click",clickGameScreen);
        };

        var getNextBubble = function() {
            var bubble = BubblePop.Bubble.create();
            bubble.getSprite().addClass("cur_bubble");
            $("#board").append(bubble.getSprite());
            return bubble;
        };

        var clickGameScreen = function(e) {
            var angle = BubblePop.ui.getBubbleAngle(curBubble.getSprite(),e);
            var duration = 750;
            var distance = 1000;
            var distX = Math.sin(angle) * distance;
            var distY = Math.cos(angle) * distance;
            var bubbleCoordinates = BubblePop.ui.getBubbleCoordinates(curBubble.getSprite());
            var coordinates = {
                x : bubbleCoordinates.left + distX,
                y : bubbleCoordinates.top - distY
            };
            BubblePop.ui.fireBubble(curBubble, coordinates, duration);
        };
    };
    
    return Game;
})(jQuery);