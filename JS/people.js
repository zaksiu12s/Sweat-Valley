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
    }
}