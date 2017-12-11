var BubblePop = window.BubblePop || {};
BubblePop.Game = (function($) {
    var Game = function() {
        var curBubble;
        this.init = function() {
            $(".but_start_game").bind("click",startGame);
        };
        var startGame = function() {
            $(".but_start_game").unbind("click");
            BubblePop.ui.hideDialog();
            curBubble = getNextBubble();
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
        };
    };
    return Game;
})(jQuery);