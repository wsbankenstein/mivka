/* User file contents:

Variable declarations

function update() {...} (called by setInterval)

function draw() {...} (called by redraw() every frame)

function mousemove/mouseup/mousedown/keyup/keydown(e) {...} (added to event listeners)

*/

let body = document.getElementsByTagName('body')[0];
body.oncontextmenu = function () { return false; }; // disable right-click context menu

// Create canvas if it doesn't exist
if (!document.getElementById('mivka-canvas')) {
	let canvas = document.createElement('canvas');
	canvas.id = 'mivka-canvas';
	body.appendChild(canvas);
} else let canvas = document.getElementById('mivka-canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');
context.fillStyle = '#272727';

let isKeyPressed = new Map();
// This no longer uses the deprecated KeyboardEvent.keyCode
// It now uses KeyboardEvent.key (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
// Full list at https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
// undefined gets casted to a boolean false, so accessing this before a key is pressed should be fine
// Note that values are accessed with isKeyPressed.get(key)
// Also, you can't store this in localStorage, because it's a Map
// Please refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// Also, Github Copilot just GUESSED THE F*CKING LINK I WAS ABOUT TO COPY-PASTE

const reqAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	setTimeout(callback, 1000 / 30);
};

function redraw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	draw(); // call user's draw() function (init will throw an error if it's not defined)
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

	if (!isUpdatePaused_) {
		reqAnimationFrame(redraw);
	}
};

function init() {
	if ('ontouchstart' in window || navigator.maxTouchPoints) {
		isMobile = true;
		window.addEventListener('touchstart', function (e) {
			let touchobj = e.changedTouches[0];
			mouseX = parseInt(touchobj.pageX - canvas.offsetLeft);
			mouseY = parseInt(touchobj.pageY - canvas.offsetTop);
			mousedown();
		});

		window.addEventListener('touchend', function (e) {
			let touchobj = e.changedTouches[0];
			mouseX = parseInt(touchobj.pageX - canvas.offsetLeft);
			mouseY = parseInt(touchobj.pageY - canvas.offsetTop);
			mouseup();
		});

		window.addEventListener('touchmove', function (e) {
			let touchobj = e.changedTouches[0];
			mouseX = parseInt(touchobj.pageX - canvas.offsetLeft);
			mouseY = parseInt(touchobj.pageY - canvas.offsetTop);
		});
	}

	window.addEventListener('mousemove', function (e) {
		mouseX = e.pageX - canvas.offsetLeft;
		mouseY = e.pageY - canvas.offsetTop;
	});

	if (typeof mousemove != 'undefined') window.addEventListener('mousemove', mousemove);

	if (typeof mouseup != 'undefined') window.addEventListener('mouseup', mouseup);

	if (typeof mousedown != 'undefined') window.addEventListener('mousedown', mousedown);

	if (typeof keydown != 'undefined') {
		window.addEventListener('keydown', function (e) {
			isKeyPressed.set(e.key, true);
			keydown(e);
		});
	} else {
		window.addEventListener('keydown', function (e) {
			isKeyPressed.set(e.key, true);
		});
	}

	if (typeof keyup != 'undefined') {
		window.addEventListener('keyup', function (e) {
			isKeyPressed.set(e.key, false);
			keyup(e);
		});
	} else {
		window.addEventListener('keyup', function (e) {
			isKeyPressed.set(e.key, false);
		});
	}

	if (typeof draw == 'undefined') {
		redraw = function () {
			console.error('draw() is not defined!');
			context.clearRect(0, 0, canvas.width, canvas.height);
			alert('draw() is not defined!');
		};
	}

	redraw();
	updateInterval = setInterval(update, updateTime);
}

body.onload = init;

function randomInt(a, b) {
	return Math.floor(Math.random() * (b - a)) + a;
}

function xywh(x1, y1, w1, h1) {
	let a = {
		x: x1,
		y: y1,
		w: w1,
		h: h1
	};
	return a;
}

function save(data, memoryIndex) { //NOTE: memoryIndex IS A STRING!
	localStorage.setItem(memoryIndex, JSON.stringify(data));
}

function restore(memoryIndex) {
	return JSON.parse(localStorage.getItem(memoryIndex));
}

function randomOf(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
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

function drawLine(startX, startY, endX, endY) {
	// For better performance bunch calls to lineTo without beginPath() and stroke() inbetween.
	context.beginPath(); // resets the current path
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
}

function loadImage(imagePath, backupColour) {
	result = {};
	result.img = new Image();
	result.img.src = imagePath;
	result.color = backupColour || '#FF0000';
	return result;
}

function drawImage(imageWithBackupColourObject, x, y, xs, ys) {
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

function setCanvasSize(w, h) {
	canvas.width = w;
	canvas.height = h;
}

function setFullscreen() {
	setCanvasSize(window.innerWidth, window.innerHeight);
}

let updateTime = 10; // in ms
let isUpdatePaused_ = false, updateInterval = undefined;

function isUpdatePaused() {
	return isUpdatePaused_;
}

function pauseUpdate() {
	clearInterval(updateInterval);
	isUpdatePaused_ = true;
}

function startUpdate() {
	updateInterval = setInterval(update, updateTime);
	isUpdatePaused_ = false;
	redraw();
}

// POLYGON FUNCTIONS

// Distance between two points
function distance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function getTriangleArea(x1, y1, x2, y2, x3, y3) {
	let a = distance(x1, y1, x2, y2),
		b = distance(x2, y2, x3, y3),
		c = distance(x1, y1, x3, y3),
		p = (a + b + c) / 2;
	return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

function isInTriangle(pX, pY, x1, y1, x2, y2, x3, y3) {
	let S1 = getTriangleArea(pX, pY, x1, y1, x2, y2),
		S2 = getTriangleArea(pX, pY, x2, y2, x3, y3),
		S3 = getTriangleArea(pX, pY, x3, y3, x1, y1),
		S = getTriangleArea(x1, y1, x2, y2, x3, y3);
	return Math.abs(S1 + S2 + S3 - S) < 5;
}

function isInHexagon(cX, cY, vertex, pX, pY) {
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

function isInRectangle(pX, pY, rX, rY, rW, rH) {
	if (pX >= rX && pX <= rX + rW && pY >= rY && pY <= rY + rH) return true;
	else return false;
}

function isInCircle(pX, pY, cX, cY, r) {
	if ((pX - cX) * (pX - cX) + (pY - cY) * (pY - cY) <= r * r) return true;
	else return false;
}

// Creates a path for a hexagon
// Use with context.fill() ot context.stroke()
function traceHexagonPath(cX, cY, vertex) {
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

function tracePolygonPath(n, cX, cY, vertex) {
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
