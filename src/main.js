/*
    David Amaya
    Neon Runaway
    Endless Runner Project
    Most code adapted from Nathan Altice github projects
    Hours spent: ~25hrs

    // CREATIVE TILT
    Programming TECH
        I implemented a dive mechanic that allow the player to fall faster
        while in the air. I did this along with Nathan's FSM implementation on
        GitHub. It's a simple mechanic, but it feels good and I'm proud of it.
    Visual Style:
        I did pixel art for the first time for this project. I created the 
        fireball animation that the player has to jump over. It kind of looks 
        like a jellyfish according to one friend and it only has two frames, 
        but I'm proud of it nonetheless.

        I also "created" the character animations. It wasn't entirely my own 
        because I used a template that I drew over using adobe photoshop. However, 
        I did work very hard on it and I'm happy with how it turned out.

        I almost forgot about the tilesprite. That was all me too. I used this website 
        called pixilart.com. I was about to buy Asesprite, but I'm not too sure if I 
        was going to continue with pixel art, but after this project, I might.

    Credits:
    Character sprite template
        https://zegley.itch.io/2d-platformermetroidvania-asset-pack
        I drew over this sprite sheet to create my own character
        so technically it's my own art (please don't doc me).
    Music by lucadialessandro from Pixabay
        https://pixabay.com/music/search/arcade/
    SFX
        Fireball: https://freesound.org/people/HighPixel/sounds/431174/
        Jump: https://freesound.org/people/filippys/sounds/656905/
        Dive: https://freesound.org/people/InspectorJ/sounds/394433/
*/

// honesty is the best policy
'use strict';

let config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play, GameOver ]
};

let game = new Phaser.Game(config);

// reserve keys
let keySPACE;

// global vars
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let tilesize = 64;
let SCROLL_SPEED = 3;
let SCALE = 1;

// keep score
let score;