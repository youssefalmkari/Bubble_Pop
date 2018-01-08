var BubblePop = window.BubblePop || {};

BubblePop.Board = (function($) {
    var NUM_ROWS = 9;
    var NUM_COLS = 32;

    var Board = function() {
        var that = this;
        var rows = createLayout();
        this.getRows = function() {return rows;};
        this.addBubble = function (bubble, coordinates) {
            var rowNum = Math.floor(coordinates.y / BubblePop.ui.ROW_HEIGHT);
            var colNum = coordinates.x / BubblePop.ui.BUBBLE_DIMS * 2;
            if (rowNum % 2 == 1)
                colNum -= 1;
            colNum = Math.round(colNum/2) * 2;
            if (rowNum % 2 == 0)
                colNum -= 1;
            if (!rows[rowNum]) {
                rows[rowNum] = [];
                rows[rowNum][colNum] = bubble;
                bubble.setRow(rowNum);
                bubble.setCol(colNum);
            }
        }
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