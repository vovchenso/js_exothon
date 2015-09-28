'use strict';

function Stage(canvas) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this._coords = [];

    this.steps = 7;
};
Stage.prototype = {

    draw: function() {
        this._clear();
        this._draw();
    },

    reset: function() {
        this._clear();
        this._coords = [];
    },

    point: function(x) {
        var i, prev, next, y;canvas
        prev = this._coords[0];
        for (i = 1; i < this._coords.length; i++) {
            next = this._coords[i];
            if (prev.x < x && next.x > x) {
                break;
            }
            prev = next;
        }

        y = prev.y + ((next.y - prev.y) * (x - prev.x)) / (next.x - prev.x);

        return Math.floor(y);
    },

    _clear: function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    _draw: function() {
        var x, y,
            s = 1,
            w = Math.round(this.width / (this.steps - 1));

        this.ctx.beginPath();

        x = 0;
        y = Math.floor(Math.random() * this.height);
        this.ctx.moveTo(x, y);

        this._coords.push({
            x: x,
            y: y
        });

        while (s++ < this.steps) {
            y = Math.floor(Math.random() * this.height);
            x += w;
            this.ctx.lineTo(x, y);

            this._coords.push({
                x: x,
                y: y
            });
        }

        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();

        this._drawPicks();
    },

    _drawPicks: function() {
        var c, i;
        for (i = 1 ; i < this._coords.length - 1; i++) {
            c = this._coords[i];
            console.log(c);
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, 5, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = '#012330';
            this.ctx.fill();
            this.ctx.strokeStyle = '#00ff00';
            this.ctx.stroke();
        }
    }
};

function Layer(stage, area) {
    this.stage = stage;
    this.area = area;
    this.offset = area.parentNode.offsetLeft;
    this.line = document.querySelector('#line', area);
    this.point = document.querySelector('#point', area);

    this.move = false;

    this._init();
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

    _init: function() {
        this.area.addEventListener('mousedown', this._startMove.bind(this));
        this.area.addEventListener('mouseup', this._stopMove.bind(this));
        this.area.addEventListener('mousemove', this._move.bind(this));

        if ("ontouchstart" in window) {
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
        this._move(e);
    },

    _stopMove: function() {
        this.hide();
    },

    _move: function(e) {
        if (this.move) {
            var x = this._getX(e),
                y = this.stage.point(x);

            this.line.style.left = x + 'px';
            this.point.style.top = (y - 5) + 'px';
            this.point.style.left = (x - 5) + 'px';
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

(function() {

    var canvas, stage, layer;

    var _init = function() {
        canvas = document.getElementById('canvas');
        stage = new Stage(canvas);
        layer = new Layer(stage, document.getElementById('layer'));

        document.getElementById('reset').addEventListener('click', _reset);

        _reset();
    };

    function _reset() {
        stage.reset();
        stage.draw();

        layer.hide();
    };

    return {
        run: function() {
            window.addEventListener('load', _init, false);
        }
    };

})().run();