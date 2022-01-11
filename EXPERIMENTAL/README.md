# mivka
## This is a little "game engine" consisting of an HTML canvas drawing utility and some other stuff.
#### Thank you to all the wonderful (and horrible) people at Telerik Academy for letting me improve on and distribute their code.
---
## methods and properties of Mivka:

```js
isKeyPressed(k)
```
- will return `true` if the key is being held and `false` (or `undefined` which gets casted to `false`) if it isn't.
- Note: `k` has to be one of the possible values of `KeyboardEvent.key`, for example `q`, `w`, `Enter`, `Shift` etc.
- Also, the space bar is represented as ` `.
- Please refer to https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values for details.
- see `keyStates` below
---

```js
keyStates
```
- don't touch this. (Unless you want to pretend the user is holding down a key until they actually press it.)
---

```js
isUpdatePaused() 
```

- does not need documentation
---

```js
pauseUpdate() 
```

- does not need documentation
---

```js
startUpdate() 
```

- does not need documentation
---

```js
setCanvasSize(w, h) 
```

- does not need documentation
---

```js
setFullscreen() 
```

- see `fullscreen` below

```js
fullscreen
```

- In addition to making the canvas take up the whole window, this property adds a resize handler which automatically adjusts the canvas size whenever the window is resized.
---

```js
generateFullscreenCSS()
```
- generates CSS which removes body padding, margins, and overflow. Useful (read: mandatory) if the canvas is fullscreen.
---

## methods and properties of Util:

```js
randomInt(min, max) 
```

- generates a random integer between `min` and `max`
---

```js
xywh(x, y, w, h) 
```

- returns an object with the provided X, Y, width, and height
---

```js
save(data, memoryIndex) 
```

- save something to localStorage (it doesn't need to be a string, JSON.stringify is incorporated in the function), however `memoryIndex` has to be a string.
---

```js
restore(memoryIndex) 
```

- returns the item at `memoryIndex` in localStorage
---

```js
randomOf(array) 
```

- returns a random item from the provided array
---

```js
areColliding(ax, ay, aw, ah, bx, by, bw, bh) 
```

- returns `true` if two rectangles are overlapping, and `false` if they are not
---

```js
loadImage(imagePath, backupColour) 
```

- creates a JS Image object from an image
---

```js
distance(x1, y1, x2, y2) 
```

- calculates distance between two points
---

```js
getTriangleArea(x1, y1, x2, y2, x3, y3) 
```

- calculates the area of a triangle using Heron's formula
---

```js
isInTriangle(pX, pY, x1, y1, x2, y2, x3, y3) 
```

- returns `true` if (pX; pY) is within the triangle defined by (x1; y1); (x2; y2); (x3; y3) and `false` otherwise
---

```js
isInHexagon(cX, cY, vertex, pX, pY) 
```

- returns `true` if `(pX; pY)` is within the hexagon centred at `(cX; cY)` with a vertex length of `vertex` and `false` otherwise
---

```js
isInRectangle(pX, pY, rX, rY, rW, rH) 
```

- returns `true` if `(pX; pY)` is within the rectangle with the top left corner at `(rX; rY)`, the width of `rW`, and the height of `rH` and `false` otherwise
---

```js
isInCircle(pX, pY, cX, cY, r) 
```

- returns `true` if `(pX; pY)` is within the circle centred at `(cX; cY)` with the radius of `r` and `false` otherwise
---

## methods and properties of CanvasUtil:

```js
drawLine(x1, y1, x2, y2) 
```

- draws a line. 
- Seems quite pointless, actually really useful if you draw a lot of lines.
---

```js
drawImage(image, x, y, w, h) 
```

- improved version of `context.drawImage` (`image` must be a JS Image object)
---


```js
traceHexagonPath(cX, cY, vertex) 
```

- traces a path for the hexagon centred at (cX; cY) with a vertex length of *vertex* (for use with context.fill() or context.stroke())
---

```js
tracePolygonPath(n, cX, cY, vertex) 
```

- traces a path for the n-gon centred at (cX; cY) with a vertex length of *vertex* (for use with context.fill() ot context.stroke())

## So, how do I use this?
```html
<script src="./Mivka.js" type="module">
<script src="./yourfile.js" type="module">
```

Note that your file must also be assigned type="module" for the import statement to work.

```js
import { Mivka, Util, CanvasUtil } from './Mivka.js';
const mivka = new Mivka(document.getElementById('canvas-id'));
const util = new Util(); // You can also use Util as an abstract class with Util.prototype, but that takes significantly more typing.
const cUtil = new CanvasUtil(mivka.canvas);

// Variable declaration

mivka.update = function() {
	// ...
}

mivka.draw = function() {
	const canvas = mivka.canvas; // these only exist
	const ctx = mivka.context;   // to save typing
}

mivka.init(); // Don't forget this!

```

## Please refer to the comments in the source code for more information.
