class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create() {
        // end screen text config
        let endConfig= {
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
        
        this.add.text(centerX, 50, "GAME OVER", endConfig).setOrigin(0.5);
        this.add.text(centerX, 100, `Final Score: ${score}`, endConfig).setOrigin(0.5);
        this.add.text(centerX, game.config.height - 50, "press SPACE to play again", endConfig).setOrigin(0.5);

        // credits
        this.add.text(centerX, centerY - 50, "Credits:", endConfig).setOrigin(0.5);
        endConfig.fontSize = "18px";
        this.add.text(centerX, centerY - 20, "Music by lucadialessandro from Pixabay").setOrigin(0.5);
        this.add.text(centerX, centerY, "Audio(freesound.org):").setOrigin(0.5);
        this.add.text(centerX, centerY + 20, "\"HighPixel\", \"filippys\", \"InspectorJ\"").setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
}