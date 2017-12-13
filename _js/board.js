var BubblePop = window.BubblePop || {};

BubblePop.Board = (function($) {
    var NUM_ROWS = 9;
    var NUM_COLS = 32;

    var Board = function() {
        var that = this;
        var rows = createLayout();
        this.getRows = function() {return rows;};
        return this;
    };

    var createLayout = function() {
        var rows = [];
        for (var i = 0; i < NUM_ROWS; i++) {
            var row = [];
            var startColumn = i%2 == 0 ? 1 : 0;
            for (var j = startColumn; j < NUM_COLS; j+=2) {
                var bubble = BubblePop.Bubble.create(i, j);
                row[j] = bubble;
            };
            rows.push(row);
        };
        return rows;
    };

    return Board;
})(jQuery);