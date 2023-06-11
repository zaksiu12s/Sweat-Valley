class Map {
    constructor(config) {
        this.position = config.position || { x: 0, y: 0 }
        this.objects = config.objects || []
        this.objectsPositions = config.objectsPositions


        //map making
        this.lowerMap = new Image()
        this.upperMap = new Image()

        //map sources
        this.lowerMap.src = config.src || "./ASSETS/MAPS/KitchenLower.png"
        if (config.upperSrc) { //check if upperSrc exists
            this.upperMap.src = config.upperSrc
        }

        //turn on maps while loaded
        this.lowerMap.onload = () => {
            this.mapLowerIsLoaded = true
        }
        this.upperMap.onload = () => {
            this.mapUpperIsLoaded = true
        }

        //configure collisionBlocks (took toooo long)
        this.collisionBlocks = config.collisionBlocks || [{}]
        this.interractionBlocks = config.interractionBlocks || [{}]
    }


    drawMap() {
        ctx.drawImage(this.lowerMap, centerMap(this.position.x, "x"), centerMap(this.position.x, "y"))

        /*
        for (var i = 0; i < this.collisionBlocks.length; i++) {
            ctx.fillStyle = "red"
            ctx.fillRect(centerMap(this.collisionBlocks[i].x, "x"),
                centerMap(this.collisionBlocks[i].y, "y"),
                this.collisionBlocks[i].width,
                this.collisionBlocks[i].height)

            //console.log("BLOCK POSITION.x: " + this.collisionBlocks[i].x + " BLOCK POSITION.y: " + this.collisionBlocks[i].y)
        }
        //*/

        /*
        for (var i = 0; i < this.interractionBlocks.length; i++) {
            ctx.fillStyle = "blue"
            ctx.fillRect(centerMap(this.interractionBlocks[i].x, "x"),
                centerMap(this.interractionBlocks[i].y, "y"),
                this.interractionBlocks[i].width,
                this.interractionBlocks[i].height)

            //console.log("BLOCK POSITION.x: " + this.collisionBlocks[i].x + " BLOCK POSITION.y: " + this.collisionBlocks[i].y)
        }
        //*/

        /*
        var i = 6 - 1//this.collisionBlocks.length - 1
        ctx.fillStyle = "red"
        ctx.fillRect(centerMap(cameraPerson, this.collisionBlocks[i].x, "x"),
            centerMap(cameraPerson, this.collisionBlocks[i].y, "y"),
            this.collisionBlocks[i].width,
            this.collisionBlocks[i].height)

        //*/
        //console.log("MAP POSITION.x: " + this.position.x)
    }

    drawMapHigher() {
        ctx.drawImage(this.upperMap, centerMap(this.position.x, "x"), centerMap(this.position.x, "y"))
    }
}