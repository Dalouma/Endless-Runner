class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create() {
        this.add.text(centerX, centerY, "Game Over").setOrigin(0.5);
        this.add.text(centerX, centerY + 50, "press SPACE to play again").setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
}