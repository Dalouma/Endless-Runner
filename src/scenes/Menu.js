class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.atlas('runner_atlas', 'runner atlas.png', 'runner atlas.json');
        //this.load.spritesheet('guyRun', 'run cycle 96x96.png', {frameWidth: 96, frameHeight: 96});
        this.load.image('tile', 'tile.png');
        this.load.image('ground', 'ground.png');
        this.load.spritesheet('fireball', 'fireball.png', {frameWidth: 64, frameHeight: 64});

        // load bgm
        this.load.audio('music', 'runner bgm.mp3');

        // load sfx
        this.load.audio('fire_woosh', 'fireball.wav');
        this.load.audio('jump', 'jump.mp3');
        this.load.audio('diveRoll', 'diveRoll.mp3');
    }

    create() {
        // menu text config
        let menuConfig= {
            // fontFamily: "Courier",
            fontSize: "28px",
            //backgroundColor: "#F3B141",
            // backgroundColor: "#000",
            //color: "#843605",
            // color: "#FFFFFF",
            // align: "right",
            // padding: {
            //     top: 5,
            //     bottom: 5,
            // },
            // fixedWidth: 0
        };

        this.add.text(centerX, centerY - 50, "NEON RUNAWAY", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, "Jump: ↑", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, "Dive/Roll: ↓", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 100, "press SPACE to play", menuConfig).setOrigin(0.5);


        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
}

