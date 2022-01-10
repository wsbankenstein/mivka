export default class Mivka {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = canvas.getContext('2d');
        this.keyStates = new Map();

        this.updateTime = 10; // in ms
        this.isUpdatePaused_ = false;
        this.updateInterval = undefined;
    }

    redraw() { // should only be called by init()
        let context = this.context;
        let canvas = this.canvas;

        context.clearRect(0, 0, canvas.width, canvas.height);
        this.draw(); // call user's draw() function (init will throw an error if it's not defined)
        context.globalAlpha = 1;
        // draw grid (if gridSize is redeclared in user's code)
        context.font = '10px Arial';
        if (typeof gridSize != 'undefined' && gridSize >= 25) {
            context.fillText(0, 4, 10);
            context.beginPath();
            for (i = gridSize; i < canvas.width; i += gridSize) {
                context.moveTo(i, 0);
                context.lineTo(i, canvas.height);
                context.fillText(i, i + 4, 10);
            }
            for (i = gridSize; i < canvas.height; i += gridSize) {
                context.moveTo(0, i);
                context.lineTo(canvas.width, i);
                context.fillText(i, 4, i + 10);
            }
            context.stroke();
        }
    
        const reqAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            setTimeout(callback, 1000 / 30);
        };

        if (!this.isUpdatePaused_) {
            reqAnimationFrame(this.redraw.bind(this));
            this.update();
        }
    };

    init() {
        let canvas = this.canvas;
        let context = this.context;
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            isMobile = true;
            window.addEventListener('touchstart', function (e) {
                let touchobj = e.changedTouches[0];
                this.mouseX = parseInt(touchobj.pageX - canvas.offsetLeft);
                this.mouseY = parseInt(touchobj.pageY - canvas.offsetTop);
                mousedown();
            });
    
            window.addEventListener('touchend', function (e) {
                let touchobj = e.changedTouches[0];
                this.mouseX = parseInt(touchobj.pageX - canvas.offsetLeft);
                this.mouseY = parseInt(touchobj.pageY - canvas.offsetTop);
                mouseup();
            });
    
            window.addEventListener('touchmove', function (e) {
                let touchobj = e.changedTouches[0];
                this.mouseX = parseInt(touchobj.pageX - canvas.offsetLeft);
                this.mouseY = parseInt(touchobj.pageY - canvas.offsetTop);
            });
        }
    
        window.addEventListener('mousemove', function (e) {
            this.mouseX = e.pageX - canvas.offsetLeft;
            this.mouseY = e.pageY - canvas.offsetTop;
        });
    
        if (typeof this.mousemove != 'undefined') window.addEventListener('mousemove', this.mousemove);
    
        if (typeof this.mouseup != 'undefined') window.addEventListener('mouseup', this.mouseup);
    
        if (typeof this.mousedown != 'undefined') window.addEventListener('mousedown', this.mousedown);
    
        const that = this;

        if (typeof this.keydown != 'undefined') {
            window.addEventListener('keydown', function (e) {
                that.keyStates.set(e.key, true);
                that.keydown(e);
            });
        } else {
            window.addEventListener('keydown', function (e) {
                that.keyStates.set(e.key, true);
            });
        }
    
        if (typeof this.keyup != 'undefined') {
            window.addEventListener('keyup', function (e) {
                that.keyStates.set(e.key, false);
                that.keyup(e);
            });
        } else {
            window.addEventListener('keyup', function (e) {
                that.keyStates.set(e.key, false);
            });
        }
    
        if (typeof this.draw == 'undefined') {
            that.redraw = function () {
                console.error('draw() is not defined!');
                context.clearRect(0, 0, canvas.width, canvas.height);
                alert('draw() is not defined!');
            };
        }
        
        that.redraw();
    }

    update() {}

    draw() {}

    isKeyPressed(key) {
        return this.keyStates.get(key);
    }
}