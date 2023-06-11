class Player extends People {
    constructor(config) {
        super(config)
        this.canRunTimeout = true

        this.walkSound = new Audio()
        this.walkSound.src = "./ASSETS/MUSIC/16_human_walk_stone_2.wav"
        this.walkSound.setAttribute("preload", "auto")
        this.walkSound.setAttribute("controls", "none")
        this.walkSound.style.display = "none"

        this.damageSound = new Audio()
        this.damageSound.src = "./ASSETS/MUSIC/11_human_damage_2.wav"
        this.damageSound.setAttribute("preload", "auto")
        this.damageSound.setAttribute("controls", "none")
        this.damageSound.style.display = "none"

        this.healSound = new Audio()
        this.healSound.src = "./ASSETS/MUSIC/08_human_charge_1.wav"
        this.healSound.setAttribute("preload", "auto")
        this.healSound.setAttribute("controls", "none")
        this.healSound.style.display = "none"

        //pressed keys (direction and space)
        this.pressedKeys = config.pressedKeys
    }

    updatePosition() {
        //frames that will be displayed from original photo, 0,1,2,3 mean row 0 means first, 1 second etc
        const frames = {
            "right": 0,
            "left": 1,
            "down": 2,
            "up": 3
        }

        //array for direction
        this.directionUpdate = {
            "up": ["y", -this.speed.y],
            "down": ["y", this.speed.y],
            "left": ["x", -this.speed.x],
            "right": ["x", this.speed.x]
        }

        //fires when wsad or arrow keys are pressed 
        if (this.pressedKeys.direction) {
            const [property, change] = this.directionUpdate[this.pressedKeys.direction]
            if (!checkForWalls(player, window.currentMap, change, this.pressedKeys.direction)) {
                this.position[property] += change
            }

            //changes current animation frame
            this.currentFrame.currentAnimation = "walk"
            this.walkSound.playbackRate = 2
            this.walkSound.play()
            this.currentFrame.y = frames[this.pressedKeys.direction]
            //console.log(this.pressedKeys.direction)
        } else {
            //changes current animation frame to idling
            this.currentFrame.currentAnimation = "idle"
            //if sprite is facing backwards then change to facing downwards
            if (this.currentFrame.y === 3) { this.currentFrame.y = 2 }
        }
    }
    updateStamina() {
        //fires when space is pressed //while direction key and space is pressed change animation to running
        if (this.pressedKeys.shiftHeld && this.pressedKeys.direction && this.stamina > 0) {

            //boosts speed and changes to run animation
            this.speed = { x: this.speedBoost.x, y: this.speedBoost.y }
            this.walkSound.playbackRate = 3.5
            this.currentFrame.currentAnimation = "run"

            //reduce stamina
            this.stamina -= 0.4
        } else {
            this.speed = { x: this.baseSpeed.x, y: this.baseSpeed.y } //makes speed normal
            if (this.stamina < this.maxStamina && this.pressedKeys.direction && !this.pressedKeys.shiftHeld) {
                this.stamina += 0.5
            }
            if (this.stamina < this.maxStamina && !this.pressedKeys.direction && !this.pressedKeys.shiftHeld) {
                this.stamina += 0.5
            }
            if (this.stamina < this.maxStamina && !this.pressedKeys.direction && this.pressedKeys.shiftHeld) {
                this.stamina += 0.5
            }
        }
    }

    updateInteractions() {
        for (var i = 0; i < window.currentMap.interractionBlocks.length; i++)
            if (checkForInterractionBlocks(player, window.currentMap)) {
                switch (window.currentMap.interractionBlocks[i].direction) {
                    case "islandHomeInside":
                        window.currentMapChange = islandHomeInside
                        window.mapChange = true
                        break

                    case "islands":
                        window.currentMapChange = islands
                        window.mapChange = true
                        break
                }
            }
    }

    drawHud() {
        //drawing stamina
        ctx.fillStyle = "black"
        ctx.fillRect(5, 5, 50, 6)

        if (this.stamina > 100) { this.stamina = 100 }
        if (this.stamina < 0) { this.stamina = 0 }

        ctx.fillStyle = "blue"
        ctx.fillRect(5, 5, this.stamina / this.maxStamina * 50, 6)

        //drawing health
        ctx.fillStyle = "black"
        ctx.fillRect(5, 15, 50, 6)

        ctx.fillStyle = "red"
        ctx.fillRect(5, 15, this.health / this.maxHealth * 50, 6)
    }

    updateHealth() {
        //hp deduct when hit
        //setInterval(healthDeduct(this), 1000)
        if (checkForCollisions(player, npc1) && this.canTakeDamage && this.health > 0) {
            this.health--
            this.damageSound.playbackRate = 2
            this.damageSound.play()
            this.canTakeDamage = false
            clearInterval(this.healInterval)
            this.canHeal = true
            this.damageInterval = setInterval(() => {
                this.canTakeDamage = true
                clearInterval(this.damageInterval)
            }, 1000)
            //console.log("DAMAGE:" + this.canTakeDamage)

        } else if (!checkForCollisions(player, npc1) && this.canHeal && this.health < 5) {
            this.canHeal = false
            this.healInterval = setInterval(() => {
                this.canHeal = true
                this.health++
                this.healSound.playbackRate = 1.5
                this.healSound.play()
                clearInterval(this.healInterval)
            }, 3000)
            //console.log("HEAL:" + this.canTakeDamage) 
        }
    }

    updateFight() {
        //DAMAGE OTHERS!
        if (this.pressedKeys.spaceHeld) {
            console.log(this.pressedKeys.direction)

            ctx.fillStyle = "green"

            switch (this.currentFrame.y) {
                case 3:
                    ctx.fillRect(centerMap((this.position.x + this.frameCut.x), "x"),
                        centerMap((this.position.y + this.frameCut.y - 5), "y"),
                        10, 10)
                    break

                case 2:
                    ctx.fillRect(centerMap((this.position.x + this.frameCut.x), "x"),
                        centerMap((this.position.y + this.frameCut.y + 10), "y"),
                        10, 10)
                    break

                case 1:
                    ctx.fillRect(centerMap((this.position.x + this.frameCut.x - 10), "x"),
                        centerMap((this.position.y + this.frameCut.y), "y"),
                        10, 10)
                    break

                case 0:
                    ctx.fillRect(centerMap((this.position.x + this.frameCut.x + 10), "x"),
                        centerMap((this.position.y + this.frameCut.y), "y"),
                        10, 10)
                    break
            }

        }
    }



    updatePlayer() {
        this.updatePosition()
        this.updateInteractions()
        this.updateHealth()
        this.updateStamina()
        this.updateFight()
    }

    //console.log(this.health + "/" + this.maxHealth)
}
