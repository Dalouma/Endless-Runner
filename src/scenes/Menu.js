class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.atlas('runner_atlas', 'placeholder/runner atlas.png', 'placeholder/runner atlas.json');
        //this.load.spritesheet('guyRun', 'run cycle 96x96.png', {frameWidth: 96, frameHeight: 96});
        this.load.image('tile', 'tile.png');
        this.load.image('ground', 'ground.png');
    }

    create() {
        this.add.text(centerX, centerY, "[title here]").setOrigin(0.5);
        this.add.text(centerX, centerY + 50, "press SPACE to play").setOrigin(0.5);


        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
}

