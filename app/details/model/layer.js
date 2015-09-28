function Layer(stage, area) {
    this.stage = stage;
    this.area = area;
    this.offset = area.parentNode.offsetLeft;
    this.line = document.querySelector('#line', area);
    this.point = document.querySelector('#point', area);

    this.move = false;

    this._events = {};

    this._init();
    this.hide();
};
Layer.prototype = {

    hide: function() {
        this.move = false;
        this.area.style.opacity = 0;
    },

    show: function() {
        this.move = true;
        this.area.style.opacity = 1;
    },

    on: function(event, callback) {
        this._events[event] = callback;
        return this;
    },

    _trigger: function(event, data) {
        if (event in this._events) {
            data = data || {};
            this._events[event](data);
        }
    },

    _init: function() {
        this.area.addEventListener('mousedown', this._startMove.bind(this));
        this.area.addEventListener('mouseup', this._stopMove.bind(this));
        this.area.addEventListener('mousemove', this._move.bind(this));

        if ('ontouchstart' in window) {
            this.area.addEventListener(TOUCH.Event.START, TOUCH.handle, true);
            this.area.addEventListener(TOUCH.Event.MOVE, TOUCH.handle, true);
            this.area.addEventListener(TOUCH.Event.END, TOUCH.handle, true);
        }
    },

    _getX: function(e) {
        var x = e.clientX - this.offset;
        return x;
    },

    _startMove: function(e) {
        this.show();
        this._trigger(TOUCH.Event.START);
        this._move(e);
    },

    _stopMove: function() {
        this.hide();
        this._trigger(TOUCH.Event.END);
    },

    _move: function(e) {
        if (this.move) {
            var x = this._getX(e),
                y = this.stage.point(x);

            this.line.style.left = x + 'px';
            this.point.style.top = (y - 4) + 'px';
            this.point.style.left = (x - 4) + 'px';
            this._trigger(TOUCH.Event.MOVE, {data: y});
        }
    }

};

var TOUCH = (function() {

    var TouchEvent = {
        START: 'touchstart',
        END: 'touchend',
        MOVE: 'touchmove'
    };

    var _handle = function(e) {
        var touches = e.changedTouches,
            touch = touches[0],
            type = '';

        switch(e.type) {
            case TouchEvent.START:
                type = "mousedown";
                break;
            case TouchEvent.MOVE:
                type = 'mousemove';
                break;
            case TouchEvent.END:
                type = 'mouseup';
                break;
            default:
                return;
        }

        var event = new MouseEvent(type, {
            screenX: touch.screenX,
            screenY: touch.screenY,
            clientX: touch.clientX,
            clientY: touch.clientY,
            relatedTarget: e.target
        });

        touch.target.dispatchEvent(event);
    };

    return {
        Event: TouchEvent,

        handle: function(e) {
            _handle(e);
            e.preventDefault();
        }
    };
})();