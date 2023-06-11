"use strict";

class directionInput {
    constructor() {
        //currently pressed keys
        this.heldDirections = []

        //is space pressed
        this.spaceHeld = false
        this.shiftHeld = false

        //the list for all possible pressed keys
        this.keys = {
            "ArrowUp": "up",
            "ArrowDown": "down",
            "ArrowLeft": "left",
            "ArrowRight": "right",
            "KeyW": "up",
            "KeyS": "down",
            "KeyA": "left",
            "KeyD": "right"
        }
    }

    //returns direction and if the space is held
    get pressedKeys() {
        return {
            'heldDirection': this.heldDirections[0],
            'spaceHeld': this.spaceHeld,
            'shiftHeld': this.shiftHeld
        }
    }

    setup() {
        //when key is pressed
        window.addEventListener("keydown", key => {
            //check what key was pressed and add to array
            const direction = this.keys[key.code]

            //check for space key
            if (key.code === "Space") this.spaceHeld = true
            if (key.code === "ShiftLeft") this.shiftHeld = true

            if (//fires when key is pressed and key is not in array
                direction && this.heldDirections.indexOf(direction) === -1) {
                this.heldDirections.unshift(direction);
            }
        })

        //when key is unpressed
        window.addEventListener("keyup", key => {
            //check what key was pressed and subtract to array
            const direction = this.keys[key.code]

            //check for space key
            if (key.code === "Space") this.spaceHeld = false
            if (key.code === "ShiftLeft") this.shiftHeld = false

            const index = this.heldDirections.indexOf(direction)
            if (//fires when key was pressed and wasnt unpressed
                index > -1) {
                this.heldDirections.splice(index, 1)
            }
        })
    }
}

