# mivka.html
## This is an HTML canvas drawing utility (and a bit more).
#### Thank you to all the wonderful (and horrible) people at Telerik Academy for letting me improve on and distribute their code.

### _randInt(min, max)_ - generates a random integer between *min* and *max*

### _xywh(x, y, w, h)_ - returns an object with the provided X, Y, width, and height

### _save(data, memoryIndex)_ - save something to localStorage (it doesn't need to be a string, JSON.stringify is incorporated in the function), however *memoryIndex* has to be a string.

### _restore(memoryIndex)_ - returns the item at *memoryIndex* in localStorage

### _randomOf(array)_ - returns a random item from the provided array

### _areColliding(ax, ay, aw, ah, bx, by, bw, bh)_ - returns *true* if two rectangles are overlapping, and *false* if they are not

### _drawLine(x1, y1, x2, y2)_ - draws a line. Seems quite pointless, actually really useful if you draw a lot of lines.

### _tryToLoad(imagePath, backupColour)_ - creates a JS Image object from an image

### _drawImage(image, x, y, w, h)_ - improved version of *context.drawImage* (*image* must be a JS Image object)

### _setCanvasSize(w, h)_ - does not need documentation

### _setFullscreen()_ - does not need documentation

### _updateTime_ - global variable that sets the interval for *function update()*

### _isUpdatePaused()_ - does not need documentation

### _pauseUpdate()_ - does not need documentation

### _startUpdate()_ - does not need documentation

###  _distance(x1, y1, x2, y2)_ - calculates distance between two points

### _getTriangleArea(x1, y1, x2, y2, x3, y3)_ - calculates the area of a triangle using Heron's formula

### _isInTriangle(pX, pY, x1, y1, x2, y2, x3, y3)_ - returns *true* if (pX; pY) is within the triangle defined by (x1; y1); (x2; y2); (x3; y3) and *false* otherwise

### _isInHexagon(cX, cY, vertex, pX, pY)_ - returns *true* if (pX; pY) is within the hexagon centred at (cX; cY) with a vertex length of *vertex* and *false* otherwise

### _isInRectangle(pX, pY, rX, rY, rW, rH)_ - returns *true* if (pX; pY) is within the rectangle with the top left corner at (rX; rY), the width of *rW*, and the height of *rH*

### _isInCircle(pX, pY, cX, cY, r)_ - returns *true* if (pX; pY) is within the circle centred at (cX; cY) with the radius of *r*

### _traceHexagonPath(cX, cY, vertex)_ - traces a path for the hexagon centred at (cX; cY) with a vertex length of *vertex* (for use with context.fill() or context.stroke())

### The whole isKeyPressed thing uses deprecated stuff, you could just use the *key* attribute of the keyup and keydown event listeners