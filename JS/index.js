"use strict";

//draw on canvas
function draw() {
    //drawing current map LOWER VERSION
    window.currentMap.drawMap(window.cameraPerson)

    //drawing all sprites
    for (var i = 0; i < window.currentMap.objects.length; i++) {
        window.currentMap.objects[i].animate()
        window.currentMap.objects[i].draw()
    }

    //drawing current map HIGHER VERSION
    window.currentMap.drawMapHigher()
    player.drawHud()
}

//start the game
function start() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    if (window.mapChange === true) {
        var mapChanger = setTimeout(changeMap(), 1000)

    }

    //look for direction keys and space key
    player.pressedKeys = {
        direction: keyboard.pressedKeys.heldDirection,
        spaceHeld: keyboard.pressedKeys.spaceHeld,
        shiftHeld: keyboard.pressedKeys.shiftHeld
    }

    //draw
    window.cameraPerson = player
    player.updatePlayer()
    draw()

    //new frame
    window.requestAnimationFrame(start)
}

//start the game
window.onload = function () {
    start()
}

