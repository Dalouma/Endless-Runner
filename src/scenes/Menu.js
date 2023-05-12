class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.path = './assets/placeholder/';
        this.load.atlas('runner_atlas', 'runner atlas.png', 'runner atlas.json');
        //this.load.spritesheet('guyRun', 'run cycle 96x96.png', {frameWidth: 96, frameHeight: 96});
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

