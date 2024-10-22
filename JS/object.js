/* 
TO DO:

---1. STAMINA 
---2. HEALTH
---3. MAKE BETTER DAMAGING SYSTEM
---4. MAP
---5. COLLISSIONS
6. ITEMS
7.FARMABLE ITEMS
---8. MAKE MORE CLASSES
9. MAKE SAME ANIMATION SPEED ON ALL THE DEVICES
*/


/* NEEDED:

    .drawImage() method:
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

*/

"use strict";

class Object {
    constructor(config) {
        this.center = {
            x: (canvas.width - 64) / 2,
            y: (canvas.height - 64) / 2
        }

        //position of an object
        this.position = config.position || { x: 0, y: 0 }

        //the width and height of the frame (every animation frame of an sprite)
        this.frameDimentions = config.frameDimentions || { height: 16, width: 16 }
        this.frameCut = config.frameCut || { x: 0, y: 0 }

        //frame speed
        this.frameSpeed = config.frameSpeed || { idle: 12, walk: 6, run: 4 }

        //scale of an sprite (this.scale * this.frameDimentions)
        this.scale = config.scale || 1

        //setting image
        this.currentFrame = config.currentFrame || { x: 0, y: 0, currentAnimation: "idle" } //current frame that is displayed
        this.gameLoops = 0 //current amount of game loops
        this.idle = new Image() //idle image form
        this.walk = new Image() //walk image form
        this.run = new Image() //run image form

        //idle image config
        this.idle.src = config.src.idle || "./ASSETS/SPRITES/character_light_idle_body.png"
        this.idle.onload = () => {
            this.idleIsLoaded = true
            //alert(this.idle.width + 'x' + this.idle.height)
        }
        //walk image config
        this.walk.src = config.src.walk || this.idle.src || ""
        this.walk.onload = () => {
            this.walkIsLoaded = true
            //alert(this.walk.width + 'x' + this.walk.height)
        }
        //run image config
        this.run.src = config.src.run || this.walk.src || this.idle.src || ""
        this.run.onload = () => {
            this.runIsLoaded = true
            //alert(this.run.width + 'x' + this.run.height)
        }
    }

    updateAndDraw() {
        //console.log(this.position.x)

        //const [frameX, frameY] = this.frame
        //console.log(this.stamina)
        //console.log(true && (true || false))
        //console.log(false || false && true)

        //fires when all the photos with animations are loaded

        if (this.idleIsLoaded && this.walkIsLoaded && this.runIsLoaded) {

            //console.log("Animation")
            //switch for what animation should be displayed
            switch (this.currentFrame.currentAnimation) {

                //idling animation
                case "idle":
                    //add 1 to gameLoops everytime an frame is called, every x frames change animation frame
                    if (this.gameLoops < this.frameSpeed.idle) {
                        this.gameLoops += 1
                        //console.log(this.gameLoops)
                    } else {
                        this.gameLoops = 0
                        this.currentFrame.x += 1
                        //console.log("Animation frame number:" + this.currentFrame.x)
                    }
                    //calculate if the frame is the last one
                    if (this.idle.width / this.frameDimentions.height <= this.currentFrame.x) {
                        this.currentFrame.x = 0
                    }
                    //draw frame
                    ctx.drawImage(
                        this.idle, //IMAGE TO BE DISPLAYED //1
                        this.currentFrame.x * this.frameDimentions.width, //CUT ON THE BASE IMAGE FROM LEFT //2
                        //0,
                        this.currentFrame.y * this.frameDimentions.height, //CUT ON THE BASE IMAGE FROM TOP //3 
                        //0,
                        this.frameDimentions.width, //THE LENGHT WIDTH OF THE CUT ON THE BASE IMAGE FROM LEFT //4
                        this.frameDimentions.height, //THE LENGHT HEIGHT OF THE CUT ON THE BASE IMAGE FROM RIGHT //5
                        centerMap(this.position.x, "x"), //COORDINATES OF THE IMAGE FROM LEFT //6
                        centerMap(this.position.y, "y"), //COORDINATES OF THE IMAGE FROM TOP //7 
                        Math.round(this.frameDimentions.width * this.scale), //WIDTH OF AN IMAGE ON THE CANVAS //8
                        Math.round(this.frameDimentions.height * this.scale) //HEIGHT OF AN IMAGE ON THE CANVAS //9
                        //0,0
                    )
                    break

                //fires when the animation should be walking
                case "walk":
                    //add 1 to gameLoops everytime an frame is called, every x frames change animation frame
                    if (this.gameLoops < this.frameSpeed.walk) {
                        this.gameLoops += 1
                        //console.log(this.gameLoops)
                    } else {
                        this.gameLoops = 0
                        this.currentFrame.x += 1
                        //console.log("Animation frame number:" + this.currentFrame.x)
                    }
                    //calculate if the frame is the last one
                    if (this.walk.width / this.frameDimentions.height <= this.currentFrame.x) {
                        this.currentFrame.x = 0
                    }
                    //draw frame
                    ctx.drawImage(
                        this.walk, //IMAGE TO BE DISPLAYED //1
                        this.currentFrame.x * this.frameDimentions.width, //CUT ON THE BASE IMAGE FROM LEFT //2
                        //0,
                        this.currentFrame.y * this.frameDimentions.height, //CUT ON THE BASE IMAGE FROM TOP //3 
                        //0,
                        this.frameDimentions.width, //THE LENGHT WIDTH OF THE CUT ON THE BASE IMAGE FROM LEFT //4
                        this.frameDimentions.height, //THE LENGHT HEIGHT OF THE CUT ON THE BASE IMAGE FROM RIGHT //5
                        centerMap(this.position.x, "x"), //COORDINATES OF THE IMAGE FROM LEFT //6
                        centerMap(this.position.y, "y"), //COORDINATES OF THE IMAGE FROM TOP //7 
                        Math.round(this.frameDimentions.width * this.scale), //WIDTH OF AN IMAGE ON THE CANVAS //8
                        Math.round(this.frameDimentions.height * this.scale) //HEIGHT OF AN IMAGE ON THE CANVAS //9
                        //0,0
                    )
                    break

                //animation displayed while running
                case "run":
                    //add 1 to gameLoops everytime an frame is called, every x frames change animation frame
                    if (this.gameLoops < this.frameSpeed.run) {
                        this.gameLoops += 1
                        //console.log(this.gameLoops)
                    } else {
                        this.gameLoops = 0
                        this.currentFrame.x += 1
                        //console.log("Animation frame number:" + this.currentFrame.x)
                    }
                    //calculate if the frame is the last one
                    if (this.run.width / this.frameDimentions.height <= this.currentFrame.x) {
                        this.currentFrame.x = 0
                    }
                    //draw frame
                    ctx.drawImage(
                        this.run, //IMAGE TO BE DISPLAYED //1
                        this.currentFrame.x * this.frameDimentions.width, //CUT ON THE BASE IMAGE FROM LEFT //2
                        //0,
                        this.currentFrame.y * this.frameDimentions.height, //CUT ON THE BASE IMAGE FROM TOP //3 
                        //0,
                        this.frameDimentions.width, //THE LENGHT WIDTH OF THE CUT ON THE BASE IMAGE FROM LEFT //4
                        this.frameDimentions.height, //THE LENGHT HEIGHT OF THE CUT ON THE BASE IMAGE FROM RIGHT //5
                        centerMap(this.position.x, "x"), //COORDINATES OF THE IMAGE FROM LEFT //6
                        centerMap(this.position.y, "y"), //COORDINATES OF THE IMAGE FROM TOP //7 
                        Math.round(this.frameDimentions.width * this.scale), //WIDTH OF AN IMAGE ON THE CANVAS //8
                        Math.round(this.frameDimentions.height * this.scale) //HEIGHT OF AN IMAGE ON THE CANVAS //9
                        //0,0
                    )
                    break
            }
        }
    }
}