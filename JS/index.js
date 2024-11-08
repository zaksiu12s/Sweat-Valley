"use strict";

//create canvas
const canvas = document.querySelector('.gameCanvas')
const ctx = canvas.getContext('2d')
var CANVAS_WIDTH = canvas.width
var CANVAS_HEIGHT = canvas.height

//create people sprites
const player = new Player({
    position: {
        x: 0,
        y: 0
    },
    frameCut: {
        x: 27,
        y: 24
    },
    frameDimentions: {
        width: 64,
        height: 64
        //width: 32,
        //height: 32
    },
    currentFrame: {
        x: 1,
        y: 0,
        currentAnimation: "idle"
    },
    frameSpeed: {
        idle: 12,
        walk: 6,
        run: 4
    },
    src: {
        idle: "./ASSETS/PEOPLE/character_light_idle_body.png",
        walk: "./ASSETS/PEOPLE/character_light_walk_body.png",
        run: "./ASSETS/PEOPLE/character_light_run_body_with_dust_specs.png"
        //idle:"./ASSETS/PEOPLE/player.png",
        //walk:"./ASSETS/PEOPLE/player.png",
        //run: "./ASSETS/PEOPLE/player.png"
    }
})

const npc1 = new People({
    position: {
        x: 700,
        y: 658
    },
    frameCut: {
        x: 27,
        y: 24
    },
    frameDimentions: {
        width: 64,
        height: 64
        //width: 32,
        //height: 32
    },
    currentFrame: {
        x: 1,
        y: 0,
        currentAnimation: "idle"
    },
    frameSpeed: {
        idle: 12,
        walk: 6,
        run: 4
    },
    src: {
        idle: "./ASSETS/PEOPLE/character_light_idle_body.png",
        walk: "./ASSETS/PEOPLE/character_light_walk_body.png",
        run: "./ASSETS/PEOPLE/character_light_run_body_with_dust_specs.png"
        //idle:"./ASSETS/PEOPLE/player.png",
        //walk:"./ASSETS/PEOPLE/player.png",
        //run: "./ASSETS/PEOPLE/player.png"
    }
})

//create islands
const islands = new Map({
    src: "./ASSETS/MAPS/island.png",
    upperSrc: "./ASSETS/MAPS/islandUpper.png",
    collisionBlocks: [
        { //LEWA STRONA WYSPY OD SAMEJ GÓRY DO DOŁU
            x: 0,
            y: 0,
            width: 648,
            height: 1129
        },
        { //PRAWA STRONA WYSPY OD SAMEJ GÓRY DO PORTU
            x: 1020,
            y: 0,
            width: 576,
            height: 657
        },
        { //DŁUGOŚĆ PORTU - KONIEC DO KOŃCA MAPY
            x: 1063,
            y: 657,
            width: 533,
            height: 18
        },
        { //OD SAMEJ GÓRY WYSPY DO POCZĄTKU DRZEW W 2 RZĘDZIE
            x: 0,
            y: 0,
            width: 1596,
            height: 512
        },
        { //PRAWA STRONA WYSPY OD PORTU DO DOŁU
            x: 1020,
            y: 675,
            width: 576,
            height: 454
        },

        //DÓŁ PO KOLEI OD LEWEJ
        {
            x: 647,
            y: 751,
            width: 84,
            height: 1000
        },
        {
            x: 817,
            y: 739,
            width: 130,
            height: 1000
        },
        {
            x: 899,
            y: 729,
            width: 14,
            height: 1000
        },
        {
            x: 860,
            y: 753,
            width: 300,
            height: 1000
        },
        {
            x: 985,
            y: 739,
            width: 300,
            height: 1000
        },
        {
            x: 683,
            y: 739,
            width: 13,
            height: 1000
        },
        {
            x: 650,
            y: 765,
            width: 200,
            height: 1000
        },

        {
            x: 770,
            y: 751,
            width: 60,
            height: 1000
        },

        //DOM
        {
            x: 707,
            y: 626,
            width: 50,
            height: 29
        },

        //PŁOT LEWO DOM PRAWO
        {
            x: 664,
            y: 643,
            width: 60,
            height: 16
        },
        {
            x: 740,
            y: 643,
            width: 60,
            height: 16
        },

        { //KRZAK LEWO DOM
            x: 676,
            y: 631,
            width: 17,
            height: 16
        },
        { //KRZAK PRAWO DOM
            x: 772,
            y: 631,
            width: 17,
            height: 16
        },
        { //KRZAK LEWO DÓŁ DOM 
            x: 664,
            y: 703,
            width: 17,
            height: 16
        },
        { //KRZAK LEWO POD DOMEM 
            x: 748,
            y: 727,
            width: 17,
            height: 16
        },
        { //PIERWSZY KRZAK NA ŚCIEŻCE OD DOMU 
            x: 856,
            y: 667,
            width: 17,
            height: 16
        },
        { //DRUGI KRZAK NA ŚCIEŻCE OD DOMU 
            x: 964,
            y: 703,
            width: 17,
            height: 16
        },
        { //KRZAK KOŁO PORTU
            x: 988,
            y: 631,
            width: 17,
            height: 16
        },
        { //KRZAK PRAWO GÓRA
            x: 688,
            y: 559,
            width: 17,
            height: 16
        },
        { //KRZAK GÓRA
            x: 796,
            y: 547,
            width: 17,
            height: 16
        },
        { //KRZAK LEWO JEZIORO
            x: 892,
            y: 583,
            width: 17,
            height: 16
        },
        { //KRZAK PRAWO GÓRA JEZIORO
            x: 964,
            y: 559,
            width: 17,
            height: 16
        },

        { //PŁOT JEZIORO
            x: 916,
            y: 631,
            width: 52,
            height: 16
        },

        { //SREDNIE DRZEWA
            x: 661,
            y: 594,
            width: 22,
            height: 16
        },
        { //SREDNIE DRZEWA
            x: 685,
            y: 594,
            width: 22,
            height: 16
        },
        { //SREDNIE DRZEWA
            x: 709,
            y: 594,
            width: 22,
            height: 16
        },
        { //SREDNIE DRZEWA
            x: 733,
            y: 594,
            width: 22,
            height: 16
        },
        { //SREDNIE DRZEWA
            x: 733,
            y: 594,
            width: 22,
            height: 16
        },
        { //SREDNIE DRZEWA
            x: 757,
            y: 594,
            width: 22,
            height: 16
        },
        { //SREDNIE DRZEWA
            x: 781,
            y: 594,
            width: 22,
            height: 16
        },

        { //JEZIORO
            x: 930,
            y: 588,
            width: 25,
            height: 50
        },

        { //JEZIORO TYLKO WODA
            x: 928,
            y: 595,
            width: 29,
            height: 30
        },

        { //DRZEWA GÓRA
            x: 683,
            y: 500,
            width: 26,
            height: 23
        },

        { //DRZEWA GÓRA
            x: 731,
            y: 500,
            width: 26,
            height: 23
        },

        { //DRZEWA GÓRA
            x: 779,
            y: 500,
            width: 26,
            height: 23
        },

        { //DRZEWA GÓRA
            x: 827,
            y: 500,
            width: 26,
            height: 23
        },

        { //DRZEWA GÓRA
            x: 875,
            y: 500,
            width: 26,
            height: 23
        },

        { //DRZEWA GÓRA
            x: 923,
            y: 500,
            width: 26,
            height: 23
        },

        { //DRZEWA GÓRA
            x: 923,
            y: 500,
            width: 26,
            height: 23
        },

        { //DRZEWA GÓRA
            x: 971,
            y: 500,
            width: 26,
            height: 23
        },
    ],
    interractionBlocks: [
        { //DRZWI
            direction: "islandHomeInside",
            x: 724,
            y: 639,
            width: 16,
            height: 18
        },
    ],
    objects: [
        player, npc1
    ],
    objectsPositions: {
        playerPosition: {
            x: 700,
            y: 658
        }
    }
})
const kitchen = new Map({
    src: "./ASSETS/MAPS/KitchenLower.png",
    upperSrc: "./ASSETS/MAPS/KitchenUpper.png",
    collisionBlocks: [
        {
            x: toTiles(0, 16),
            y: toTiles(0, 16),
            width: toTiles(14, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(0, 16),
            y: toTiles(1, 16),
            width: toTiles(1, 16),
            height: toTiles(10, 16)
        },
        {
            x: toTiles(0, 16),
            y: toTiles(10, 16),
            width: toTiles(5, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(4, 16),
            y: toTiles(11, 16),
            width: toTiles(3, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(6, 16),
            y: toTiles(10, 16),
            width: toTiles(8, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(13, 16),
            y: toTiles(1, 16),
            width: toTiles(1, 16),
            height: toTiles(9, 16)
        },
        {
            x: toTiles(1, 16),
            y: toTiles(4.95, 16),
            width: toTiles(1, 16),
            height: toTiles(3.05, 16)
        },
        {
            x: toTiles(1, 16),
            y: toTiles(1, 16),
            width: toTiles(12, 16),
            height: toTiles(3, 16)
        },
        {
            x: toTiles(2, 16),
            y: toTiles(4, 16),
            width: toTiles(2, 16),
            height: toTiles(0.65, 16)
        },
        {
            x: toTiles(5, 16),
            y: toTiles(4, 16),
            width: toTiles(4, 16),
            height: toTiles(0.65, 16)
        },
        {
            x: toTiles(9, 16),
            y: toTiles(4, 16),
            width: toTiles(2, 16),
            height: toTiles(0.5, 16)
        },
        {
            x: toTiles(11, 16),
            y: toTiles(4, 16),
            width: toTiles(2, 16),
            height: toTiles(1.5, 16)
        },
        {
            x: toTiles(1, 16),
            y: toTiles(9, 16),
            width: toTiles(2, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(6, 16),
            y: toTiles(7, 16),
            width: toTiles(2, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(9, 16),
            y: toTiles(7, 16),
            width: toTiles(2, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(9, 16),
            y: toTiles(9, 16),
            width: toTiles(2, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(0, 16),
            y: toTiles(0, 16),
            width: toTiles(1, 16),
            height: toTiles(12, 16)
        },
        {
            x: toTiles(0, 16),
            y: toTiles(0, 16),
            width: toTiles(1, 16),
            height: toTiles(12, 16)
        },
        {
            x: toTiles(0, 16),
            y: toTiles(11, 16),
            width: toTiles(14, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(0, 16),
            y: toTiles(11, 16),
            width: toTiles(14, 16),
            height: toTiles(1, 16)
        },
        {
            x: toTiles(13, 16),
            y: toTiles(0, 16),
            width: toTiles(1, 16),
            height: toTiles(12, 16)
        },
        {
            x: toTiles(1, 16),
            y: toTiles(4, 16),
            width: toTiles(1, 16),
            height: toTiles(0.7, 16)
        }
    ],
    objects: [
        player,
        npc1
    ],
    objectsPositions: {
        playerPosition: {
            x: 800,
            y: 800
        }
    }
})

const islandHomeInside = new Map({
    src: "./ASSETS/MAPS/island_home_inside.png",
    upperSrc: "./ASSETS/MAPS/island_home_insideUpper.png",
    collisionBlocks: [
        { //LEWO ŚCIANA
            x: 0,
            y: 0,
            width: 5,
            height: 150
        },
        { //PRAWO ŚCIANA
            x: 197,
            y: 0,
            width: 5,
            height: 150
        },
        { //DÓŁ ŚCIANA
            x: 0,
            y: 128,
            width: 27,
            height: 22
        },
        { //DÓŁ ŚCIANA
            x: 43,
            y: 128,
            width: 156,
            height: 22
        },
        { //GÓRA ŚCIANA
            x: 0,
            y: 0,
            width: 202,
            height: 22
        },
        { //ŚCIANA WEWNĘTRZNA GŁÓWNA LEWO
            x: 0,
            y: 64,
            width: 23,
            height: 22
        },
        { //ŚCIANA WEWNĘTRZNA ŚRODEK GŁÓWNA
            x: 41,
            y: 64,
            width: 105,
            height: 22
        },
        { //ŚCIANA WEWNĘTRZNA PRAWO GŁÓWNA
            x: 163,
            y: 64,
            width: 39,
            height: 22
        },
        { //ŚCIANA WEWNĘTRZNA GÓRA
            x: 80,
            y: 0,
            width: 5,
            height: 70
        },
        { //ŚCIANA WEWNĘTRZNA DOLNA - GÓRA
            x: 112,
            y: 65,
            width: 5,
            height: 37
        },
        { //ŚCIANA WEWNĘTRZNA DOLNA - GÓRA
            x: 112,
            y: 117,
            width: 5,
            height: 23
        },
        { //TOP LEFT ROOM
            x: 5,
            y: 21,
            width: 32,
            height: 7
        },
        { //TOP LEFT ROOM
            x: 45,
            y: 22,
            width: 11,
            height: 5
        },
        { //TOP LEFT ROOM bed
            x: 56,
            y: 21,
            width: 24,
            height: 22
        },
        { //TOP LEFT ROOM - BOTTOM LEFT
            x: 5,
            y: 40,
            width: 8,
            height: 19
        },
        { //BOTTOM LEFT ROOM - LEFT
            x: 4,
            y: 83,
            width: 17,
            height: 16
        },
        { //BOTTOM LEFT ROOM - SOFA
            x: 54,
            y: 78,
            width: 31,
            height: 14
        },
        { //BOTTOM LEFT ROOM - TV
            x: 96,
            y: 81,
            width: 15,
            height: 10
        },
        { //BOTTOM LEFT ROOM - TABLE
            x: 62,
            y: 97,
            width: 16,
            height: 16
        },
        { //BOTTOM LEFT ROOM - TABLE
            x: 85,
            y: 95,
            width: 10,
            height: 17
        },
        { //KITCHEN - TABLE
            x: 145,
            y: 106,
            width: 16,
            height: 17
        },
        { //KITCHEN - FRIDGE
            x: 117,
            y: 79,
            width: 25,
            height: 15
        },
        { //KITCHEN - FURNITURE - RIGHT
            x: 165,
            y: 79,
            width: 33,
            height: 14
        },
        { //KITCHEN - FURNITURE - RIGHT
            x: 190,
            y: 90,
            width: 7,
            height: 12
        },
        { //KITCHEN - FURNITURE - FURNACE
            x: 190,
            y: 115,
            width: 7,
            height: 13
        },
        { //LIVING ROOM - BOOKCASES
            x: 85,
            y: 21,
            width: 114,
            height: 7
        },
        { //LIVING ROOM - FURNACE
            x: 183,
            y: 21,
            width: 13,
            height: 9
        },
        { //LIVING ROOM - LEFT
            x: 85,
            y: 43,
            width: 8,
            height: 19
        },
        { //LIVING ROOM - TABLE MIDDLE
            x: 120,
            y: 34,
            width: 42,
            height: 13
        },
        { //LIVING ROOM - TABLE BOTTOM
            x: 128,
            y: 42,
            width: 26,
            height: 12
        },
        { //LIVING ROOM - TABLE BOTTOM
            x: 189,
            y: 49,
            width: 8,
            height: 12
        },
        { //POD DRZWI - ANTY WYJSCIE
            x: 0,
            y: 149,
            width: 202,
            height: 25
        },
    ],
    interractionBlocks: [
        { //DRZWI
            direction: "islands",
            x: 25,
            y: 129,
            width: 16,
            height: 25
        },
    ],
    objects: [
        player
    ],
    objectsPositions: {
        playerPosition: {
            x: 3,
            y: 85
        }
    }
})

//configure keyboard
const keyboard = new directionInput()
keyboard.setup()

window.mapChange = true
window.currentMap = islands
window.currentMapChange = islands

//draw on canvas
function draw() {
    //drawing current map LOWER VERSION
    window.currentMap.drawMap(window.cameraPerson)

    //drawing all sprites
    for (var i = 0; i < window.currentMap.objects.length; i++) {
        window.currentMap.objects[i].updateAndDraw(window.cameraPerson)
    }

    //drawing current map HIGHER VERSION
    window.currentMap.drawMapHigher()
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
    draw()
    player.updatePlayer()

    //new frame
    window.requestAnimationFrame(start)
}

//start the game
window.onload = function () {
    start()
}

/*canvas.addEventListener('click', event => {
    let bound = canvas.getBoundingClientRect()

    let x = event.clientX - bound.left - canvas.clientLeft
    let y = event.clientY - bound.top - canvas.clientTop

    let xz = x / ((canvas.width - 64) / 2)
    let yz = y / ((canvas.height - 64) / 2)

    console.log(xz)
})*/