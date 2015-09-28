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
        var i, prev, next, y;
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

        this.ctx.strokeStyle = '#fff';
        this.ctx.stroke();

        if (7 == this.steps) {
            this._drawPicks();
        }
    },

    _drawPicks: function() {
        var c, i;
        for (i = 1 ; i < this._coords.length - 1; i++) {
            c = this._coords[i];
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, 5, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = '#505252';
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.stroke();
        }
    }
};