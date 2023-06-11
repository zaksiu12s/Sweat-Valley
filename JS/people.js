"use strict";

class People extends Object {
    constructor(config) {
        super(config)

        //STATS OF OBJECT OTHER THAN LOOKS
        //stamina (now only used for running!)
        this.stamina = this.maxStamina = config.stamina || 100
        this.staminaCost = config.staminaCost || 1

        //health
        this.health = this.maxHealth = config.health || 5
        this.canTakeDamage = true
        this.canHeal = true
        //this.health = 3

        //speed configuration
        this.speedBoost = config.speedBoost || { x: 2, y: 2 }
        this.baseSpeed = config.baseSpeed || { x: 1, y: 1 }
        this.speed = this.baseSpeed

        //music
        

        this.walk = new Image() //walk image form
        this.run = new Image() //run image form'

        this.images["walk"] = this.walk
        this.images["run"] = this.run

        this.walk.src = config.src.walk || this.idle.src
        this.walk.onload = () => {
            this.images["walk"].isLoaded = true
        }

        this.run.src = config.src.run || this.walk.src
        this.run.onload = () => {
            this.images["run"].isLoaded = true
        }
    }
}