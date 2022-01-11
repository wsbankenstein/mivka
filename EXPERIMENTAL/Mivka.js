class Mivka {
	constructor(canvas) {
		this.canvas = canvas;
		this.fullscreen = false;
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

		window.addEventListener('resize' , function () {
			if (that.fullscreen) {
				that.canvas.width = window.innerWidth;
				that.canvas.height = window.innerHeight;
			}
		});

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

	isUpdatePaused() {
		return isUpdatePaused_;
	}

	pauseUpdate() {
		clearInterval(updateInterval);
		isUpdatePaused_ = true;
	}

	startUpdate() {
		updateInterval = setInterval(update, updateTime);
		isUpdatePaused_ = false;
		redraw();
	}

	/**
	 * @param  {number} w
	 * @param  {number} h
	 */
	setCanvasSize(w, h) {
		this.canvas.width = w;
		this.canvas.height = h;
		this.fullscreen = false;
	}

	setFullscreen() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.fullscreen = true;
	}
}

class Util {
	constructor() {}

	/**
	 * @param  {number} min
	 * @param  {number} max
	 */
	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 * @param  {number} x
	 * @param  {number} y
	 * @param  {number} w
	 * @param  {number} h
	 */
	xywh(x, y, w, h) {
		let a = {
			x: x,
			y: y,
			w: w,
			h: h
		};
		return a;
	}

	/**
	 * @param  {} data
	 * @param  {string} memoryIndex
	 * Saves data to localStorage - see {@link restore}
	 */
	save(data, memoryIndex) {
		localStorage.setItem(memoryIndex, JSON.stringify(data));
	}

	/**
	 * @param  {string} memoryIndex
	 * gets data from localStorage - see {@link save}
	 */
	restore(memoryIndex) {
		return JSON.parse(localStorage.getItem(memoryIndex));
	}

	/**
	 * @param  {array} array
	 */
	randomOf(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	/**
	 * @param  {number} Ax
	 * @param  {number} Ay
	 * @param  {number} Awidth
	 * @param  {number} Aheight
	 * @param  {number} Bx
	 * @param  {number} By
	 * @param  {number} Bwidth
	 * @param  {number} Bheight
	 */
	areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
		if (Bx <= Ax + Awidth) {
			if (Ax <= Bx + Bwidth) {
				if (By <= Ay + Aheight) {
					if (Ay <= By + Bheight) {
						return true;
					}
				}
			}
		}
		return false;
	};
	
	/**
	 * @param  {string} imagePath - path to image
	 * @param  {string} backupColour
	 */
	loadImage(imagePath, backupColour) {
	   let result = {};
	   result.img = new Image();
	   result.img.src = imagePath;
	   result.color = backupColour || '#FF0000';
	   return result;
	}

	/**
	 * Distance between two points
	 * @param  {number} x1
	 * @param  {number} y1
	 * @param  {number} x2
	 * @param  {number} y2
	 */
	distance(x1, y1, x2, y2) {
		return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	}

	/**
	 * @param  {number} x1
	 * @param  {number} y1
	 * @param  {number} x2
	 * @param  {number} y2
	 * @param  {number} x3
	 * @param  {number} y3
	 */
	getTriangleArea(x1, y1, x2, y2, x3, y3) {
		let a = distance(x1, y1, x2, y2),
			b = distance(x2, y2, x3, y3),
			c = distance(x1, y1, x3, y3),
			p = (a + b + c) / 2;
		return Math.sqrt(p * (p - a) * (p - b) * (p - c));
	}

	/**
	 * @param  {number} pX
	 * @param  {number} pY
	 * @param  {number} x1
	 * @param  {number} y1
	 * @param  {number} x2
	 * @param  {number} y2
	 * @param  {number} x3
	 * @param  {number} y3
	 */
	isInTriangle(pX, pY, x1, y1, x2, y2, x3, y3) {
		let S1 = getTriangleArea(pX, pY, x1, y1, x2, y2),
			S2 = getTriangleArea(pX, pY, x2, y2, x3, y3),
			S3 = getTriangleArea(pX, pY, x3, y3, x1, y1),
			S = getTriangleArea(x1, y1, x2, y2, x3, y3);
		return Math.abs(S1 + S2 + S3 - S) < 5;
	}

	/**
	 * @param  {number} cX
	 * @param  {number} cY
	 * @param  {number} vertex
	 * @param  {number} pX
	 * @param  {number} pY
	 */
	isInHexagon(cX, cY, vertex, pX, pY) {
		let x = [], y = [];
		for (let i = 0; i < 6; i++) {
			x[i] = Math.cos((i / 3) * Math.PI) * vertex + cX;
			y[i] = Math.sin((i / 3) * Math.PI) * vertex + cY;
		}
		let isInside = false;
		for (let i = 0; i < 5; i++) {
			isInside = isInside || isInTriangle(pX, pY, cX, cY, x[i], y[i], x[i + 1], y[i + 1]);
		}
		isInside = isInside || isInTriangle(pX, pY, cX, cY, x[0], y[0], x[5], y[5]);
		return isInside;
	}

	/**
	 * @param  {number} pX
	 * @param  {number} pY
	 * @param  {number} rX
	 * @param  {number} rY
	 * @param  {number} rW
	 * @param  {number} rH
	 */
	isInRectangle(pX, pY, rX, rY, rW, rH) {
		if (pX >= rX && pX <= rX + rW && pY >= rY && pY <= rY + rH) return true;
		else return false;
	}

	/**
	 * @param  {number} pX - X coordinate of point
	 * @param  {number} pY - Y coordinate of point
	 * @param  {number} cX - X coordinate of centre
	 * @param  {number} cY - Y coordinate of centre
	 * @param  {number} r - radius of circle
	 */
	isInCircle(pX, pY, cX, cY, r) {
		if ((pX - cX) * (pX - cX) + (pY - cY) * (pY - cY) <= r * r) return true;
		else return false;
	}
}

class CanvasUtil {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}

	/**
	 * @param  {number} startX
	 * @param  {number} startY
	 * @param  {number} endX
	 * @param  {number} endY
	 */
	drawLine(startX, startY, endX, endY) {
		// For better performance bunch calls to lineTo without beginPath() and stroke() inbetween.
		context.beginPath(); // resets the current path
		context.moveTo(startX, startY);
		context.lineTo(endX, endY);
		context.stroke();
	}

	/**
	 * @param  {object} imageWithBackupColourObject
	 * @param  {Image} imageWithBackupColourObject.img
	 * @param  {string} imageWithBackupColourObject.color
	 * @param  {number} x
	 * @param  {number} y
	 * @param  {number} xs
	 * @param  {number} ys
	 */
	drawImage(imageWithBackupColourObject, x, y, xs, ys) {
		try {
			if (xs !== undefined) {
				context.drawImage(imageWithBackupColourObject.img, x, y, xs, ys);
			} else {
				context.drawImage(imageWithBackupColourObject.img, x, y);
			}
		} catch (e) {
			context.fillStyle = imageWithBackupColourObject.color || '#FF0000';
			if (xs == null) {
				xs = 100;
				ys = 100;
			}
			context.fillRect(x, y, xs, ys);
		}
	}

	/**
	 * 
	 * Creates a path for a hexagon.
	 * Use with context.fill() ot context.stroke()
	 * @param  {number} cX
	 * @param  {number} cY
	 * @param  {number} vertex
	 */
	traceHexagonPath(context, cX, cY, vertex) {
		context.beginPath();
		for (let i = 0; i < 6; i++) {
			let angle = (Math.PI / 3) * i;
			let dx = Math.cos(angle) * vertex;
			let dy = Math.sin(angle) * vertex;
			let tX = cX + dx, tY = cY + dy;
			context.lineTo(tX, tY);
		}
		context.closePath();
	}

	/**
	 * 
	 * Creates a path for an n-gon.
	 * Use with context.fill() ot context.stroke()
	 * @param  {number} n
	 * @param  {number} cX
	 * @param  {number} cY
	 * @param  {number} vertex
	 */
	tracePolygonPath(context, n, cX, cY, vertex) {
		context.beginPath();
		for (let i = 0; i < n; i++) {
			let angle = (Math.PI / (n / 2) * i);
			let dx = Math.cos(angle) * vertex;
			let dy = Math.sin(angle) * vertex;
			let tX = cX + dx, tY = cY + dy;
			context.lineTo(tX, tY);
		}
		context.closePath();
	}

}

export {Mivka, Util, CanvasUtil}