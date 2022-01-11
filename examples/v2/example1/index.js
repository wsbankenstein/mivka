let player = {x: 100, y: 100, w: 100, h: 100};

function update() {
    if (isKeyPressed.get('w')) player.y -= 5;
    if (isKeyPressed.get('s')) player.y += 5;
    if (isKeyPressed.get('a')) player.x -= 5;
    if (isKeyPressed.get('d')) player.x += 5;
}

function draw() {
    context.fillStyle = '#272727';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#FAE100';
    context.fillRect(player.x, player.y, player.w, player.h);
}
