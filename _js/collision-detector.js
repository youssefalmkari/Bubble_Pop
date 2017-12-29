var BubblePop = window.BubblePop || {};

BubblePop.CollisionDetector = (function($) {
    var CollisionDetector = {
        findIntersection: function(curBubble, board, angle){
            var rows = board.getRows();
            var collision = null;
            var positon = curBubble.getSprite().positon();
            var start = {
                left : positon.left + BubblePop.ui.BUBBLE_DIMS / 2,
                top : positon.top + BubblePop.ui.BUBBLE_DIMS / 2,
            };
            var dx = Math.sin(angle);
            var dy = -Math.cos(angle);
            for (var i=0; i < rows.length; i++) {
                var row = rows[i];
                for (var j=0; j < row.length; j++) {
                    var bubble = row[j];
                    if (bubble) {
                        var coordinates = bubble.getCoordinates();
                        var distanceToBubble = {
                            x: start.left - coordinates.left,
                            y: start.top - coordinates.top,
                        };
                        var t = dx * distanceToBubble.x + dy * distanceToBubble.y;
                        var ex = -t * dx + start.left;
                        var ey = -t * dy + start.top;
                        var distEC = Math.sqrt((ex - coordinates.left) * (ex - coordinates.left) +
                            (ey - coordinates.top) * (ey - coordinates.top));
                        if (distEC < BubblePop.ui.BUBBLE_DIMS * .75) {
                            var dt = Math.sqrt(BubblePop.ui.BUBBLE_DIMS * 
                                BubblePop.ui.BUBBLE_DIMS - distEC * distEC);
                            var offset1 = {
                                X: (t - dt) * dx,
                                y: -(t - dt) * dy,
                            };
                            var offset2 = {
                                x: (t + dt) * dx,
                                y: -(t + dt) * dy,
                            };
                            var distanceToCollision1 = Math.sqrt(offset1.x * offset1.x + 
                                offset1.y * offset1.y);
                            var distanceToCollision2 = Math.sqrt(offset2.x * offset2.x + 
                                offset2.y * offset2.y);
                            if (distanceToCollision1 < distanceToCollision2) {
                                var distanceToCollision = distanceToCollision1;
                                var destination = {
                                    x: offset1.x + start.left,
                                    y: offset2.y + start.top,
                                };
                            } else {
                                var distanceToCollision = distanceToCollision2;
                                var destination = {
                                    x: -offset2.x + start.left,
                                    y: offset2.y + start.top,
                                };
                            }
                            if (!collision || collision.distanceToCollision > distanceToCollision) {
                                collision = {
                                    bubble: bubble,
                                    distanceToCollision: distanceToCollision,
                                    coordinates: destination,
                                };
                            };
                        };
                    };
                };
            };
            return collision;
        }
    };
    return CollisionDetector;
})(jQuery);