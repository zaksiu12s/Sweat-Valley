"use strict";

//multiples n times tile dimentions
function toTiles(n, tile) {
    return n * tile
}

//check if object1 touches object2
function checkForCollisions(object1, object2) {
    if (object1.position.x + object1.frameDimentions.width - object1.frameCut.x > object2.position.x + object2.frameCut.x && //kiedy prawo duszka 1 dotyka lewa duszka 2
        object1.position.x + object1.frameCut.x < object2.position.x + object2.frameDimentions.width - object2.frameCut.x && //kiedy lewo duszka 2 nie dotyka prawa duszka 2
        object1.position.y + object1.frameDimentions.height - object1.frameCut.y > object2.position.y + object2.frameCut.y &&
        object1.position.y + object1.frameCut.y < object2.position.y + object2.frameDimentions.height - object2.frameCut.y) {
        //console.log("Collision occured!")
        return true
    }
}

//check if object1 touches object2 (wall)
function checkForWalls(object1, object2, change, direction) {
    /*if ((direction === "up" || direction === "down") &&
        object1.position[property] + change + object1.frameDimentions.width - object1.frameCut.x > object2.collisionBlocks.first.x + object2.position.x && //kiedy prawo duszka 1 dotyka lewa duszka 2
        object1.position[property] + change + object1.frameCut.x < object2.collisionBlocks.first.x + object2.collisionBlocks.first.x1 + object2.position.x && //kiedy lewo duszka 2 nie dotyka prawa duszka 2
        object1.position.y + object1.frameDimentions.height - object1.frameCut.y > object2.collisionBlocks.first.y + object2.position.y &&
        object1.position.y + object1.frameCut.y < object2.collisionBlocks.first.y + object2.collisionBlocks.first.y1 + object2.position.y) {
        console.log("Collision will occur!")
        console.log(direction)
        return true
    }
    if ((direction === "right" || direction === "left") &&
        object1.position.x + object1.frameDimentions.width - object1.frameCut.x > object2.collisionBlocks.first.x + object2.position.x && //kiedy prawo duszka 1 dotyka lewa duszka 2
        object1.position.x + object1.frameCut.x < object2.collisionBlocks.first.x + object2.collisionBlocks.first.x1 + object2.position.x && //kiedy lewo duszka 2 nie dotyka prawa duszka 2
        object1.position[property] + change + object1.frameDimentions.height - object1.frameCut.y > object2.collisionBlocks.first.y + object2.position.y &&
        object1.position[property] + change + object1.frameCut.y < object2.collisionBlocks.first.y + object2.collisionBlocks.first.y1 + object2.position.y
    ) {
        console.log(direction)
        console.log("Collision will occur!")
        return true
    }*/
    for (var i = 0; i < object2.collisionBlocks.length; i++) {
        switch (direction) {
            case "up":
                if (object1.position.y + change - 0.1 + object1.frameDimentions.height - object1.frameCut.y < object2.collisionBlocks[i].y + object2.collisionBlocks[i].height
                    && object1.position.y + object1.frameDimentions.height - object1.frameCut.y > object2.collisionBlocks[i].y
                    && object1.position.x + object1.frameDimentions.width - object1.frameCut.x > object2.collisionBlocks[i].x
                    && object1.position.x + object1.frameCut.x < object2.collisionBlocks[i].x + object2.collisionBlocks[i].width
                ) {
                    return true
                }
                break
            case "down":
                if (object1.position.y + change + 0.1 + object1.frameDimentions.height - object1.frameCut.y > object2.collisionBlocks[i].y
                    && object1.position.y + 25 + object1.frameCut.y < object2.collisionBlocks[i].y + object2.collisionBlocks[i].height
                    && object1.position.x + object1.frameDimentions.width - object1.frameCut.x > object2.collisionBlocks[i].x
                    && object1.position.x + object1.frameCut.x < object2.collisionBlocks[i].x + object2.collisionBlocks[i].width
                ) {
                    return true
                }
                break
            case "left":
                if (object1.position.x + change + object1.frameCut.x < object2.collisionBlocks[i].x + object2.collisionBlocks[i].width
                    && object1.position.x + object1.frameDimentions.width - object1.frameCut.x > object2.collisionBlocks[i].x
                    && object1.position.y + object1.frameDimentions.height - object1.frameCut.y > object2.collisionBlocks[i].y
                    && object1.position.y + object1.frameDimentions.height - object1.frameCut.y < object2.collisionBlocks[i].y + object2.collisionBlocks[i].height
                ) {
                    return true
                }
                break
            case "right":
                if (object1.position.x + change + object1.frameDimentions.width - object1.frameCut.x > object2.collisionBlocks[i].x
                    && object1.position.x + object1.frameCut.x < object2.collisionBlocks[i].x + object2.collisionBlocks[i].width
                    && object1.position.y + object1.frameDimentions.height - object1.frameCut.y > object2.collisionBlocks[i].y
                    && object1.position.y + object1.frameDimentions.height - object1.frameCut.y < object2.collisionBlocks[i].y + object2.collisionBlocks[i].height
                ) {
                    return true
                }
                break

        }

        //console.log(object1.position.y)
        //console.log(object2.collisionBlocks[i].y + object2.collisionBlocks[i].height)
        //console.log(object1.position.y + object1.frameDimentions.height < object2.collisionBlocks[i].y + object2.collisionBlocks[i].height)
        //console.log(object1.position.y + change + object1.frameDimentions.height - 25)
        //console.log(object2.collisionBlocks[i].y)
        //console.log(object1.position.y + change + object1.frameDimentions.height - 25 > object2.collisionBlocks[i].y)
        //console.log(object1.position.y + change + object1.frameDimentions.height - 15)
        //console.log("PLAYER POSITION.x: " + player.position.x + " PLAYER POSITION.y: " + player.position.y)
    }
}

function checkForInterractionBlocks(object1, object2) {
    for (var i = 0; i < object2.interractionBlocks.length; i++) {

        if (object1.position.y - 0.1 + object1.frameDimentions.height - object1.frameCut.y < object2.interractionBlocks[i].y + object2.interractionBlocks[i].height
            && object1.position.y + object1.frameDimentions.height - object1.frameCut.y > object2.interractionBlocks[i].y
            && object1.position.x + object1.frameDimentions.width - object1.frameCut.x > object2.interractionBlocks[i].x
            && object1.position.x + object1.frameCut.x < object2.interractionBlocks[i].x + object2.interractionBlocks[i].width
        ) {
            return true
        }
        if (object1.position.y + 0.1 + object1.frameDimentions.height - object1.frameCut.y > object2.interractionBlocks[i].y
            && object1.position.y + 25 + object1.frameCut.y < object2.interractionBlocks[i].y + object2.interractionBlocks[i].height
            && object1.position.x + object1.frameDimentions.width - object1.frameCut.x > object2.interractionBlocks[i].x
            && object1.position.x + object1.frameCut.x < object2.interractionBlocks[i].x + object2.interractionBlocks[i].width
        ) {
            return true
        }
        if (object1.position.x + object1.frameCut.x < object2.interractionBlocks[i].x + object2.interractionBlocks[i].width
            && object1.position.x + object1.frameDimentions.width - object1.frameCut.x > object2.interractionBlocks[i].x
            && object1.position.y + object1.frameDimentions.height - object1.frameCut.y > object2.interractionBlocks[i].y
            && object1.position.y + object1.frameDimentions.height - object1.frameCut.y < object2.interractionBlocks[i].y + object2.interractionBlocks[i].height
        ) {
            return true
        }
        if (object1.position.x + object1.frameDimentions.width - object1.frameCut.x > object2.interractionBlocks[i].x
            && object1.position.x + object1.frameCut.x < object2.interractionBlocks[i].x + object2.interractionBlocks[i].width
            && object1.position.y + object1.frameDimentions.height - object1.frameCut.y > object2.interractionBlocks[i].y
            && object1.position.y + object1.frameDimentions.height - object1.frameCut.y < object2.interractionBlocks[i].y + object2.interractionBlocks[i].height
        ) {
            return true
        }
    }
}

function centerMap(value, direction) {
    var center = {
        x: (canvas.width - 64) / 2,
        y: (canvas.height - 64) / 2
    }

    switch (direction) {
        case "x":
            return value + center.x - window.cameraPerson.position.x
        case "y":
            return value + center.y - window.cameraPerson.position.y
    }
}

/*var waiting = false

var myfunction = function() {
    if (!waiting) {
        
        waiting = setTimeout(function() {
            waiting = false
        }, 1000)
    }
}*/


/*var lastRan = 0
var myFunction = function (delay) {
    var now = Date.now();
    if (now - lastRan < delay) {
        return true
    }

    lastRan = now;

    //rest of function
}*/

function changeMap() {
    window.currentMap = window.currentMapChange
    player.position = currentMap.objectsPositions.playerPosition
    window.currentMapChange = " "
    window.mapChange = false

    console.log("Function run!")
}