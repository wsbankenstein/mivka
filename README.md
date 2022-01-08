# mivka
## This is a little "game engine" consisting of an HTML canvas drawing utility and some other stuff.
#### Thank you to all the wonderful (and horrible) people at Telerik Academy for letting me improve on and distribute their code.
---

```js
isKeyPressed.get(k)
```
- will return `true` if the key is being held and `false` (or `undefined` which gets casted to `false`) if it isn't.
- Note: `k` has to be one of the possible values of `KeyboardEvent.key`, for example `q`, `w`, `Enter`, `Shift` etc.
- Also, the space bar is represented as ` `.
- Please refer to https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values for details.
---

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
drawLine(x1, y1, x2, y2) 
```

- draws a line. 
- Seems quite pointless, actually really useful if you draw a lot of lines.
---

```js
loadImage(imagePath, backupColour) 
```

- creates a JS Image object from an image
---

```js
drawImage(image, x, y, w, h) 
```

- improved version of `context.drawImage` (`image` must be a JS Image object)
---

```js
setCanvasSize(w, h) 
```

- does not need documentation
---

```js
setFullscreen() 
```

- does not need documentation
---

```js
updateTime
```

- global variable which determines the interval for `function update()`
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

Just put the following line within the `<html>` tag (and preferably after the `body` tag) of an html file:
```
<script defer src='mivka.js'>
```
(Note: the `defer` attribute is pretty much useless [especially with an empty body], but it's good practice.)

Also, if the game is meant to be the only thing on the page, you might want to write some CSS to get rid of the margins:
```css
body, canvas {
	margin: 0;
	padding: 0;
	overflow: hidden;
}
```
You don't have to make a css file for it, you can just put it in a `<style>` tag.

## Please refer to the comments in the source code for more information.
