/*
    David Amaya
    Neon Runaway
    Endless Runner Project
    Most code adapted from Nathan Altice github projects

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
            // debug: true,
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