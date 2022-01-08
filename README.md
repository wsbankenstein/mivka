# mivka
## This is a little "game engine" consisting of an HTML canvas drawing utility and some other stuff.
#### Thank you to all the wonderful (and horrible) people at Telerik Academy for letting me improve on and distribute their code.

```js
randomInt(min, max) 
```

- generates a random integer between *min* and *max*
---

```js
xywh(x, y, w, h) 
```

- returns an object with the provided X, Y, width, and height
---

```js
save(data, memoryIndex) 
```

- save something to localStorage (it doesn't need to be a string, JSON.stringify is incorporated in the function), however *memoryIndex* has to be a string.
---

```js
restore(memoryIndex) 
```

- returns the item at *memoryIndex* in localStorage
---

```js
randomOf(array) 
```

- returns a random item from the provided array
---

```js
areColliding(ax, ay, aw, ah, bx, by, bw, bh) 
```

- returns *true* if two rectangles are overlapping, and *false* if they are not
---

```js
drawLine(x1, y1, x2, y2) 
```

- draws a line. Seems quite pointless, actually really useful if you draw a lot of lines.
---

```js
tryToLoad(imagePath, backupColour) 
```

- creates a JS Image object from an image
---

```js
drawImage(image, x, y, w, h) 
```

- improved version of *context.drawImage* (*image* must be a JS Image object)
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

- global variable that sets the interval for *function update()*
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

- returns *true* if (pX; pY) is within the triangle defined by (x1; y1); (x2; y2); (x3; y3) and *false* otherwise
---

```js
isInHexagon(cX, cY, vertex, pX, pY) 
```

- returns *true* if (pX; pY) is within the hexagon centred at (cX; cY) with a vertex length of *vertex* and *false* otherwise
---

```js
isInRectangle(pX, pY, rX, rY, rW, rH) 
```

- returns *true* if (pX; pY) is within the rectangle with the top left corner at (rX; rY), the width of *rW*, and the height of *rH*
---

```js
isInCircle(pX, pY, cX, cY, r) 
```

- returns *true* if (pX; pY) is within the circle centred at (cX; cY) with the radius of *r*
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

### The whole isKeyPressed thing uses deprecated stuff, you could just use the *key* attribute of the keyup and keydown event listeners