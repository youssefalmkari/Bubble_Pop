var BubblePop = window.BubblePop || {};

BubblePop.Bubble = function($) {

    var Bubble = function(col, row, type, sprite) {
        var that = this;
        this.getType = function() {return type;};
        this.getSprite = function() {return sprite;};
        this.getCol = function() {return col;};
        this.getRow = function() {return row;};
        this.getCoordinates = function() {
            var coordinates = {
                left: that.getCol() * BubblePop.ui.BUBBLE_DIMS / 2 * BubblePop.ui.BUBBLE_DIMS / 2,
                top: that.getRow() * BubblePop.ui.ROW_HEIGHT + BubblePop.ui.BUBBLE_DIMS / 2,
            }
        }
    };

    Bubble.create = function(rowNum, colNum, type) {
        if (type === undefined) {
            type = Math.floor(Math.random() * 4);
        };
        var sprite = $(document.createElement("div"));
        sprite.addClass("bubble");
        sprite.addClass("bubble_" + type);
        var bubble = new Bubble(colNum, rowNum, type, sprite);
        return bubble;
    };

    return Bubble;

}(jQuery);