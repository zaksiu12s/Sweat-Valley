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
        //position of an object
        this.position = config.position || { x: 0, y: 0 }
        this.frameDimentions = config.frameDimentions || { height: 16, width: 16 }
        this.frameCut = config.frameCut || {
            x: 0,
            y: 0,
            top: 0,
            down: 0,
            right: 0,
            left: 0
        }

        //frame speed
        this.frameSpeed = config.frameSpeed || { "idle": 12, "walk": 6, "run": 4 }

        //scale of an sprite (this.scale * this.frameDimentions)
        this.scale = config.scale || 1

        //setting image
        this.currentFrame = config.currentFrame || { x: 0, y: 0, currentAnimation: "idle" } //current frame that is displayed
        this.gameLoops = 0 //current amount of game loops

        this.idle = new Image() //idle image form
        this.idle.src = config.src.idle || "./ASSETS/SPRITES/character_light_idle_body.png"
        this.idle.onload = () => {
            this.images["idle"].isLoaded = true
        }

        this.images = {
            "idle": this.idle
        }

        this.isAnimated = config.isAnimated || false
    }

    draw() {
        if (this.isAnimated && this.images[this.currentFrame.currentAnimation].isLoaded) {
            ctx.drawImage(
                this.images[this.currentFrame.currentAnimation], //IMAGE TO BE DISPLAYED //1
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
        } else if (this.images[this.currentFrame.currentAnimation] && this.images[this.currentFrame.currentAnimation].isLoaded) {
            ctx.drawImage(
                this.images[this.currentFrame.currentAnimation], //IMAGE TO BE DISPLAYED //1
                centerMap(this.position.x, "x"), //COORDINATES OF THE IMAGE FROM LEFT //2
                centerMap(this.position.y, "y"), //COORDINATES OF THE IMAGE FROM TOP //3
                Math.round(this.images[this.currentFrame.currentAnimation].width * this.scale), //WIDTH OF AN IMAGE ON THE CANVAS //4
                Math.round(this.images[this.currentFrame.currentAnimation].height * this.scale) //HEIGHT OF AN IMAGE ON THE CANVAS //5
            )
        }
    }

    animate() {
        if (this.isAnimated) {
            if (this.gameLoops < this.frameSpeed[this.currentFrame.currentAnimation]) {
                this.gameLoops += 1
            } else {
                this.gameLoops = 0
                this.currentFrame.x += 1
            }
            //calculate if the frame is the last one
            if (this.images[this.currentFrame.currentAnimation].width / this.frameDimentions.width <= this.currentFrame.x) {
                this.currentFrame.x = 0
            }
        }
    }
}